'use server'

import prisma from "@/libs/prisma"
import { DateTime } from "luxon";

export const getByIdLote = async ( id: string ) => {

  try {

    const loteById = await prisma.lotes.findFirst({
      where: { id },
      include: {
        Proveedor: {
          select: {
            nombre: true,
            email: true,
          }
        }
      }
    })
    
    if ( !loteById ) return null;

    const lote = {
      id: loteById.id,
      stock: loteById.stock,
      // vencimiento: loteById.vencimiento,
      vencimiento: DateTime.fromJSDate(loteById.vencimiento).toFormat('yyyy-MM-dd'),
      productoId: loteById.productoId,
      // proveedorId: loteById.proveedorId || '',
      proveedorId: loteById.Proveedor.email || '',
      usuarioId: loteById.usuarioId,
      estado: loteById.estado 
    }

    return lote;
      
  } catch (error) {
    console.log(error) 
    return null;
  }

}
