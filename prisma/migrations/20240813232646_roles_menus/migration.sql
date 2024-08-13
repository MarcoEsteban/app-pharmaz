-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesOnMenus" (
    "rolesId" TEXT NOT NULL,
    "menusId" TEXT NOT NULL,

    CONSTRAINT "RolesOnMenus_pkey" PRIMARY KEY ("rolesId","menusId")
);

-- AddForeignKey
ALTER TABLE "RolesOnMenus" ADD CONSTRAINT "RolesOnMenus_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnMenus" ADD CONSTRAINT "RolesOnMenus_menusId_fkey" FOREIGN KEY ("menusId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
