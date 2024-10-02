import { z } from 'zod';

export const perfilSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .nullable(), // Indico que sea String, UUID, puede ser Opcional y Puede venir NULL. 
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
  email: z
    .string()
    .email({ message: "Introduce un Email válido" }),
})
