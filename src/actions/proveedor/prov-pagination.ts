
'use server'

import prisma from "@/libs/prisma";
import { Prisma } from '@prisma/client';

interface Pagination {
  currentPage?: number;
  take?: number;
  query?: string;
}

export const getPaginationProveedor = async ({
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
              email: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode },
            },
            {
              personas: {
                OR: [
                  { nombre: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode} },
                  { ap: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode} },
                  { am: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode} },
                  { ci: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode} },
                ],
              },
            },
          ],
        }
      : {};

    // Obtenemos los Usuarios y el Total de registros en paralelo
    const [proveedores, totalCount] = await Promise.all([
      prisma.proveedores.findMany({
        where: conditions,
        include: {
          personas: {
            select: {
              nombre: true,
              ap: true,
              am: true,
              ci: true,
              celular: true,
              direccion: true,
              foto: true,
              estado: true,
            },
          },
        },
        take,                           // Indicamos el número de registros que nos mostrará desde la DB.
        skip: (currentPage - 1) * take, // Permitir realizar la paginación, esto nos va a permitir saltar de 4 en 4 o de acuerdo al take.
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.proveedores.count({
        where: conditions,
      }),
    ]);
    const totalPages = Math.ceil(totalCount / take)
    
    return {
      currentPage: currentPage,
      totalPages: totalPages,
      proveedores: proveedores.map( user => ({
        id: user.id,
        email: user.email,
        personasId: user.personasId,
        personas: {
          nombre: user.personas.nombre,
          ap: user.personas.ap,
          am: user.personas.am,
          ci: user.personas.ci,
          celular: user.personas.celular,
          direccion: user.personas.direccion,
          foto: user.personas.foto,
          estado: user.personas.estado,
        }
      }))
    }
    
  } catch (error) {
    console.log({error})
    throw new Error( 'No se pudo cargar los Proveedores' );
  }

}
