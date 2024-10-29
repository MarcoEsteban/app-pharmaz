'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStatePrinciAct = async (id: string, newState: boolean) => {
  try {

    await prisma.principioActivo.update({
      where: { id },
      data: { estado: newState }
    })

    revalidatePath( '/atributos/principio-activo' );

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

