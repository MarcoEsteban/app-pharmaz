import { getByIdProveedor, getPaginationProveedor } from "@/actions";
import {
  BtnAgregar,
  Card,
  Modal,
  Pagination,
  Search,
  Title,
} from "@/components";
import {
  FormPhoto,
  FormProveedor,
  ProveedorTable,
  Show,
} from "@/components/proveedor";
import { Suspense } from "react";

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function ProveedorPage({ searchParams }: Props) {
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
    const [proveedor] = await Promise.all([
      id ? getByIdProveedor(id) : Promise.resolve(null), // Si el id es undefined, no se hace la llamada
    ]);

    if (modalType === "foto") {
      return (
        <Modal titleModal="Agregar Foto">
          <FormPhoto id={id} />
        </Modal>
      );
    }

    if (modalType === "ver") {
      return (
        <Modal titleModal="Ver Proveedor">
          <Show proveedor={proveedor ?? {}} />
        </Modal>
      );
    }

    return (
      <Modal titleModal={`${modalType} Proveedor`}>
        <FormProveedor proveedor={proveedor ?? {}} />
      </Modal>
    );
  };

  // ==============
  // Server Actios:
  // ==============
  const { proveedores, totalPages } = await getPaginationProveedor({
    currentPage,
    query,
  });

  return (
    <Card>
      {/*********************** Title ***********************/}
      <Title title={"Proveedor"} />

      {/************ Buscador && Boton Agregar **************/}
      <div className={"flex gap-80 my-2"}>
        <Search placeholder={"Buscar Proveedor..."} />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/}
      <Suspense
        key={query + currentPage} // Esto permite que se renderice de nuevo el componente.
      // fallback={ <UsuariosTableSkeleton /> }
      >
        <ProveedorTable proveedor={proveedores ?? []} />
      </Suspense>
      <Pagination totalPages={totalPages} />

      {/*********************** Modal ***********************/}
      {getModalContent()}
    </Card>
  );
}
