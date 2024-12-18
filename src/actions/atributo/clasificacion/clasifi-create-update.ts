"use server";

import prisma from "@/libs/prisma";
import { atributoSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdateClasificacion = async (formData: FormData) => {
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries(formData);

  // Valida el objeto con el esquema de Zod
  const clasiParsed = atributoSchema.safeParse(data);

  if (!clasiParsed.success) {
    console.log(clasiParsed.error);
    return { ok: false };
  }
  console.log(clasiParsed.data);

  try {
    const clasifiData = clasiParsed.data;
    const { id, ...clasifi } = clasifiData;

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction(async () => {
      let clasificacion;

      /*================= Actualizar =================*/
      if (id) {
        clasificacion = await prisma.clasificacion.update({
          where: { id },
          data: { ...clasifi },
        });

        return {
          ok: true,
          message: "Actualizado Exitosamente",
          data: clasifi,
        };
      }

      // ================================
      // Verificar si el Nombre ya existe
      // ================================
      // findUnique ==> No soporta la opcion mode: 'insensitive', porque espera que sea un String simple y no un Objeto con propiedades.
      // findFirst  ==> Soporta la opcion mode: 'insensitive' y soporta filtros complejos
      const existingNombre = await prisma.clasificacion.findFirst({
        where: {
          nombre: {
            equals: clasifi.nombre,
            mode: "insensitive", // Búsqueda insensible a mayúsculas y minúsculas
          },
        },
      });

      if (existingNombre) {
        return {
          ok: false,
          message: "Este nombre ya está registrado.",
        };
      }

      /*=================== Agregar ==================*/
      clasificacion = await prisma.clasificacion.create({
        data: { ...clasifi },
      });

      return {
        ok: true,
        message: "Guardado Exitosamente",
        data: clasifi,
      };
    });

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath("/atributos/clasificacion");

    return {
      ok: prismaTx.ok,
      message: prismaTx.message,
      data: prismaTx.data,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
    };
  }
};
