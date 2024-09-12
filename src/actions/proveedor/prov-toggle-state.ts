'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateProveedor = async (id: string, newState: boolean) => {
  try {

    const proveedor = await prisma.proveedores.findUnique({
      where: { id },
      select: { personasId: true }
    })
    
    if (!proveedor || !proveedor.personasId) {
      return {
        ok: false,
        message: 'No se encuentra ese Proveedor'
      }
    }

    await prisma.personas.update({
      where: { id: proveedor?.personasId },
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

