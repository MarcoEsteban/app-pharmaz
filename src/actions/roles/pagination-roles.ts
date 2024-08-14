'use server'

import prisma from "@/libs/prisma";

interface Pagination {
  page?: number;
  take?: number;
  query?: string;
}

export const getPaginationRoles = async ({
  page = 1,     // Numero de pagina por defecto.
  take = 5,     // Numero de pagina por defecto.
  query = '',   // Permite realizar la Busqueda. 
}: Pagination) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {

    // Obtenemos los Roles de la DB con la Búsqueda:
    const roles = await prisma.roles.findMany({
      // Indico que Busque por el nombre del rol y no distinga entre Mayuscula o Miniscula.
      where: {
        OR: [
          {nombre: {contains: query, mode: 'insensitive'}} 
        ]
      },
      // Indico que incluya los datos de la Tabla Menus de acuerdo a cada Rol.
      include: { 
        Menus: {
          select: {
            menus: {
              select: {
                id: true,
                nombre: true,
                enlace: true,
                icon: true,
              }
            }
          }
        }
      },
      
      take: take,                // Indicamos el número de registros que nos mostrará desde la DB.
      skip: (page - 1) * take,   // Permitir realizar la paginación, esto nos va a permitir saltar de 4 en 4 o de acuerdo al take.

      // Indico que me muestre de Forma Descendiente.
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Obtener el Total de Páginas:
    const totalCount = await prisma.roles.count({
      where: {
        OR: [
          {nombre: {contains: query, mode: 'insensitive'}} 
        ]
      },
    })
    const totalPages = Math.ceil(totalCount / take)
    

    return {
      currentPage: page,
      totalPages: totalPages,
      roles: roles.map( rol => ({
        id: rol.id,
        nombre: rol.nombre,
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
  }
  
}
