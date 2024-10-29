import { z } from 'zod';
import { DateTime } from 'luxon';

const DATE_FORMAT = 'dd/MM/yyyy'; // Formato esperado de la fecha

export const loteSchema = z.object({
  id: z.string().uuid().optional().nullable(),

  stock: z.string()
    .min(1, { message: "El stock debe tener al menos 1 dígito" })
    .regex(/^\d+$/, { message: "Solo se permiten números" }) // Validar que solo contiene dígitos
    .transform((val) => Number(val)) // Convertir la cadena en número
    .refine((val) => val >= 1, { message: "El stock debe ser al menos 1" }), // Validar que el número es mayor o igual a 1

  vencimiento: z.string()
    .refine((val) => {
      const date = DateTime.fromFormat(val, DATE_FORMAT);
      const now = DateTime.now();
      return date.isValid && date >= now.startOf('day'); // Compara con la fecha actual
    }, {
      message: `La fecha de vencimiento debe ser válida (${DateTime.now().toFormat(DATE_FORMAT)})`,
    })
    .transform((val) => {
      // Transformamos la fecha al formato ISO para almacenar en la base de datos
      return DateTime.fromFormat(val, DATE_FORMAT).toJSDate();
    }),

  // Transforma el valor vacío ('') en undefined para que Prisma lo acepte
  proveedorId: z.string().uuid(),
    // .transform((val) => (val === '' ? undefined : val)) // Transforma '' en undefined
    // .refine((val) => val === undefined || z.string().uuid().safeParse(val).success, {
    //   message: "UUID inválido para proveedorId",
    // }),

  usuarioId: z.string().uuid(),
    // .transform((val) => (val === '' ? undefined : val)) // Transforma '' en undefined
    // .refine((val) => val === undefined || z.string().uuid().safeParse(val).success, {
    //   message: "UUID inválido para usuarioId",
    // }),

  productoId: z.string().uuid(),
    // .transform((val) => (val === '' ? undefined : val)) // Transforma '' en undefined
    // .refine((val) => val === undefined || z.string().uuid().safeParse(val).success, {
    //   message: "UUID inválido para productoId",
    // }),
});
