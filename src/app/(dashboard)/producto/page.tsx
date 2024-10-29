
import { getByIdLote, getByIdProducto, getPaginationProducto } from '@/actions';
import { auth } from '@/auth.config';
import { Card, Search, Title, Modal, BtnAgregar, Pagination } from '@/components';
import { FormLote, FormPhoto, ItemCardProducto, ModalSizeProducto } from '@/components/Producto';
import { FilterCategoria } from '@/components/ui/search/Filtro';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
    filtro?: string;
  };
}

export default async function ProductoPage({ searchParams }: Props) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const modal = searchParams.modal;
  const filtro = searchParams?.filtro || 'Farmacos';
  
  const session = await auth();
  
  if ( !session?.user ) {
    redirect( '/auth/login?returnTo=/producto' );
  }

  // Obtener los productos con paginación desde el servidor
  const { productos, totalPages } = await getPaginationProducto({ currentPage, query, categoria: filtro }); // Inicialmente, sin categoría

  const getModalContent = async () => {
    if (!modal) return null;
    const [modalType, id] = modal.split('/');
    const [producto, lote] = await Promise.all([
      id ? getByIdProducto(id) : Promise.resolve(null),
      id ? getByIdLote(id) : Promise.resolve(null),
    ]);

    if (modalType === 'foto') {
      return <Modal titleModal="Agregar Foto" children={<FormPhoto id={id} />} />;
    }

    if (modalType === 'lote') {
      return <Modal titleModal="Agregar Lote" children={<FormLote lote={lote ?? {}}  productoId={id} usuarioId={ session.user.id } />} />;
    }

    return <ModalSizeProducto modalType={modalType} producto={producto ?? {}} filtro={filtro} />;
  };

  return (
    <Card>
      {/* Título */}
      <Title title={"Medicamentos"} />

      {/* Buscador y Filtros */}
      <div className={"flex gap-8 my-2"}>
        <Search placeholder={"Buscar Medicamentos..."} />
        <FilterCategoria />
        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/ }
      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        // fallback={ <UsuariosTableSkeleton /> }
      >
        <div className='grid grid-cols-3 gap-4 pt-4 pb-2'>
          {productos.map((producto, index) => (
            <ItemCardProducto key={index} producto={producto} />
          ))}
        </div>
      </Suspense>
      <Pagination totalPages={ totalPages } />

      {/* Modal */}
      {await getModalContent()}
    </Card>
  );
}

