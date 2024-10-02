'use server'

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { userSchema } from "@/validations";
import bcryptjs from 'bcryptjs'

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

    const passwordEncryp = password ? bcryptjs.hashSync( password ) : ''

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let usuario, persona;

      /*================= Actualizar =================*/
      if ( id ) {
        
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

        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: { ...usuario}
        }
        
      }
      
      // =============================
      // Verificar si el NIT ya existe
      // =============================
      const existingNIT = await prisma.personas.findUnique({
        where: { ci: person.ci },
      });

      if (existingNIT) {
        return {
          ok: false,
          message: 'Esta cédula ya está registrado.',
        };
      }
      // =================================
      // Verificar si el Celular ya existe
      // =================================
      const existingCelular = await prisma.personas.findUnique({
        where: { ci: person.ci },
      });

      if (existingCelular) {
        return {
          ok: false,
          message: 'Este celular ya está registrado.',
        };
      }
      
      // ===============================
      // Verificar si el email ya existe
      // ===============================
      const existingEmail = await prisma.usuario.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return {
          ok: false,
          message: 'Este email ya está registrado.',
        };
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
          password: passwordEncryp,
          rolesId,
          personasId: persona.id,
        }
      })
      
      return {
        ok: true,
        message: 'Guardado Exitosamente',
        data: { ...usuario, persona }
      }
      
    })

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/')
    revalidatePath('/perfil')
    revalidatePath('/usuarios')

    return {
      ok: prismaTx.ok,
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
