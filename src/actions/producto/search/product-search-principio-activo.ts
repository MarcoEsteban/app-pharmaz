'use server';

import prisma from "@/libs/prisma";


export const searchPrincipioActivo = async (searchTerm: string) => {
  
  if (!searchTerm) return [];

  try {
    
    const results = await prisma.principioActivo.findMany({
      where: {
        estado: true,  // Filtramos solo los laboratorios activos
        OR: [
          { nombre: { startsWith: searchTerm, mode: 'insensitive' } },       // Buscar por el nombre
        ],
      },
      select: {
        id: true,
        nombre: true,
      },
      take: 5, // Limitamos a 5 resultados
    });

    return results;
  } catch (error) {
    console.error('Error en searchPrincipioActivo:', error);
    throw new Error('No se pudieron obtener el principioActivo de la BD.');
    
  }

};
