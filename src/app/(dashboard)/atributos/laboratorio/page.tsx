
import { Suspense } from 'react';
import { AtributosTableSkeleton, Table } from '@/components/atributos';
import { Pagination } from '@/components';

interface Props {
  searchParams?: {
    query?: string;
    page?: string;
  };
}
export default async function LaboratorioPage( { searchParams }: Props ) {

  const query = searchParams?.query || '';
  const currentPage = Number( searchParams?.page ) || 1;

  // suspense :: solo se ejecuta si se realiza una peticion http o a una API que sea asyncrono.
  return (
    <>
      <Suspense
        key={ query + currentPage } // Esto permite que se renderice de nuevo el componente.
        fallback={ <AtributosTableSkeleton nombre={'Laboratorio'} /> }
      >
        <Table nombre={'Laboratorio'} />
      </Suspense>

      <Pagination totalPages={ 4 } />
    </>
  );
}