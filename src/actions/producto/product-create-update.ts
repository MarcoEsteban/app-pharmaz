"use server";

import prisma from "@/libs/prisma";
import { productoSchema } from "@/validations"; // Asegúrate de exportar ProductoValidado
import { revalidatePath } from "next/cache";

export const createUpdateProducto = async (formData: FormData) => {
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries(formData);

  console.log("Data: ", data);

  // Valida el objeto con el esquema de Zod
  const productParsed = productoSchema.safeParse(data);

  if (!productParsed.success) {
    console.log("Errores de validación:", productParsed.error);

    // Mapea los errores de Zod a un objeto con errores por campo
    const fieldErrors: Record<string, string[]> = {};

    productParsed.error.errors.forEach((err) => {
      if (err.path && err.path.length > 0) {
        const field = err.path[0];
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      }
    });

    return { ok: false, errors: fieldErrors };
  }

  console.log("Datos validados:", productParsed.data);

  try {
    const producto = productParsed.data;
    const {
      id,
      // categoria,
      presentacionId,
      laboratoriosId,
      principioActivoId,
      clasificacionId,
      ...produData
    } = producto;

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction(async () => {
      let producto;

      if (
        !laboratoriosId && !presentacionId && !principioActivoId &&
        !clasificacionId
      ) {
        return {
          ok: false,
          message: "Algunos de los datos son incorrectos.",
        };
      }

      // --------------------------------------------
      //                  Actualizar
      // --------------------------------------------
      if (id) {
        producto = await prisma.medicamentos.update({
          where: { id },
          data: {
            ...produData,
            precio: Number(produData.precio),
            receta: produData.receta ?? "",
          },
        });

        if (!producto) {
          return {
            ok: false,
            message: "Error al Actualizar",
          };
        }

        await prisma.medicaOnLabo.deleteMany({ where: { productoId: id } });
        await prisma.medicaOnPresen.deleteMany({ where: { productoId: id } });
        await prisma.medicaOnPrinci.deleteMany({ where: { productoId: id } });
        await prisma.medicaOnClasifi.deleteMany({ where: { productoId: id } });

        const resolvedLaboratoriosId = await resolveId(
          laboratoriosId as string,
          "laboratorios",
        );
        const resolvedPresentacionId = await resolveId(
          presentacionId as string,
          "presentacion",
        );
        const resolvedPrincipioActivoId = await resolveId(
          principioActivoId as string,
          "principioActivo",
        );
        const resolvedClasificacionId = await resolveId(
          clasificacionId as string,
          "clasificacion",
        );

        await prisma.medicaOnLabo.create({
          data: {
            productoId: id,
            laboratoriosId: resolvedLaboratoriosId,
          },
        });

        if (presentacionId) {
          await prisma.medicaOnPresen.create({
            data: {
              productoId: id,
              presentacionId: resolvedPresentacionId,
            },
          });
        }

        if (principioActivoId) {
          await prisma.medicaOnPrinci.create({
            data: {
              productoId: id,
              principioActivoId: resolvedPrincipioActivoId,
            },
          });
        }

        if (clasificacionId) {
          await prisma.medicaOnClasifi.create({
            data: {
              productoId: id,
              clasificacionId: resolvedClasificacionId,
            },
          });
        }

        return {
          ok: true,
          message: "Actualizado Exitosamente",
        };
      }

      // --------------------------------------------
      //                  Crear
      // --------------------------------------------
      producto = await prisma.medicamentos.create({
        data: {
          ...produData,
          precio: Number(produData.precio),
          receta: produData.receta ?? "",
        },
      });

      if (!producto) {
        return {
          ok: false,
          message: "Error al Crear",
        };
      }

      const resolvedLaboratoriosId = await resolveId(
        laboratoriosId as string,
        "laboratorios",
      );
      const resolvedPresentacionId = await resolveId(
        presentacionId as string,
        "presentacion",
      );
      const resolvedPrincipioActivoId = await resolveId(
        principioActivoId as string,
        "principioActivo",
      );
      const resolvedClasificacionId = await resolveId(
        clasificacionId as string,
        "clasificacion",
      );

      await prisma.medicaOnLabo.create({
        data: {
          laboratoriosId: resolvedLaboratoriosId,
          productoId: producto.id,
        },
      });

      if (presentacionId) {
        await prisma.medicaOnPresen.create({
          data: {
            presentacionId: resolvedPresentacionId,
            productoId: producto.id,
          },
        });
      }

      if (principioActivoId) {
        await prisma.medicaOnPrinci.create({
          data: {
            principioActivoId: resolvedPrincipioActivoId,
            productoId: producto.id,
          },
        });
      }

      if (clasificacionId) {
        await prisma.medicaOnClasifi.create({
          data: {
            clasificacionId: resolvedClasificacionId,
            productoId: producto.id,
          },
        });
      }

      return {
        ok: true,
        message: "Guardado Exitosamente",
      };
    });

    // Revalidación de las Rutas para Actualizar en Tiempo Real:
    revalidatePath("/producto");

    return {
      ok: prismaTx.ok,
      message: prismaTx.message,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "Error al Guardar o Actualizar los Datos",
    };
  }
};

const isUUID = (value: string): boolean => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    .test(value);
};

const prismaTables = {
  laboratorios: prisma.laboratorios,
  presentacion: prisma.presentacion,
  principioActivo: prisma.principioActivo,
  clasificacion: prisma.clasificacion,
};

type TableName = keyof typeof prismaTables;

const resolveId = async (value: string, table: TableName) => {
  if (isUUID(value)) {
    // Si es un UUID válido, retornarlo directamente
    return value;
  } else {
    // Si no es un UUID, crear un nuevo registro en la tabla correspondiente
    const createdRecord = await (prismaTables[table] as any).create({
      data: { nombre: value }, // Ajusta "nombre" según tu esquema
    });
    return createdRecord.id;
  }
};
