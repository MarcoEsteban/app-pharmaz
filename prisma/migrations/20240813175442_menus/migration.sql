-- CreateTable
CREATE TABLE "Menus" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "enlace" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menus_enlace_key" ON "Menus"("enlace");
