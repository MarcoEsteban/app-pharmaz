
import { toggleStateProducto } from '@/actions';
import { BtnLote, BtnModificar, BtnPhoto, ButtonActionToglgleState, TooltipButton } from '@/components';
import { Producto } from '@/interfaces';
import clsx from 'clsx';
import Image from 'next/image';
import { FaAppStoreIos, FaCopyright, FaCubes, FaDochub, FaDollarSign, FaFlask, FaMortarPestle, FaPills, FaSyringe } from 'react-icons/fa';

interface Props {
  producto: Producto;
}

export const ItemCardVentas = ({ producto }: Props) => {
  return (
    <div className="flex max-w-auto max-h-auto flex-col bg-gray-200 bg-clip-border text-gray-700 shadow-lg border rounded-xl justify-between">
      
      <div className={ clsx(
        'flex justify-between boder rounded-t-xl', 
        { 'bg-red-500 text-gray-200': !producto.estado }) }
      >

        <div className="p-4 flex-1">
          <p className=" flex items-center gap-2 font-sans text-xl font-bold antialiased">
            <FaCubes /> { producto.stock }
          </p>
          <h4 className="block font-sans text-xl uppercase leading-snug tracking-normal text-blue-gray-900 antialiased">
            { producto.nombre }
          </h4>
          <p className=" flex items-center gap-2 font-sans text-2xl font-normal antialiased">
            <FaDollarSign /> { producto.precio }
          </p>
          <div className="mt-2 flex flex-col text-sm gap-1 font-sans tracking-wide antialiased">
            { producto.concentracion &&
              <p className="flex gap-1">
                <FaMortarPestle size={ 20 } /> Concentracion: <span>{ producto.concentracion }</span>
              </p>
            }
            <p className="flex gap-1">
              <FaAppStoreIos size={ 20 } /> Adicional: <span className='uppercase'> { producto.adicional } </span>
            </p>
            
            { producto.presentacionId &&
              <p className="flex gap-1">
                <FaPills size={ 20 } /> Presentacion: <span className='uppercase'>{ producto.presentacionId }</span>
              </p>
            }
            
            { producto.tipo &&
              <p className="flex gap-1"><FaCopyright size={ 20 } /> Tipo: { producto.tipo }</p>
            }
            <p className="flex gap-1">
              <FaFlask size={ 20 } /> Laboratorio: <span className='uppercase'>{ producto.laboratoriosId } </span>
            </p>
            
            { producto.tipo &&
              <p className="flex gap-1"><FaSyringe size={ 20 } /> Via Administracion: { producto.viaAdministracionId }</p>
            }
          </div>
        </div>

        <div className="flex-3 rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none my-auto">
          <Image
            className="object-cover w-36 h-36 rounded-full mx-auto "
            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
            width={ 0 }
            height={ 0 }
          />
        </div>
      </div>

      {/* Button  */ }
      <div className={ clsx(
        "flex items-center justify-end px-3 py-2 bg-gray-300 rounded-b-xl", 
        { 'bg-red-600 text-gray-200': !producto.estado })}
      >
        {/*===================== Buton Cart ======================*/ }
        <TooltipButton />
        
      </div>
    </div>
  );
};

        // {/*============= Buton Eliminar || Habilitar =============*/ }
        // <ButtonActionToglgleState
        //   id={ producto.id ?? '' }
        //   nombre={ producto.nombre }
        //   estado={ producto.estado }
        //   toggleActionState={ toggleStateProducto }
        // />
        //
        // {/*=================== Buton Actualizar ==================*/ }
        // <BtnModificar id={producto.id ?? ''} />
        //
        // {/*================= Buton Agregar Lote ==================*/ }
        // <BtnLote id={producto.id ?? ''} />
        //
        // {/*===================== Buton Foto ======================*/ }
        // <BtnPhoto id={producto.id ?? ''} />
        
