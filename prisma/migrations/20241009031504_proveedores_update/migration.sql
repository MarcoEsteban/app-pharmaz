/*
  Warnings:

  - You are about to drop the column `personasId` on the `Proveedores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Proveedores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `celular` to the `Proveedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `Proveedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nit` to the `Proveedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Proveedores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Proveedores" DROP CONSTRAINT "Proveedores_personasId_fkey";

-- AlterTable
ALTER TABLE "Proveedores" DROP COLUMN "personasId",
ADD COLUMN     "celular" INTEGER NOT NULL,
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "nit" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Proveedores_nombre_key" ON "Proveedores"("nombre");
