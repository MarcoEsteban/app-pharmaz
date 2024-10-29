'use server';

import prisma from "@/libs/prisma";
import { loteSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdateLote = async (formData: FormData) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries(formData);
  
  console.log('Data: ', data);
  
  // Valida el objeto con el esquema de Zod
  const loteParsed = loteSchema.safeParse(data);

  if (!loteParsed.success) {
    console.log('Errores de validación:', loteParsed.error);

    // Mapea los errores de Zod a un objeto con errores por campo
    const fieldErrors: Record<string, string[]> = {};

    loteParsed.error.errors.forEach((err) => {
      if (err.path && err.path.length > 0) {
        const field = err.path[0];
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      }
    });

    return { ok: false, errors: fieldErrors };
  }
  console.log('Datos validados:', loteParsed.data);
  
  try {
    
    const lote = loteParsed.data;
    const { id, ...loteData } = lote;    

    if (!loteData.usuarioId && !loteData.productoId) {
      return {
        ok: false,
        message: 'Error al Guardar los Datos'
      }
    }

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      
      let lote;

      /*================= Actualizar =================*/
      if (id) {
        lote = await prisma.lotes.create({
          data: {
            ...loteData,
          }
        });
        
        if (!lote) {
          return {
            ok: false,
            message: 'Error al Actualizar',
          };
        }
        
        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: lote
        };
      }    
      
      /*=================== Agregar ==================*/
      lote = await prisma.lotes.create({
        data: {
          ...loteData,
        }
      });

      return {
          ok: true,
          message: 'Guardado Exitosamente',
          data: lote
      };
      
    });
    
    // Revalidación de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/producto');

    return {
      ok: prismaTx.ok,
      message: prismaTx.message,
      data: prismaTx.data
    };
    
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: 'Error al Guardar o Actualizar los Datos',
    };
  }
  
};
