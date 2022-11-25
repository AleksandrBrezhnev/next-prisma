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
                    const { query: { perPage, page } } = req;
                    if (typeof page === 'string' && typeof perPage === 'string') {
                        const query = formatQuery(+page, +perPage, 'createdAt', 'straight')
                        const post = await prisma.post.findUnique({
                            where: { id: 1 },
                            select: {
                                _count: {
                                    select: { comments: true },
                                },
                                id: true,
                                comments: {
                                    ...query,

                                    select: {

                                        id: true,
                                        text: true,
                                        createdAt: true,
                                        user: {
                                            select: {
                                                id: true,
                                                name: true,
                                                avatar: true
                                            }
                                        }

                                    }
                                }
                            }
                        })
                        await prisma.$disconnect()
                        return res.status(200).json(post);
                    }
                    else {
                        res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong queries was provided" })
                    }
                case "POST": {
                    const { body: { text } } = req;

                    const comment = await prisma.comment.create({
                        data: {
                            postId: +id,
                            // TODO: remove after adding auth, now hardcoded

                            userId: 1,
                            text
                        }

                    })

                    return res.status(StatusCodes.CREATED).send(null)
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

