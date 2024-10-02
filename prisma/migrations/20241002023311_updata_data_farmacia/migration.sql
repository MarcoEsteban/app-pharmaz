/*
  Warnings:

  - You are about to drop the `DatosPharmaz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DatosPharmaz" DROP CONSTRAINT "DatosPharmaz_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Personas" ALTER COLUMN "ap" DROP NOT NULL;

-- DropTable
DROP TABLE "DatosPharmaz";

-- CreateTable
CREATE TABLE "DatosFarmacia" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" INTEGER,
    "direccion" TEXT,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "DatosFarmacia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DatosFarmacia_email_key" ON "DatosFarmacia"("email");

-- AddForeignKey
ALTER TABLE "DatosFarmacia" ADD CONSTRAINT "DatosFarmacia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
