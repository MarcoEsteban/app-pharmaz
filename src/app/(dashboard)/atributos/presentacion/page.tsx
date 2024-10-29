import { Suspense } from 'react';
import { BtnAgregar, Modal, Pagination, Search } from '@/components';
import { getByIdPresent, getPaginationPresent } from '@/actions';
import { TablePresentacion } from '@/components/atributos/presentacion/TablePresentacion';
import { FormPresentacion } from '@/components/atributos/presentacion/FormPresent';

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function PresentacionPage( { searchParams }: Props ) {

  // Get Value for URL: Params
  const query = searchParams?.query || '';
  const currentPage = Number( searchParams?.page ) || 1;
  const modal = searchParams.modal;

  const getModalContent = async () => {
    if ( !modal ) return null;

    // Destructuro el dato del Modal:
    const [ modalType, id ] = modal.split( '/' );
    
    // ============== Server Actios ==============
    const [ present ] = await Promise.all( [
      id ? getByIdPresent(id) : Promise.resolve(null) // Si el id es undefined, no se hace la llamada
    ] );

    return <Modal titleModal={ `${ modalType } Presentación` } children={ <FormPresentacion present={ present ?? {} } /> } />;
  };
  
  // ==============
  // Server Actios:
  // ==============
  const { presentacion, totalPages } = await getPaginationPresent({ currentPage, query });

  return (
    <>
      
      {/************ Buscador && Boton Agregar **************/ }
      <div className={ "flex gap-80 mt-2 mb-4 mb-4" }>
        <Search placeholder={ "Buscar presentacion..." } />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/ }
      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        // fallback={ <AtributosTableSkeleton /> }
      >
        <TablePresentacion presentacion={ presentacion } />
      </Suspense>
      <Pagination totalPages={ totalPages } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
    </>
  );
}
