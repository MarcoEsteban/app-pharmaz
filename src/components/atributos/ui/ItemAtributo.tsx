'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface Props {
  nombre: string;
  enlace: string;
  icon: React.ReactNode;
}

export const ItemAtributo = ( { nombre, enlace, icon }: Props ) => {

  const pathname = usePathname();

  return (
    <li className="me-2">
      {/* className="inline-flex items-center justify-center p-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300  group" */ }
      <Link
        href={ `${ enlace }` }

        className={ clsx(
          "inline-flex items-center justify-center p-3 border-b-2 rounded-t-lg group",
          { 'text-blue-600 border-blue-600': enlace === pathname },
          { 'hover:text-gray-600 hover:border-gray-300 border-transparent': enlace !== pathname }
        ) }
      >
        { icon }
        { nombre }
      </Link>
    </li>
  );
};