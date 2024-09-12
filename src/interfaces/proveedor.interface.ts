import { PersonaType } from "./types/persona";

export interface Proveedor {
  id: string;
  email: string;
  personasId: string;
  personas: PersonaType
}
