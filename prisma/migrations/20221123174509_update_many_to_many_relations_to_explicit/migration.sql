/*
  Warnings:

  - You are about to drop the `_LikeToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LikeToPost" DROP CONSTRAINT "_LikeToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToPost" DROP CONSTRAINT "_LikeToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToUser" DROP CONSTRAINT "_LikeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeToUser" DROP CONSTRAINT "_LikeToUser_B_fkey";

-- DropTable
DROP TABLE "_LikeToPost";

-- DropTable
DROP TABLE "_LikeToUser";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
