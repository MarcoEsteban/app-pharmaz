'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { BtnCancelar, BtnGuardar, Password } from '@/components';
import { Usuario } from '@/interfaces';
import { updatePasswordUser } from '@/actions';
import { messageSweetAlert } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@/validations';

type FormInputs = {
  id: string;
  password: string;
  confirm_password: string;
};

interface Props {
  usuario: Partial<Usuario>;
}

export const FormPasswd = ( { usuario }: Props ) => {

  const router = useRouter();
  const pathname = usePathname();

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>( {
    resolver: zodResolver( passwordSchema ), // Aplicando el Validador de Zod.
  } );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData;
    const { ...userToSave } = data;

    if ( usuario.id || usuario.personasId ) {
      formData.append( 'id', usuario.id ?? '' );
    }
    formData.append( 'password', userToSave.password );
    formData.append( 'confirm_password', userToSave.confirm_password );

    const { ok, message } = await updatePasswordUser( formData );

    messageSweetAlert(ok, message);
    
    if (!ok) return router.replace( `${pathname}?modal=password` );

    router.replace( pathname );
  };

  return (

    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div className="grid gap-4 grid-cols-1 font-sans tracking-wide">

        {/**************** Nuevo Password ****************/ }
        <div className="col-span-2">
          <label htmlFor="password_new" className="label-text">Contraseña Nueva <span className={ "text-red-600" }>*</span></label>
          <Password
            placeholder={ "Ingrese contraseña nueva" }
            id={ "password" }
            register={ register }
            errors={ errors }
          />
        </div>

        {/**************** Confirm Password ****************/ }
        <div className="col-span-2">
          <label htmlFor="confirm_password" className="label-text">Confirmar Contraseña <span className={ "text-red-600" }>*</span></label>
          <Password
            placeholder={ "Confirmar contraseña" }
            id={ "confirm_password" }
            register={ register }
            errors={ errors }
          />
        </div>

        <div className={ "flex justify-end gap-4 pt-2" }>
          <BtnGuardar />
          <BtnCancelar />
        </div>
      </div>
    </form>
  );
};
