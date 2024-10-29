'use client';

import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { messageSweetAlert } from '@/utils';
import { BtnCancelar, BtnGuardar } from '@/components';
import { PersonaType } from '@/interfaces';
import { clienteSchema } from '@/validations';
import { createUpdateCliente } from '@/actions';

type FormInputs = {
  id?: string;
  ci: string;
  nombre: string;
  ap: string;
  am: string;
  celular: string;
  direccion: string;
};

interface Props {
  cliente: Partial<PersonaType>;
}

export const FormCliente = ( { cliente }: Props ) => {

  const router = useRouter();     // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>( {
    resolver: zodResolver( clienteSchema ), // Aplicando el Validador de Zod.
    
    defaultValues: {
      ci: cliente.ci ?? '',
      nombre: cliente.nombre ?? '',
      ap: cliente.ap ?? '',
      am: cliente.am ?? '',
      celular: cliente.celular?.toString() ?? '', // Convertir a string si tiene valor
      direccion: cliente.direccion ?? '',
    }
  } );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData;
    const { ...clienteToSave } = data;

    if ( cliente.id ) {
      formData.append( 'id', cliente.id ?? '' );
    }
    formData.append( 'ci', clienteToSave.ci );
    formData.append( 'nombre', clienteToSave.nombre );
    formData.append( 'ap', clienteToSave.ap ?? '' );
    formData.append( 'am', clienteToSave.am ?? '' );
    formData.append( 'celular', Number(clienteToSave.celular).toString() );
    formData.append( 'direccion', clienteToSave.direccion ?? '' );

    const { ok, message } = await createUpdateCliente( formData );

    messageSweetAlert(ok, message);

    if (!ok) return router.replace( `${pathname}?modal=agregar` );

    router.replace( pathname );
  };

  return (

    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div className="grid gap-4 mb-4 grid-cols-2 font-sans tracking-wide">

        {/*************** NIT ****************/ }
        <div className="col-span-2">
          <label htmlFor="ci" className="label-text">NIT <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text",
              errors.ci && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="ci"
            autoFocus
            { ...register( 'ci', { required: "El nit es obligatorio" } ) }
            placeholder="Ingrese el NIT"
          />
          { errors.ci && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.ci.message }</p> }
        </div>

        {/*************** Nombre ****************/ }
        <div className="col-span-2">
          <label htmlFor="nombre " className="label-text">Nombre <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text capitalize",
              errors.nombre && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="nombre"
            { ...register( 'nombre', { required: "El nombre es obligatorio" } ) }
            placeholder="Ingrese un nombre"
          />
          { errors.nombre && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.nombre.message }</p> }
        </div>
        
        {/***************** Ap ******************/ }
        <div className="col-span-2">
          <label htmlFor="ap " className="label-text">Apellido P. <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text capitalize",
              errors.ap && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="ap"
            { ...register( 'ap', { required: "El ap es obligatorio" } ) }
            placeholder="Ingrese el apellido paterno"
          />
          { errors.ap && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.ap.message }</p> }
        </div>
        
        {/***************** Am ******************/ }
        <div className="col-span-2">
          <label htmlFor="am " className="label-text">Apellido M. <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text capitalize",
              errors.am && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="am"
            { ...register( 'am', { required: "El am es obligatorio" } ) }
            placeholder="Ingrese el apellido materno"
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
            type="tel"
            id="celular"
            { ...register( 'celular', { required: "El celular es requerido" } ) }
            placeholder="Ingrese un celular"
          />
          { errors.celular && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.celular.message }</p> }
        </div>
        
        {/*************** Direccion ****************/ }
        <div className="col-span-2">
          <label htmlFor="direccion" className="label-text">Dirección</label>
          <textarea
            className={ clsx(
              "input-text capitalize",
              {'focus:border-red-500 border-red-500': errors.direccion}
            ) }
            id="direccion"
            rows={ 2 }
            { ...register( 'direccion', { required: "La direccion es requerido" } ) }
            placeholder="Ingrese direccion"
          ></textarea>
          { errors.direccion && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{ errors.direccion.message }</p> }
        </div>
      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnCancelar />
        <BtnGuardar />
      </div>

    </form>
  );
};
