import { toggleStateLote } from "@/actions";
import { BtnLoteEdit } from "@/components";
import { ButtonActionToglgleState } from "@/components/ui/button/ButtonActionToglgleState";
import { LoteProducto } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import {
  FaCalendarDay,
  FaCopyright,
  FaCubes,
  FaDochub,
  FaFlask,
  FaMortarPestle,
  FaPills,
  FaSyringe,
} from "react-icons/fa";
import {
  FaCalendarDays,
  FaCalendarXmark,
  FaTruckMedical,
} from "react-icons/fa6";

interface Props {
  lote: LoteProducto;
}

export const ItemCardLote = ({ lote }: Props) => {
  return (
    <div className="flex max-w-auto max-h-auto flex-col bg-gray-200 bg-clip-border text-gray-700 shadow-lg border rounded-xl justify-between">
      <div
        className={clsx(
          "flex justify-between boder rounded-t-xl",
          { "bg-red-500 text-gray-200": !lote.estado },
        )}
      >
        {/*========================== Icon ==========================*/}
        <div className="p-4 flex-1">
          <h4 className="block font-sans font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            CODIGO: {lote.id?.split("-").at(-1)}
          </h4>
          <p className="mt-3 flex items-center gap-2 font-sans text-xl font-normal antialiased">
            <FaCubes /> {lote.stock}
          </p>
          <h4 className="block font-sans text-xl leading-snug tracking-normal text-blue-gray-900 antialiased">
            {lote.nombre}
          </h4>
          <p className="mt-2 flex flex-col gap-1 text-sm font-sans tracking-wide antialiased">
            <span className="flex gap-1">
              <FaMortarPestle size={20} /> Concentracion: {lote.concentracion}
            </span>
            <span className="flex gap-1 uppercase">
              <FaDochub size={20} /> Descripcion: {lote.adicional}
            </span>
            <span className="flex gap-1">
              <FaFlask size={20} /> Laboratorio: {lote.laboratorio}
            </span>
            <span className="flex gap-1">
              <FaCopyright size={20} /> Tipo: {lote.tipo}
            </span>
            <span className="flex gap-1">
              <FaPills size={20} /> Presentacion: {lote.presentacion}
            </span>
            <span className="flex gap-1">
              <FaSyringe size={20} /> Via Administracion:{" "}
              {lote.viaAdministracion}
            </span>
            <span className="flex gap-1">
              <FaTruckMedical size={20} /> Proveedor: {lote.proveedorId}
            </span>
            <span className="flex gap-1">
              <FaCalendarXmark size={20} />Vencimiento: {lote.vencimiento}
            </span>
            <span className="flex gap-1">
              <FaCalendarDays size={20} /> Mes: {lote.mes}
            </span>
            <span className="flex gap-1">
              <FaCalendarDay size={20} /> Dia: {lote.dia}
            </span>
          </p>
        </div>

        {/*========================== Imagen ==========================*/}
        <div className="flex-2 pr-2 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none my-auto">
          <Image
            className="object-cover w-40 h-40 rounded-full mx-auto "
            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
            width={0}
            height={0}
          />
        </div>
      </div>

      {/* Button  */}
      <div
        className={clsx(
          "flex items-center justify-end px-3 py-2 bg-gray-300 rounded-b-xl",
          { "bg-red-600 text-gray-200": !lote.estado },
        )}
      >
        {/*============= Buton Eliminar || Habilitar =============*/}
        <ButtonActionToglgleState
          id={lote.id ?? ""}
          nombre={lote.nombre}
          estado={lote.estado}
          toggleActionState={toggleStateLote}
        />

        {/*================= Buton Agregar Lote ==================*/}
        <BtnLoteEdit id={lote.id ?? ""} />
      </div>
    </div>
  );
};
