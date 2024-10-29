'use client';

import { useCartStore } from "@/store";
import { IoClose } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalCart = ({ isOpen, onClose, title, children }: Props) => {

  // ========
  // Zustand:
  // ========
  const emtyCart = useCartStore( state => state.emtyCart );
  
  if (!isOpen) return null;

  return (
    <div className="fixed top-18 right-[250px] z-50 border rounded-xl flex items-center justify-center shadow-sm">
      <div className="relative w-full max-w-4xl max-h-full bg-white rounded-lg shadow">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-sans font-semibold text-gray-600">{title}</h3>
          
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <IoClose size={ 24 } />
          </button>
        </div>
        
        {/* Body */}
        <div className="space-y-4 overflow-x-auto overflow-y-auto">{children}</div>
        
        {/* Footer */}
        <div className="flex flex-col gap-2 justify-end p-1 mt-4 font-sans">
          <button onClick={emtyCart} className=" bg-red-600 text-white px-4 py-2 rounded border hover:bg-red-700">
            Vaciar carrito
          </button>
          <button onClick={onClose} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Procesar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCart;
