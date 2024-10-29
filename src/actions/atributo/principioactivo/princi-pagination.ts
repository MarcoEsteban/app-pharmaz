
'use server'

import prisma from "@/libs/prisma";
import { Prisma } from '@prisma/client';

interface Pagination {
  currentPage?: number;
  take?: number;
  query?: string;
}

export const getPaginationPrinciAct = async ({
  currentPage = 1,     // Numero de pagina por defecto.
  take = 5,            // Numero de pagina por defecto.
  query = '',          // Permite realizar la Busqueda. 
}: Pagination) => {

  if (isNaN(Number(currentPage))) currentPage = 1;
  if (currentPage < 1) currentPage = 1;
  
  try {
    // =================================================
    // Condición para filtrar según la query del Search:
    // =================================================
    const conditions = query
      ? { 
          OR: [
            {
              nombre: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode },
            },
          ],
        }
      : {};

    // Obtenemos los Usuarios y el Total de registros en paralelo
    const [principio, totalCount] = await Promise.all([
      prisma.principioActivo.findMany({
        where: conditions,
        take,                           // Indicamos el número de registros que nos mostrará desde la DB.
        skip: (currentPage - 1) * take, // Permitir realizar la paginación, esto nos va a permitir saltar de 4 en 4 o de acuerdo al take.
        orderBy: {
          createdAt: 'desc',
        }
      }),
      prisma.principioActivo.count({
        where: conditions,
      }),
    ]);
    const totalPages = Math.ceil(totalCount / take)
    
    return {
      currentPage: currentPage,
      totalPages: totalPages,
      principio: principio.map( item => ({
        id: item.id,
        nombre: item.nombre,
        estado: item.estado,
      }))
    }
    
  } catch (error) {
    console.log({error})
    throw new Error( 'No se pudo cargar los Proveedores' );
  }

}
