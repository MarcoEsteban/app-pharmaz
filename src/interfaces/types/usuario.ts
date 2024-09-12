
export type UsuarioType = {
  id: string;
  email: string;
  rolesId: string;
  personasId: string;
  rol: string;
  personas: {
    nombre: string;
    ap: string;
    am: string | null;
    ci: string;
    celular: number;
    estado: boolean;
  }
}
