/*
  Warnings:

  - You are about to drop the column `productoId` on the `Lotes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lotes" DROP CONSTRAINT "Lotes_productoId_fkey";

-- AlterTable
ALTER TABLE "Lotes" DROP COLUMN "productoId";

-- CreateTable
CREATE TABLE "MedicamentosOnLotes" (
    "productoId" TEXT NOT NULL,
    "lotesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicamentosOnLotes_pkey" PRIMARY KEY ("productoId","lotesId")
);

-- AddForeignKey
ALTER TABLE "MedicamentosOnLotes" ADD CONSTRAINT "MedicamentosOnLotes_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicamentosOnLotes" ADD CONSTRAINT "MedicamentosOnLotes_lotesId_fkey" FOREIGN KEY ("lotesId") REFERENCES "Lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
