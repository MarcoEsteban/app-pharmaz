import {
  FaAppStoreIos,
  FaCopyright,
  FaCubes,
  FaFlask,
  FaMortarPestle,
  FaPills,
  FaSyringe,
} from "react-icons/fa";
import {
  BtnLote,
  BtnModificar,
  BtnPhoto,
  ButtonActionToglgleState,
  ImagenLoad,
} from "@/components";
import clsx from "clsx";
import { toggleStateProducto } from "@/actions";
import { Producto } from "@/interfaces";

interface Props {
  producto: Producto;
}

export const ItemCardProducto = ({ producto }: Props) => {
  return (
    <div className="flex max-w-auto max-h-auto flex-col bg-gray-200 bg-clip-border text-gray-700 shadow-lg border rounded-xl justify-between">
      <div
        className={clsx(
          "flex justify-between boder rounded-t-xl",
          { "bg-red-500 text-gray-200": !producto.estado },
        )}
      >
        <div className="p-4 flex-1">
          <p className=" flex items-center gap-2 font-sans text-xl font-bold antialiased">
            <FaCubes /> {producto.stock}
          </p>
          <h4 className="block font-sans text-xl uppercase leading-snug tracking-normal text-blue-gray-900 antialiased">
            {producto.nombre}
          </h4>
          <p className=" flex items-center gap-2 font-sans text-2xl font-bold antialiased">
            {/* <ImagenLoad */}
            {/*   className="object-cover" */}
            {/*   src={`/images/boliviano.png`} */}
            {/*   alt="moneda-boliviano" */}
            {/*   width={25} */}
            {/*   height={25} */}
            {/* /> */}
            <span className="font-bold">Bs</span>
            {producto.precio}
          </p>
          <div className="mt-2 flex flex-col text-sm gap-1 font-sans tracking-wide antialiased">
            {producto.concentracion &&
              (
                <p className="flex gap-1">
                  <FaMortarPestle size={20} /> Concentracion:{" "}
                  <span>{producto.concentracion}</span>
                </p>
              )}
            <p className="flex gap-1">
              <FaAppStoreIos size={20} /> Adicional:{" "}
              <span className="uppercase">{producto.adicional}</span>
            </p>

            {producto.presentacionId &&
              (
                <p className="flex gap-1">
                  <FaPills size={20} /> Presentacion:{" "}
                  <span className="uppercase">{producto.presentacionId}</span>
                </p>
              )}

            {producto.tipo &&
              (
                <p className="flex gap-1">
                  <FaCopyright size={20} /> Tipo: {producto.tipo}
                </p>
              )}
            <p className="flex gap-1">
              <FaFlask size={20} /> Laboratorio:{" "}
              <span className="uppercase">{producto.laboratoriosId}</span>
            </p>

            {producto.tipo &&
              (
                <p className="flex gap-1">
                  <FaSyringe size={20} /> Clasificación:{" "}
                  {producto.clasificacionId}
                </p>
              )}
          </div>
        </div>

        <div className="flex-3 rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none my-auto pr-2">
          <ImagenLoad
            className="object-cover w-40 h-40 rounded-full mx-auto "
            src={producto.foto as string}
            alt={producto.foto as string}
            width={900}
            height={900}
          />
        </div>
      </div>

      {/* Button  */}
      <div
        className={clsx(
          "flex items-center justify-end px-3 py-2 bg-gray-300 rounded-b-xl",
          { "bg-red-600 text-gray-200": !producto.estado },
        )}
      >
        {/*============= Buton Eliminar || Habilitar =============*/}
        <ButtonActionToglgleState
          id={producto.id ?? ""}
          nombre={producto.nombre}
          estado={producto.estado}
          toggleActionState={toggleStateProducto}
        />

        {/*=================== Buton Actualizar ==================*/}
        <BtnModificar id={producto.id ?? ""} />

        {/*================= Buton Agregar Lote ==================*/}
        <BtnLote id={producto.id ?? ""} />

        {/*===================== Buton Foto ======================*/}
        <BtnPhoto id={producto.id ?? ""} />
      </div>
    </div>
  );
};
