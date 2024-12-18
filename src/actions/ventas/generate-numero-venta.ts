"use server";

import prisma from "@/libs/prisma";

export const generateNumeroVenta = async () => {
  try {
    // Obtener la última transacción con el número de venta
    const totalRegistro = await prisma.transacciones.count({
      orderBy: {
        id: "desc",
      },
    });

    console.log({ totalRegistro });

    return totalRegistro; // Retorna como string para evitar problemas con el formato
  } catch (error) {
    console.error("Error generando número de venta:", error);
    throw new Error("No se pudo generar el número de venta.");
  }
};
