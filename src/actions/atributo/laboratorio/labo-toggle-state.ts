'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateLabo = async (id: string, newState: boolean) => {
  try {

    await prisma.laboratorios.update({
      where: { id },
      data: { estado: newState }
    })

    revalidatePath( '/atributos/laboratorio' );

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

