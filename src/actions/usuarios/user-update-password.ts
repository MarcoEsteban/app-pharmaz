'use server';

import { passwordSchema } from "@/validations";

export const updatePasswordUser = async ( formData: FormData ) => {
  
  // Convierte el FormData a un objeto de JavaScript
  const data = Object.fromEntries( formData );
  console.log({data})
  
  // Valida el objeto con el esquema de Zod
  const userParsed = passwordSchema.safeParse( data );

  if ( !userParsed.success ) {
    console.log( userParsed.error );
    return { ok: false };
  }
  console.log(userParsed.data );
  
  return {
    ok: true,
    message: 'Correcto'
  }
}
