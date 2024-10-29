'use client';

import { IconCart } from '@/components/ventas';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaBell, FaCartPlus } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';

export const Header = () => {
  
  // Solucionando el Problema de la Rehidratacion:
  const [ loaded, setLoaded ] = useState( false );

  // Permita que el Servidor y el Cliente Renderize lo mismo
  useEffect( () => {
    setLoaded( true );
  }, [] );
  
  return (
    <header className={ clsx(
      // "w-full h-18 rounded-xl bg-white p-2.5 text-gray-700 shadow-xl flex justify-end items-center font-sans",
      "h-[7vh] md:h-[10vh] border-b-2 border-secundary-100 p-4 ml-4 flex items-center justify-end rounded-xl bg-white"
    ) }>

      {/*========= Notificacion =========*/ }
      {/*
      <div className={ "gradient text-white rounded-full p-2 cursor-pointer shadow-sm transition-all mr-3" }>
        <FaBell size={20} />
      </div>
      */}
      
      {/*============ Carrito ===========*/ }
      <IconCart loaded={loaded} />
      
      {/*============ Foto =============*/ }
      <div className="flex p-1 ml-8 font-sans">
        <div className="flex flex-col justify-center mr-2">
          <h6 className=" leading-normal font-semibold ">Administrador</h6>
          <p className="leading-tight text-xs text-slate-400 text-end">Marco Campos</p>
        </div>
        <div>
          <Image
            className="object-cover h-14 w-14 rounded-full"
            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
            width={ 8 }
            height={ 8 }
          />
        </div>
      </div>

    </header>
  );
};

        // <button 
        //   // href={
        //   //   ( (getTotalItem === 0) && loaded)
        //   //     ? '/empty'
        //   //     : '/cart'
        //   // } 
        //   className="mx-2"
        // >
        //   <div className="relative">
        //     {
        //       (loaded &&  getTotalItem > 0) && (
        //         <span className="fade-in absolute -top-2 -right-2 px-1 text-xs rounded-full font-bold bg-blue-700 text-white">
        //           { getTotalItem }
        //         </span>
        //       )
        //     }
        //     <IoCartOutline className="w-5 h-5" />
        //   </div>
        // </button>

