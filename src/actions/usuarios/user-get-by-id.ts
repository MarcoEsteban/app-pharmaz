'use server'

import prisma from "@/libs/prisma"

export const getByIdUser = async ( id: string ) => {

  try {

    const userById = await prisma.usuario.findFirst({
      where: { id },
      
      include: { 
        roles: {
          select: {
            nombre: true
          }
        },
        personas: {
          select: {
            ci: true,
            nombre: true,
            ap: true,
            am: true,
            celular: true,
            direccion: true,
            foto: true,
            estado: true
          }
        }
      },
    })
    
    if ( !userById ) return null;

    const usuario = {
      id: userById.id,
      email: userById.email,
      password: userById.password,
      rolesId: userById.rolesId,
      personasId: userById.personasId,
      rol: userById.roles.nombre,
      personas: {
        ci: userById.personas.ci,
        nombre: userById.personas.nombre,
        ap: userById.personas.ap,
        am: userById.personas.am,
        celular: userById.personas.celular,
        direccion: userById.personas.direccion,
        foto: userById.personas.foto,
        estado: userById.personas.estado,
      }
    }

    return usuario;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
