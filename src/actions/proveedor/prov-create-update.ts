'use server'

import prisma from "@/libs/prisma";
import { proveedorSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdateProveedor = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const proveedorParsed = proveedorSchema.safeParse( data );

  if ( !proveedorParsed.success ) {
    console.log( proveedorParsed.error );
    return { ok: false };
  }
  console.log(proveedorParsed.data );

  try {
    
    const proveedor = proveedorParsed.data;
    const { id, email, personasId, ...person} = proveedor;    
    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let proveedor, persona;

      /*================= Actualizar =================*/
      if ( id && personasId ) {
        
        persona = await prisma.personas.update({
          where: { id: personasId },
          data: {
            ...person,
            am: person.am ?? '',
            celular: Number(person.celular)
          }
        })
        
        proveedor = await prisma.proveedores.update({
          where: { id },
          data: {
            email,
            personasId
          }
        })


        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: { ...proveedor, ...persona}
        }
        
      }
      
      // ===============================
      // Verificar si el email ya existe
      // ===============================
      const existingNIT = await prisma.personas.findUnique({
        where: { ci: person.ci },
      });

      if (existingNIT) {
        return {
          ok: false,
          message: 'Este NIT ya está registrado.',
        };
      }
      
      // ===============================
      // Verificar si el email ya existe
      // ===============================
      const existingEmail = await prisma.proveedores.findUnique({
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
          celular: Number(person.celular)
        }
      })
      
      proveedor = await prisma.proveedores.create({
        data: {
          email,
          personasId: persona.id,
        }
      })
      
      return {
        ok: true,
        message: 'Guardado Exitosamente',
        data: { ...proveedor, ...persona}
      }
      
    })

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/proveedor')

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
