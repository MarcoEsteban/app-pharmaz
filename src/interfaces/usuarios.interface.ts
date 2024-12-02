import { PersonaType } from "./types/persona";

export interface Usuario {
  id: string;
  email: string;
  password?: string;
  rolesId: string;
  rol: string;
  personasId: string;
  personas: PersonaType;
}
