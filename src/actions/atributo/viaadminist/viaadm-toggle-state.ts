'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateViaAdm = async (id: string, newState: boolean) => {
  try {

    await prisma.viaAdministracion.update({
      where: { id },
      data: { estado: newState }
    })

    revalidatePath( '/atributos/via-administracion' );

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

