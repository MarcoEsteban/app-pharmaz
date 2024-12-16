import Link from "next/link";
import { FaCamera, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { HiUser } from "react-icons/hi2";
import { BiSolidUserRectangle } from "react-icons/bi";

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

import {
  BtnModificar,
  BtnPassword,
  Card,
  ImagenLoad,
  Modal,
  Title,
} from "@/components";
import { FormPasswd, FormPerfil, FormPhoto } from "@/components/perfil";
import { getByIdUser } from "@/actions";

interface Props {
  searchParams: {
    modal: string;
  };
}

export default async function PerfilPage({ searchParams }: Props) {
  // Params URL:
  const modal = searchParams.modal;
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  }

  const user = await getByIdUser(session.user.id);

  if (!user) {
    // Puedes redirigir o mostrar un mensaje de error
    redirect("/auth/login?returnTo=/perfil"); // O una página de error personalizada
  }

  const getModalContent = async () => {
    if (!modal) return null;

    // Destructuro el dato del Modal:
    const [modalType] = modal.split("/");

    if (modalType === "foto") {
      return (
        <Modal titleModal="Modificar Foto">
          <FormPhoto id={session.user.id} />
        </Modal>
      );
    }

    if (modalType === "password") {
      return (
        <Modal titleModal="Modificar Contraseña">
          <FormPasswd id={session.user.id} />
        </Modal>
      );
    }

    return (
      <Modal titleModal="Modificar Perfil" sizeModal="max-w-lg">
        <FormPerfil user={user} />
      </Modal>
    );
  };

  return (
    <Card>
      <Title title={"Perfil"} />

      <div className={"my-4 flex gap-10 w-full"}>
        <div className={"relative"}>
          {user.personas.foto
            ? (
              <ImagenLoad
                className="object-cover rounded-lg"
                src={user.personas.foto as string}
                alt={user.personas.foto as string}
                width={400}
                height={400}
              />
            )
            : (
              <HiUser
                className="rounded-lg text-white border bg-gray-600"
                size={350}
              />
            )}

          {/*============ Button ===========*/}
          <Link
            href={"/perfil/?modal=foto"}
            className={"btn-gnrl gradient-photo absolute bottom-2 right-1"}
          >
            <FaCamera size={20} />
          </Link>
        </div>

        <div className={"flex-2 font-sans relative"}>
          <div className={"w-full mb-8"}>
            <span className={"flex items-center gap-1 font-semibold"}>
              <FaUserCircle size={17} className={"text-blue-800"} />{" "}
              Nombre y Apellido
            </span>
            <p
              className={"border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide"}
            >
              {user.personas.nombre + " " + user.personas.ap + " " +
                user.personas.am}
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
                {user.email}
              </p>
            </div>

            <div className={"w-72 mb-8"}>
              <span className={"flex items-center gap-1 font-semibold"}>
                <FaPhoneFlip size={17} className={"text-blue-800"} /> Celular
              </span>
              <p
                className={"border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide"}
              >
                {user.personas.celular}
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
              {user && user.personas.direccion}
            </p>
          </div>

          <div className="flex absolute bottom-2 right-0">
            {/*=================== Buton Actualizar ==================*/}
            <BtnModificar id={session.user.id} />

            {/*=================== Buton Password ====================*/}
            <BtnPassword id={session.user.id} />
          </div>
        </div>
      </div>

      {getModalContent()}
    </Card>
  );
}
