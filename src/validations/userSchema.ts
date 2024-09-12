import { z } from 'zod';

export const userSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .nullable(), // Indico que sea String, UUID, puede ser Opcional y Puede venir NULL. 
  personasId: z
    .string()
    .uuid()
    .optional()
    .nullable(), // Indico que sea String, UUID, puede ser Opcional y Puede venir NULL. 
  ci: z
    .string()
    .min(6, { message: "Campo obligatorio, 6 caracter como mínimo " })
    .max(200, { message: "Tiene que tener como máximo 200 caracteres" }),
  nombre: z
    .string()
    .min(3, { message: "Campo obligatorio, 3 caracter como mínimo " })
    .max(200, { message: "Tiene que tener como máximo 200 caracteres" }),
  ap: z
    .string()
    .min(4, { message: "Campo obligatorio, 4 caracter como mínimo " })
    .max(200, { message: "Tiene que tener como máximo 200 caracteres" }),
  am: z
    .string()
    .optional(),
  direccion: z
    .string()
    .optional(),
  celular: z
    .string()
    .refine((cel) => Number(cel), {
      message: "Solo se permite números",
    }),
  rolesId: z
    .string()
    .uuid({message: "Debe seleccionar un Rol"}),
  email: z
    .string()
    .email({ message: "Introduce un Email válido" }),
  password: z
    .string()
    // .min(6, { message: "Tiene que tener como mínimo 6 caracteres" })
    .optional(), // Hacemos el password opcional aquí.
  confirm_password: z
    .string()
    // .min(6, { message: "Tiene que tener como mínimo 6 caracteres" })
    .optional(), // Hacemos el confirm_password opcional aquí.
}).refine((data) => {
  // Validación de si estamos en modo "Agregar" (sin id)
  if (!data.id) {
    // Si estamos en "Agregar", password y confirm_password deben estar presentes.
    if (!data.password || !data.confirm_password) {
      return false;
    }
  }
  return true;
}, {
  message: "Las contraseñas son obligatoria",
  path: ["password"],
}).refine((data) => {
  // Validación de que password y confirm_password sean iguales.
  if (data.password && data.confirm_password) {
    return data.password === data.confirm_password;
  }
  return true;
}, {
  message: "Las contraseñas deben coincidir",
  path: ['confirm_password'],
});
