import { getByIdFarma, getByIdUser } from "@/actions";
import { auth } from "@/auth.config";
import { BtnAgregar, Card, ImagenLoad, Modal, Title } from "@/components";
import { FormCliente } from "@/components/cliente";
import { ClienteSearch, ProductoSearch } from "@/components/ventas";
import PDFButton from "@/components/ventas/ButtonPDF";
import { TableVenta } from "@/components/ventas/TableVenta";
import { Farmacia } from "@/interfaces";
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
    nombre: user.personas.nombre,
    ap: user.personas.ap,
    am: user.personas.am,
  };

  const farmacia: Omit<Farmacia, "usuarioId"> = {
    id: farma?.id || "",
    nombre: farma?.nombre || "",
    email: farma?.email || "",
    celular: farma?.celular || null,
    direccion: farma?.direccion || null,
    foto: farma?.foto || null,
  };

  const getModalContent = async () => {
    if (!modal) return null;

    // Destructuro el dato del Modal:
    const [modalType] = modal.split("/");

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
      {/*        Search Cliente & Producto           */}
      {/* ------------------------------------------ */}
      <div className="w-full my-2 ">
        <div className="flex justify-between w-full ">
          <ProductoSearch />

          <div className="flex">
            <ClienteSearch vendedor={vendedor} farma={farmacia} />
            <BtnAgregar />
          </div>
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
