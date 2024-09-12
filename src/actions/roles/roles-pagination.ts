'use server'

import prisma from "@/libs/prisma";
import { Prisma } from '@prisma/client';

interface Pagination {
  currentPage?: number;
  take?: number;
  query?: string;
}

export const getPaginationRoles = async ({
  currentPage = 1,     // Numero de pagina por defecto.
  take = 5,            // Numero de pagina por defecto.
  query = '',          // Permite realizar la Busqueda. 
}: Pagination) => {

  if (isNaN(Number(currentPage))) currentPage = 1;
  if (currentPage < 1) currentPage = 1;

  try {
    // startsWith :: Permite buscar por la inicial de cada palabra.
    // contains   :: Permite buscar por la letra que introducimos, pero busca en toda la palabra.
    
    // Condición para filtrar o no según la query:
    const conditions = query
      ? { nombre: { startsWith: query, mode: 'insensitive' as Prisma.QueryMode } }
      : {};

    // Obtenemos los roles y el total de registros en paralelo
    const [roles, totalCount] = await Promise.all([
      prisma.roles.findMany({
        where: conditions,
        include: {
          Menus: {
            select: {
              menus: {
                select: {
                  id: true,
                  nombre: true,
                  enlace: true,
                  icon: true,
                },
              },
            },
          },
        },
        take,                           // Indicamos el número de registros que nos mostrará desde la DB.
        skip: (currentPage - 1) * take, // Permitir realizar la paginación, esto nos va a permitir saltar de 4 en 4 o de acuerdo al take.
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.roles.count({
        where: conditions,
      }),
    ]);
    const totalPages = Math.ceil(totalCount / take)
    
    return {
      currentPage: currentPage,
      totalPages: totalPages,
      roles: roles.map( rol => ({
        id: rol.id,
        nombre: rol.nombre,
        estado: rol.estado,
        menus: rol.Menus.map( menu => ({
          id: menu.menus.id,
          nombre: menu.menus.nombre,
          enlace: menu.menus.enlace,
          icon: menu.menus.icon,
        }))
      }))
    }
    
  } catch (error) {
    console.log({error})
    throw new Error( 'No se pudo cargar los Roles' );
  }
  
}
