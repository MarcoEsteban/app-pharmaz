'use server'

import prisma from "@/libs/prisma";
import { atributoSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdatePrinciAct = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const princiParsed = atributoSchema.safeParse( data );

  if ( !princiParsed.success ) {
    console.log( princiParsed.error );
    return { ok: false };
  }
  console.log(princiParsed.data );

  try {
    
    const princiAct = princiParsed.data;
    const { id, ...princiA} = princiAct;    
    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let tipo;

      /*================= Actualizar =================*/
      if ( id ) {
        
        tipo = await prisma.principioActivo.update({
          where: { id },
          data: { ...princiA }
        })

        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: tipo
        }
        
      }
      
      // ================================
      // Verificar si el Nombre ya existe
      // ================================
      // findUnique ==> No soporta la opcion mode: 'insensitive', porque espera que sea un String simple y no un Objeto con propiedades.
      // findFirst  ==> Soporta la opcion mode: 'insensitive' y soporta filtros complejos
      const existingNombre = await prisma.principioActivo.findFirst({
        where: {
          nombre: {
            equals: princiA.nombre,
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
      tipo = await prisma.principioActivo.create({
        data: { ...princiA }
      })
      
      return {
        ok: true,
        message: 'Guardado Exitosamente',
        data: tipo
      }
      
    })

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/atributos/tipo')

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
