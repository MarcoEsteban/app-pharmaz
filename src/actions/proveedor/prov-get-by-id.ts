'use server'

import prisma from "@/libs/prisma"

export const getByIdProveedor = async ( id: string ) => {

  try {

    const proveedorById = await prisma.proveedores.findFirst({
      where: { id },
      
      include: { 
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
    
    if ( !proveedorById ) return null;

    const proveedor = {
        id: proveedorById.id,
        email: proveedorById.email,
        personasId: proveedorById.personasId,
        personas: {
          ci: proveedorById.personas.ci,
          nombre: proveedorById.personas.nombre,
          ap: proveedorById.personas.ap,
          am: proveedorById.personas.am,
          celular: proveedorById.personas.celular,
          direccion: proveedorById.personas.direccion,
          foto: proveedorById.personas.foto,
          estado: proveedorById.personas.estado,
        }
    }

    return proveedor;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
