/*
  Warnings:

  - The `receta` column on the `Medicamentos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `categoria` to the `Medicamentos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('Farmacos', 'Instrumento_Medicos');

-- AlterTable
ALTER TABLE "Medicamentos" ADD COLUMN     "categoria" "Categoria" NOT NULL,
DROP COLUMN "receta",
ADD COLUMN     "receta" BOOLEAN NOT NULL DEFAULT false;
