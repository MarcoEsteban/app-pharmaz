"use server";

import prisma from "@/libs/prisma";

export const generateNumeroVenta = async () => {
  try {
    const numero = await prisma.transacciones.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    // --------------------------
    // Generar el proximo número:
    // --------------------------
    const ultimoNumero = numero ? parseInt(numero.numeroVenta.toString()) : 0;
    const numeroVenta = (ultimoNumero + 1).toString().padStart(6, "0");

    return Number(numeroVenta);
  } catch (error) {
    console.log({ error });
  }
};
