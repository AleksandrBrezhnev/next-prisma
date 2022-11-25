import {prisma} from "../../../prisma/clinet";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
  } = req;
  try {
    switch (method) {
      case "POST":
        
          const post = await prisma.post.create({data: body});
          await prisma.$disconnect()
          return res.status(200).json(post);
        
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    
  }
}
