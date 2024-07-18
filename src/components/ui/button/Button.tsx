'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFloppyDisk, FaXmark } from 'react-icons/fa6';

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