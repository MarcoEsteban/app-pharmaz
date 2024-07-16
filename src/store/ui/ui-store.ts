import { create } from 'zustand';

interface State {
  // Estado:
  isSideMenuOpen: boolean;

  // Metodo:
  toggleSideMenu: ( isSideMenu: boolean ) => void;
}

export const useSidebarStore = create<State>()( ( set ) => ( {

  isSideMenuOpen: false,

  toggleSideMenu: ( isSideMenu: boolean ) => set( { isSideMenuOpen: isSideMenu } ),

} ) );