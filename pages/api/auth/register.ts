import { prisma } from "../../../prisma/clinet";
import type { NextApiRequest, NextApiResponse } from "next";
import hash from "../../../utils/hash";
import { StatusCodes } from "http-status-codes";

export default async function postHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        body: { name, email, avatar: uploadedAvatar, password, repeatPassword },
        method,
    } = req;
    try {
        switch (method) {
            case "POST":
                if (repeatPassword !== password) {
                    return res.status(400).json({ message: 'Passwords do not match' })
                }
                const user = await prisma.user.create({ data: { name, email, password: hash(password), avatar: uploadedAvatar || process.env.DEFAULT_AVATAR_URL } });
                await prisma.$disconnect()
                return res.status(200).json(user);

            default:
                res.setHeader("Allow", ["POST"]);
                res.status(405).end(`Method ${method} Not Allowed`);

        }
    }
    catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Something gone wrong" })
    }
}