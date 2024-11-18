// import Image from "next/image";
import { BtnVolver, ButtonState } from "@/components";
import { FaUserCircle } from "react-icons/fa";
import { Proveedor } from "@/interfaces";

interface Props {
  proveedor: Partial<Proveedor>;
}

export const Show = ({ proveedor }: Props) => {
  console.log({ proveedor });

  if (!proveedor || proveedor.estado === undefined) {
    return;
  }

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
            {proveedor?.nombre}
          </h6>
          <p className="mb-0 text-slate-500">{proveedor?.email}</p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold">NIT:</span> {proveedor?.nit}
          </p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold">CELULAR:</span> {proveedor?.celular}
          </p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold mr-2">DIRECCION:</span>
            {proveedor?.direccion}
          </p>
        </div>

        <div className="flex gap-8 justify-between bg-gray-200 w-full p-1.5 px-2 rounded-lg mb-2">
          <p className="text-gray-500">
            <span className="font-bold mr-2">ESTADO:</span>
            <ButtonState estado={proveedor?.estado} />
          </p>
        </div>
      </div>

      <div className={"flex justify-end gap-4 pt-2"}>
        <BtnVolver />
      </div>
    </>
  );
};
