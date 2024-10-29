-- AlterTable
ALTER TABLE "Medicamentos" ALTER COLUMN "concentracion" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Lotes" (
    "id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "vencimiento" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productoId" TEXT NOT NULL,
    "preveedorId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Lotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lotes" ADD CONSTRAINT "Lotes_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lotes" ADD CONSTRAINT "Lotes_preveedorId_fkey" FOREIGN KEY ("preveedorId") REFERENCES "Proveedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lotes" ADD CONSTRAINT "Lotes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
