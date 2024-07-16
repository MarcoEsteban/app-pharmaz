import clsx from 'clsx';
import Image from 'next/image';
import { FaArrowLeft, FaBell, FaCartPlus } from 'react-icons/fa';

export const Header = () => {
  return (
    <div className={ clsx(
      "w-full h-18 rounded-xl bg-white p-2.5 text-gray-700 shadow-xl flex justify-end items-center font-sans",
    ) }>

      {/*========= Notificacion =========*/ }
      <div className={ "gradient text-white rounded-full p-2 cursor-pointer shadow-sm transition-all mr-4" }>
        <FaBell />
      </div>
      {/*============ Carrito ===========*/ }
      <div className={ "gradient text-white rounded-full p-2 cursor-pointer shadow-sm transition-all mr-6" }>
        <FaCartPlus />
      </div>

      {/*=+=========== Foto =============*/ }
      <div className="flex p-1 ">
        <div className="flex flex-col justify-center mr-2">
          <h6 className=" leading-normal font-semibold ">Administrador</h6>
          <p className="leading-tight text-xs text-slate-400 text-end">Marco Campos</p>
        </div>
        <div>
          <Image
            className="object-cover text-white text-sm h-12 w-12 rounded-full border-1 border-indigo-500/100"
            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
            width={ 8 }
            height={ 8 }
          />
        </div>
      </div>

    </div>
  );
};