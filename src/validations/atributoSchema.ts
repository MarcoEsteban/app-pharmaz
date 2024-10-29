
import { z } from 'zod';

export const atributoSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .nullable(), // Indico que sea String, UUID, puede ser Opcional y Puede venir NULL. 
  nombre: z
    .string({
      required_error: "El nombre es obligatorio",
    })
    .min(3, {
      message: "Tiene que tener como mínimo 3 caracteres",
    })
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()) // Retorna en formato Capitalizado.
});
