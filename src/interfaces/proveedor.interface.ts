export interface Proveedor {
  id: string;
  nit: string;
  nombre: string;
  celular: number;
  direccion: string | null;
  email: string;
  estado: boolean;
}
