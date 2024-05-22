import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sendLineMessage = async (message, lineId) => {
    let noHTMLMsg = message.replace(/\<[^>]+\>/g, '');
    noHTMLMsg = noHTMLMsg.replace(/\./g, `.\n\n`);

    const flexMessage = {
      type: 'flex',
      altText: 'Hero-Waste Weekly Summary',
      contents: {
        type: 'bubble',
        hero: {
          type: 'image',
          url: 'https://hero-waste.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.3a39d74e.png&w=3840&q=75',
          size: 'full',
          aspectRatio: '20:11',
          aspectMode: 'cover',
          action: {
            type: 'uri',
            uri: 'https://line.me/',
          },
          position: 'relative',
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'image',
                  position: 'relative',
                  url: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzJlemhycWxpeTQyaHl6eXVtZ3ZrNm1venlyZ3g0dHowZnhvZTk4aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aPAvJNgLDQL8qBSuxl/giphy.gif',
                  size: 'xs',
                  align: 'start',
                  aspectMode: 'fit',
                  animated: true,
                  flex: 0,
                },
                {
                  type: 'text',
                  text: 'Weekly summary',
                  weight: 'bold',
                  size: 'xl',
                  margin: 'sm',
                  flex: 1,
                  align: 'center',
                  gravity: 'center',
                },
              ],
            },
            {
              type: 'text',
              text: 'Hi team! This is Nyan from Hero-Waste 😼  I have been checking your bootcamp trashes this week and here is my feedback.',
              wrap: true,
              margin: 'lg',
            },
            {
              type: 'separator',
              margin: 'xl',
            },
            {
              type: 'text',
              text: "ℹ️ don't take the following personnaly, I am an AI programmed to be extra sassy 😽",
              wrap: true,
              size: 'xxs',
              margin: 'xl',
            },
            {
              type: 'separator',
              margin: 'xl',
            },
            {
              type: 'text',
              text: noHTMLMsg,
              wrap: true,
              style: 'italic',
              margin: 'xl',
            },
          ],
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              type: 'button',
              style: 'link',
              height: 'sm',
              action: {
                type: 'uri',
                label: 'More on your dashboard',
                uri: 'https://hero-waste.vercel.app/',
              },
            },
          ],
          flex: 0,
        },
      },
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
    );

    const data = {
      to: lineId,
      messages: [
        flexMessage
      ],
    };
    const raw = JSON.stringify(data);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(
      'https://api.line.me/v2/bot/message/push',
      requestOptions,
    );
    const result = await response.json();
    return { message: data, ack: result.sentMessages };
  };

  const batches = await prisma.batch.findMany({
    select: {
      lineId: true,
    },
    where: {
      endDate: {
        gte: new Date(),
      },
    },
  });

  let battle = await prisma.battle.findFirst({
    select: {
      summary: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const results = [];
  for (let batch of batches) {
    results.push(await sendLineMessage(battle.summary, batch.lineId));
  }
  res.json(results);
};
