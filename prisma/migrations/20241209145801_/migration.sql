/*
  Warnings:

  - You are about to drop the column `cliente` on the `Ventas` table. All the data in the column will be lost.
  - You are about to drop the column `metodoPago` on the `Ventas` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Ventas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ventas" DROP COLUMN "cliente",
DROP COLUMN "metodoPago",
DROP COLUMN "usuario";
