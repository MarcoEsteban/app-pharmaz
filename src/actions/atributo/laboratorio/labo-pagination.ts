
'use server'

import prisma from "@/libs/prisma";
import { Prisma } from '@prisma/client';

interface Pagination {
  currentPage?: number;
  take?: number;
  query?: string;
}

export const getPaginationLabo = async ({
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
    const [laboratorio, totalCount] = await Promise.all([
      prisma.laboratorios.findMany({
        where: conditions,
        take,                           // Indicamos el número de registros que nos mostrará desde la DB.
        skip: (currentPage - 1) * take, // Permitir realizar la paginación, esto nos va a permitir saltar de 4 en 4 o de acuerdo al take.
        orderBy: {
          createdAt: 'desc',
        }
      }),
      prisma.laboratorios.count({
        where: conditions,
      }),
    ]);
    const totalPages = Math.ceil(totalCount / take)
    
    return {
      currentPage: currentPage,
      totalPages: totalPages,
      laboratorios: laboratorio.map( labo => ({
        id: labo.id,
        nombre: labo.nombre,
        foto: labo.foto,
        estado: labo.estado,
      }))
    }
    
  } catch (error) {
    console.log({error})
    throw new Error( 'No se pudo cargar los Proveedores' );
  }

}