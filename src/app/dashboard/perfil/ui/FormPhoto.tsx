'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { BtnCancelar, BtnGuardar } from '@/components';
import { FaUpload } from 'react-icons/fa';

type FormInputs = {
  id?: string;
  foto: string;
};
interface Props {
  id?: string;
}

type Foto = {
  id: string;
  nombre: string;
};

export const FormPhoto = ( { id }: Props ) => {

  const router = useRouter();
  const pathname = usePathname();

  const [ menus, setMenus ] = useState<Foto[]>( [] );
  const [ isEditar, setIsEditar ] = useState<boolean>( false );

  // Usando React Hook Form:
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormInputs>( {
    defaultValues: {
      foto: '' // Inicializar 'menus' como un array vacío.
    }
  } );

  useEffect( () => {
    // Server Actions - Obtener la Foto por el [id]
    const fetchFoto = async () => {
      console.log( 'Foto' );
    };

  }, [ id, setValue ] );


  const onSubmit: SubmitHandler<FormInputs> = async ( data ) => {

    const { foto } = data;

    console.log( { foto } );

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

      <div className="flex w-full items-center justify-center bg-white font-sans mb-4">

        <label htmlFor="foto" className="mx-auto cursor-pointer flex w-[300px] h-[250px] max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-1 text-center">

          <FaUpload className="h-10 w-10 text-blue-500"/>

          <h2 className="mt-2 text-xl font-medium text-gray-700 tracking-wide">Subir una Foto</h2>

          <p className="mt-3 text-gray-500 tracking-wide">Subir imagen en formato PNG, JPG. </p>

          <input id="foto" { ...register( 'foto', { required: true } ) } type="file" className="hidden" />
        </label>
      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnGuardar />
        <BtnCancelar />
      </div>

    </form>
  );
};