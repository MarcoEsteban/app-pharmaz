'use server';

import prisma from "@/libs/prisma";

export const getByIdFarma = async (userId: string) => {
  
  // Si no hay userId, regresa null para evitar hacer la consulta
  if (!userId) {
    console.log('El userId no está definido');
    return null;
  }

  try {
    // Consulta en la base de datos la información de DatosFarmacia
    const farmaById = await prisma.datosFarmacia.findFirst({
      where: { usuarioId: userId },
    });

    if (!farmaById) {
      console.log('No se encontró la farmacia para el usuario dado');
      return null;
    }

    // Estructura la información que necesitas
    const farmacia = {
      id: farmaById.id,
      nombre: farmaById.nombre,
      email: farmaById.email,
      celular: farmaById.celular,
      direccion: farmaById.direccion,
      foto: farmaById.foto,
      usuarioId: farmaById.usuarioId,
    };

    return farmacia;
    
  } catch (error) {
    console.error('Error al obtener los datos de la farmacia:', error);
    return null;
  }
};
