'use server'

import prisma from "@/libs/prisma";
import { atributoSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdatePresent = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const presentParsed = atributoSchema.safeParse( data );

  if ( !presentParsed.success ) {
    console.log( presentParsed.error );
    return { ok: false };
  }
  console.log(presentParsed.data );

  try {
    
    const presentacion = presentParsed.data;
    const { id, ...present} = presentacion;    
    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let presentacion;

      /*================= Actualizar =================*/
      if ( id ) {
        
        presentacion = await prisma.presentacion.update({
          where: { id },
          data: { ...present }
        })

        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: presentacion
        }
        
      }
      
      // ================================
      // Verificar si el Nombre ya existe
      // ================================
      // findUnique ==> No soporta la opcion mode: 'insensitive', porque espera que sea un String simple y no un Objeto con propiedades.
      // findFirst  ==> Soporta la opcion mode: 'insensitive' y soporta filtros complejos
      const existingNombre = await prisma.presentacion.findFirst({
        where: {
          nombre: {
            equals: present.nombre,
            mode: 'insensitive', // Búsqueda insensible a mayúsculas y minúsculas
          },
        },
      });

      if (existingNombre) {
        return {
          ok: false,
          message: 'Este nombre ya está registrado.',
        };
      }
      
      /*=================== Agregar ==================*/
      presentacion = await prisma.presentacion.create({
        data: { ...present }
      })
      
      return {
        ok: true,
        message: 'Guardado Exitosamente',
        data: presentacion
      }
      
    })

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/atributos/presentacion')

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
