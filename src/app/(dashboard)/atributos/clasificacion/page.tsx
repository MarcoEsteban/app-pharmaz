import { Suspense } from "react";
import { BtnAgregar, Modal, Pagination, Search } from "@/components";
import { getByIdClasifi, getPaginationClasifi } from "@/actions";
import { TableViaAdm } from "@/components/atributos/viaAdmin/TableViaAdm";
import { FormViaAdm } from "@/components/atributos/viaAdmin/FormViaAdm";

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function ClasificacionPage({ searchParams }: Props) {
  // Get Value for URL: Params
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const modal = searchParams.modal;

  const getModalContent = async () => {
    if (!modal) return null;

    // Destructuro el dato del Modal:
    const [modalType, id] = modal.split("/");

    // ============== Server Actios ==============
    const [viaAdmi] = await Promise.all([
      id ? getByIdClasifi(id) : Promise.resolve(null), // Si el id es undefined, no se hace la llamada
    ]);

    return (
      <Modal titleModal={`${modalType} Clasificación `}>
        <FormViaAdm clasifica={viaAdmi ?? {}} />
      </Modal>
    );
  };

  // ==============
  // Server Actios:
  // ==============
  const { clasificaion, totalPages } = await getPaginationClasifi({
    currentPage,
    query,
  });

  return (
    <>
      {/************ Buscador && Boton Agregar **************/}
      <div className={"flex gap-80 mt-2 mb-4"}>
        <Search placeholder={"Buscar clasificacion..."} />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/}
      <Suspense
        key={query + currentPage} // Esto permite que se renderice de nuevo el componente.
      // fallback={ <AtributosTableSkeleton /> }
      >
        <TableViaAdm clasifi={clasificaion} />
      </Suspense>
      <Pagination totalPages={totalPages} />

      {/*********************** Modal ***********************/}
      {getModalContent()}
    </>
  );
}
