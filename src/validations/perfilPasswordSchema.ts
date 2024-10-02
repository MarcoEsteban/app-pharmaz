import { z } from 'zod';

export const perfilPasswordSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .nullable(),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  password_new: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirm_password: z
    .string()
    .min(6, { message: "La confirmación debe tener al menos 6 caracteres" })
}).refine((data) => data.password_new === data.confirm_password, {
  message: "Las contraseñas debe coincidir con la contraseña nueva",
  path: ['confirm_password'], // Asociar el mensaje a confirm_password
});
