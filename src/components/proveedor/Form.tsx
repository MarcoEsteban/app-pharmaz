'use client';

import { BtnCancelar, BtnGuardar, Password } from '@/components';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import Swal from 'sweetalert2';

type FormInputs = {
  id?: string;
  nit: string;
  nombre: string;
  celular: number;
  email: string;
};

interface Props {
  id?: string;
}

export const FormUsuario = ( { id }: Props ) => {

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
    const { email, celular, nombre, nit } = data;

    console.log( { email, celular, nombre, nit } );


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
      <div className="grid gap-4 mb-4 grid-cols-2 font-sans tracking-wide">

        {/*************** CI ****************/ }
        <div className="col-span-2">
          <label htmlFor="nit" className="label-text">NIT <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              errors.nit && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="nit"
            autoFocus
            { ...register( 'nit', { required: "La nit es obligatorio" } ) }
            placeholder="Ingrese un nit"
          />
          { errors.nit && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.nit.message }</p> }
        </div>

        {/*************** Nombre ****************/ }
        <div className="col-span-2">
          <label htmlFor="nombre" className="label-text">Nombre <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              errors.nombre && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="nombre"
            autoFocus
            { ...register( 'nombre', { required: "El nombre es obligatorio" } ) }
            placeholder="Ingrese un nombre"
          />
          { errors.nombre && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.nombre.message }</p> }
        </div>

        {/*************** Celular ****************/ }
        <div className="col-span-2">
          <label htmlFor="celular" className="label-text">Celular <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              errors.celular && 'focus:border-red-500 border-red-500'
            ) }
            type="number"
            id="celular"
            { ...register( 'celular', { required: "El celular es requerido" } ) }
            placeholder="Ingrese un celular"
          />
          { errors.celular && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.celular.message }</p> }
        </div>

        {/**************** Email ****************/ }
        <div className="col-span-2">
          <label htmlFor="email" className="label-text">Email <span className={ "text-red-600" }>*</span></label>
          <div className="relative">
            <MdEmail className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
            <input
              className={ clsx(
                "input-text-icon",
                errors.email && 'focus:border-red-500 border-red-500'
              ) }
              id="email"
              type="email"
              { ...register( 'email', { required: "El email es requerido" } ) }
              placeholder="nombre@ejemplo.com"
            />
          </div>
          { errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.email.message }</p> }
        </div>

      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnGuardar />
        <BtnCancelar />
      </div>

    </form>
  );
};