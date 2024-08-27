'use server';

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateRoles = async (id: string, newState: boolean) => {
  try {

    await prisma.roles.update({
      where: { id },
      data: { estado: newState }
    })

    revalidatePath( '/roles' );

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

