/*
  Warnings:

  - You are about to alter the column `description` on the `Topic` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5000)`.

*/
-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "description" SET DATA TYPE VARCHAR(5000),
ALTER COLUMN "date_published" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "date_published" SET DATA TYPE TIMESTAMP;
