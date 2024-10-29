
import { Suspense } from 'react';
import { BtnAgregar, Modal, Pagination, Search } from '@/components';
import { getByIdLabo, getPaginationLabo } from '@/actions';
import { FormLabo, FormPhoto, TableLabo } from '@/components/atributos';

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function LaboratorioPage( { searchParams }: Props ) {

  // Get Value for URL: Params
  const query = searchParams?.query || '';
  const currentPage = Number( searchParams?.page ) || 1;
  const modal = searchParams.modal;

  const getModalContent = async () => {
    if ( !modal ) return null;

    // Destructuro el dato del Modal:
    const [ modalType, id ] = modal.split( '/' );
    
    // ============== Server Actios ==============
    const [ laboratorio ] = await Promise.all( [
      id ? getByIdLabo(id) : Promise.resolve(null) // Si el id es undefined, no se hace la llamada
    ] );
    
    if ( modalType === 'foto' ) {
      return <Modal titleModal="Agregar Foto" children={ <FormPhoto id={ id } /> } />;
    }

    return <Modal titleModal={ `${ modalType } Laboratorio` } children={ <FormLabo laboratorio={ laboratorio ?? {} } /> } />;
  };
  
  // ==============
  // Server Actios:
  // ==============
  const { laboratorios, totalPages } = await getPaginationLabo({ currentPage, query });

  return (
    <>
      
      {/************ Buscador && Boton Agregar **************/ }
      <div className={ "flex gap-80 mt-2 mb-4 mb-4" }>
        <Search placeholder={ "Buscar tipo..." } />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/ }
      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        // fallback={ <AtributosTableSkeleton /> }
      >
        <TableLabo laboratorios={ laboratorios } />
      </Suspense>
      <Pagination totalPages={ totalPages } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
    </>
  );
}
