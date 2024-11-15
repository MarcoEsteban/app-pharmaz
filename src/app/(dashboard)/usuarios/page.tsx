import { getByIdUser, getPaginationUser } from "@/actions";
import { getAllRolEnable } from "@/actions/usuarios/get-all-rol-enable";
import {
  BtnAgregar,
  Card,
  Modal,
  Pagination,
  Search,
  Title,
} from "@/components";
import {
  FormPasswd,
  FormPhoto,
  FormUsuario,
  Show,
  UsuariosTable,
  UsuariosTableSkeleton,
} from "@/components/usuarios";
import { Suspense } from "react";

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
  };
}

export default async function UsuariosPage({ searchParams }: Props) {
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
    const [roles, usuario] = await Promise.all([
      getAllRolEnable(),
      id ? getByIdUser(id) : Promise.resolve(null), // Si el id es undefined, no se hace la llamada
    ]);

    if (modalType === "foto") {
      return (
        <Modal titleModal="Agregar Foto">
          <FormPhoto id={id} />
        </Modal>
      );
    }

    if (modalType === "password") {
      return (
        <Modal titleModal="Restablecer Contraseña">
          <FormPasswd usuario={usuario ?? {}} />
        </Modal>
      );
    }

    if (modalType === "ver") {
      return (
        <Modal titleModal="Ver Usuario">
          <Show usuario={usuario ?? {}} />
        </Modal>
      );
    }

    return (
      <Modal titleModal={`${modalType} Usuario`} sizeModal={"max-w-xl"}>
        <FormUsuario usuario={usuario ?? {}} roles={roles} />
      </Modal>
    );
  };

  // ==============
  // Server Actios:
  // ==============
  const { usuario, totalPages } = await getPaginationUser({
    currentPage,
    query,
  });

  return (
    <Card>
      {/*********************** Title ***********************/}
      <Title title={"Usuarios"} />

      {/************ Buscador && Boton Agregar **************/}
      <div className={"flex gap-80 my-2"}>
        <Search placeholder={"Buscar Usuarios..."} />

        <BtnAgregar />
      </div>

      {/*********************** Tabla ***********************/}
      <Suspense
        key={query + currentPage} // Esto permite que se renderice de nuevo el componente.
        fallback={<UsuariosTableSkeleton />}
      >
        <UsuariosTable usuario={usuario ?? []} />
      </Suspense>
      <Pagination totalPages={totalPages} />

      {/*********************** Modal ***********************/}
      {getModalContent()}
    </Card>
  );
}
