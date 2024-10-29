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
    const { id, ...prove} = proveedor;    
    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let proveedor;

      /*================= Actualizar =================*/
      if ( id ) {
        
        proveedor = await prisma.proveedores.update({
          where: { id },
          data: { 
            ...prove,
            celular: Number(prove.celular),
            direccion: prove.direccion ?? ''
          }
        })


        return {
          ok: true,
          message: 'Actualizado Exitosamente',
          data: proveedor
        }
        
      }
      
      // =============================
      // Verificar si el NIT ya existe
      // =============================
      const existingNIT = await prisma.proveedores.findFirst({
        where: { nit: prove.nit },
      });

      if (existingNIT) {
        return {
          ok: false,
          message: 'Este NIT ya está registrado.',
        };
      }
      
      // =================================
      // Verificar si el Nobre ya existe
      // =================================
      const existingNombre = await prisma.proveedores.findFirst({
        where: { nombre: prove.nombre },
      });

      if (existingNombre) {
        return {
          ok: false,
          message: 'Este nombre ya está registrado.',
        };
      }
      
      // =================================
      // Verificar si el Celular ya existe
      // =================================
      const existingCelular = await prisma.proveedores.findFirst({
        where: { celular: Number(prove.celular) },
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
      const existingEmail = await prisma.proveedores.findUnique({
        where: { email: prove.email },
      });

      if (existingEmail) {
        return {
          ok: false,
          message: 'Este email ya está registrado.',
        };
      }
      
      /*=================== Agregar ==================*/
      proveedor = await prisma.proveedores.create({
        data: {
          ...prove,
          celular: Number(prove.celular),
          direccion: prove.direccion ?? ''
        }
      })
      
      return {
        ok: true,
        message: 'Guardado Exitosamente',
        data: proveedor
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
