'use server'

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { perfilSchema } from "@/validations";
import { getSession } from "next-auth/react";

export const updatePerfil = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const userParsed = perfilSchema.safeParse( data );

  if ( !userParsed.success ) {
    console.log( userParsed.error );
    return { ok: false };
  }
  console.log(userParsed.data );

  try {
    
    const user = userParsed.data;
    const { id, email, ...person} = user;    

    let usuario;

    /*================= Actualizar =================*/
    if ( !id ) {
      return {
        ok: false,
        message: 'Usuario no encontrado',
      }
    }
    
    usuario = await prisma.usuario.update({
      where: { id },
      data: {
        email, // Actualiza el email en la tabla Usuario si es proporcionado
        personas: {
          update: {
            ...person,
            am: person.am ?? '',
            direccion: person.direccion ?? '',
            celular: Number(person.celular)
          },
        },
      },
      include: { personas: true }
    });
    
    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/')
    revalidatePath('/perfil')
    revalidatePath('/usuarios')
    
    return {
      ok: true,
      message: 'Actualizado Exitosamente',
      dataUser: usuario
    }
    
  } catch (error) {
    console.log({error})
    return {
      ok: false,
    }
  }
  
}
