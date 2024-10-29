/*
  Warnings:

  - You are about to drop the column `laboratoriosId` on the `Medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `presentacionId` on the `Medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `principioActivoId` on the `Medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `viaAdministracionId` on the `Medicamentos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medicamentos" DROP CONSTRAINT "Medicamentos_laboratoriosId_fkey";

-- DropForeignKey
ALTER TABLE "Medicamentos" DROP CONSTRAINT "Medicamentos_presentacionId_fkey";

-- DropForeignKey
ALTER TABLE "Medicamentos" DROP CONSTRAINT "Medicamentos_principioActivoId_fkey";

-- DropForeignKey
ALTER TABLE "Medicamentos" DROP CONSTRAINT "Medicamentos_viaAdministracionId_fkey";

-- AlterTable
ALTER TABLE "Medicamentos" DROP COLUMN "laboratoriosId",
DROP COLUMN "presentacionId",
DROP COLUMN "principioActivoId",
DROP COLUMN "viaAdministracionId";

-- CreateTable
CREATE TABLE "MedicaOnLabo" (
    "productoId" TEXT NOT NULL,
    "laboratoriosId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicaOnLabo_pkey" PRIMARY KEY ("productoId","laboratoriosId")
);

-- CreateTable
CREATE TABLE "MedicaOnPresen" (
    "productoId" TEXT NOT NULL,
    "presentacionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicaOnPresen_pkey" PRIMARY KEY ("productoId","presentacionId")
);

-- CreateTable
CREATE TABLE "MedicaOnPrinci" (
    "productoId" TEXT NOT NULL,
    "principioActivoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicaOnPrinci_pkey" PRIMARY KEY ("productoId","principioActivoId")
);

-- CreateTable
CREATE TABLE "MedicaOnViaAdm" (
    "productoId" TEXT NOT NULL,
    "viaAdministracionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicaOnViaAdm_pkey" PRIMARY KEY ("productoId","viaAdministracionId")
);

-- AddForeignKey
ALTER TABLE "MedicaOnLabo" ADD CONSTRAINT "MedicaOnLabo_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicaOnLabo" ADD CONSTRAINT "MedicaOnLabo_laboratoriosId_fkey" FOREIGN KEY ("laboratoriosId") REFERENCES "Laboratorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicaOnPresen" ADD CONSTRAINT "MedicaOnPresen_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicaOnPresen" ADD CONSTRAINT "MedicaOnPresen_presentacionId_fkey" FOREIGN KEY ("presentacionId") REFERENCES "Presentacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicaOnPrinci" ADD CONSTRAINT "MedicaOnPrinci_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicaOnPrinci" ADD CONSTRAINT "MedicaOnPrinci_principioActivoId_fkey" FOREIGN KEY ("principioActivoId") REFERENCES "PrincipioActivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicaOnViaAdm" ADD CONSTRAINT "MedicaOnViaAdm_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicaOnViaAdm" ADD CONSTRAINT "MedicaOnViaAdm_viaAdministracionId_fkey" FOREIGN KEY ("viaAdministracionId") REFERENCES "ViaAdministracion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
