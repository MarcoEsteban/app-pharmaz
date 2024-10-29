'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

export const Search = ( { placeholder }: { placeholder: string; } ) => {

  // Permite recuperar los parametro enviado por la URL como ser Ejm: {'http://localhost:3000/dashboard/invoices?query=hola'}  el useSearchParams === 'hola'
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Obtenemos o Capturamos los valores que se introduce en el input Search
  const handleSearch = ( term: string ) => {

    // Creamos el parametro en la URL === ?query=valor
    const params = new URLSearchParams( searchParams );

    /*==========================================================================================================
     * Verifico si el usario esta escribiendo en el 'input'. 
     * Si es asi, quiero que me crees(set) el parametro 'query' y me pongas el valor del input ?query=valorInput
     =========================================================================================================*/
    if ( term ) {
      params.set( 'query', term ); // <-- ?query=valorDelInput
    } else {
      params.delete( 'query' );
    }

    // Una vez tenemos los Params, los reemplazamos en la URL
    replace( `${ pathname }?${ params.toString() }` );

  };

  return (
    <div className="relative flex flex-1 flex-shrink-0 w-full">
      <input
        className="pl-9 text-sm w-1/100 block flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
        onChange={ ( e ) => handleSearch( e.target.value ) }
        placeholder={ placeholder }
        defaultValue={ searchParams.get( 'query' )?.toString() }
      />
      <FaSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
