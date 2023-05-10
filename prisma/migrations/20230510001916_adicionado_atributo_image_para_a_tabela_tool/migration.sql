/*
  Warnings:

  - Added the required column `image` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "image" BYTEA NOT NULL;
