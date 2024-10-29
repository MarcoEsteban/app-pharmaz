'use client';

import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BtnCancelar, BtnGuardar } from '@/components';
import { atributoSchema } from '@/validations';

import { messageSweetAlert } from '@/utils';
import { createUpdateViaAdm } from '@/actions';
import { viaAdministracion } from '@/interfaces';

type FormInputs = {
  id?: string;
  nombre: string;
};

interface Props {
  viaAdmint: Partial<viaAdministracion>;
}

export const FormViaAdm = ( { viaAdmint }: Props ) => {

  const router = useRouter();     // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>( {
    resolver: zodResolver( atributoSchema ), // Aplicando el Validador de Zod.
    
    defaultValues: {
      ...viaAdmint,
    }
  } );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData;
    const { ...tipoToSave } = data;

    if ( viaAdmint.id ) {
      formData.append( 'id', viaAdmint.id ?? '' );
    }
    formData.append( 'nombre', tipoToSave.nombre );

    const { ok, message } = await createUpdateViaAdm( formData );

    messageSweetAlert(ok, message);

    if (!ok) return router.replace( `${pathname}?modal=agregar` );

    router.replace( pathname );
  };

  return (

    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div className="grid gap-4 mb-4 grid-cols-2 font-sans tracking-wide">

        {/*************** Nombre ****************/ }
        <div className="col-span-2">
          <label htmlFor="nombre" className="label-text">Nombre <span className={ "text-red-600" }>*</span></label>
          <input
            className={ clsx(
              "input-text capitalize",
              errors.nombre && 'focus:border-red-500 border-red-500'
            ) }
            type="text"
            id="nombre"
            { ...register( 'nombre', { required: "El nombre es obligatorio" } ) }
            autoFocus
            placeholder="Ingrese un nombre"
          />
          { errors.nombre && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.nombre.message }</p> }
        </div>
      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnCancelar />
        <BtnGuardar />
      </div>

    </form>
  );
};
