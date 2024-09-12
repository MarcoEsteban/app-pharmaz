'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

interface Props {
  placeholder: string;
  id: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isEditMode?: boolean
}

export const Password = ( { placeholder, id, register, errors, isEditMode }: Props ) => {

  const [ showPassword, setShowPassword ] = useState( false );

  // Función para obtener el mensaje de error como texto
  const getErrorMessage = ( error: FieldError ) => {
    if ( error ) {
      if ( typeof error.message === 'string' ) {
        return error.message;
      }
      return 'Error en el campo';
    }
    return null;
  };

  // Required se aplica solo si no está en modo Editar
  const required = !isEditMode ? { required: "La contraseña es obligatoria" } : {};
  
  return (
    <>
      <div className="relative">
        {/* Icon Password */ }
        <FaLock className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" size={ 14 } />
        <input
          type={ showPassword ? "text" : "password" }
          className={ clsx(
            "input-text-icon",
            { 'focus:border-red-500 border-red-500 text-red-500': errors[ id ] }
          ) }
          placeholder={ placeholder }
          id={ id }
          { ...register( id, required) }
        />
        {/* Mostrar Icono según el estado */ }
        { showPassword ? (
          <FaEye
            onClick={ () => setShowPassword( !showPassword ) }
            className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-gray-500"
          />
        ) : (
          <FaEyeSlash
            onClick={ () => setShowPassword( !showPassword ) }
            className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-gray-500"
          />
        ) }
      </div>
      {/* Mostrar mensaje de error */ }
      { errors[ id ] && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          { getErrorMessage( errors[ id ] as FieldError ) }
        </p>
      ) }
    </>
  );
};
