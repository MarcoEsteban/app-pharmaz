"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import prisma from "@/libs/prisma"; // Asegúrate de configurar correctamente tu instancia de Prisma
import { revalidatePath } from "next/cache";

const UploadSchema = z.object({
  id: z.string().optional(),
  table: z.string(),
  foto: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Imagen es requerida" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Solo se permite imagen",
    })
    .refine((file) => file.size < 5000000, { message: "Tamaño menor a 5MB" }),
});

export const uploadImage = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = UploadSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log(validatedFields.error);
  console.log(validatedFields.data);

  const { id, foto, table } = validatedFields.data;

  try {
    const uploadsDir = path.join(process.cwd(), "/public/uploads");

    // Crear directorio si no existe
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, (foto as File).name);

    // Guardar la imagen localmente
    const fileBuffer = await (foto as File).arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(fileBuffer));

    // Actualizar la base de datos con la ruta de la imagen
    if (id) {
      if (table === "/proveedor") {
        await prisma.proveedores.update({
          where: { id },
          data: { foto: `/uploads/${(foto as File).name}` },
        });
      }
      if (table === "/producto") {
        await prisma.medicamentos.update({
          where: { id },
          data: { foto: `/uploads/${(foto as File).name}` },
        });
      }
      if (table === "/data_farmacia") {
        const idPharma = await prisma.datosFarmacia.findFirst({
          where: { usuarioId: id },
          select: {
            id: true,
          },
        });
        await prisma.datosFarmacia.update({
          where: { id: idPharma?.id },
          data: { foto: `/uploads/${(foto as File).name}` },
        });
      }
      if (table === "/usuarios" || table === "/perfil") {
        const idPerso = await prisma.usuario.findUnique({
          where: { id },
          select: {
            personasId: true,
          },
        });
        await prisma.personas.update({
          where: { id: idPerso?.personasId },
          data: { foto: `/uploads/${(foto as File).name}` },
        });
      }
    }

    // Revalidación de las Rutas para Actualizar en Tiempo Real:
    revalidatePath("/proveedor");
    revalidatePath("/producto");
    revalidatePath("/usuarios");
    revalidatePath("/perfil");
    // revalidatePath("/perfil");

    return {
      ok: true,
      message: "Foto subida exitosamente",
    };
  } catch (error) {
    console.error("Error al subir la foto:", error);
    return {
      ok: false,
      message: "Error al guardar la imagen",
    };
  }
};
