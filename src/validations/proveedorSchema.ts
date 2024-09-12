import { z } from 'zod';

export const proveedorSchema = z.object({
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
  celular: z
    .string()
    .transform((cel) => Number(cel))
    .refine((cel) => Number(cel), {
      message: "Solo se permite números",
    }),
  email: z
    .string()
    .email({ message: "Introduce un email válido" }),
})
