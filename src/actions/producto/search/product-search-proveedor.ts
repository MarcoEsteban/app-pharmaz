"use server";

import prisma from "@/libs/prisma";

export const searchProveedor = async (searchTerm: string) => {
  if (!searchTerm) return [];

  try {
    const results = await prisma.proveedores.findMany({
      where: {
        estado: true, // Filtramos solo los laboratorios activos
        OR: [
          { nit: { startsWith: searchTerm, mode: "insensitive" } }, // Buscar por el nombre
          { nombre: { startsWith: searchTerm, mode: "insensitive" } }, // Buscar por el nombre
          { email: { startsWith: searchTerm, mode: "insensitive" } }, // Buscar por el nombre
        ],
      },
      select: {
        id: true,
        nit: true,
        nombre: true,
        email: true,
      },
      take: 5, // Limitamos a 5 resultados
    });

    return results;
  } catch (error) {
    console.error("Error en searchLaboratorio:", error);
    throw new Error("No se pudieron obtener los laboratorios de la BD.");
  }
};
