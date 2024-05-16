import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({body: req.body});
  console.log({message: req.body.message});
  return res.status(200).send("Ok");
}