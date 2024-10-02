'use server';

import prisma from '@/libs/prisma';
import { perfilPasswordSchema } from "@/validations";
import bcryptjs from 'bcryptjs';

export const updatePasswordPerfil = async (formData: FormData) => {
  // Convertir FormData a objeto
  const data = Object.fromEntries(formData);

  // Validar el objeto con Zod
  const userParsed = perfilPasswordSchema.safeParse(data);

  if (!userParsed.success) {
    console.log(userParsed.error);
    return { ok: false, error: userParsed.error.errors };
  }
  console.log(userParsed.data);

  try {
    
    const { id, password, confirm_password  } = userParsed.data;

    if (!id) {
      return { ok: false, error: 'Usuario no encontrado' };
    }

    const user = await prisma.usuario.findUnique({
      where: { id },
      select: {
        password: true
      }
    })
    
    // Si el usuario no existe
    if (!user) return {ok: false, message: 'Usuario no encontrado'};
    
    const isPasswordCorrect = bcryptjs.compareSync( password, user?.password);
    
    if (!isPasswordCorrect) return { ok: false, message: 'Contraseña actual Incorrecta'};

    // Hashear la nueva contraseña
    const hashedPassword = await bcryptjs.hash(confirm_password, 10);

    // Actualizar la contraseña en la base de datos
    await prisma.usuario.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return {
      ok: true,
      message: 'Actualizado correctamente',
    };
    
  } catch (error) {
    console.log({error})
    return {
      ok: false,
      message: 'Error al actualizar la contraseña',
    }
  }

};
