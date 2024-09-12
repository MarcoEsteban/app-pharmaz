
import { z } from 'zod';

export const passwordSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .nullable(), // Indico que sea String, UUID, puede ser Opcional y Puede venir NULL. 
  password: z
    .string()
    .min(6, { message: "Tiene que tener como mínimo 6 caracteres" }),
  confirm_password: z
    .string()
    .min(6, { message: "Tiene que tener como mínimo 6 caracteres" })
  
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
