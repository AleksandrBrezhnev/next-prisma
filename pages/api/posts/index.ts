import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/clinet";
import excludeFields from "../../../utils/exludeFields";

import formatQuery from "../../../utils/searchFormat";
import { DEFAULT_QUERY } from "../../../utils/constants";
import { StatusCodes } from "http-status-codes";
export default async function postsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      headers: {
        userId
      },
      query: {
        page,
        perPage,
        sortBy,
        sortDirection
      },
      method,
    } = req;

    switch (method) {
      case "GET":
        const query = formatQuery(
          page ? Number(page) : DEFAULT_QUERY.page,
          perPage ? Number(perPage) : DEFAULT_QUERY.perPage,
          sortBy ? sortBy : DEFAULT_QUERY.sortBy,
          sortDirection ? sortDirection : DEFAULT_QUERY.sortDirection
        )

        const posts = await prisma.post.findMany({
          ...query,
          where: {
            published: true
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        });
        await prisma.$disconnect()
        return res.status(200).json(posts);

      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    console.log(err)
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Something gone wrong' })

  }
}

