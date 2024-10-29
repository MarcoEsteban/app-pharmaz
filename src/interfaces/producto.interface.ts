
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

export interface CartProduct {
  id?: string;
  nombre: string;
  concentracion: string | null;
  adicional: string | null;
  precio: number;
  presentacionId: string;
  laboratoriosId: string;
  stock: number;
  estado: boolean;
}

// Partial  :: Indico que algunos campos seran opcional - Partial<Medicamento>.
// Required :: Indico que sea todos los campos obligatorio.
// Omit     :: Indico que puede tener todos los campos de Medicamento pero que omita el estado asi Ejm: Omit<Medicamento, "estado">
// Pick     :: Indico que campos son los que queremos, por ejm si solo queremos que nuestra interfaz tenga nombre y precio realizamos lo siguiente
//             Pick<Medicamento, "nombre" | "precio">
