'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateProveedor = async (id: string, newState: boolean) => {
  try {

    if (!id) {
      return {
        ok: false,
        message: 'No se encuentra ese Proveedor'
      }
    }

    await prisma.proveedores.update({
      where: { id },
      data: { estado: newState }
    })
    
    revalidatePath( '/proveedor' );

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
