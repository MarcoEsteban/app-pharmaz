'use server'

import prisma from "@/libs/prisma";
import { atributoSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdateLabo = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const laboParsed = atributoSchema.safeParse( data );

  if ( !laboParsed.success ) {
    console.log( laboParsed.error );
    return { ok: false };
  }
  console.log(laboParsed.data );

  try {
    
    const labo = laboParsed.data;
    const { id, ...laboratorio} = labo;    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let laboData;

      /*================= Actualizar =================*/
      if ( id ) {
        
        laboData = await prisma.laboratorios.update({
          where: { id },
          data: { ...laboratorio }
        })

        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: laboData
        }
        
      }
      
      // ================================
      // Verificar si el Nombre ya existe
      // ================================
      // findUnique ==> No soporta la opcion mode: 'insensitive', porque espera que sea un String simple y no un Objeto con propiedades.
      // findFirst  ==> Soporta la opcion mode: 'insensitive' y soporta filtros complejos
      const existingNombre = await prisma.laboratorios.findFirst({
        where: {
          nombre: {
            equals: laboratorio.nombre,
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
      laboData = await prisma.laboratorios.create({
        data: { ...laboratorio }
      })
      
      return {
        ok: true,
        message: 'Guardado Exitosamente',
        data: laboData
      }
      
    })

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/atributos/laboratorio')

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
