import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/clinet";
import excludeFields from "../../../utils/exludeFields";

import formatQuery from "../../../utils/searchFormat";

export default async function postsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: {
      id,
    },
    method,
  } = req;
  try {
    if (id) {

      switch (method) {
        case "GET":

          const posts = await prisma.post.findUnique({
            where: { id: +id },
            select: {
              id: true,
              likedUsers: {
                select: {
                  id: true,
                }
              }
            }
          });
          await prisma.$disconnect()
          return res.status(200).json(posts);

        case "POST": {
          const existingLike = await prisma.like.findFirst({
            where: {
              postId: +id,
              // TODO: remove after adding auth, now hardcoded
              userId: 1
            }
          })
          if (existingLike) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Already exists" })
          }
          const post = await prisma.post.update({
            where: { id: +id },
            data: {
              likedUsers: {
                connectOrCreate: {
                  // TODO: remove after adding auth, now hardcoded
                  where: { id: 1 },
                  create: { userId: 1 },
                },
              }
            }
          })
          return res.status(StatusCodes.CREATED).send(null)
        }

        case "DELETE": {
          const existingLike = await prisma.like.findFirst({
            where: {
              postId: +id,
              // TODO: remove after adding auth, now hardcoded
              userId: 1
            }
          })
          if (!existingLike) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Not found" })
          }
          const remove = await prisma.like.deleteMany({
            where: {
              postId: +id,
              // TODO: remove after adding auth, now hardcoded
              userId: 1
            }
          })
          return res.status(StatusCodes.OK).send(null)
        }
        default:
          res.setHeader("Allow", ["GET", "POST"]);
          res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
    throw new Error("Id was not provided");

  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Something gone wrong' })
  }
}

