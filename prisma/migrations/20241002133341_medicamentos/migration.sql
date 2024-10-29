-- CreateTable
CREATE TABLE "Medicamentos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "concentracion" TEXT NOT NULL,
    "adicional" TEXT,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tiposId" TEXT NOT NULL,
    "laboratoriosId" TEXT NOT NULL,
    "presentacionId" TEXT NOT NULL,
    "viaAdministracionId" TEXT NOT NULL,

    CONSTRAINT "Medicamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Tipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laboratorios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "foto" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Laboratorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presentacion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Presentacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViaAdministracion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ViaAdministracion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tipos_nombre_key" ON "Tipos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Laboratorios_nombre_key" ON "Laboratorios"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Presentacion_nombre_key" ON "Presentacion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ViaAdministracion_nombre_key" ON "ViaAdministracion"("nombre");

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_tiposId_fkey" FOREIGN KEY ("tiposId") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_laboratoriosId_fkey" FOREIGN KEY ("laboratoriosId") REFERENCES "Laboratorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_presentacionId_fkey" FOREIGN KEY ("presentacionId") REFERENCES "Presentacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicamentos" ADD CONSTRAINT "Medicamentos_viaAdministracionId_fkey" FOREIGN KEY ("viaAdministracionId") REFERENCES "ViaAdministracion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
