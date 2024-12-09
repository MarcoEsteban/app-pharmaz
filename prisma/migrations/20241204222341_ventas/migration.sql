-- CreateTable
CREATE TABLE "Transacciones" (
    "id" TEXT NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "numeroVenta" TEXT NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transacciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ventas" (
    "id" TEXT NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "personasId" TEXT NOT NULL,
    "metodoPagoId" TEXT NOT NULL,

    CONSTRAINT "Ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleVentas" (
    "cantidad" INTEGER NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "subTotal" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ventaId" TEXT NOT NULL,
    "medicamentoId" TEXT NOT NULL,

    CONSTRAINT "DetalleVentas_pkey" PRIMARY KEY ("ventaId","medicamentoId")
);

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_personasId_fkey" FOREIGN KEY ("personasId") REFERENCES "Personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_metodoPagoId_fkey" FOREIGN KEY ("metodoPagoId") REFERENCES "Transacciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVentas" ADD CONSTRAINT "DetalleVentas_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Ventas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVentas" ADD CONSTRAINT "DetalleVentas_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
