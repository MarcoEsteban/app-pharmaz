'use client';

import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { BtnCancelar, BtnGuardar } from '@/components';
import { Proveedor } from '@/interfaces';
import { proveedorSchema } from '@/validations';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { messageSweetAlert } from '@/utils';
import { createUpdateProveedor } from '@/actions';

type FormInputs = {
  id?: string;
  ci: string;
  nombre: string;
  ap: string;
  am: string;
  celular: number;
  email: string;
};

interface Props {
  proveedor: Partial<Proveedor>;
}

export const FormProveedor = ( { proveedor }: Props ) => {

  const router = useRouter();     // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormInputs>( {
    resolver: zodResolver( proveedorSchema ), // Aplicando el Validador de Zod.
    
    defaultValues: {
      ...proveedor,
      ci: proveedor.personas?.ci,
      nombre: proveedor.personas?.nombre,
      ap: proveedor.personas?.ap,
      am: proveedor.personas?.am ?? '',
      celular: proveedor.personas?.celular ?? undefined,
      email: proveedor.email
    }
  } );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData;
    const { ...proveedorToSave } = data;

    if ( proveedor.id || proveedor.personasId ) {
      formData.append( 'id', proveedor.id ?? '' );
      formData.append( 'personasId', proveedor.personasId ?? '' );
    }
    formData.append( 'ci', proveedorToSave.ci );
    formData.append( 'nombre', proveedorToSave.nombre );
    formData.append( 'ap', proveedorToSave.ap );
    formData.append( 'am', proveedorToSave.am );
    formData.append( 'celular', proveedorToSave.celular.toString() );
    formData.append( 'email', proveedorToSave.email );

    const { ok, message } = await createUpdateProveedor( formData );

    messageSweetAlert(ok, message);

    if (!ok) return router.replace( `${pathname}?modal=agregar` );

    router.replace( pathname );
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
              errors.ci && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="nit"
            autoFocus
            { ...register( 'ci', { required: "La nit es obligatorio" } ) }
            placeholder="Ingrese un nit"
          />
          { errors.ci && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.ci.message }</p> }
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
            { ...register( 'nombre', { required: "El nombre es obligatorio" } ) }
            placeholder="Ingrese un nombre"
          />
          { errors.nombre && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.nombre.message }</p> }
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
        <BtnCancelar />
        <BtnGuardar />
      </div>

    </form>
  );
};
