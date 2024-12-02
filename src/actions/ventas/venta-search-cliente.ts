"use server";

import prisma from "@/libs/prisma";

export const searchCliente = async (searchTerm: string) => {
  if (!searchTerm) return [];

  try {
    const cliente = await prisma.personas.findMany({
      where: {
        OR: [
          { nombre: { startsWith: searchTerm, mode: "insensitive" } }, // Buscar por el nombre
          { ap: { startsWith: searchTerm, mode: "insensitive" } }, // Buscar por el apellido paterno
          { am: { startsWith: searchTerm, mode: "insensitive" } }, // Buscar por el apellido materno
          { ci: { startsWith: searchTerm, mode: "insensitive" } }, // Buscar por el ci o DNI
        ],
      },
      select: {
        id: true,
        nombre: true,
        ap: true,
        am: true,
        ci: true,
      },
      take: 3, // Limitamos a 5 resultados
    });

    return cliente;
  } catch (error) {
    console.error("Error en searchCliente:", error);
    throw new Error("No se pudieron obtener los clientes de la BD.");
  }
};
