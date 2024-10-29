
// store/useCategoriaStore.ts
import { create } from 'zustand';

interface CategoriaState {
  categoria: string;
  setCategoria: (categoria: string) => void;
}

export const useCategoriaStore = create<CategoriaState>((set) => ({
  categoria: 'Farmacos', // Valor por defecto
  setCategoria: (categoria: string) => set({ categoria }),
}));
