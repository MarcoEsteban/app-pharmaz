'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

interface Props {
  placeholder: string;
  id: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export const Password = ( { placeholder, id, register, errors }: Props ) => {

  const [ showPassword, setShowPassword ] = useState( false );

  return (
    <div className="relative">
      {/*Icon Password*/ }
      <FaLock className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" size={ 14 } />
      <input
        type={ showPassword ? "text" : "password" }
        className={ clsx( "input-text-icon", { 'text-red-500': errors[ id ] } ) }
        placeholder={ placeholder }
        id={ id }
        { ...register( id, { required: true } ) }
      />
      {/* CONDICION PARA QUE SE MUESTRE EL ICON DE ACUERDO A SU ESTADO */ }
      {
        showPassword
          ? (
            <FaEye onClick={ () => setShowPassword( !showPassword ) }
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-gray-500"
            />
          ) : (
            <FaEyeSlash onClick={ () => setShowPassword( !showPassword ) }
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-gray-500" />
          )
      }
    </div>
  );
};