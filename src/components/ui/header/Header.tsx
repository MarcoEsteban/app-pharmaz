"use client";

import { IconCart } from "@/components/ventas";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { FaArrowLeft, FaBell, FaCartPlus } from 'react-icons/fa';
// import { IoCartOutline } from 'react-icons/io5';

interface Props {
  nombre: string;
  ap: string;
  foto: string;
  rol: string;
}

export const Header = ({ nombre, ap, foto, rol }: Props) => {
  // Solucionando el Problema de la Rehidratacion:
  const [loaded, setLoaded] = useState(false);

  const pathname = usePathname();

  // Permita que el Servidor y el Cliente Renderize lo mismo
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <header
      className={clsx(
        // "w-full h-18 rounded-xl bg-white p-2.5 text-gray-700 shadow-xl flex justify-end items-center font-sans",
        "h-[7vh] md:h-[10vh] border-b-2 border-secundary-100 p-4 ml-4 flex items-center justify-end rounded-xl bg-white",
      )}
    >
      {/*========= Notificacion =========*/}
      {
        /*
      <div className={ "gradient text-white rounded-full p-2 cursor-pointer shadow-sm transition-all mr-3" }>
        <FaBell size={20} />
      </div>
      */
      }

      {/*============ Carrito ===========*/}
      {pathname === "/ventas" && <IconCart loaded={loaded} />}

      {/*============ Foto =============*/}
      <div className="flex p-1 ml-8 font-sans">
        <div className="flex flex-col justify-center mr-2">
          <h6 className=" leading-normal font-semibold ">{rol}</h6>
          <p className="leading-tight text-sm text-slate-400 text-end">
            {nombre + " " + ap}
          </p>
        </div>
        <div>
          <Image
            className="w-12 h-12 rounded-full"
            src={`/images/fotoPerfil1.png`}
            alt="Avatar"
            objectFit="cover"
            quality={90} // Incrementa la calidad de la imagen
            width={0}
            height={0}
          />
        </div>
      </div>
    </header>
  );
};
