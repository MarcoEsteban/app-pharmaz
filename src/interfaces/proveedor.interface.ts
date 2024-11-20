export interface Proveedor {
  id: string;
  nit: string;
  nombre: string;
  foto: string | null;
  celular: number;
  direccion: string | null;
  email: string;
  estado: boolean;
}
