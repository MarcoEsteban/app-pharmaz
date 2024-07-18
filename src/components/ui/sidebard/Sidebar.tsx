'use client';

import {
  FaArrowLeft,
  FaBuildingUser,
  FaCashRegister,
  FaCircleUser,
  FaCubes,
  FaFilePdf,
  FaFileMedical,
  FaMoneyCheckDollar,
  FaPills,
  FaSackDollar,
  FaStore,
  FaTags,
  FaTruckMedical,
  FaTruckRampBox,
  FaUserGroup,
  FaUserSecret,
  FaUserTie,
  FaUsers
} from 'react-icons/fa6';

import Link from 'next/link';
import clsx from 'clsx';

import { useSidebarStore } from '@/store';

import { SidebardItem } from './SidebardItem';
import { Accordion } from './AcordionMenu';
import { Menus } from '@/interfaces';
import Image from 'next/image';


const menus: Menus[] = [

  // Usuario
  {
    nombre: 'Gestión Perfil',
    icon: <FaCircleUser className={ "text-2xl" } />,
    enlace: '/dashboard/perfil',
  },
  {
    nombre: 'Gestión Roles',
    icon: <FaUserGroup className={ "text-2xl" } />,
    enlace: '/dashboard/roles',
  },
  {
    nombre: 'Gestión Usuario',
    icon: <FaUserSecret className={ "text-2xl" } />,
    enlace: '/dashboard/usuarios'
  },
  {
    nombre: 'Adm. Datos Farmacia',
    icon: <FaBuildingUser className={ "text-2xl" } />,
    enlace: '/dashboard/data_farmacia'
  },

  // Almacen
  {
    nombre: 'Gestión Producto',
    icon: <FaPills className={ "text-2xl" } />,
    enlace: '/dashboard/producto'
  },
  {
    nombre: 'Gestión Atributos',
    icon: <FaTags className={ "text-2xl" } />,
    enlace: '/dashboard/atributos'
  },
  {
    nombre: 'Gestión Lotes',
    icon: <FaCubes className={ "text-2xl" } />,
    enlace: '/dashboard/lotes'
  },

  // Compras
  {
    nombre: 'Gestión Proveedor',
    icon: <FaTruckMedical className={ "text-2xl" } />,
    enlace: '/dashboard/proveedor'
  },

  // Ventas
  {
    nombre: 'Gestión Cliente',
    icon: <FaUserTie className={ "text-2xl" } />,
    enlace: '/dashboard/cliente'
  },
  {
    nombre: 'Gestión Venta',
    icon: <FaCashRegister className={ "text-2xl" } />,
    enlace: '/dashboard/ventas'
  },
  {
    nombre: 'Adm. Ventas Realizadas',
    icon: <FaMoneyCheckDollar className={ "text-2xl" } />,
    enlace: '/dashboard/ventas_realizadas'
  },

  //Reportes
  {
    nombre: 'Gestión Reportes',
    icon: <FaFilePdf className={ "text-2xl" } />,
    enlace: '/dashboard/reportes'
  },
];

export const Sidebard = () => {

  // Zustand:
  const isSideMenuOpen = useSidebarStore( state => state.isSideMenuOpen );
  const toggleSideMenu = useSidebarStore( state => state.toggleSideMenu );


  return (
    <div className={ clsx(
      // "h-full relative rounded-xl bg-white p-3.5 pt-4 text-gray-700 shadow-xl duration-300 transition-all",
      "xl:h-[97vh] overflow-y-scroll xl:relative xl:w-auto h-full rounded-xl bg-white p-3.5 pt-4 text-gray-700 shadow-xl duration-300 transition-all",
      {
        // 'col-span-[40px]': !isSideMenuOpen,
        // 'col-span-[200px]': isSideMenuOpen
      },
    ) }>
      {/*=============================================== Button ===============================================*/ }
      {/* <FaArrowLeft
        className={ clsx(
          "gradient text-white text-2xl rounded-full absolute -right-4 top-8 p-1 cursor-pointer shadow-sm transition-all",
          { 'rotate-180': !isSideMenuOpen }
        ) }
        onClick={ () => toggleSideMenu( !isSideMenuOpen ) }
      /> */}


      {/*================================================ Logo ================================================*/ }
      <Link href='/dashboard' className={ clsx(
        "flex items-center w-auto border-b-gray-300 transition-all duration-300",
      ) }>
        {
          !isSideMenuOpen
            ? (
              <Image
                src="/images/PHARMAZ.jpg"
                className={ "object-cover" }
                alt="Logo"
                width={ 230 }
                height={ 0 }
              />
            )
            : (
              <Image
                src="/images/ICON-PHARMAZ.jpg"
                alt="Logo"
                width={ 50 }
                height={ 50 }
              />
            )
        }
      </Link>
      <hr className={ clsx(
        'mb-4',
        { 'mt-2': isSideMenuOpen, 'mt-3': !isSideMenuOpen }
      ) } />


      {/*================================================ Menu ================================================*/ }
      <nav className="flex flex-col gap-1 font-sans ">

        <Accordion
          title={ "Usuarios" }
          icon={ <FaUsers className={ clsx( "text-xl" ) } /> }
          openMenu={ isSideMenuOpen }>
          {
            menus.slice( 0, 4 ).map( menu => (
              <SidebardItem key={ menu.enlace } { ...menu } openMenu={ isSideMenuOpen } />
            ) )
          }
        </Accordion>


        <Accordion title={ "Almacen" } icon={ <FaStore className={ "text-xl" } /> } openMenu={ isSideMenuOpen }>
          {
            menus.slice( 4, 7 ).map( menu => (
              <SidebardItem key={ menu.enlace } { ...menu } openMenu={ isSideMenuOpen } />
            ) )
          }
        </Accordion>

        <Accordion title={ "Compras" } icon={ <FaTruckRampBox className={ "text-xl" } /> } openMenu={ isSideMenuOpen }>
          {
            menus.slice( 7, 8 ).map( menu => (
              <SidebardItem key={ menu.enlace } { ...menu } openMenu={ isSideMenuOpen } />
            ) )
          }
        </Accordion>

        <Accordion title={ "Ventas" } icon={ <FaSackDollar className={ "text-xl" } /> } openMenu={ isSideMenuOpen }>
          {
            menus.slice( 8, 11 ).map( menu => (
              <SidebardItem key={ menu.enlace } { ...menu } openMenu={ isSideMenuOpen } />
            ) )
          }
        </Accordion>

        <Accordion title={ "Reportes" } icon={ <FaFileMedical className={ "text-xl" } /> } openMenu={ isSideMenuOpen }>
          {
            menus.slice( 11, 12 ).map( menu => (
              <SidebardItem key={ menu.enlace } { ...menu } openMenu={ isSideMenuOpen } />
            ) )
          }
        </Accordion>

      </nav>
    </div>
  );
};
