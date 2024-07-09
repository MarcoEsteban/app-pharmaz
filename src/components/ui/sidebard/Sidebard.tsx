'use client';

import { FaArrowLeft, FaArtstation, FaTruckMedical, FaUserGroup, FaUserSecret, FaUserTie } from 'react-icons/fa6';
import { SidebardItem } from './SidebardItem';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';
import { useSidebarStore } from '@/store';


const menus = [
  {
    nombre: 'Roles',
    icon: <FaUserGroup size={ 20 } className={"text-3xl"} />,
    enlace: '/dashboard/roles',
    active: true
  },
  {
    nombre: 'Usuario',
    icon: <FaUserSecret size={ 20 } />,
    enlace: '/dashboard/usuarios'
  },
  {
    nombre: 'Cliente',
    icon: <FaUserTie size={ 20 } />,
    enlace: '/cliente'
  },
  {
    nombre: 'Proveedor',
    icon: <FaTruckMedical size={ 20 } />,
    enlace: '/proveedor'
  }
];

export const Sidebard = () => {

  // Zustand:
  const isSideMenuOpen = useSidebarStore( state => state.isSideMenuOpen );
  const toggleSideMenu = useSidebarStore( state => state.toggleSideMenu );


  return (
    <div className={ clsx(
      "h-full rounded-xl bg-white p-4 pt-5 text-gray-700 shadow-xl relative duration-300",
      {
        'w-72': isSideMenuOpen,
        'w-20': !isSideMenuOpen
      },
    ) }>

      {/*=============================================== Button ===============================================*/ }
      <FaArrowLeft
        className={ clsx(
          "bg-indigo-500 text-white text-2xl rounded-full absolute -right-3 top-6 p-1 cursor-pointer shadow-sm transition-all",
          { 'rotate-180': !isSideMenuOpen }
        ) }
        onClick={ () => toggleSideMenu( !isSideMenuOpen ) }
      />


      {/*================================================ Logo ================================================*/ }
      <Link href='/dashboard' className={ clsx(
        "flex items-center w-full gap-4 p-1 mb-6",
      ) }>
        <FaArtstation className="text-4xl cursor-pointer" />
        <h5 className={ clsx(
          "text-3xl font-medium transition-all duration-500",
          { 'hidden': !isSideMenuOpen }
        ) }>
          Sidebar
        </h5>
      </Link>


      {/*================================================ Menu ================================================*/ }
      <nav className="flex flex-col gap-1 p-2 font-sans ">
        <hr className="my-2 border-blue-gray-50" />  

        {
          menus.map( menu => (
            <SidebardItem key={ menu.enlace } { ...menu } openMenu={isSideMenuOpen} />
          ) )
        }

      </nav>
    </div>
  );
};