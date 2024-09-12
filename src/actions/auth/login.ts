
'use server';

import { signIn } from '@/auth.config';
import { revalidatePath } from 'next/cache';

export const login = async ( formData: FormData ) => {

  try {
    
    const data = Object.fromEntries( formData );
    const { email, password } = data;
    
    const result = await signIn( 'credentials', {
      redirect: false,
      email,
      password
    } )

    console.log({result})

    if ( result?.error ) {
      console.log("Entro al if error:")
      return { ok: false, message: result.error };
    }

    revalidatePath('/')
    
    return { ok: true, message: 'Ingreso Exitoso' }
    
  } catch (error) {
    console.log({ error })
    return { ok: false, message: 'No se pudo iniciar sesión' };
  }

}
