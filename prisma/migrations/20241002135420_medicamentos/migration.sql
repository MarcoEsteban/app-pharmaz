/*
  Warnings:

  - Added the required column `updatedAt` to the `Laboratorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Presentacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tipos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ViaAdministracion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Laboratorios" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Presentacion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tipos" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ViaAdministracion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
