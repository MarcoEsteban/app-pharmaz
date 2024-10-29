'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateLote = async (id: string, newState: boolean) => {
  try {

    if (!id) {
      return {
        ok: false,
        message: 'No se encuentra ese Lote'
      }
    }

    await prisma.lotes.update({
      where: { id },
      data: { estado: newState }
    })
    
    revalidatePath( '/lotes' );

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
