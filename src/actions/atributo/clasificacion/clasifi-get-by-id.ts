"use server";

import prisma from "@/libs/prisma";

export const getByIdClasifi = async (id: string) => {
  try {
    const clasiById = await prisma.clasificacion.findFirst({
      where: { id },
    });

    if (!clasiById) return null;

    const clasificacion = {
      id: clasiById.id,
      nombre: clasiById.nombre,
      estado: clasiById.estado,
    };

    return clasificacion;
  } catch (error) {
    console.log(error);
    return null;
  }
};
