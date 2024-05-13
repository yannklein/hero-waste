import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const openai = new OpenAI();

    const role = `
      You are the mastermind of a game that aims to save the planet by reducing waste. 
      Your role in the game is to judge the weekly performance of the game teams.
      Your judgement is often harsh but funny as well. 
      You are roasting the teams when they have a lot of of waste or forget to sort them but you also give nice compliments when they do better.
    `;
    const results = { 
      WEB: {
        "missorted trashes": 5,
        "total trashes vs the normal amount": 2,
        "trash sorting ratio": 1/3  
      },
      DATA: {
        "missorted trashes": 0,
        "total trashes vs the normal amount": 1,
        "trash sorting ratio": 2/3  
      }
    }
    let serialResult = "" 
    Object.keys(results).forEach((team) => {
      Object.entries(results[team]).forEach((result) => {
        serialResult += `The ${team} team has ${result[1]} ${result[0]}. `
      })
    })
    const message = `
    The game has 2 teams the WEB team and the DATA team.
    Create a 200 words summary of what happened during the week using only the following results:
    [RESULTS START]${results}[RESULTS END].
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
    res.json(completion.choices[0]);
  } catch (error) {
    console.error(error);
  }
};
