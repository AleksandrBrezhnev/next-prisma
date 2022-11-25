import type { NextApiRequest, NextApiResponse } from "next";

import { StatusCodes } from "http-status-codes";

import { prisma } from "../../../prisma/clinet";
import hash from "../../../utils/hash";
import { createTokensPair } from "../../../utils/token";

export default async function postHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        body: { email, password },
        method,
    } = req;
    try {
        switch (method) {
            case "POST":
                const user = await prisma.user.findUnique({ where: { email: email } });
                if (!user) {
                    return res
                        .status(StatusCodes.NOT_FOUND)
                        .json({ message: "Wrong email or password" });
                }
                if (user.password !== hash(password)) {
                    return res
                        .status(StatusCodes.NOT_FOUND)
                        .json({ message: "Wrong email or password" });
                }
                const tokens = await createTokensPair(user.id);
                await prisma.$disconnect();
                return res.status(200).json({ ...user, ...tokens });

            default:
                res.setHeader("Allow", ["POST"]);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Something gone wrong" });
    }
}
