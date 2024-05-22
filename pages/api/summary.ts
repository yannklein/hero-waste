import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return res.status(401).end('Unauthorized');
  // }

  // https://wellington.govt.nz/-/media/rubbish-recycling-and-waste/reducing-your-waste/events/files/event-waste-conversion-table-litres-to-kilograms.pdf?la=en&hash=3787D172E68832F4A5EF90B6956F1FBED87A076C
  // https://nowaste.whatdesigncando.com/app/uploads/2021/01/WDCD_NWC_Tokyo-Perspective_EN.pdf
  // One trash is about 2kg
  // Kg per person in Tokyo 0.727kg
  // a FT/PT student is 3 fourth of day on campus average so 3/4 full day so 0.55 kg per student per week
  try {
    const results = {"WEB": [], "DATA": []};

    const batches = await prisma.batch.findMany({
      include: {
        disposals: {},
      },
      where: {
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
    });
    for (let batch of batches) {
      const penalties = await prisma.batch.penaltiesSinceMonday(batch);
      if (penalties === 0) {
        results[batch.category].push("no missorted trashes");
      } else if (penalties <= 2) {
        results[batch.category].push("few missorted trashes");
      } else {
        results[batch.category].push("a lot of missorted trashes");
      }

      const trashes = await prisma.batch.prevWeekDisposal(batch, 1); // trashes of 2kg
      const tokyoAvgTrashes = 0.55 * batch.size / 2; // 0.55 kg per person, 2kg per trash
      if (trashes <= tokyoAvgTrashes - 2) {
        results[batch.category].push("less trashes than average an tokyoite");
      } else if (trashes >= tokyoAvgTrashes - 2 && trashes <= tokyoAvgTrashes + 2) {
        results[batch.category].push("about the same amount of trashes than average an tokyoite");
      } else {
        results[batch.category].push("more trashes than average an tokyoite");
      }
      const sortingRate = await prisma.batch.sortingRate(batch);
      if (sortingRate <= 0.3) {
        results[batch.category].push("poorly sorted trashes");
      } else {
        results[batch.category].push("well sorted trashes");
      }
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const role = `
      You are the mastermind of a game that aims to save the planet by reducing waste. 
      Your role in the game is to judge the weekly performance of the game teams.
      Your judgement is often sassy but funny as well. 
      You are roasting the teams when they have bad performance metrics but you also give nice compliments when they do better.
    `;
    
    let serialResult = "" 
    Object.keys(results).forEach((team) => {
      results[team].forEach((result) => {
        serialResult += `The ${team} team has ${result}. `
      })
    })
    console.log(serialResult);
    
    const message = `
    The game has 2 teams the WEB team and the DATA team.
    Create a 70 words summary of what happened during the week using only the following results:
    [RESULTS START]${serialResult}[RESULTS END].
    According to these results only you should roast the teams for their poor waste management results and congratulate their good ones otherwise. Do not invent results.
    Your output should consist of the summary only. Do not use RESULTS START or RESULTS END in the summary.
    In the summary, highilight the important words by putting <strong> before them and </strong> after them.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: role },
        { role: 'user', content: message },
      ],
      model: 'gpt-3.5-turbo',
    });
    const data = {
      summary: completion.choices[0].message.content
    };
    const battle = await prisma.battle.create({ data });
    res.json(battle);
  } catch (error) {
    console.error(error);
  }
};
