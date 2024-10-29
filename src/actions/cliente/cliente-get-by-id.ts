'use server'

import prisma from "@/libs/prisma"

export const getByIdCliente = async ( id: string ) => {

  try {

    const clienteById = await prisma.personas.findFirst({
      where: { id },
    })
    
    if ( !clienteById ) return null;

    const cliente = {
      id: clienteById.id,
      ci: clienteById.ci,
      nombre: clienteById.nombre,
      ap: clienteById.ap,
      am: clienteById.am,
      celular: clienteById.celular,
      direccion: clienteById.direccion,
      foto: clienteById.foto,
      estado: clienteById.estado,
    }

    return cliente;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
