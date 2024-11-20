import Image from "next/image";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

import { BtnModificar, BtnPhoto, Card, Modal, Title } from "@/components";
import { FormPhoto } from "@/components/perfil";
import { getByIdFarma } from "@/actions";
import { FormFarma } from "@/components/datafarmacia/FormFarma";

interface Props {
  searchParams: {
    modal: string;
  };
}

export default async function DataFarmaciaPage({ searchParams }: Props) {
  // Params URL:
  const modal = searchParams.modal;
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  }

  const farma = await getByIdFarma(session.user.id);

  if (!farma) {
    // Puedes redirigir o mostrar un mensaje de error
    redirect("/auth/login?returnTo=/perfil"); // O una página de error personalizada
  }

  const getModalContent = async () => {
    if (!modal) return null;

    // Destructuro el dato del Modal:
    const [modalType] = modal.split("/");

    if (modalType === "foto") {
      return (
        <Modal titleModal="Agregar Foto">
          <FormPhoto id={session.user.id} />
        </Modal>
      );
    }

    return (
      <Modal titleModal="Editar Farmacia" sizeModal="max-w-lg">
        <FormFarma farma={farma} />
      </Modal>
    );
  };

  const src = farma.foto ? farma.foto : "/images/profile.png";

  return (
    <Card>
      <Title title={"Datos de la Farmacia"} />

      <div className={"my-4 flex gap-10 w-full h-[320px]"}>
        <div className={"relative"}>
          <Image
            className="object-cover rounded-lg"
            src={src}
            alt={src}
            width={320}
            height={320}
          />
          {/*=================== Buton Photo ==================*/}
          <div className="absolute bottom-2 right-1">
            <BtnPhoto id={session.user.id} />
          </div>
        </div>

        <div className={"flex-2 font-sans relative"}>
          <div className={"w-full mb-8"}>
            <span className={"flex items-center gap-1 font-semibold"}>
              <FaUserCircle size={17} className={"text-blue-800"} />{" "}
              Nombre Farmacia
            </span>
            <p
              className={"border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide"}
            >
              {farma.nombre}
            </p>
          </div>

          <div className={"flex gap-12"}>
            <div className={"w-80 mb-8"}>
              <span className={"flex items-center gap-1 font-semibold"}>
                <FaEnvelope size={17} className={"text-blue-800"} /> Email
              </span>
              <p
                className={"border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide"}
              >
                {farma.email}
              </p>
            </div>

            <div className={"w-72 mb-8"}>
              <span className={"flex items-center gap-1 font-semibold"}>
                <FaPhoneFlip size={17} className={"text-blue-800"} /> Celular
              </span>
              <p
                className={"border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide"}
              >
                {farma.celular}
              </p>
            </div>
          </div>

          <div className={"w-full mb-8"}>
            <span className={"flex items-center gap-1 font-semibold"}>
              <FaLocationDot size={17} className={"text-blue-800"} /> Direccion
            </span>
            <p
              className={"border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide"}
            >
              {farma.direccion}
            </p>
          </div>

          <div className="flex absolute bottom-2 right-0">
            {/*=================== Buton Actualizar ==================*/}
            <BtnModificar id={session.user.id} />
          </div>
        </div>
      </div>

      {getModalContent()}
    </Card>
  );
}
