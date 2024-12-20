import { BtnVolver, ButtonState, ImagenLoad } from "@/components";
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

  console.log({ proveedor });

  return (
    <>
      <div className="flex flex-col items-center p-1 ">
        <div>
          {proveedor.foto
            ? (
              <ImagenLoad
                className="h-32 w-32 rounded-full object-cover"
                src={proveedor.foto}
                alt={proveedor.foto}
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
