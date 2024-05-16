import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({body: req.body});
  console.log({message: req.body.events[0].message});
  console.log({message: req.body.events[0].source});
  return res.status(200).send("Ok");
}