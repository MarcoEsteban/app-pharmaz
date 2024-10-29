'use server'

import prisma from "@/libs/prisma";
import { clienteSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdateCliente = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const clienteParsed = clienteSchema.safeParse( data );

  if ( !clienteParsed.success ) {
    console.log( clienteParsed.error );
    return { ok: false };
  }
  console.log(clienteParsed.data );

  try {
    
    const cliente = clienteParsed.data;
    const { id, ...cliData} = cliente;    
    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let cliente;

      /*================= Actualizar =================*/
      if ( id ) {
        
        cliente = await prisma.personas.update({
          where: { id },
          data: { 
            ...cliData,
            celular: Number(cliData.celular),
            direccion: cliData.direccion ?? ''
          }
        })


        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: cliente
        }
        
      }
      
      // =============================
      // Verificar si el NIT ya existe
      // =============================
      const existingNIT = await prisma.personas.findFirst({
        where: { ci: cliData.ci },
      });

      if (existingNIT) {
        return {
          ok: false,
          message: 'Este NIT ya está registrado.',
        };
      }
      
      // =================================
      // Verificar si el Celular ya existe
      // =================================
      const existingCelular = await prisma.personas.findFirst({
        where: { celular: Number(cliData.celular) },
      });

      if (existingCelular) {
        return {
          ok: false,
          message: 'Este celular ya está registrado.',
        };
      }
      
      /*=================== Agregar ==================*/
      cliente = await prisma.personas.create({
        data: {
          ...cliData,
          celular: Number(cliData.celular),
          direccion: cliData.direccion ?? ''
        }
      })
      
      return {
        ok: true,
        message: 'Guardado Exitosamente',
        data: cliente
      }
      
    })

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/cliente')

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
