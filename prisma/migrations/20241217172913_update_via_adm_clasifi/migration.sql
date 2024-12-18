/*
  Warnings:

  - You are about to drop the column `categoria` on the `Medicamentos` table. All the data in the column will be lost.
  - You are about to drop the `MedicaOnViaAdm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ViaAdministracion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedicaOnViaAdm" DROP CONSTRAINT "MedicaOnViaAdm_productoId_fkey";

-- DropForeignKey
ALTER TABLE "MedicaOnViaAdm" DROP CONSTRAINT "MedicaOnViaAdm_viaAdministracionId_fkey";

-- AlterTable
ALTER TABLE "Medicamentos" DROP COLUMN "categoria";

-- DropTable
DROP TABLE "MedicaOnViaAdm";

-- DropTable
DROP TABLE "ViaAdministracion";

-- CreateTable
CREATE TABLE "MedicaOnClasifi" (
    "productoId" TEXT NOT NULL,
    "viaAdministracionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicaOnClasifi_pkey" PRIMARY KEY ("productoId","viaAdministracionId")
);

-- CreateTable
CREATE TABLE "Clasificacion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clasificacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clasificacion_nombre_key" ON "Clasificacion"("nombre");

-- AddForeignKey
ALTER TABLE "MedicaOnClasifi" ADD CONSTRAINT "MedicaOnClasifi_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicaOnClasifi" ADD CONSTRAINT "MedicaOnClasifi_viaAdministracionId_fkey" FOREIGN KEY ("viaAdministracionId") REFERENCES "Clasificacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
