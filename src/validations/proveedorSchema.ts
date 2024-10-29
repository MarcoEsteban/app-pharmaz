import { z } from 'zod';

export const proveedorSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .nullable(), // Indico que sea String, UUID, puede ser Opcional y Puede venir NULL. 
  nit: z
    .string()
    .min(6, { message: "Campo obligatorio, 6 caracter como mínimo " })
    .max(200, { message: "Tiene que tener como máximo 200 caracteres" }),
  nombre: z
    .string()
    .min(3, { message: "Campo obligatorio, 3 caracter como mínimo " })
    .max(200, { message: "Tiene que tener como máximo 200 caracteres" })
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()), // Retorna en formato Capitalizado.
  celular: z
    .string()
    .transform((cel) => Number(cel))
    .refine((cel) => Number(cel), {
      message: "Solo se permite números",
    }),
  direccion: z
    .string()
    .optional(),
  email: z
    .string()
    .email({ message: "Introduce un email válido" }),
})
