'use client';

import { BtnCancelar, BtnGuardar } from '@/components';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import Swal from 'sweetalert2';

type FormInputs = {
  id?: string;
  nombre: string;
  ap: string;
  am: string;
  email: string;
  direccion: string;
  celular: number;
};

interface Props {
  id?: string;
}

export const FormPerfil = ( { id }: Props ) => {

  const router = useRouter();     // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  // const [ roles, setRoles ] = useState<TypeRoles[]>( [] );        // Para guardar los reles.

  // Initial React Hook Form:
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormInputs>( {
    defaultValues: {
      // roles: {} // Inicializar 'menus' como un array vacío.
    }
  } );

  useEffect( () => {
    // Server Actions - Obtenr los Menus por el ID
    const fetchMenus = async () => {
      console.log( "perfiledit" );
    };

    // Server Action - Obtener los Menus de los Roles de Acuerdo al ID
    // const loadRolToEditar = async ( id: string ) => {
    //   const res = await getRolesMenusById( id );

    //   if ( res.ok ) {
    //     setValue( 'nombre', res.data?.nombre as string );
    //     setValue( 'menus', res.data?.menus.map( menu => menu.id ) as [] );
    //     setIsEditar( true );
    //   }
    // };

    fetchMenus();

    // if ( id ) {
    //   loadRolToEditar( id );
    // }
  }, [] );
  // }, [ id, setValue ] );


  // Metodo de Envio del Formulario:
  const onSubmit: SubmitHandler<FormInputs> = async ( data ) => {

    // Destructuramos los Valores del Formulario:
    const { email, celular, nombre, ap, am, direccion } = data;

    console.log( { email, celular, nombre, ap, am, direccion } );


    // Muestra el Mensaje de Alerta Cuando Todo Sale Bien:
    if ( true ) {
      Swal.fire( {
        position: "center",
        icon: "success",
        // title: `${ res.message }`,
        title: `Modificado Exitosamente`,
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


    router.replace( pathname ); // Permite reemplazar la ruta con la nueva ruta.
  };

  return (

    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div className="grid gap-4 mb-4 grid-cols-2 font-sans">

        {/*************** Nombre ****************/ }
        <div className="col-span-2">
          <label htmlFor="nombre" className="label-text">Nombre</label>
          <input
            className={
              clsx(
                "input-text",
                // { 'focus:border-red-500 border-red-500': errors.personas?.nombre },
              )
            }
            type="text"
            id="nombre"
            autoFocus
            { ...register( 'nombre', { required: true } ) }
            placeholder="Ingrese un nombre"
            required />
        </div>

        {/*************** Ap ****************/ }
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="ap" className="label-text">Apellido P.</label>
          <input
            className={
              clsx(
                "input-text",
                // { 'focus:border-red-500 border-red-500': errors.personas?.ap },
              )
            }
            type="text"
            id="ap"
            { ...register( 'ap', { required: true } ) }
            placeholder="Ingrese apellido paterno"
            required />
        </div>

        {/*************** Am ****************/ }
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="am" className="label-text">Apellido M.</label>
          <input
            className={
              clsx(
                "input-text",
                // { 'focus:border-red-500 border-red-500': errors.personas?.am },
              )
            }
            type="text"
            id="am"
            { ...register( 'am', { required: true } ) }
            placeholder="Ingrese apellido materno"
            required />
        </div>

        {/*************** Celular ****************/ }
        <div className="col-span-2">
          <label htmlFor="celular" className="label-text">Celular</label>
          <input
            className="input-text"
            type="number"
            id="celular"
            { ...register( 'celular', { required: true } ) }
            placeholder="Ingrese numero celular"
            required />
        </div>

        {/*************** Direccion ****************/ }
        <div className="col-span-2">
          <label htmlFor="direccion" className="label-text">Dirección</label>
          <textarea
            className={
              clsx(
                "input-text",
                // { 'focus:border-red-500 border-red-500': errors.personas?.direccion },
              )
            }
            id="direccion"
            rows={ 2 }
            { ...register( 'direccion', { required: true } ) }
            placeholder="Ingrese direccion"
          ></textarea>
        </div>

        {/**************** Email ****************/ }
        <div className="col-span-2">
          <label htmlFor="email" className="label-text">Email</label>
          <div className="relative">
            <MdEmail className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
            <input
              className="input-text-icon"
              id="email"
              type="email"
              { ...register( 'email', { required: true } ) }
              placeholder="nombre@ejemplo.com"
              required />
          </div>
        </div>

      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnGuardar />
        <BtnCancelar />
      </div>

    </form>
  );
};