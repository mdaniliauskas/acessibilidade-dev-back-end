/*
  Warnings:

  - The primary key for the `NewsTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TopicTag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "NewsTag" DROP CONSTRAINT "NewsTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TopicTag" DROP CONSTRAINT "TopicTag_tagId_fkey";

-- AlterTable
ALTER TABLE "NewsTag" DROP CONSTRAINT "NewsTag_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "tagId" DROP NOT NULL,
ADD CONSTRAINT "NewsTag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TopicTag" DROP CONSTRAINT "TopicTag_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "tagId" DROP NOT NULL,
ADD CONSTRAINT "TopicTag_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "TopicTag" ADD CONSTRAINT "TopicTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsTag" ADD CONSTRAINT "NewsTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
