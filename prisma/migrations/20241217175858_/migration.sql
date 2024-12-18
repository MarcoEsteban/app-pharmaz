/*
  Warnings:

  - The primary key for the `MedicaOnClasifi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `viaAdministracionId` on the `MedicaOnClasifi` table. All the data in the column will be lost.
  - Added the required column `clasificacionId` to the `MedicaOnClasifi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MedicaOnClasifi" DROP CONSTRAINT "MedicaOnClasifi_viaAdministracionId_fkey";

-- AlterTable
ALTER TABLE "MedicaOnClasifi" DROP CONSTRAINT "MedicaOnClasifi_pkey",
DROP COLUMN "viaAdministracionId",
ADD COLUMN     "clasificacionId" TEXT NOT NULL,
ADD CONSTRAINT "MedicaOnClasifi_pkey" PRIMARY KEY ("productoId", "clasificacionId");

-- AddForeignKey
ALTER TABLE "MedicaOnClasifi" ADD CONSTRAINT "MedicaOnClasifi_clasificacionId_fkey" FOREIGN KEY ("clasificacionId") REFERENCES "Clasificacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
