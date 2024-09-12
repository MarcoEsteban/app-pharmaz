'use server'

import prisma from "@/libs/prisma";
import { rolesSchema } from "@/validations";
import { revalidatePath } from "next/cache";

export const createUpdateRoles = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  
  // Extrae y convierte 'menus' a un array de strings
  const menusArray = (data.menus as string).split(',').map(id => id.trim());
  
  // Crea un nuevo objeto con 'menus' convertido a array
  const parsedData = {
    ...data,
    menus: menusArray
  };

  // Valida el objeto con el esquema de Zod
  const rolParsed = rolesSchema.safeParse( parsedData );

  if ( !rolParsed.success ) {
    console.log( rolParsed.error );
    return { ok: false };
  }
  console.log(rolParsed.data );

  try {
    
    const rol = rolParsed.data;
    const { id, menus, nombre} = rol;    

    // Realizar una Transaccion, Insercion a multiple Tablas:
    const prismaTx = await prisma.$transaction( async () => {
      let rol, rolesmenus;

      /*================= Actualizar =================*/
      if ( id ) {
        rol = await prisma.roles.update({
          where: { id },
          data: { nombre }
        })

        // Primero, elimino las relaciones existentes:
        await prisma.rolesOnMenus.deleteMany({
          where: { rolesId: id }
        })

        rolesmenus = await prisma.rolesOnMenus.createMany({
          data: menus.map( menuId => ({
            rolesId: id,
            menusId: menuId
          }))
        })

        return {
          message: 'Actualizado Exitosamente',
          data: { ...rol, ...rolesmenus}
        }
        
      }
      
      /*=================== Agregar ==================*/
      rol = await prisma.roles.create({
        data: {
          nombre,
          Menus: { // Menus :: Es la Tabla RolesOnMenus de mi DB.
            create: menus.map( (menusId: string) => ({
              menusId: menusId
            }))
          }
        }
      })
      
      return {
        message: 'Guardado Exitosamente',
        data: { ...rol}
      }
      
    })


    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath('/roles')

    return {
      ok: true,
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
