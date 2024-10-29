import { getByIdLote, getPaginationLotes } from '@/actions';
import { Card, Modal, Pagination, Search, Title } from '@/components';
import { ItemCardLote } from '@/components/lotes';
import { FormLote } from '@/components/Producto';
import { Suspense } from 'react';

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function LotesPage({ searchParams }: Props) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const modal = searchParams.modal;
  
  const getModalContent = async () => {
    if (!modal) return null;
    const [id] = modal.split('/');
    const [lote] = await Promise.all([
      id ? getByIdLote(id) : Promise.resolve(null),
    ]);

    if (!lote?.productoId || !lote.usuarioId) return;

    // if (modalType === 'lote') {
      return (
        <Modal titleModal="Actualizar Lote" >
          <FormLote lote={lote ?? {}}  productoId={lote.productoId} usuarioId={ lote.usuarioId } />
        </Modal>
      ) 
    // }
  };
  
  // Obtener los productos con paginación desde el servidor
  const { lotes, totalPages } = await getPaginationLotes({ currentPage, query }); // Inicialmente, sin categoría
  
  return (
    <>
      <Card>
        <Title title={ 'Lotes' } />

        <Search placeholder={"Buscar producto por lotes..."} />
        
      {/*********************** Tabla ***********************/ }
      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        // fallback={ <UsuariosTableSkeleton /> }
      >
        <div className={ 'grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 pt-4 mb-2' }>
          {
            // ( [ ...Array( 8 ) ].map( ( _, index ) => (
            ( lotes.map( ( item ) => (
              <ItemCardLote lote={item} key={item.id} />
            ) ) )
          }
        </div>
      </Suspense>
      <Pagination totalPages={ totalPages } />

      {/*********************** Modal ***********************/ }
      { getModalContent() }
      </Card>
    </>
  );
}
