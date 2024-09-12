'use client';

import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { generatePaginationNumbers } from '@/utils';

interface Props {
  totalPages: number;
}

export const Pagination = ( { totalPages }: Props ) => {

  const pathname = usePathname();                              // Ruta(URL) donde nos encontramos.
  const searchParams = useSearchParams();                      // Parametros que recivimos de la URL.
  const pageString = searchParams.get( 'page' ) ?? 1;          // Obtiene el valor del parámetro 'page' de la URL o usa 1 si no está presente.
  const currentPage = isNaN( +pageString ) ? 1 : +pageString;  // Convierte pageString a número; si no es válido, usa 1.

  if ( currentPage < 1 ) redirect( pathname );

  const allPages = generatePaginationNumbers( currentPage, totalPages );

  const createPageUrl = ( pageNumber: number | string ) => {

    const params = new URLSearchParams( searchParams ); // Nos permite construir nuestro parametros en la URL.

    // params.toString() => Devuelve los parametros que tiene actualmente en la URL.
    if ( pageNumber === '...' ) return `${ pathname }?${ params.toString() }`;

    // Nos devuelve a la ruta actual donde nos encontramos.
    if ( Number( pageNumber ) <= 0 ) return `${ pathname }`;

    // Cuando hagamos  Next > y no haya más página nos retorna donde estamos.
    if ( +pageNumber > totalPages ) return `${ pathname }?${ params.toString() }`;

    // Crea los parametros(?page=3) para la paginas 
    params.set( 'page', pageNumber.toString() );
    return `${ pathname }?${ params.toString() }`;

  };

  return (
    <div className="flex items-center justify-between">

      {/*==================================== Previous (Anterior) ====================================*/ }
      <Link
        href={ createPageUrl( currentPage - 1 ) }
        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>

        <span>
          Anterior
        </span>
      </Link>

      {/*==================================== Numero de Paginacion ====================================*/ }
      <ul className="items-center hidden md:flex gap-x-2">
        {
          allPages.map( ( page, index ) => (
            <li key={ page + '-' + index } className="">
              <Link
                className={
                  clsx(
                    "px-2 py-1 text-sm rounded-md",
                    {
                      'bg-blue-700 shadow-md text-white hover:bg-blue-700 hover:text-white': page === currentPage,
                      'hover:bg-gray-100 text-gray-500 hover:text-gray-500': page !== currentPage
                    }
                  )
                }
                href={ createPageUrl( page ) }
              >
                { page }
              </Link>
            </li>
          ) )
        }
      </ul>

      {/*==================================== Next (Siguiente) ====================================*/ }
      <Link
        href={ createPageUrl( currentPage + 1 ) }
        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
      >
        <span>
          Siguiente
        </span>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </Link>
    </div>
  );
};
