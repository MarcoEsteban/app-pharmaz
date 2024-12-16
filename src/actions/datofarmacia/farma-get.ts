"use server";

import prisma from "@/libs/prisma";

export const getFarma = async () => {
  try {
    // Consulta en la base de datos la información de DatosFarmacia
    const farmaById = await prisma.datosFarmacia.findFirst();

    if (!farmaById) {
      console.log("Datos de la Farmacia no encontrado.");
      return null;
    }

    // Estructura la información que necesitas
    const farmacia = {
      id: farmaById.id || "",
      nombre: farmaById.nombre || "",
      email: farmaById.email || "",
      celular: farmaById.celular || "",
      direccion: farmaById.direccion || "",
      foto: farmaById.foto || "",
      usuarioId: farmaById.usuarioId || "",
    };

    return farmacia;
  } catch (error) {
    console.error("Error al obtener los datos de la farmacia:", error);
    return null;
  }
};
