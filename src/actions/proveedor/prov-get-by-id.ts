'use server'

import prisma from "@/libs/prisma"

export const getByIdProveedor = async ( id: string ) => {

  try {

    const proveedorById = await prisma.proveedores.findFirst({
      where: { id },
    })
    
    if ( !proveedorById ) return null;

    const proveedor = {
        id: proveedorById.id,
        email: proveedorById.email,
        nit: proveedorById.nit,
        nombre: proveedorById.nombre,
        celular: proveedorById.celular,
        direccion: proveedorById.direccion,
        estado: proveedorById.estado,
    }

    return proveedor;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
