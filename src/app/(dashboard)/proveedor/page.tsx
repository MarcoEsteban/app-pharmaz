import { Card, Search, Title, Modal, BtnAgregar, Pagination } from '@/components';
import { FormPhoto, FormUsuario, ProveedorTable, Show } from '@/components/proveedor';

interface Props {
  searchParams: {
    modal: string;
  };
}

export default function ProveedorPage( { searchParams }: Props ) {

  // Get Value for URL: Params
  const modal = searchParams.modal;

  const getModalContent = () => {
    if ( !modal ) return null;

    // Destructuro el dato del Modal:
    const [ modalType, id ] = modal.split( '/' );

    if ( modalType === 'foto' ) {
      return <Modal titleModal="Agregar Foto" children={ <FormPhoto id={ id } /> } />;
    }

    if ( modalType === 'ver' ) {
      return <Modal titleModal="Ver Proveedor" children={ <Show id={ id } /> } />;
    }

    return <Modal titleModal={ `${ modalType } Proveedor` } children={ <FormUsuario id={ id } /> } />;
  };

  return (
    <Card>
      {/*********************** Title ***********************/ }
      <Title title={ "Proveedor" } />

      {/************ Buscador && Boton Agregar **************/ }
      <div className={ "flex gap-80 my-2" }>
        <Search placeholder={ "Buscar Proveedor..." } />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/ }
      <ProveedorTable />
      <Pagination totalPages={ 4 } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
    </Card>
  );
}