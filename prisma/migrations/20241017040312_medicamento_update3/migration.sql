-- DropForeignKey
ALTER TABLE "Medicamentos" DROP CONSTRAINT "Medicamentos_presentacionId_fkey";

-- DropForeignKey
ALTER TABLE "Medicamentos" DROP CONSTRAINT "Medicamentos_principioActivoId_fkey";

-- DropForeignKey
ALTER TABLE "Medicamentos" DROP CONSTRAINT "Medicamentos_viaAdministracionId_fkey";

-- AlterTable
ALTER TABLE "Medicamentos" ALTER COLUMN "presentacionId" DROP NOT NULL,
ALTER COLUMN "viaAdministracionId" DROP NOT NULL,
ALTER COLUMN "principioActivoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_presentacionId_fkey" FOREIGN KEY ("presentacionId") REFERENCES "Presentacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_viaAdministracionId_fkey" FOREIGN KEY ("viaAdministracionId") REFERENCES "ViaAdministracion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_principioActivoId_fkey" FOREIGN KEY ("principioActivoId") REFERENCES "PrincipioActivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
