import { Suspense } from 'react';
import { BtnAgregar, Modal, Pagination, Search } from '@/components';
import { getByIdViaAdm, getPaginationViaAdm } from '@/actions';
import { TableViaAdm } from '@/components/atributos/viaAdmin/TableViaAdm';
import { FormViaAdm } from '@/components/atributos/viaAdmin/FormViaAdm';

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
    const [ viaAdmi ] = await Promise.all( [
      id ? getByIdViaAdm(id) : Promise.resolve(null) // Si el id es undefined, no se hace la llamada
    ] );

    return (
      <Modal titleModal={ `${ modalType } Via Administración` }>
        <FormViaAdm viaAdmint={ viaAdmi ?? {} } />
      </Modal>
    )
  };
  
  // ==============
  // Server Actios:
  // ==============
  const { viaAdministracion, totalPages } = await getPaginationViaAdm({ currentPage, query });

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
        <TableViaAdm viaAdmint={ viaAdministracion } />
      </Suspense>
      <Pagination totalPages={ totalPages } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
    </>
  );
}
