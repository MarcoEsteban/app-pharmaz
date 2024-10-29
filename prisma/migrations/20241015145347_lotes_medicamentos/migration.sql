/*
  Warnings:

  - You are about to drop the column `preveedorId` on the `Lotes` table. All the data in the column will be lost.
  - Added the required column `proveedorId` to the `Lotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lotes" DROP CONSTRAINT "Lotes_preveedorId_fkey";

-- AlterTable
ALTER TABLE "Lotes" DROP COLUMN "preveedorId",
ADD COLUMN     "proveedorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lotes" ADD CONSTRAINT "Lotes_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
