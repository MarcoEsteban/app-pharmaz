/*
  Warnings:

  - Made the column `celular` on table `Personas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Personas" ALTER COLUMN "am" DROP NOT NULL,
ALTER COLUMN "celular" SET NOT NULL;
