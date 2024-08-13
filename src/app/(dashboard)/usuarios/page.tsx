import { Card, Search, Title, Modal, BtnAgregar, Pagination } from '@/components';
import { FormPasswd, FormPhoto, FormUsuario, Show, UsuariosTable, UsuariosTableSkeleton } from '@/components/usuarios';
import { Suspense } from 'react';

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function UsuariosPage( { searchParams }: Props ) {

  // Get Value for URL: Params
  const query = searchParams?.query || '';
  const currentPage = Number( searchParams?.page ) || 1;
  const modal = searchParams.modal;

  const getModalContent = () => {
    if ( !modal ) return null;

    // Destructuro el dato del Modal:
    const [ modalType, id ] = modal.split( '/' );

    if ( modalType === 'foto' ) {
      return <Modal titleModal="Agregar Foto" children={ <FormPhoto id={ id } /> } />;
    }

    if ( modalType === 'password' ) {
      return <Modal titleModal="Restablecer Contraseña" children={ <FormPasswd id={ id } /> } />;
    }

    if ( modalType === 'ver' ) {
      return <Modal titleModal="Ver Usuario" children={ <Show id={ id } /> } />;
    }

    return <Modal titleModal={ `${ modalType } Usuario` } sizeModal={ 'max-w-xl' } children={ <FormUsuario id={ id } /> } />;
  };

  return (
    <Card>
      {/*********************** Title ***********************/ }
      <Title title={ "Usuarios" } />

      {/************ Buscador && Boton Agregar **************/ }
      <div className={ "flex gap-80 my-2" }>
        <Search placeholder={ "Buscar Usuarios..." } />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/ }

      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        fallback={ <UsuariosTableSkeleton /> }
      >
        <UsuariosTable />
        {/* <UsuariosTableSkeleton /> */}
        {/* <Table query={ query } currentPage={ currentPage } /> */ }
      </Suspense>
      <Pagination totalPages={ 4 } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
    </Card>
  );
}