import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth.config";
import { getByIdVentas, getPaginationVentas } from "@/actions";
import { Card, Modal, Pagination, Search, Title } from "@/components";
import { FilterCategoria } from "@/components/ui/search/Filtro";
import {
  ShowDetalle,
  VentasRealizadasTable,
} from "@/components/ventas-realizadas";

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
    filtro?: string;
  };
}

export default async function VentasRealizadasPage({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const modal = searchParams.modal;
  const filtro = searchParams?.filtro || "Efectivo";

  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?returnTo=/producto");
  }

  // Obtener los productos con paginación desde el servidor
  const { ventas, totalPages } = await getPaginationVentas({
    currentPage,
    query,
    metodoPago: filtro,
  }); // Inicialmente, sin categoría

  const getModalContent = async () => {
    if (!modal) return null;

    // Destructuro el dato del Modal:
    const [modalType, id] = modal.split("/");

    // ===========================================================
    // Server Actios:
    // Esto Permite que ambos metodos se disparen al mismo tiempo.
    // ===========================================================
    const [venta] = await Promise.all([
      id ? getByIdVentas(id) : Promise.resolve(null), // Si el id es undefined, no se hace la llamada
    ]);

    return (
      <Modal sizeModal="max-w-5xl" titleModal={`${modalType} Detalle Venta`}>
        <ShowDetalle venta={venta ?? {}} />
      </Modal>
    );
  };

  return (
    <Card>
      {/* Título */}
      <Title title={"Ventas Realizadas"} />

      {/* Buscador y Filtros */}
      <div className={"flex gap-20 my-2"}>
        <Search
          placeholder={"Buscar cliente por el NIT | Nombre | Apellido..."}
        />
        <FilterCategoria
          name={"ventas"}
          label1={"Efectivo"}
          label2={"QR"}
        />
      </div>

      {/*********************** Tabla ***********************/}
      <Suspense
        key={query + currentPage} // Esto permite que se renderice de nuevo el componente.
      // fallback={ <UsuariosTableSkeleton /> } // Skeleton that is displayed when loading the table.
      >
        <VentasRealizadasTable ventas={ventas} />
      </Suspense>
      <Pagination totalPages={totalPages} />

      {/* Modal */}
      {await getModalContent()}
    </Card>
  );
}
