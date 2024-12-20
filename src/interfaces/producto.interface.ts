export interface Producto {
  id?: string;
  nombre: string;
  concentracion: string | null;
  adicional: string | null;
  precio: number;
  receta: string;
  tipo: string | null;
  foto: string | null;
  presentacionId: string;
  laboratoriosId: string;
  principioActivoId: string;
  clasificacionId: string;
  stock: number;
  estado: boolean;
}

export interface Medicamento {
  id?: string;
  categoria?: string; // Hacerlo opcional
  nombre: string;
  concentracion?: string;
  adicional?: string;
  precio: number;
  receta: string;
  tipo?: string; // Permitir null
  presentacionId: string;
  laboratoriosId: string;
  principioActivoId: string;
  clasificacionId: string;
  estado: boolean;
}

// ------------------------------------------------------------------------------------------------
// Esta interfaz se usaba para la pagina ventas para listar los medicamentos del carrito de compra:
// ------------------------------------------------------------------------------------------------
// export interface CartProduct {
//   id?: string;
//   nombre: string;
//   concentracion: string | null;
//   adicional: string | null;
//   precio: number;
//   presentacionId: string;
//   laboratoriosId: string;
//   foto: string;
//   stock: number;
//   cantidadCart: number;
//   estado: boolean;
// }

interface Lote {
  id: string;
  stock: number;
  vencimiento: Date;
}

export interface ProductoSearch {
  id: string; // ID del medicamento
  nombre: string; // Nombre del medicamento
  concentracion: string | null; // Concentración del medicamento
  adicional: string | null; // Información adicional
  precio: number; // Precio convertido de Decimal a number
  presentacionId: string | null; // Nombre de la presentación
  laboratorioId: string | null; // Nombre del laboratorio
  foto: string | null; // URL o path de la foto
  stock: number; // Total de stock considerando todos los lotes
  lote: Lote | null;
  cantidadCart: number; // Inicialmente 1
  estado: boolean; // Estado del medicamento (activo o inactivo)
  statusColor: string;
}

// Partial  :: Indico que algunos campos seran opcional - Partial<Medicamento>.
// Required :: Indico que sea todos los campos obligatorio.
// Omit     :: Indico que puede tener todos los campos de Medicamento pero que omita el estado asi Ejm: Omit<Medicamento, "estado">
// Pick     :: Indico que campos son los que queremos, por ejm si solo queremos que nuestra interfaz tenga nombre y precio realizamos lo siguiente
//             Pick<Medicamento, "nombre" | "precio">
