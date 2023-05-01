/*
  Warnings:

  - You are about to drop the column `authorId` on the `Tool` table. All the data in the column will be lost.
  - Made the column `authorId` on table `News` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_authorId_fkey";

-- DropIndex
DROP INDEX "Tool_title_key";

-- AlterTable
ALTER TABLE "News" ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "organization" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
