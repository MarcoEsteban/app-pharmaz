export interface Detalles {
  nombre: string;
  concentracion: string | null;
  adicional: string | null;
  presentacionId: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}
export interface Ventas {
  ventaId: string;
  fecha: string;
  hora: string;
  metodoPago: string;
  numeroVenta: number;
  total: number;
  cliente: string;
  clienteNit: string;
  vendedor: string;
  detalles: Detalles[];
}
