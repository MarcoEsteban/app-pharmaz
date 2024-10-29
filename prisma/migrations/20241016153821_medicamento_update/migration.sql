/*
  Warnings:

  - Changed the type of `categoria` on the `Medicamentos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Medicamentos" DROP COLUMN "categoria",
ADD COLUMN     "categoria" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Categoria";
