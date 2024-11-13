import Image from "next/image";
import { BtnVolver, ButtonState } from "@/components";
import { FaUserCircle } from "react-icons/fa";
import { getByIdUser } from "@/actions";
import { Usuario } from "@prisma/client";

interface Props {
  usuario: Partial<Usuario>;
}

export const Show = async ({ usuario }: Props) => {
  if (!usuario || !usuario.id) {
    return;
  }

  const user = await getByIdUser(usuario.id);

  return (
    <>
      <div className="flex flex-col items-center p-1 ">
        <div>
          {/* <Image */}
          {/*   className="object-cover h-24 w-24 rounded-full" */}
          {/*   src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" */}
          {/*   alt="" */}
          {/*   width={ 8 } */}
          {/*   height={ 8 } */}
          {/* /> */}

          <FaUserCircle
            className="object-cover h-24 w-24 rounded-full text-gray-600"
            size={28}
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-2">
          <h6 className="mb-0 leading-normal text-lg ">
            {user?.personas.nombre + " " + user?.personas.ap}
          </h6>
          <p className="mb-0 text-slate-500">{user?.email}</p>
        </div>
        <div className="flex gap-8 justify-between bg-gray-300 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold">CI:</span> {user?.personas.ci}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">ROL:</span> {user?.rol}
          </p>
        </div>
        <div className="flex gap-8 justify-between bg-gray-300 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold">CELULAR:</span> {user?.personas.celular}
          </p>
          <p className="text-gray-500">
            <span className="font-bold mr-2">ESTADO:</span>
            <ButtonState estado={user?.personas.estado} />
          </p>
        </div>
        <div className="flex gap-8 justify-between bg-gray-300 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold mr-2">DIRECCION:</span>
            {user?.personas.direccion}
          </p>
        </div>
      </div>

      <div className={"flex justify-end gap-4 pt-2"}>
        <BtnVolver />
      </div>
    </>
  );
};

