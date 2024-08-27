'use server'

import prisma from "@/libs/prisma"

export const getByIdRoles = async ( id: string ) => {

  try {

    const rolesById = await prisma.roles.findFirst({
      where: { id },
      
      include: { 
        Menus: {
          select: {
            menus: true
          }
        }
      },
    })
    
    if ( !rolesById ) return null;

    const rol = {
      id: rolesById.id,
      nombre: rolesById.nombre,
      estado: rolesById.estado,
      // menus: rolesById.Menus.map( menu => menu.menus.id)         // retorna un Array de Strin => [ 'a12312j', 'a12312j', etc... ]
      menus: rolesById.Menus.map( menu => {
        return {
          id: menu.menus.id,
          nombre: menu.menus.nombre,
          enlace: menu.menus.enlace,
          icon: menu.menus.icon,
        } 
      }) // retorna un Array de Obj => [ {id: 'a12312j', ...}, {id: 'a12312j', ...}, etc... ]
    };

    return rol;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
