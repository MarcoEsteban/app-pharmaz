import { z } from 'zod';

// Función para capitalizar cadenas
const capitalize = (val: string) =>
  val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();

// Esquema base sin el campo 'categoria' ni los campos condicionales
export const productoSchema = z.object({
  id: z.string().uuid().optional().nullable(),

  categoria: z.string(),

  nombre: z.string()
    .min(3, { message: "Campo obligatorio, 3 caracteres como mínimo" })
    .transform(capitalize),

  adicional: z.string()
    .optional()
    .nullable()
    .transform((val) => val === '' ? null : val),

  precio: z.string()
    .trim()
    .regex(/^[0-9]+([.,][0-9]{1,2})?$/, {
      message: "Campo obligatorio, solo número con 2 decimales",
    })
    .transform((val) => parseFloat(val.replace(',', '.')))
    .refine((val) => val > 0, {
      message: "El precio debe ser positivo.",
    }),

  laboratoriosId: z.string().uuid(),

  concentracion: z.string()
    .optional()
    .nullable()
    .transform((val) => val === '' ? null : val),

  receta: z.string()
    .optional()
    .nullable()
    .transform((val) => val === '' ? null : val),

  tipo: z.string()
    .optional()
    .nullable()
    .transform((val) => val === '' ? null : val),

  presentacionId: z.string()
    .optional()
    .transform((val) => val === '' ? null : val)
    .refine((val) => val === null || z.string().uuid().safeParse(val).success, {
      message: "UUID inválido para presentacionId",
    }),

  principioActivoId: z.string()
    .optional()
    .transform((val) => val === '' ? null : val)
    .refine((val) => val === null || z.string().uuid().safeParse(val).success, {
      message: "UUID inválido para principioActivoId",
    }),

  viaAdministracionId: z.string()
    .optional()
    .transform((val) => val === '' ? null : val)
    .refine((val) => val === null || z.string().uuid().safeParse(val).success, {
      message: "UUID inválido para viaAdministracionId",
    }),
});

// // Esquema para productos de categoría "Farmacos"
// const farmacosSchema = baseProductoSchema.extend({
//   categoria: z.literal("Farmacos"),
//   
//   concentracion: z.string()
//     .min(3, { message: "Campo obligatorio" }),
//   
//   receta: z.string().optional(),
//   
//   tipo: z.string()
//     .min(3, { message: "Campo obligatorio, 3 caracteres como mínimo" }),
//   
//   presentacionId: z.string().uuid({ message: 'Campo obligatorio' }).optional(),
//   
//   principioActivoId: z.string().uuid({ message: 'Campo obligatorio' }).optional(),
//   
//   viaAdministracionId: z.string().uuid({ message: 'Campo obligatorio' }).optional(),
// });
//
// // Esquema para productos de categoría "Instrumento Médico"
// const instrumentoMedicoSchema = baseProductoSchema.extend({
//   categoria: z.literal("Instrumento Médico"),
//   
//   // presentacionId: z.string().uuid().optional(),
//   // viaAdministracionId: z.string().uuid().optional(),
//   // principioActivoId: z.string().uuid().optional(),
// });
//
// // Unión discriminada basada en el campo "categoria"
// export const productoSchema = z.discriminatedUnion("categoria", [
//   farmacosSchema,
//   instrumentoMedicoSchema,
// ]);
//
// // Inferir el tipo de los datos validados
// export type ProductoValidado = z.infer<typeof productoSchema>;
