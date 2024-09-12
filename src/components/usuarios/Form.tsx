'use client';

import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { BtnCancelar, BtnGuardar, Password } from '@/components';
import { Roles, Usuario } from '@/interfaces';

import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import Swal from 'sweetalert2';
import { createUpdateUser } from '@/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/validations';
import { messageSweetAlert } from '@/utils';

type FormInputs = {
  id?: string;
  ci: string;
  nombre: string;
  ap: string;
  am: string;
  direccion: string;
  celular: number;
  rolesId: string
  email: string;
  password: string;
  confirm_password: string;
};

interface Props {
  usuario: Partial<Usuario>;
  roles: Roles[]
}

export const FormUsuario = ( { usuario, roles }: Props ) => {

  const router = useRouter();     // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormInputs>( {
    resolver: zodResolver( userSchema ), // Aplicando el Validador de Zod.
    
    defaultValues: {
      ...usuario,
      ci: usuario.personas?.ci,
      nombre: usuario.personas?.nombre,
      ap: usuario.personas?.ap,
      am: usuario.personas?.am ?? '',
      celular: usuario.personas?.celular ?? 0,
      direccion: usuario.personas?.direccion ?? '',
    }
  } );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData;
    const { ...userToSave } = data;

    if ( usuario.id || usuario.personasId ) {
      formData.append( 'id', usuario.id ?? '' );
      formData.append( 'personasId', usuario.personasId ?? '' );
    }
    formData.append( 'ci', userToSave.ci );
    formData.append( 'nombre', userToSave.nombre );
    formData.append( 'ap', userToSave.ap );
    formData.append( 'am', userToSave.am );
    formData.append( 'celular', userToSave.celular.toString() );
    formData.append( 'direccion', userToSave.direccion );
    formData.append( 'rolesId', userToSave.rolesId );
    formData.append( 'email', userToSave.email );
    formData.append( 'password', userToSave.password );
    formData.append( 'confirm_password', userToSave.confirm_password );

    const { ok, message } = await createUpdateUser( formData );

    messageSweetAlert(ok, message);

    router.replace( pathname );
  };

  return (

    <form onSubmit={ handleSubmit( onSubmit ) } >
      <div className="grid gap-3 mb-4 grid-cols-2 font-sans tracking-wide">

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
          { errors.ci && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.ci.message }</p> }
        </div>

        {/*************** Nombre ****************/ }
        <div className="col-span-2 md:col-span-1">
          <label htmlFor="nombre" className="label-text">Nombre <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              {'focus:border-red-500 border-red-500': errors.nombre}
            ) }
            type="text"
            id="nombre"
            { ...register( 'nombre', { required: "El nombre es obligatorio" } ) }
            placeholder="Ingrese un nombre"
          />
          { errors.nombre && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.nombre.message }</p> }
        </div>

        {/*************** Ap ****************/ }
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="ap" className="label-text">Apellido Paterno <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              {'focus:border-red-500 border-red-500': errors.ap}
            ) }
            type="text"
            id="ap"
            { ...register( 'ap', { required: "El apellido es obligatorio" } ) }
            placeholder="Ingrese un ap"
          />
          { errors.ap && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.ap.message }</p> }
        </div>

        {/*************** Am ****************/ }
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="am" className="label-text">Apellido Materno</label>
          <input
            className={ clsx(
              "input-text",
              {'focus:border-red-500 border-red-500': errors.am}
            ) }
            type="text"
            id="am"
            { ...register( 'am', { required: "El apellido es obligatorio" } ) }
            placeholder="Ingrese un am"
          />
          { errors.am && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.am.message }</p> }
        </div>

        {/*************** Celular ****************/ }
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="celular" className="label-text">Celular <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              {'focus:border-red-500 border-red-500': errors.celular}
            ) }
            type="number"
            id="celular"
            { ...register( 'celular', { required: "El celular es requerido" } ) }
            placeholder="Ingrese un celular"
          />
          { errors.celular && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.celular.message }</p> }
        </div>
        
        {/**************** Roles ****************/ }
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="rolesId" className="label-text">Seleccionar Rol <span className={ "text-red-600" }>*</span></label>
          <select
            className={ clsx(
              "input-text",
              {'focus:border-red-500 border-red-500': errors.rolesId}
            ) }
            { ...register( 'rolesId', { required: "Debe seleccionar el Rol" } ) }
            id="rolesId"
          >
            <option value="" className="tracking-wide">[Seleccione]</option>
            { roles.map( ( { id, nombre } ) => (
              <option key={ id } value={ id }>
                { nombre }
              </option>
            ) ) }
          </select>
          { errors.rolesId && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.rolesId.message }</p> }
        </div>


        {/*************** Direccion ****************/ }
        <div className="col-span-2">
          <label htmlFor="direccion" className="label-text">Dirección</label>
          <textarea
            className={ clsx(
              "input-text",
              {'focus:border-red-500 border-red-500': errors.direccion}
            ) }
            id="direccion"
            rows={ 2 }
            { ...register( 'direccion', { required: "La direccion es requerido" } ) }
            placeholder="Ingrese direccion"
          ></textarea>
          { errors.direccion && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.direccion.message }</p> }
        </div>

        {/**************** Email ****************/ }
        <div className="col-span-2">
          <label htmlFor="email" className="label-text">Email <span className={ "text-red-600" }>*</span></label>
          <div className="relative">
            <MdEmail className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
            <input
              className={ clsx(
                "input-text-icon",
              {'focus:border-red-500 border-red-500': errors.email}
              ) }
              id="email"
              type="email"
              { ...register( 'email', { required: "El email es requerido" } ) }
              placeholder="nombre@ejemplo.com"
            />
          </div>
          { errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.email.message }</p> }
        </div>

        {/**************** Nuevo Password ****************/ }
        <div className={clsx(
          "col-span-2 md:col-span-1",
          {'hidden': usuario.id}
        )}>
          <label htmlFor="password" className="label-text">Contraseña <span className={ "text-red-600" }>*</span></label>
          <Password
            placeholder={ "Ingrese contraseña" }
            id={ "password" }
            register={ register }
            errors={ errors }
            isEditMode={ Boolean(usuario.id)}
          />
        </div>

        {/**************** Confirm Password ****************/ }
        <div className={clsx(
          "col-span-2 md:col-span-1",
          {'hidden': usuario.id}
        )}>
          <label htmlFor="confirm_password" className="label-text">Confirmar Contraseña <span className={ "text-red-600" }>*</span></label>
          <Password
            placeholder={ "Confirmar contraseña" }
            id={ "confirm_password" }
            register={ register }
            errors={ errors }
            isEditMode={ Boolean(usuario.id)}
          />
        </div>

      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnCancelar />
        <BtnGuardar />
      </div>

    </form>
  );
};
