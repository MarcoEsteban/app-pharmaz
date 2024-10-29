import { getPaginationProducto } from '@/actions';
import { auth } from '@/auth.config';
import { Card, Search, Title, Pagination } from '@/components';
import { ItemCardVentas } from '@/components/ventas';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function VentasPage({ searchParams }: Props) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  const session = await auth();
  
  if ( !session?.user ) {
    redirect( '/auth/login?returnTo=/ventas' );
  }

  // Obtener los productos con paginación desde el servidor
  const { productos, totalPages } = await getPaginationProducto({ currentPage, query, take: 9 }); // Inicialmente, sin categoría
  
  return (
    <Card>
      {/* Título */}
      <Title title={"Listar Medicamentos"} />

      {/* Buscador y Filtros */}
      <div className={"flex gap-8 my-2"}>
        <Search placeholder={"Buscar Productos..."} />
      </div>

      {/*********************** Tabla ***********************/ }
      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        // fallback={ <UsuariosTableSkeleton /> }
      >
        <div className='grid grid-cols-3 gap-4 pt-4 pb-2'>
          {productos.map((producto, index) => (
            <ItemCardVentas key={index} producto={producto} />
          ))}
        </div>
      </Suspense>
      <Pagination totalPages={ totalPages } />

    </Card>
  );
}

