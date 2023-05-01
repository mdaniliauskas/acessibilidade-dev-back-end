/*
  Warnings:

  - You are about to drop the column `Organization` on the `Tool` table. All the data in the column will be lost.
  - Added the required column `organization` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "Organization",
ADD COLUMN     "organization" VARCHAR(300) NOT NULL;
