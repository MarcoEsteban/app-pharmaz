import Image from "next/image";
import { BtnVolver, ButtonState } from "@/components";
import { FaUserCircle } from "react-icons/fa";
import { getByIdUser } from "@/actions";
import { Usuario } from "@/interfaces";

interface Props {
  usuario: Partial<Usuario>;
}

export const Show = async ({ usuario }: Props) => {
  if (!usuario || !usuario.id) {
    return;
  }

  const user = await getByIdUser(usuario.id);

  if (!user) {
    return;
  }

  return (
    <>
      <div className="flex flex-col items-center p-1 ">
        <div>
          {usuario.personas?.foto
            ? (
              <Image
                className="h-32 w-32 rounded-full object-cover"
                src={usuario.personas?.foto}
                alt=""
                width={96}
                height={96}
              />
            )
            : (
              <FaUserCircle
                className="object-cover h-24 w-24 rounded-full text-gray-600"
                size={28}
              />
            )}
        </div>
        <div className="flex flex-col items-center justify-center mb-2">
          <h6 className="mb-0 leading-normal text-lg ">
            {user?.personas.nombre + " " + user?.personas.ap}
          </h6>
          <p className="mb-0 text-slate-500">{user?.email}</p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold">CI:</span> {user?.personas.ci}
          </p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold">ROL:</span> {user?.rol}
          </p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold">CELULAR:</span> {user?.personas.celular}
          </p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold mr-2">DIRECCION:</span>
            {user?.personas.direccion}
          </p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold mr-2">ESTADO:</span>
            <ButtonState estado={user?.personas.estado} />
          </p>
        </div>
      </div>

      <div className={"flex justify-end gap-4 pt-2"}>
        <BtnVolver />
      </div>
    </>
  );
};
