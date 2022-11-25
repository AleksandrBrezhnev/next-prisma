import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/clinet";

export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;
  try {
    if (id) {
      switch (method) {
        case "GET":

          const post = await prisma.post.findUnique({ where: { id: +id } });
          await prisma.$disconnect()
          return res.status(200).json(post);

        default:
          res.setHeader("Allow", ["GET", "PUT"]);
          res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
    throw new Error("Id was not provided");
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Something gone wrong' })

  }
}
