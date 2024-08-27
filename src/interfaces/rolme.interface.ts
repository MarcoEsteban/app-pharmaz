
type Menus = {
  id: string;
  nombre: string;
  enlace: string;
  icon: string;
}

export interface RolMe {
  id: string;
  nombre: string;
  estado: boolean;
  menus: Menus[];
  // menus: string[];
}
