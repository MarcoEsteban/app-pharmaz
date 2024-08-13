import { Card, Search, Title, Modal, BtnAgregar, Pagination } from '@/components';
import { FormRoles, RolesTable, RolesTableSkeleton, Show } from '@/components/roles';
import { Suspense } from 'react';

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function RolesPage( { searchParams }: Props ) {

  // Get Value for URL: Params
  const query = searchParams?.query || '';
  const currentPage = Number( searchParams?.page ) || 1;
  const modal = searchParams.modal;

  const getModalContent = () => {
    if ( !modal ) return null;

    // Destructuro el dato del Modal:
    const [ modalType, id ] = modal.split( '/' );

    if ( modalType === 'ver' ) {
      return <Modal titleModal="Ver Rol" sizeModal={ 'max-w-lg' } children={ <Show id={ id } /> } />;
    }

    return <Modal titleModal={ `${ modalType } roles` } children={ <FormRoles id={ id } /> } />;
  };

  return (
    <Card>
      {/*********************** Title ***********************/ }
      <Title title={ "Roles" } />

      {/************ Buscador && Boton Agregar **************/ }
      <div className={ "flex gap-80 my-2" }>
        <Search placeholder={ "Buscar Roles..." } />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/ }
      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        fallback={ <RolesTableSkeleton /> }
      >
        <RolesTable />
        {/* <Table query={ query } currentPage={ currentPage } /> */ }
      </Suspense>
      <Pagination totalPages={ 4 } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
    </Card>
  );
}