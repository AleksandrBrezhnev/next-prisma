import { PrismaClient } from ".prisma/client";

export const prisma = new PrismaClient();

export function excludeFields<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }
