"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  FaArrowLeft,
  FaFileMedical,
  FaSackDollar,
  FaStore,
  FaTruckRampBox,
  FaUsers,
} from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { useSidebarStore } from "@/store";
import { logout } from "@/actions";
import { Accordion } from "./AcordionMenu";
import { LogicSideMenu } from "./LogicSideMenu";

type Menu = {
  nombre: string;
  enlace: string;
  icon: string;
};

interface Props {
  img: string | null;
  nombrePharma: string | null;
  menus: Menu[];
}

export const Sidebard = ({ img, nombrePharma, menus }: Props) => {
  // Zustand:
  const isSideMenuOpen = useSidebarStore((state) => state.isSideMenuOpen);
  const toggleSideMenu = useSidebarStore((state) => state.toggleSideMenu);

  const usuarios = ["/perfil", "/roles", "/usuarios", "/data_farmacia"];
  const almacen = ["/producto", "/lotes", "/atributos"];
  const compras = ["/proveedor"];
  const ventas = ["/cliente", "/ventas", "/ventas_realizadas"];
  const reporte = ["/reportes"];

  console.log({ menus });

  return (
    <div
      className={clsx(
        "h-full relative rounded-xl bg-white p-3.5 pt-4 text-gray-700 shadow-xl duration-300 transition-all",
        // "xl:h-[97vh] overflow-y-scroll xl:relative xl:w-auto h-full rounded-xl bg-white p-3.5 pt-4 text-gray-700 shadow-xl duration-300 transition-all",
        // {
        //   "col-span-[40px]": !isSideMenuOpen,
        //   "col-span-[20px]": isSideMenuOpen,
        // },
      )}
    >
      {/*=============================================== Button ===============================================*/}
      {
        <FaArrowLeft
          className={clsx(
            "gradient text-white text-2xl rounded-full absolute -right-3 top-8 p-1 cursor-pointer shadow-sm transition-all",
            { "rotate-180": !isSideMenuOpen },
          )}
          onClick={() => toggleSideMenu(!isSideMenuOpen)}
        />
      }

      {/*================================================ Logo ================================================*/}
      <Link
        href="/"
        className={clsx(
          "flex items-center w-auto border-b-gray-300 transition-all duration-300",
        )}
      >
        {!isSideMenuOpen
          ? (
            <div className="flex justify-center items-center gap-2 py-2">
              <Image
                // src="/images/ICON-PHARMAZ.jpg"
                src={img as string}
                alt={img as string}
                width={50}
                height={50}
              />
              <div className="text-4xl font-sans font-semibold">
                <span className="bg-clip-text text-transparent gradient uppercase">
                  {nombrePharma}
                </span>
              </div>
            </div>
          )
          : (
            <div className="flex w-full justify-center">
              <Image
                className="flex justify-center"
                src={img as string}
                alt="Logo"
                width={50}
                height={50}
              />
            </div>
          )}
      </Link>
      <hr
        className={clsx(
          "mb-4",
          { "mt-2": isSideMenuOpen, "mt-3": !isSideMenuOpen },
        )}
      />

      {/*================================================ Menu ================================================*/}
      <nav className="flex flex-col gap-1 font-sans ">
        <Accordion
          title={"Usuarios"}
          icon={<FaUsers className={clsx("text-xl")} />}
          openMenu={isSideMenuOpen}
          enlace={usuarios}
        >
          <LogicSideMenu
            menus={menus}
            isSideMenuOpen={isSideMenuOpen}
            enlace={usuarios}
          />
        </Accordion>

        <Accordion
          title={"Almacen"}
          icon={<FaStore className={"text-xl"} />}
          openMenu={isSideMenuOpen}
          enlace={almacen}
        >
          <LogicSideMenu
            menus={menus}
            isSideMenuOpen={isSideMenuOpen}
            enlace={almacen}
          />
        </Accordion>

        <Accordion
          title={"Compras"}
          icon={<FaTruckRampBox className={"text-xl"} />}
          openMenu={isSideMenuOpen}
          enlace={compras}
        >
          <LogicSideMenu
            menus={menus}
            isSideMenuOpen={isSideMenuOpen}
            enlace={compras}
          />
        </Accordion>

        <Accordion
          title={"Ventas"}
          icon={<FaSackDollar className={"text-xl"} />}
          openMenu={isSideMenuOpen}
          enlace={ventas}
        >
          <LogicSideMenu
            menus={menus}
            isSideMenuOpen={isSideMenuOpen}
            enlace={ventas}
          />
        </Accordion>

        <Accordion
          title={"Reportes"}
          icon={<FaFileMedical className={"text-xl"} />}
          openMenu={isSideMenuOpen}
          enlace={reporte}
        >
          <LogicSideMenu
            menus={menus}
            isSideMenuOpen={isSideMenuOpen}
            enlace={reporte}
          />
        </Accordion>

        {/*Esta Temporalmente Luego Borrar*/}
        {/* Logout */}
        <div className="h-full flex items-end text-white">
          <button
            onClick={() => logout()}
            className="mb-2 px-3 py-1.5 flex justify-center items-center gap-4 rounded-md font-bold bg-blue-800 hover:bg-blue-900 w-full"
          >
            {!isSideMenuOpen
              ? (
                <>
                  <CiLogout size={24} /> <span className="text-lg ">Salir</span>
                </>
              )
              : <CiLogout size={24} />}
          </button>
        </div>
      </nav>
    </div>
  );
};
