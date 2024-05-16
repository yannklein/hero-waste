import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  const sendLineMessage = async (message, lineId) => {

    let noHTMLMsg = message.replace(/\<[^>]+\>/g, "")
    noHTMLMsg = noHTMLMsg.replace(/\./g, `.\n\n`)

    const introText = 
`Hi team! This is Nyan from Hero-Waste 😼

I have been checking your trashes this week and here is my feedback. 
    
ℹ️ don't take the following personnaly, I am an AI programmed to be extra sassy 😽
`
    const summaryText = 
`${noHTMLMsg}

See you next week 😸

Find more details about your week score here 👇
https://hero-waste.vercel.app/
`;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
    );

    const data = {
      to: lineId,
      messages: [
        {
          type: 'text',
          text: introText,
        },
        {
          type: 'text',
          text: summaryText,
        },
      ],
    };
    const raw = JSON.stringify(data);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch('https://api.line.me/v2/bot/message/push', requestOptions);
    const result = await response.json();
    return {message: data, ack: result.sentMessages};
  };

  const batches = await prisma.batch.findMany({
    select: {
      lineId: true
    },
    where: {
      endDate: {
        gte: new Date()
      }
    }
  });

  let battle = await prisma.battle.findFirst({
    select: {
      summary: true
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  const results = [];
  for (let batch of batches) {
    results.push(await sendLineMessage(battle.summary, batch.lineId));
  }
  res.json(results)
};
