
export interface Producto {
  id?: string;
  nombre: string;
  concentracion: string | null;
  adicional: string | null;
  precio: number;
  receta: string;
  tipo: string | null;
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
