import { z } from "zod";

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
    .transform((val) =>
      val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    ), // Retorna en formato Capitalizado.
  celular: z
    .string()
    .min(8, { message: "El celular debe tener al menos 8 dígitos" })
    .max(15, { message: "El celular no puede tener más de 15 dígitos" })
    .regex(/^\d+$/, { message: "Solo se permiten números" }), // Validación con regex para solo números
  direccion: z
    .string()
    .optional(),
  email: z
    .string()
    .email({ message: "Introduce un email válido" }),
});
