/*
  Warnings:

  - You are about to drop the `MedicamentosOnLotes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productoId` to the `Lotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MedicamentosOnLotes" DROP CONSTRAINT "MedicamentosOnLotes_lotesId_fkey";

-- DropForeignKey
ALTER TABLE "MedicamentosOnLotes" DROP CONSTRAINT "MedicamentosOnLotes_productoId_fkey";

-- AlterTable
ALTER TABLE "Lotes" ADD COLUMN     "productoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "MedicamentosOnLotes";

-- AddForeignKey
ALTER TABLE "Lotes" ADD CONSTRAINT "Lotes_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
