import { getByIdFarma, getByIdUser, searchCliente } from "@/actions";
import { auth } from "@/auth.config";
import { BtnAgregar, Card, ImagenLoad, Modal, Title } from "@/components";
import { FormCliente } from "@/components/cliente";
import PDFButton from "@/components/ventas/pdf-button";
import { TableVenta } from "@/components/ventas/TableVenta";
import SimpleClienteSearch from "@/components/ventas/venta-client";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    modal: string;
  };
}

export default async function ProcesarVentaPage({ searchParams }: Props) {
  const session = await auth();
  const modal = searchParams.modal;

  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  }

  const user = await getByIdUser(session.user.id);
  const farma = await getByIdFarma(session.user.id);

  if (!user) {
    // Puedes redirigir o mostrar un mensaje de error
    redirect("/auth/login?returnTo=/perfil"); // O una página de error personalizada
  }

  const vendedor = {
    id: user.id,
    nombre: user.personas.nombre ?? "",
    ap: user.personas.ap ?? "",
    am: user.personas.ap ?? "",
  };
  const pharma = {
    id: farma?.id ?? "",
    nombre: farma?.nombre ?? "",
    email: farma?.email ?? "",
    celular: farma?.celular,
    direccion: farma?.direccion ?? "",
    foto: farma?.foto ?? "",
  };

  const getModalContent = async () => {
    if (!modal) return null;

    // Destructuro el dato del Modal:
    const [modalType, id] = modal.split("/");

    return (
      <Modal titleModal={`${modalType} Cliente`}>
        <FormCliente cliente={{}} />
      </Modal>
    );
  };

  return (
    <Card>
      {/* ------------------------------------------ */}
      {/*             Vendedor                       */}
      {/* ------------------------------------------ */}
      <Title title={"Procesar Venta"} className="text-center" />
      <div className="flex flex-col items-center justify-center my-2">
        <ImagenLoad
          className="h-28 w-28 rounded-full object-cover"
          src={user.personas?.foto as string}
          alt={user.personas?.foto as string}
          width={96}
          height={96}
        />

        <h6 className="mb-0 leading-normal text-sm text-gray-500 bg-gray-200 rounded-lg px-3 py-1 mt-1 ">
          <span className="font-bold uppercase mr-2">Vendedor:</span>
          {user?.personas.nombre + " " + user?.personas.ap + " " +
            user.personas.am}
        </h6>
      </div>
      <hr className="my-2" />

      {/* ------------------------------------------ */}
      {/*             Cliente                        */}
      {/* ------------------------------------------ */}
      <div className="w-full my-2 ">
        <p className="text-gray-500">Buscar Cliente</p>
        <div className="flex justify-between w-full ">
          <div className="flex">
            <SimpleClienteSearch vendedor={vendedor} farma={pharma} />
            <BtnAgregar />
          </div>
          <Link
            href={`/ventas`}
            className="px-3 py-1 bg-green-700 font-sans font-bold rounded-lg text-white flex items-center ml-8 text-sm"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
      {getModalContent()}

      {/* ------------------------------------------ */}
      {/*        Medicamentos Table                  */}
      {/* ------------------------------------------ */}
      <TableVenta />
      <PDFButton />
    </Card>
  );
}
