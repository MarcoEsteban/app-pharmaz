'use server';

import prisma from "@/libs/prisma";
import { productoSchema } from "@/validations"; // Asegúrate de exportar ProductoValidado
import { revalidatePath } from "next/cache";

export const createUpdateProducto = async (formData: FormData) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries(formData);
  
  console.log('Data: ', data);
  
  // Valida el objeto con el esquema de Zod
  const productParsed = productoSchema.safeParse(data);

  if (!productParsed.success) {
    console.log('Errores de validación:', productParsed.error);

    // Mapea los errores de Zod a un objeto con errores por campo
    const fieldErrors: Record<string, string[]> = {};

    productParsed.error.errors.forEach((err) => {
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

  console.log('Datos validados:', productParsed.data);

  try {
    
    const producto = productParsed.data;
    const { id, categoria, presentacionId, laboratoriosId, principioActivoId, viaAdministracionId, ...produData } = producto;    
    
    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      
      let producto;

      /*================= Actualizar =================*/
      if (id) {
        producto = await prisma.medicamentos.update({
            where: { id },
            data: { 
              ...produData,
              categoria, // Incluye 'categoria'
              precio: Number(produData.precio),
              receta: produData.receta ?? '',
            },
        });

        if (!producto) {
          return {
              ok: false,
              message: 'Error al Actualizar',
          };
        }

        await prisma.medicaOnLabo.deleteMany({where: {productoId: id}})
        await prisma.medicaOnPresen.deleteMany({where: {productoId: id}})
        await prisma.medicaOnPrinci.deleteMany({where: {productoId: id}})
        await prisma.medicaOnViaAdm.deleteMany({where: {productoId: id}})

        await prisma.medicaOnLabo.create({
          data: { 
            productoId: id,
            laboratoriosId,
          },
        })

        if (presentacionId) {
          await prisma.medicaOnPresen.create({
            data: { 
              productoId: id,
              presentacionId,
            }
          })
        }
        
        if (principioActivoId) {
          await prisma.medicaOnPrinci.create({
            data: { 
              productoId: id,
              principioActivoId,
            }
          })
        }
        
        if (viaAdministracionId) {
          await prisma.medicaOnViaAdm.create({
            data: { 
              productoId: id,
              viaAdministracionId,
            }
          })
        }

        console.log({data})
        return {
            ok: true,
            message: 'Actualizado Exitosamente',
        };
      }    
      
      /*=================== Agregar ==================*/
      producto = await prisma.medicamentos.create({
          data: { 
            ...produData,
            categoria, // Incluye 'categoria'
            precio: Number(produData.precio),
            receta: produData.receta ?? '',
          },
      });

      if (!producto) {
        return {
            ok: false,
            message: 'Error al Crear',
        };
      }

      await prisma.medicaOnLabo.create({
        data: { 
          laboratoriosId,
          productoId: producto.id
        }
      })

      if (presentacionId) {
        await prisma.medicaOnPresen.create({
          data: { 
            presentacionId,
            productoId: producto.id
          }
        })
      }
      
      if (principioActivoId) {
        await prisma.medicaOnPrinci.create({
          data: { 
            principioActivoId,
            productoId: producto.id
          }
        })
      }
      
      if (viaAdministracionId) {
        await prisma.medicaOnViaAdm.create({
          data: { 
            viaAdministracionId,
            productoId: producto.id
          }
        })
      }

      return {
          ok: true,
          message: 'Guardado Exitosamente',
      };
      
    });
    
    // Revalidación de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/producto');

    return {
      ok: prismaTx.ok,
      message: prismaTx.message,
    };
    
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: 'Error al Guardar o Actualizar los Datos',
    };
  }
  
};
