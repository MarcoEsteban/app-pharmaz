/*
  Warnings:

  - You are about to drop the column `tiposId` on the `Medicamentos` table. All the data in the column will be lost.
  - You are about to drop the `Tipos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `precio` to the `Medicamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `principioActivoId` to the `Medicamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medicamentos" DROP CONSTRAINT "Medicamentos_tiposId_fkey";

-- AlterTable
ALTER TABLE "Medicamentos" DROP COLUMN "tiposId",
ADD COLUMN     "estado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "precio" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "principioActivoId" TEXT NOT NULL,
ADD COLUMN     "receta" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tipo" TEXT;

-- DropTable
DROP TABLE "Tipos";

-- CreateTable
CREATE TABLE "PrincipioActivo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrincipioActivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrincipioActivo_nombre_key" ON "PrincipioActivo"("nombre");

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_principioActivoId_fkey" FOREIGN KEY ("principioActivoId") REFERENCES "PrincipioActivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
