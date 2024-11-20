import { IconType } from "react-icons";
import { SidebardItem } from "./SidebardItem";
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
} from "react-icons/fa6";

// Mapeo de nombres de íconos a componentes de react-icons
const iconMapping: { [key: string]: IconType } = {
  FaCircleUser: FaCircleUser,
  FaUserGroup: FaUserGroup,
  FaUserSecret: FaUserSecret,
  FaBuildingUser: FaBuildingUser,
  FaPills: FaPills,
  FaTags: FaTags,
  FaCubes: FaCubes,
  FaTruckMedical: FaTruckMedical,
  FaUserTie: FaUserTie,
  FaCashRegister: FaCashRegister,
  FaMoneyCheckDollar: FaMoneyCheckDollar,
  FaFilePdf: FaFilePdf,
};

type Menu = {
  nombre: string;
  enlace: string;
  icon: string;
};

interface Props {
  menus: Menu[];
  isSideMenuOpen: boolean;
  enlace: string[];
}

export const LogicSideMenu = ({ menus, isSideMenuOpen, enlace }: Props) => {
  return (
    <div>
      {menus && menus.map((menu) => {
        if (!menu.icon) return null;
        // Obtén el component del icon desde el mapeo
        const IconComponent = iconMapping[menu.icon];
        const newMenu = {
          ...menu,
          icon: <IconComponent className={"text-2xl"} />,
        };
        if (enlace.includes(menu.enlace)) {
          return (
            <SidebardItem
              key={menu.enlace}
              {...newMenu}
              openMenu={isSideMenuOpen}
            />
          );
        }
      })}
    </div>
  );
};
