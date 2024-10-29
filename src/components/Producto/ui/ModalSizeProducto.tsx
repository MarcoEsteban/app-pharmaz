'use client';

import { Modal } from '@/components/ui/modal/Modal';
import { useCategoriaStore } from '@/store';
import { FormProducto } from '../FormProducto';
import { Medicamento } from '@/interfaces';

interface Props {
  producto: Partial<Medicamento>;
  modalType: string;
  filtro: string;
}

export const ModalSizeProducto = ({ producto, modalType, filtro}: Props) => {
  
  // ========
  // Zustand:
  // ========
  const setCategoria = useCategoriaStore(state => state.setCategoria);
  setCategoria(filtro)
  

  return (
    <Modal 
      sizeModal={filtro === 'Farmacos' ? 'max-w-4xl' : 'max-w-md'} 
      titleModal={ `${ modalType } Medicamento` } 
      children={ <FormProducto producto={ producto } /> } />
  )
}
