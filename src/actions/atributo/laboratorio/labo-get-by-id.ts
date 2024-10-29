'use server'

import prisma from "@/libs/prisma"

export const getByIdLabo = async ( id: string ) => {

  try {

    const laboById = await prisma.laboratorios.findFirst({
      where: { id },
    })
    
    if ( !laboById ) return null;

    const laboratorio = {
      id: laboById.id,
      nombre: laboById.nombre,
      foto: laboById.foto,
      estado: laboById.estado,
    }

    return laboratorio;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
