
export interface Lotes {
  id: string;
  stock: number;
  vencimiento: string;
  productoId: string;
  proveedorId: string;
  usuarioId: string;
  estado: boolean;
}

export interface LoteProducto {
  id?: string;
  nombre: string;
  concentracion: string | null;
  adicional: string | null;
  precio: number;
  tipo: string | null;
  presentacion: string;
  laboratorios: string;
  principioActivo: string;
  viaAdministracion: string;
  productoId: string;
  proveedorId: string;
  usuarioId: string;
  stock: number;
  vencimiento: string;
  mes: number;
  dia: number;
  estado: boolean;
}

        // id: lote.id,
        // nombre: lote.Producto.nombre || '',
        // concentracion: lote.Producto?.concentracion || '',
        // adicional: lote.Producto.adicional || '',
        // precio: lote.Producto.precio.toNumber() || 0,
        // laboratorio: lote.Producto.laboratorios?.[0]?.Laboratorio?.nombre || '',
        // tipo: lote.Producto?.tipo || '',
        // presentacion: lote.Producto?.presentacion?.[0]?.Presentacion?.nombre || '',
        // viaAdministracion: lote.Producto?.viaAdministracion?.[0]?.ViaAdministracion?.nombre || '',
        // proveedor: lote.Proveedor.nombre || '',
        // usuarioId: lote.usuarioId || '',
        // productoId: lote.productoId || '',
        // stock: lote.stock,
        // vencimiento: lote.vencimiento ? lote.vencimiento.toISOString().split('T')[0] : '', // Formatear fecha a ISO
        // mes: lote.vencimiento ? new Date(lote.vencimiento).getMonth() + 1 : '', // Obtener el mes
        // dia: lote.vencimiento ? new Date(lote.vencimiento).getDate() : '' // Obtener el día
