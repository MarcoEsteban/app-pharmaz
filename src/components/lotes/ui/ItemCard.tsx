
import { BtnAction } from '@/components';
import { ButtonActionToglgleState } from '@/components/ui/button/ButtonActionToglgleState';
import Image from 'next/image';
import { FaCalendarDay, FaCopyright, FaCubes, FaDochub, FaFlask, FaMortarPestle, FaPills, FaSyringe } from 'react-icons/fa';
import { FaCalendarDays, FaPenToSquare, FaTruckMedical } from 'react-icons/fa6';

export const ItemCard = () => {
  return (
    <div className="flex max-w-auto p-2 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className={ 'flex justify-between' }>

        <div className="p-4 flex-1">
          {/*================ Codigo ================*/ }
          <h4 className="block font-sans font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Codigo 431
          </h4>
          <p className="mt-3 flex items-center gap-2 font-sans text-xl font-normal text-gray-700 antialiased">
            <FaCubes /> 14
          </p>
          <h4 className="block font-sans text-2xl  leading-snug tracking-normal text-blue-gray-900 antialiased">
            Paracetamol
          </h4>
          <p className="mt-2 flex flex-col gap-1 font-sans tracking-wide text-gray-700 antialiased">
            <span className="flex gap-1"><FaMortarPestle size={ 20 } /> Concentracion: 0.5g</span>
            <span className="flex gap-1"><FaDochub size={ 20 } /> Descripcion: Caja Envase Blister Tableta</span>
            <span className="flex gap-1"><FaFlask size={ 20 } /> Laboratorio: Cofar</span>
            <span className="flex gap-1"><FaCopyright size={ 20 } /> Tipo: Comercial</span>
            <span className="flex gap-1"><FaPills size={ 20 } /> Presentacion: Tableta</span>
            <span className="flex gap-1"><FaSyringe size={ 20 } /> Via Administracion: Oral</span>
            <span className="flex gap-1"><FaTruckMedical size={ 20 } /> Proveedor: Joseluis</span>
            <span className="flex gap-1"><FaCalendarDays size={ 20 } /> Mes: 1</span>
            <span className="flex gap-1"><FaCalendarDay size={ 20 } /> Dia: 5</span>
          </p>
        </div>

        <div className="flex-1 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none my-auto">
          <Image
            className="object-cover w-48 h-48 rounded-full mx-auto "
            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
            width={ 0 }
            height={ 0 }
          />
        </div>
      </div>

      {/* Button  */ }
      <div className="flex items-center justify-end p-2">
        <ButtonActionToglgleState id={ '123456' } nombre={ 'Marco' } estado={ false } />

        <BtnAction params={ '?modal=editar' } className={ 'gradient-update' }>
          <FaPenToSquare size={ 18 } />
        </BtnAction>
      </div>
    </div>
  );
};