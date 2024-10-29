import { getAllMenus, getByIdRoles, getPaginationRoles } from '@/actions';
import { Card, Search, Title, Modal, BtnAgregar, Pagination } from '@/components';
import { FormRoles, RolesTable, RolesTableSkeleton, Show } from '@/components/roles';
import { RolMe } from '@/interfaces';
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

  const getModalContent = async () => {
    if ( !modal ) return null;
    
    // Destructuro el dato del Modal:
    let [ modalType, id ] = modal.split( '/' );
    
    // Esto Permite que ambos metodos se disparen al mismo tiempo.
    const [menus, rol] = await Promise.all( [
      getAllMenus(),
      id ? getByIdRoles(id) : Promise.resolve(null) // Si el id es undefined, no se hace la llamada
    ] );

    console.log({rol})

    if ( modalType === 'ver' ) {
      return  (
        <Modal titleModal="Detalle Rol" sizeModal={ 'max-w-lg' }>
          <Show roles={rol as RolMe} />
        </Modal> 
      )
    }

    return (
      <Modal titleModal={ `${ modalType } roles` } sizeModal={ 'max-w-lg' }>
        <FormRoles menus={menus} roles={rol ?? {}} />
      </Modal>
    )
  };

  // ==============
  // Server Actios:
  // ==============
  const { roles, totalPages } = await getPaginationRoles({ currentPage, query });

  return (
    <Card>
      {/*********************** Title ***********************/ }
      <Title title={ "Roles" } />
      
      <pre>
         {/* JSON.stringify( roles, null, 2 ) */}
      </pre>

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
        <RolesTable roles={roles} />
      </Suspense>
      <Pagination totalPages={ totalPages } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
    </Card>
  );
}
