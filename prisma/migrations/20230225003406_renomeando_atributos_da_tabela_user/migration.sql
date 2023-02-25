/*
  Warnings:

  - You are about to drop the column `acess_type` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "acess_type",
ADD COLUMN     "access_type" INTEGER NOT NULL DEFAULT 0;
