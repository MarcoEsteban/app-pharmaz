"use server";

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const toggleStateClasifi = async (id: string, newState: boolean) => {
  try {
    await prisma.clasificacion.update({
      where: { id },
      data: { estado: newState },
    });

    revalidatePath("/atributos/clasificacion");

    return {
      ok: true,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
    };
  }
};
