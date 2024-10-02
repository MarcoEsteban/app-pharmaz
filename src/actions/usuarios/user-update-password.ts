'use server';

import bcrypt from 'bcryptjs';
import { passwordSchema } from "@/validations";
import prisma from '@/libs/prisma';

export const updatePasswordUser = async (formData: FormData) => {
  // Convertir FormData a objeto
  const data = Object.fromEntries(formData);
  console.log({ data });

  // Validar el objeto con Zod
  const userParsed = passwordSchema.safeParse(data);

  if (!userParsed.success) {
    console.log(userParsed.error);
    return { ok: false, error: userParsed.error.errors };
  }

  try {
    
    const { id, password } = userParsed.data;

    if (!id) {
      return { ok: false, error: 'Usuario no encontrado' };
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña en la base de datos
    await prisma.usuario.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return {
      ok: true,
      message: 'Contraseña actualizada correctamente',
    };
    
  } catch (error) {
    console.log({error})
    return {
      ok: false,
      message: 'Error al actualizar la contraseña',
    }
  }

};
