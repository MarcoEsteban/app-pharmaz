"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaCamera, FaCartPlus, FaEye } from "react-icons/fa";
import {
  FaArrowLeft,
  FaFloppyDisk,
  FaNotesMedical,
  FaPenToSquare,
  FaPlus,
  FaUnlockKeyhole,
  FaXmark,
} from "react-icons/fa6";

// Este hook obtiene los parámetros de la URL actual, incluyendo el parámetro de paginación
const usePageParam = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const query = searchParams.get("query");
  const filtro = searchParams.get("filtro");

  // let params = '';
  //
  // params += page ? `page=${page}&` : '';
  // params += query ? `query=${query}&` : '';
  // params += filtro ? `filtro=${filtro}&` : '';
  // Elimina el último & si existe
  // return params ? `?${params.slice(0, -1)}` : '';

  const pageParam = page ? `&page=${page}` : "";
  const queryParam = query ? `&query=${query}` : "";
  const filtroParam = filtro ? `&filtro=${filtro}` : "";

  const urlParams = `${pageParam}${queryParam}${filtroParam}`;

  // Eliminamos el primer & si existe
  return urlParams ? `&${urlParams.slice(1)}` : "";
};

export const BtnGuardar = () => {
  return (
    <button
      type="submit"
      className="btn gradient-guardar flex gap-1"
    >
      <FaFloppyDisk size={16} /> Guardar
    </button>
  );
};

export const BtnCancelar = () => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?${pageParam}`}
      className="btn gradient-cancelar flex"
    >
      <FaXmark size={18} /> Cancelar
    </Link>
  );
};

export const BtnVolver = () => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?${pageParam}`}
      className="btn gradient-cancelar flex"
    >
      <FaArrowLeft size={18} /> Volver
    </Link>
  );
};

interface Props {
  params: string;
  className: string;
  children: React.ReactNode;
}

export const BtnAction = ({ params, className, children }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname + params}`}
      className={`btn-gnrl ${className}`}
    >
      {children}
    </Link>
  );
};

export const BtnAgregar = () => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?modal=agregar${pageParam}`}
      className="btn gradient-add flex items-center gap-2 font-semibold tracking-wide"
    >
      Agregar
      <FaPlus />
    </Link>
  );
};

export const BtnModificar = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?modal=editar/${id}${pageParam}`}
      className="btn-gnrl gradient-update"
    >
      <FaPenToSquare size={18} />
    </Link>
  );
};

export const BtnVer = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?modal=ver/${id}${pageParam}`}
      className="btn-gnrl gradient-show"
    >
      <FaEye size={18} />
    </Link>
  );
};

export const BtnPhoto = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?modal=foto/${id}${pageParam}`}
      className="btn-gnrl gradient-photo"
    >
      <FaCamera size={18} />
    </Link>
  );
};

export const BtnPassword = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?modal=password/${id}${pageParam}`}
      className="btn-gnrl gradient"
    >
      <FaUnlockKeyhole size={18} />
    </Link>
  );
};

export const BtnLote = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?modal=lote/${id}${pageParam}`}
      className="btn-gnrl gradient"
    >
      <FaNotesMedical size={18} />
    </Link>
  );
};

export const BtnLoteEdit = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const pageParam = usePageParam();

  return (
    <Link
      href={`${pathname}?modal=lote/${id}${pageParam}`}
      className="btn-gnrl gradient"
    >
      <FaPenToSquare size={18} />
    </Link>
  );
};

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const TooltipButton = () => {
  return (
    <div className="relative flex justify-center items-center">
      <button
        data-tooltip-id="tooltip-animation"
        data-tooltip-content="Agregar al carrito"
        type="button"
        className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Agregar
        <FaCartPlus size={18} />
      </button>

      {
        /*
      <Tooltip
        id="tooltip-animation"
        place="top"
        className="bg-gray-600 text-white px-2 py-1 rounded-lg shadow-lg transition-opacity duration-300"
        // float={true} // Asegura que el tooltip se posicione de forma dinámica
        offset={6} // Ajusta la distancia entre el tooltip y el botón
      />
      */
      }
    </div>
  );
};
