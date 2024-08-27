
import { RolMe } from "@/interfaces";
import clsx from "clsx";
import { IconType } from "react-icons";
import {
  FaBuildingUser,
  FaCashRegister,
  FaCircleUser,
  FaCubes,
  FaFilePdf,
  FaMoneyCheckDollar,
  FaPills,
  FaTags,
  FaTruckMedical,
  FaUserGroup,
  FaUserSecret,
  FaUserTie,
} from 'react-icons/fa6';


const iconMenusMapping: {[ key: string ]: IconType} = {
  // Usuario
  FaUserGroup: FaUserGroup,
  FaUserSecret: FaUserSecret, 
  FaBuildingUser: FaBuildingUser,
  // Almacen
  FaPills: FaPills,
  FaTags: FaTags,
  FaCubes: FaCubes,
  // Compras
  FaTruckMedical: FaTruckMedical,
  // Ventas
  FaUserTie: FaUserTie,
  FaCashRegister: FaCashRegister,
  FaMoneyCheckDollar: FaMoneyCheckDollar,
  // Reportes
  FaCircleUser: FaCircleUser,
  FaFilePdf: FaFilePdf,
};

interface Props {
  // roles: Partial<RolMe>;
  roles: RolMe;
}

export const ItemMenus = ({ roles }: Props) => {
  return (
    <div className={ "w-full my-2 grid grid-cols-1 md:grid-cols-2 gap-2" }>

      {
        roles.menus.map( menu => {
          const IconCompenent = iconMenusMapping[menu.icon]
          const newMenu = {
            ...menu,
            enlace: menu.enlace,
            icon: <IconCompenent size={22} />
          }

          return (
            <div className={"gradient text-white rounded-md flex p-2 gap-3 items-center"}>
              { newMenu.icon }
              { menu.nombre }
            </div>
          )

        })
      }
    </div>
  )
}
