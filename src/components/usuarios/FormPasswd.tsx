'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { BtnCancelar, BtnGuardar, Password } from '@/components';
import { RiEyeLine, RiEyeOffLine, RiLockLine } from 'react-icons/ri';

type FormInputs = {
  id?: string;
  password: string;
  password_new: string;
  confirm_password: string;
};
interface Props {
  id?: string;
}

export const FormPasswd = ( { id }: Props ) => {

  const router = useRouter();
  const pathname = usePathname();

  // Usando React Hook Form:
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormInputs>( {} );

  useEffect( () => {
    // Server Actions - Obtener la Foto por el [id]
    const fetchPassword = async () => {
      console.log( 'password' );
    };

  }, [ id, setValue ] );


  const onSubmit: SubmitHandler<FormInputs> = async ( data ) => {

    const { password, password_new, confirm_password } = data;

    console.log( { password, password_new, confirm_password } );

    // Muestra el Mensaje de Alerta Cuando Todo Sale Bien:
    if ( true ) {
      Swal.fire( {
        position: "center",
        icon: "success",
        // title: `${ res.message }`,
        title: `Guardado Exitosamen`,
        showConfirmButton: false,
        timer: 1500
      } );
    }

    // Muestra el Mensaje de Alerta Cuando Algo Sale Mal:
    // if ( !res.ok ) {
    //   Swal.fire( {
    //     position: "center",
    //     icon: "error",
    //     title: `${ res.message }`,
    //     showConfirmButton: false,
    //     timer: 1500
    //   } );
    // }

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
            id={ "password_new" }
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