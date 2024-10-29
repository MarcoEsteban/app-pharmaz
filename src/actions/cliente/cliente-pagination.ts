'use server';

import prisma from "@/libs/prisma";
import { Prisma } from '@prisma/client';

interface Pagination {
  currentPage?: number;
  take?: number;
  query?: string;
}

export const getPaginationCliente = async ({
  currentPage = 1,     // Número de página por defecto.
  take = 5,            // Número de registros por página.
  query = '',          // Término de búsqueda.
}: Pagination) => {

  // Validar y ajustar el número de página
  if (isNaN(Number(currentPage))) currentPage = 1;
  if (currentPage < 1) currentPage = 1;
  
  try {
    // Definir las condiciones de búsqueda para Personas
    const conditions = query
      ? { 
          OR: [
            { nombre: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode } },
            { ap: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode } },
            { am: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode } },
            { ci: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode } },
            // Puedes añadir más campos de búsqueda si es necesario
          ],
        }
      : {};

    // Realizar la consulta para obtener Personas sin Usuarios y aplicar paginación
    const [personas, totalCount] = await Promise.all([
      prisma.personas.findMany({
        where: {
          // Usuario: { none: {} }, // Filtrar personas sin usuarios asociados
          ...conditions,         // Aplicar condiciones de búsqueda si existen
        },
        select: {
          id: true,
          ci: true,
          nombre: true,
          ap: true,
          am: true,
          direccion: true,
          celular: true,
          foto: true,
          estado: true,
        },
        take,                           // Número de registros por página
        skip: (currentPage - 1) * take, // Saltar registros según la página
        orderBy: {
          createdAt: 'desc',             // Ordenar por fecha de creación descendente
        },
      }),
      prisma.personas.count({
        where: {
          // Usuario: { none: {} }, // Filtrar personas sin usuarios asociados
          ...conditions,         // Aplicar condiciones de búsqueda si existen
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / take);
    
    return {
      currentPage,
      totalPages,
      personas,
    };
    
  } catch (error) {
    console.log({error})
    throw new Error('No se pudo cargar los clientes');
  }

}
