
import { Suspense } from 'react';
import { BtnAgregar, Modal, Pagination, Search } from '@/components';
import { getByIdPrinciAct, getPaginationPrinciAct } from '@/actions';
import { TableTipos } from '@/components/atributos/tipos/TableTipos';
import { FormTipos } from '@/components/atributos/tipos/FormTipo';

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function PrincipioActivoPage( { searchParams }: Props ) {

  // Get Value for URL: Params
  const query = searchParams?.query || '';
  const currentPage = Number( searchParams?.page ) || 1;
  const modal = searchParams.modal;

  const getModalContent = async () => {
    if ( !modal ) return null;

    // Destructuro el dato del Modal:
    const [ modalType, id ] = modal.split( '/' );
    
    // ============== Server Actios ==============
    const [ tipo ] = await Promise.all( [
      id ? getByIdPrinciAct(id) : Promise.resolve(null) // Si el id es undefined, no se hace la llamada
    ] );

    return <Modal titleModal={ `${ modalType } Principio Activo` } children={ <FormTipos tipo={ tipo ?? {} } /> } />;
  };
  
  // ==============
  // Server Actios:
  // ==============
  const { principio, totalPages } = await getPaginationPrinciAct({ currentPage, query });

  return (
    <>
      
      {/************ Buscador && Boton Agregar **************/ }
      <div className={ "flex gap-80 mt-2 mb-4 mb-4" }>
        <Search placeholder={ "Buscar principio activo..." } />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/ }
      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        // fallback={ <AtributosTableSkeleton /> }
      >
        <TableTipos tipos={ principio } />
      </Suspense>
      <Pagination totalPages={ totalPages } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
    </>
  );
}
