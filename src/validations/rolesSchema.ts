//
// import { z } from 'zod';
//
// export const rolesSchema = z.object({
//   nombre: z
//     .string()
//     .min(3, {
//       message: "Tiene que tener como mínimo 3 caracteres." 
//     })
//     .max(200, {
//       message: "Tiene que tener como mínimo 3 caracteres." 
//     }),
//   menus: z
//     .array(z.string())
//     .min(1, {
//       message: "Debe seleccionar al menos un menú." 
//     })
// })

import { z } from 'zod';

export const rolesSchema = z.object({
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
    .max(200, {
      message: "Tiene que tener como máximo 200 caracteres",
    }),
  menus: z
    .array(z.string(), {
      required_error: "Debe seleccionar al menos un menú",
    })
    .min(1, {
      message: "Debe seleccionar al menos un menú",
    })
});
