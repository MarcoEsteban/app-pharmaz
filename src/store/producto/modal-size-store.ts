
import { create } from 'zustand';

interface State {
  // Estado:
  categoria: string;

  // Metodo:
  selectedCategoria: ( categoria: string ) => void;
}

export const useModalSizeStore = create<State>()( ( set ) => ( {

  categoria: 'Farmacos',

  selectedCategoria: ( categoria: string ) => set( { categoria: categoria } ),

} ) );
