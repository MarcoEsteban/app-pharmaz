import { getByIdCliente, getPaginationCliente } from "@/actions";
import {
  BtnAgregar,
  Card,
  Modal,
  Pagination,
  Search,
  Title,
} from "@/components";
import { ClienteTable, FormCliente } from "@/components/cliente";
import { Suspense } from "react";

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function ClientePage({ searchParams }: Props) {
  // Get Value for URL: Params
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const modal = searchParams.modal;

  const getModalContent = async () => {
    if (!modal) return null;

    // Destructuro el dato del Modal:
    const [modalType, id] = modal.split("/");

    // ===========================================================
    // Server Actios:
    // Esto Permite que ambos metodos se disparen al mismo tiempo.
    // ===========================================================
    const [cliente] = await Promise.all([
      id ? getByIdCliente(id) : Promise.resolve(null), // Si el id es undefined, no se hace la llamada
    ]);

    return (
      <Modal titleModal={`${modalType} Cliente`}>
        <FormCliente cliente={cliente ?? {}} />
      </Modal>
    );
  };

  // ==============
  // Server Actios:
  // ==============
  const { personas, totalPages } = await getPaginationCliente({
    currentPage,
    query,
  });

  return (
    <Card>
      {/*********************** Title ***********************/}
      <Title title={"Clientes"} />

      {/************ Buscador && Boton Agregar **************/}
      <div className={"flex gap-80 my-2"}>
        <Search placeholder={"Buscar clientes..."} />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/}
      <Suspense
        key={query + currentPage} // Esto permite que se renderice de nuevo el componente.
      // fallback={ <UsuariosTableSkeleton /> }
      >
        <ClienteTable cliente={personas ?? []} />
      </Suspense>
      <Pagination totalPages={totalPages} />

      {/*********************** Modal ***********************/}
      {getModalContent()}
    </Card>
  );
}
