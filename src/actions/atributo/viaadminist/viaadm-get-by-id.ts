'use server'

import prisma from "@/libs/prisma"

export const getByIdViaAdm = async ( id: string ) => {

  try {

    const viaAdmById = await prisma.viaAdministracion.findFirst({
      where: { id },
    })
    
    if ( !viaAdmById ) return null;

    const viaAdm = {
      id: viaAdmById.id,
      nombre: viaAdmById.nombre,
      estado: viaAdmById.estado,
    }

    return viaAdm;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
