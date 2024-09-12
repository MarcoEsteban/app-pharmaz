'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateUsuario = async (id: string, newState: boolean) => {
  try {

    const user = await prisma.usuario.findUnique({
      where: { id },
      select: { personasId: true }
    })
    
    if (!user || !user.personasId) {
      return {
        ok: false,
        message: 'No se encuentra ese Usuario'
      }
    }

    await prisma.personas.update({
      where: { id: user?.personasId },
      data: { estado: newState }
    })

    revalidatePath( '/usuarios' );

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

