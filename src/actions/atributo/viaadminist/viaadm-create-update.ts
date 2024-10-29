'use server'

import prisma from "@/libs/prisma";
import { atributoSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdateViaAdm = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const viaAdmParsed = atributoSchema.safeParse( data );

  if ( !viaAdmParsed.success ) {
    console.log( viaAdmParsed.error );
    return { ok: false };
  }
  console.log(viaAdmParsed.data );

  try {
    
    const viaAdm = viaAdmParsed.data;
    const { id, ...viaAdmint} = viaAdm;    
    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let viaAdm;

      /*================= Actualizar =================*/
      if ( id ) {
        
        viaAdm = await prisma.viaAdministracion.update({
          where: { id },
          data: { ...viaAdmint }
        })

        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: viaAdm
        }
        
      }
      
      // ================================
      // Verificar si el Nombre ya existe
      // ================================
      // findUnique ==> No soporta la opcion mode: 'insensitive', porque espera que sea un String simple y no un Objeto con propiedades.
      // findFirst  ==> Soporta la opcion mode: 'insensitive' y soporta filtros complejos
      const existingNombre = await prisma.viaAdministracion.findFirst({
        where: {
          nombre: {
            equals: viaAdmint.nombre,
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
      viaAdm = await prisma.viaAdministracion.create({
        data: { ...viaAdmint }
      })
      
      return {
        ok: true,
        message: 'Guardado Exitosamente',
        data: viaAdm
      }
      
    })

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/atributos/via-administracion')

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
