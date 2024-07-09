import { Card, Modal, Pagination, Search } from '@/components';
import UsuariosTable from '@/components/usuarios/Table';
import Link from 'next/link';

interface Props {
  searchParams: {
    modal: string;
  };
}

export default function Home( { searchParams }: Props ) {

  const modal = searchParams.modal;

  return (
    <div>

      <Card>

        <div className={"flex gap-80 my-4"}>
          <Search placeholder={ "Buscar Roles..." } />

          <Link
            href={ '/dashboard?modal=agregar' }
            className={ "btn-primary" }
          >
            Agregar
          </Link>
        </div>


        <UsuariosTable />

        <Pagination totalPages={ 4 } />

      </Card>

      { modal && <Modal titleModal="Agregar" children={ <div><label className="label-text">Name</label> <input type="text" placeholder="nombre" className="input-text" /></div> } /> }
    </div>
  );
}
