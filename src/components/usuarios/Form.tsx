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
  ci: string;
  nombre: string;
  ap: string;
  am: string;
  direccion: string;
  celular: number;
  sexo: string;
  email: string;
  password: string;
  confirm_password: string;
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
      <div className="grid gap-4 mb-4 grid-cols-2 font-sans tracking-wide">

        {/*************** CI ****************/ }
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="ci" className="label-text">CI <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              errors.ci && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="ci"
            autoFocus
            { ...register( 'ci', { required: "La ci es obligatorio" } ) }
            placeholder="Ingrese un ci"
          />
          { errors.ci && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.ci.message }</p> }
        </div>

        {/*************** Nombre ****************/ }
        <div className="col-span-2 md:col-span-1">
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

        {/*************** Ap ****************/ }
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="ap" className="label-text">Apellido P. <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              errors.ap && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="ap"
            { ...register( 'ap', { required: "El apellido es obligatorio" } ) }
            placeholder="Ingrese un ap"
          />
          { errors.ap && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.ap.message }</p> }
        </div>

        {/*************** Am ****************/ }
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="am" className="label-text">Apellido M. <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              errors.am && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="am"
            { ...register( 'am', { required: "El apellido es obligatorio" } ) }
            placeholder="Ingrese un am"
          />
          { errors.am && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.am.message }</p> }
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

        {/*************** Direccion ****************/ }
        <div className="col-span-2">
          <label htmlFor="direccion" className="label-text">Dirección <span className={ "text-red-600" }>*</span></label>
          <textarea
            className={ clsx(
              "input-text",
              errors.direccion && 'focus:border-red-500 border-red-500'
            ) }
            id="direccion"
            rows={ 2 }
            { ...register( 'direccion', { required: "La direccion es requerido" } ) }
            placeholder="Ingrese direccion"
          ></textarea>
          { errors.direccion && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.direccion.message }</p> }
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

        {/**************** Nuevo Password ****************/ }
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="password" className="label-text">Contraseña <span className={ "text-red-600" }>*</span></label>
          <Password
            placeholder={ "Ingrese contraseña" }
            id={ "password" }
            register={ register }
            errors={ errors }
          />
        </div>

        {/**************** Confirm Password ****************/ }
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="confirm_password" className="label-text">Confirmar Contraseña <span className={ "text-red-600" }>*</span></label>
          <Password
            placeholder={ "Confirmar contraseña" }
            id={ "confirm_password" }
            register={ register }
            errors={ errors }
          />
        </div>

      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnGuardar />
        <BtnCancelar />
      </div>

    </form>
  );
};