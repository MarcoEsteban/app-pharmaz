'use client';

import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateFarma } from '@/actions';
import { BtnCancelar, BtnGuardar } from '@/components';
import { Farmacia } from '@/interfaces';
import { messageSweetAlert } from '@/utils';
import { farmaSchema } from '@/validations';

type FormInputs = {
  id?: string;
  nombre: string;
  email: string;
  celular: number;
  direccion: string;
};

interface Props {
  farma: Farmacia;
}

export const FormFarma = ( { farma }: Props ) => {

  const router = useRouter();     // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>( {
    
    resolver: zodResolver( farmaSchema ), // Aplicando el Validador de Zod.
    
    defaultValues: {
      nombre: farma.nombre,
      celular: Number(farma.celular),
      direccion: farma.direccion ?? '',
      email: farma.email,
    }
  } );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData;
    const { ...userToSave } = data;

    if (farma.id) {
      formData.append( 'id', farma.id ?? '' );
    }
    formData.append( 'nombre', userToSave.nombre );
    formData.append( 'celular', userToSave.celular.toString() );
    formData.append( 'direccion', userToSave.direccion );
    formData.append( 'email', userToSave.email );

    const { ok, message } = await updateFarma( formData );

    messageSweetAlert(ok, message);

    router.replace(pathname);
  };

  return (

    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div className="grid gap-4 mb-4 grid-cols-2 font-sans tracking-wide">

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
                errors.direccion && 'focus:border-red-500 border-red-500'
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
        <BtnCancelar />
        <BtnGuardar />
      </div>

    </form>
  );
};
