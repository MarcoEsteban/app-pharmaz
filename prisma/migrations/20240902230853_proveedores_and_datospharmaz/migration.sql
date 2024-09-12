-- AlterTable
ALTER TABLE "Personas" ALTER COLUMN "celular" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Proveedores" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personasId" TEXT NOT NULL,

    CONSTRAINT "Proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatosPharmaz" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" INTEGER,
    "direccion" TEXT,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "DatosPharmaz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proveedores_email_key" ON "Proveedores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DatosPharmaz_email_key" ON "DatosPharmaz"("email");

-- AddForeignKey
ALTER TABLE "Proveedores" ADD CONSTRAINT "Proveedores_personasId_fkey" FOREIGN KEY ("personasId") REFERENCES "Personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatosPharmaz" ADD CONSTRAINT "DatosPharmaz_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
