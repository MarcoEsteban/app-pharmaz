'use server'

import prisma from "@/libs/prisma";
import { userSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdateUser = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const userParsed = userSchema.safeParse( data );

  if ( !userParsed.success ) {
    console.log( userParsed.error );
    return { ok: false };
  }
  console.log(userParsed.data );

  try {
    
    const user = userParsed.data;
    const { id, email, password, rolesId, personasId, confirm_password, ...person} = user;    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let usuario, persona;

      /*================= Actualizar =================*/
      if ( id && personasId ) {
        
        persona = await prisma.personas.update({
          where: { id: personasId },
          data: {
            ...person,
            am: person.am ?? '',
            direccion: person.direccion ?? '',
            celular: Number(person.celular)
          }
        })
        
        usuario = await prisma.usuario.update({
          where: { id },
          data: {
            email,
            password,
            rolesId,
            personasId
          }
        })


        return {
          message: 'Actualizado Exitosamente',
          data: { ...usuario, ...persona}
        }
        
      }
      
      /*=================== Agregar ==================*/
      persona = await prisma.personas.create({
        data: {
          ...person,
          am: person.am ?? '',
          direccion: person.direccion ?? '',
          celular: Number(person.celular)
        }
      })
      
      usuario = await prisma.usuario.create({
        data: {
          email,
          password: password ?? '',
          rolesId,
          personasId: persona.id,
        }
      })
      
      return {
        message: 'Guardado Exitosamente',
        data: { ...usuario, ...persona}
      }
      
    })


    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/usuarios')

    return {
      ok: true,
      message: prismaTx.message,
      data: prismaTx.data
    }
    
  } catch (error) {
    console.log({error})
    return {
      ok: false,
    }
  }
  
}
