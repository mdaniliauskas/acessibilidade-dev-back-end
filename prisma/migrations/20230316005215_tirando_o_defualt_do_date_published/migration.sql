-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "date_published" DROP DEFAULT,
ALTER COLUMN "date_published" SET DATA TYPE DATE;
