import { Lotes } from "./lotes.interface";

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
  viaAdministracionId: string;
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
  viaAdministracionId: string;
  estado: boolean;
}

// Interfaz para los datos del lote
interface Lote {
  id: string; // ID del lote
  stock: number; // Cantidad en stock del lote
  vencimiento: Date; // Fecha de vencimiento del lote
}

// Interfaz principal para los resultados de medicamentos
export interface CartProduct {
  id: string; // ID del medicamento
  nombre: string; // Nombre del medicamento
  concentracion: string | null; // Concentración del medicamento
  adicional: string | null; // Información adicional
  precio: number; // Precio del medicamento
  presentacionId: string | null; // ID de la presentación del medicamento
  laboratoriosId: string | null; // ID del laboratorio asociado
  stock: number; // Total de stock (incluyendo lotes vencidos)
  lote: Lote | null; // Lote más cercano dentro del rango de 2 semanas en adelante
  cantidadCart: number; // Cantidad en el carrito (puedes inicializar en 0)
  estado: boolean; // Estado del medicamento (activo/inactivo)
}

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
//   lote: Lote;
//   cantidadCart: number;
//   estado: boolean;
// }

// Partial  :: Indico que algunos campos seran opcional - Partial<Medicamento>.
// Required :: Indico que sea todos los campos obligatorio.
// Omit     :: Indico que puede tener todos los campos de Medicamento pero que omita el estado asi Ejm: Omit<Medicamento, "estado">
// Pick     :: Indico que campos son los que queremos, por ejm si solo queremos que nuestra interfaz tenga nombre y precio realizamos lo siguiente
//             Pick<Medicamento, "nombre" | "precio">
