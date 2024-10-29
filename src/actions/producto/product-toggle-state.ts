'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateProducto = async (id: string, newState: boolean) => {
  try {

    if (!id) {
      return {
        ok: false,
        message: 'No se encuentra ese Producto'
      }
    }

    await prisma.medicamentos.update({
      where: { id },
      data: { estado: newState }
    })
    
    revalidatePath( '/producto' );

    return {
      ok: true
    }
    
  } catch (error) {
    console.log({error})
    return {
      ok: false
    }
  }
}
