'use client';

import { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useCartStore } from '@/store';
import Modal from './ModalCart';
import { IoClose } from 'react-icons/io5';

interface Props {
  loaded: boolean;
}

export const IconCart = ( {loaded}: Props) => {
  
  // ========
  // Zustand:
  // ========
  const cart = useCartStore( state => state.cart );
  const getTotalItem = useCartStore( state => state.getTotalItem() );
  const removeProduct = useCartStore( state => state.removeProduct );

  const [ isModalOpen, setIsModalOpen ] = useState( false );
  
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  console.log({cart})
  
  return (
    <div className='relative'>
      <button
        onClick={handleToggleModal}
        className="relative text-gray-700 rounded-full p-1 cursor-pointer shadow-sm transition-all mr-4"
      >
        {loaded && getTotalItem > 0 && (
          <span className="fade-in absolute -top-3 -right-2.5 px-[6px] py-[2px] text-xs rounded-full font-bold bg-blue-700 text-white">
            {getTotalItem}
          </span>
        )}
        <FaCartPlus size={22} />
      </button>
      
      <Modal isOpen={isModalOpen} onClose={handleToggleModal} title="Productos">
        
            <table className="items-center w-full bg-white border divide-y divide-gray-200  text-slate-500 font-sans overflow-x-auto">

              {/*======================================= Cabecera =======================================*/ }
              <thead className="align-bottom">
                <tr className={ "border-b border-gray-200 " }>
                  <th className="table-th text-left ">#</th>
                  <th className="table-th text-left ">Codigo</th>
                  <th className="table-th text-left">Nombre</th>
                  <th className="table-th text-left">Adicional</th>
                  <th className="table-th text-left">Precio</th>
                  <th className="table-th">Eliminar</th>
                </tr>
              </thead>

              {/*======================================== Cuerpo ========================================*/ }
              <tbody className="bg-white divide-y divide-gray-200">

                {
                  cart && cart.map( (item, index) => (
                    <tr key={item.id}>
                      <td className={ "table-td font-bold" }>{index + 1}</td>
                      
                      <td className={ "table-td" }>{item.id?.split('-').at(-1)}</td>
                      
                      <td className="table-td">
                        
                        <div className="flex">
                          <div className="flex flex-col justify-center ">
                            <h6 className="mb-0 leading-normal ">{ 
                              item.nombre + ' ' + (item.concentracion ? item.concentracion : '')
                            }</h6>
                          </div>
                        </div>
                      </td>

                      <td className="table-td uppercase">{ item.adicional + ' ' + item.presentacionId }</td>
                      
                      <td className="table-td ">{ item.precio }</td>

                      {/*========== Botones ==========*/ }
                      <td className="text-center">

                        {/*=================== Buton Actualizar ==================*/ }
                        <button onClick={() => removeProduct( item )} className="bg-red-600 text-white hover:bg-red-700 rounded-lg p-1">
                          <IoClose size={ 20 } />
                        </button>

                      </td>
                        
                    </tr>
                  ))
                }

              </tbody>
            </table>
      </Modal>
    </div>
  )
}
