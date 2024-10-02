'use server'

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { farmaSchema } from "@/validations";

export const updateFarma = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Valida el objeto con el esquema de Zod
  const userParsed = farmaSchema.safeParse( data );

  if ( !userParsed.success ) {
    console.log( userParsed.error );
    return { ok: false };
  }
  console.log(userParsed.data );

  try {
    
    const farmaData = userParsed.data;
    const { id, ...farma} = farmaData;    

    let farmacia;

    /*================= Actualizar =================*/
    if ( !id ) {
      return {
        ok: false,
        message: 'Usuario no encontrado',
      }
    }
    
    farmacia = await prisma.datosFarmacia.update({
      where: { id },
      data: {
        ...farma, // Actualiza el email en la tabla Usuario si es proporcionado
        celular: Number(farma.celular)
      },
    });
    
    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/')
    revalidatePath('/data_farmacia')
    
    return {
      ok: true,
      message: 'Actualizado Exitosamente',
      dataUser: farmacia
    }
    
  } catch (error) {
    console.log({error})
    return {
      ok: false,
    }
  }
  
}
