'use server'

import prisma from "@/libs/prisma"

export const getByIdPrinciAct = async ( id: string ) => {

  try {

    const tipoById = await prisma.principioActivo.findFirst({
      where: { id },
    })
    
    if ( !tipoById ) return null;

    const tipo = {
      id: tipoById.id,
      nombre: tipoById.nombre,
      estado: tipoById.estado,
    }

    return tipo;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
