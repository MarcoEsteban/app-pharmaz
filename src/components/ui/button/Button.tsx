'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowLeft, FaFloppyDisk, FaPlus, FaXmark } from 'react-icons/fa6';

export const BtnAgregar = () => {

  const pathname = usePathname();

  return (
    <Link
      href={ pathname + '?modal=agregar' }
      className={ "btn gradient-add flex items-center gap-2 font-semibold tracking-wide" }
    >
      Agregar
      <FaPlus />
    </Link>
  );
};

export const BtnGuardar = () => {
  return (
    <button
      className="btn gradient-guardar flex gap-1">
      <FaFloppyDisk size={ 16 } /> Guardar
    </button>
  );
};

export const BtnCancelar = () => {

  const pathname = usePathname();

  return (
    <Link
      href={ pathname }
      className="btn gradient-cancelar flex">
      <FaXmark size={ 18 } /> Cancelar
    </Link>
  );
};

export const BtnVolver = () => {

  const pathname = usePathname();

  return (
    <Link
      href={ pathname }
      className="btn gradient-cancelar flex">
      <FaArrowLeft size={ 18 } /> Volver
    </Link>
  );
};

interface Props {
  params: string;
  className: string;
  children: React.ReactNode;
}

export const BtnAction = ( { params, className, children }: Props ) => {

  const pathname = usePathname();

  return (
    <Link
      href={ `${ pathname + params }` }
      className={ `btn-gnrl ${ className }` }
    >
      { children }
    </Link>
  );
};
