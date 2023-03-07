/*
  Warnings:

  - You are about to drop the column `possui_conhecimento` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "possui_conhecimento",
ADD COLUMN     "deficiencia" TEXT;
