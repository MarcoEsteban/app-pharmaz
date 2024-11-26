"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

interface Props {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  openMenu: boolean;
  enlace: string[];
}

export const Accordion = (
  { title, children, icon, openMenu, enlace }: Props,
) => {
  // State
  const [acordionOpen, setAcordionOpen] = useState(true);
  // const pathname = usePathname();
  // const atribu = pathname.split("/").at(1);
  // console.log({ atribu });
  // console.log({ acordionOpen });

  return (
    <div className="max-w-md mb-2">
      <div
        onClick={() => setAcordionOpen(!acordionOpen)}
        className="flex items-center bg-slate-200 px-2 rounded-lg justify-between text-gray-600 w-full overflow-hidden mt-32 md:mt-0 cursor-pointer font-semibold"
      >
        {/* Icon y Nombre del Acordion */}
        <div
          className={clsx(
            "flex items-center gap-3 transition-all duration-300",
            { "justify-center py-2.5 w-full": openMenu, "py-2": !openMenu },
          )}
        >
          {icon}

          <span
            className={clsx(
              // { 'max-w-96 transition-all duration-300': openMenu, 'max-w-0': !openMenu },
              { "hidden": openMenu },
            )}
          >
            {title}
          </span>
        </div>

        {/* Icon Abrir y Cerrar Acordion */}
        <div
          className={clsx(
            "w-6 transform transition duration-300 ease-in-out",
            { "-rotate-90": !acordionOpen },
            { "hidden": openMenu },
          )}
        >
          <FaChevronLeft />
        </div>
      </div>

      <div
        className={clsx(
          ` overflow-hidden transition-max-height duration-300 ease-in-out pt-1`,
          {
            "max-h-96 transition-all duration-300": !acordionOpen,
            "max-h-0": acordionOpen,
          },
          { "pl-2": !openMenu, "pl-0": openMenu },
        )}
      >
        {children}
      </div>
    </div>
  );
};
