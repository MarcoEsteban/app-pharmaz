'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCamera, FaEye } from 'react-icons/fa';
import { FaArrowLeft, FaFloppyDisk, FaPenToSquare, FaPlus, FaUnlockKeyhole, FaXmark } from 'react-icons/fa6';

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

export const BtnModificar = ({id}: {id: string}) => {

  const pathname = usePathname();

  return (
    <Link
      href={ pathname + `?modal=editar/${ id }` }
      className={ "btn-gnrl gradient-update" }
    >
       <FaPenToSquare size={ 18 } />
    </Link>
  );
};

export const BtnVer = ({id}: {id: string}) => {

  const pathname = usePathname();

  return (
    <Link
      href={ pathname + `?modal=ver/${ id }` }
      className={ "btn-gnrl gradient-show" }
    >
       <FaEye size={ 18 } />
    </Link>
  );
};

export const BtnPhoto = ({id}: {id: string}) => {

  const pathname = usePathname();

  return (
    <Link
      href={ pathname + `?modal=foto/${ id }` }
      className={ "btn-gnrl gradient-photo" }
    >
       <FaCamera size={ 18 } />
    </Link>
  );
};

export const BtnPassword = ({id}: {id: string}) => {

  const pathname = usePathname();

  return (
    <Link
      href={ pathname + `?modal=password/${ id }` }
      className={ "btn-gnrl gradient" }
    >
       <FaUnlockKeyhole size={ 18 } />
    </Link>
  );
};

