'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStatePresent = async (id: string, newState: boolean) => {
  try {

    await prisma.presentacion.update({
      where: { id },
      data: { estado: newState }
    })

    revalidatePath( '/atributos/presentacion' );

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

