'use server'

import prisma from "@/libs/prisma"

export const getByIdPresent = async ( id: string ) => {

  try {

    const presentById = await prisma.presentacion.findFirst({
      where: { id },
    })
    
    if ( !presentById ) return null;

    const present = {
      id: presentById.id,
      nombre: presentById.nombre,
      estado: presentById.estado,
    }

    return present;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
