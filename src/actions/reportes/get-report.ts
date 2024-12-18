"use server";

import prisma from "@/libs/prisma";
import { DateTime } from "luxon";

export const getReport = async (
  data: {
    type: string;
    value: string | { start: string; end: string };
    payment?: string;
    table: string;
  },
) => {
  console.log(data);

  // Obtener el rango de fechas usando la función global
  const dateFilter = getDateRange(data.value);
  console.log({ dateFilter });

  // Filtro opcional para método de pago
  const paymentFilter = data.payment === undefined || data.payment === ""
    ? {} // Si `payment` está vacío, no se filtra por método de pago
    : { metodoPago: data.payment };

  try {
    let reportData;

    switch (data.table) {
      // -------------------
      // Reporeste de Ventas
      // -------------------
      case "Ventas":
        const ventas = await prisma.ventas.findMany({
          where: {
            Transacciones: {
              fecha: dateFilter,
              ...paymentFilter,
            },
          },
          include: {
            Transacciones: {
              select: {
                metodoPago: true,
                numeroVenta: true,
                total: true,
                fecha: true,
              },
            },
            Personas: {
              select: {
                ci: true,
                nombre: true,
                ap: true,
                am: true,
              },
            },
            Usuario: {
              select: {
                id: true,
              },
            },
            DetalleVentas: {
              include: {
                Medicamentos: {
                  include: {
                    presentacion: {
                      select: {
                        Presentacion: {
                          select: {
                            nombre: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

        // Procesamos los datos
        reportData = ventas.map((venta) => {
          const fechaOriginal = venta.Transacciones.fecha; // Tipo Date
          const fechaLuxon = DateTime.fromISO(fechaOriginal.toISOString())
            .setZone("America/La_Paz");

          return {
            ID: venta.id.split("-").shift(),
            Cliente: `${venta.Personas.nombre} ${venta.Personas.ap || ""} ${
              venta.Personas.am || ""
            }`,
            Metodo: venta.Transacciones.metodoPago,
            Numero: venta.Transacciones.numeroVenta.toString().padStart(6, "0"),
            Fecha: fechaLuxon.toFormat("dd/MM/yyyy"),
            Total: venta.Transacciones.total.toNumber().toFixed(2),
          };
        });

        break;

      // --------------------
      // Reporeste de Compras
      // --------------------
      case "Compras":
        const compras = await prisma.lotes.findMany({
          where: {
            createdAt: dateFilter,
          },
          include: {
            Proveedor: {
              select: {
                nombre: true,
              },
            },
            Producto: {
              select: {
                nombre: true,
              },
            },
          },
        });

        reportData = compras.map((compra) => ({
          ID: compra.id.split("-").shift(),
          Fecha: DateTime.fromJSDate(compra.createdAt).toFormat("dd/MM/yyyy"),
          Proveedor: compra.Proveedor.nombre,
          Medicamento: compra.Producto.nombre,
          Cantidad: compra.stock,
        }));

        break;

      case "Inventario":
        const inventario = await prisma.lotes.findMany({
          include: {
            Producto: {
              select: {
                nombre: true,
                concentracion: true,
                precio: true,
                Clasificacion: {
                  select: {
                    Clasificacion: {
                      select: {
                        nombre: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        reportData = inventario.map((item) => {
          const valorTotal = item.stock * item.Producto.precio.toNumber();

          return {
            ID: item.id.split("-").shift(),
            Nombre: item.Producto.nombre,
            Clasificacion:
              item.Producto.Clasificacion?.[0]?.Clasificacion?.nombre ??
                "Sin Clasificación",
            Stock: item.stock,
            Precio: item.Producto.precio.toNumber().toFixed(2),
            "Valor Total": valorTotal.toFixed(2),
            "Ultima Fecha ": DateTime.fromJSDate(item.updatedAt).toFormat(
              "dd/MM/yyyy",
            ),
          };
        });

        console.log({ inventario });
        console.log({ reportData });

        break;

      default:
        throw new Error(`Tabla no soportada: ${data.table}`);
    }

    console.log("Reporte generado con éxito. ", reportData);
    return {
      ok: true,
      reportData,
    };
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    throw new Error("No se pudo generar el reporte.");
  }
};

// ------------------------------------------------------
// Función global para manejar rangos de fechas con Luxon
// ------------------------------------------------------
const getDateRange = (value: string | { start: string; end: string }) => {
  const now = DateTime.now();

  if (typeof value === "string") {
    switch (value) {
      case "hoy":
        return {
          gte: now.startOf("day").toJSDate(),
          lte: now.endOf("day").toJSDate(),
        };
      case "7-dias":
        return {
          gte: now.minus({ days: 7 }).startOf("day").toJSDate(),
          lte: now.endOf("day").toJSDate(),
        };
      case "30-dias":
        return {
          gte: now.minus({ days: 30 }).startOf("day").toJSDate(),
          lte: now.endOf("day").toJSDate(),
        };
      case "mes":
        return {
          gte: now.startOf("month").toJSDate(),
          lte: now.endOf("day").toJSDate(),
        };
      default:
        throw new Error(`Valor no válido para rango de fecha: ${value}`);
    }
  } else if (typeof value === "object" && value.start && value.end) {
    return {
      gte: DateTime.fromISO(value.start).startOf("day").toJSDate(),
      lte: DateTime.fromISO(value.end).endOf("day").toJSDate(),
    };
  } else {
    throw new Error("El formato de value no es válido.");
  }
};

// "use server";
//
// import prisma from "@/libs/prisma";
// import { generateReport } from "@/utils/jspdf-reporte";
// import { DateTime } from "luxon";
//
// export const getReport = async (
//   data: {
//     type: string;
//     value: string | { start: string; end: string };
//     payment?: string;
//     table: string;
//   },
// ) => {
//   console.log(data);
//
//   // Obtener el rango de fechas usando la función global
//   const dateFilter = getDateRange(data.value);
//   console.log({ dateFilter });
//
//   // Filtro opcional para método de pago
//   const paymentFilter = data.payment ? { metodoPago: data.payment } : {};
//
//   try {
//     let reportData;
//
//     switch (data.table) {
//       case "Ventas":
//         const ventas = await prisma.ventas.findMany({
//           where: {
//             Transacciones: {
//               fecha: dateFilter,
//               ...paymentFilter,
//             },
//           },
//           include: {
//             Transacciones: {
//               select: {
//                 metodoPago: true,
//                 numeroVenta: true,
//                 total: true,
//                 fecha: true,
//               },
//             },
//             Personas: {
//               select: {
//                 ci: true,
//                 nombre: true,
//                 ap: true,
//                 am: true,
//               },
//             },
//             Usuario: {
//               select: {
//                 id: true,
//               },
//             },
//             DetalleVentas: {
//               include: {
//                 Medicamentos: {
//                   include: {
//                     presentacion: {
//                       select: {
//                         Presentacion: {
//                           select: {
//                             nombre: true,
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         });
//
//         // Procesamos los datos
//         reportData = ventas.map((venta) => {
//           const fechaOriginal = venta.Transacciones.fecha; // Tipo Date
//           const fechaLuxon = DateTime.fromISO(fechaOriginal.toISOString())
//             .setZone(
//               "America/La_Paz",
//             ); // Asegúrate de usar la zona horaria correcta
//
//           return {
//             ID: venta.id.split("-").shift(),
//             Cliente: `${venta.Personas.nombre} ${venta.Personas.ap || ""} ${venta.Personas.am || ""
//               }`,
//             Metodo: venta.Transacciones.metodoPago,
//             // vendedor:
//             //   `${vendedor?.personas.nombre} ${vendedor?.personas.ap} ${vendedor?.personas.am}`,
//             Numero: venta.Transacciones.numeroVenta,
//             Fecha: fechaLuxon.toFormat("dd/MM/yyyy"),
//             Total: venta.Transacciones.total.toNumber().toFixed(2),
//           };
//         });
//         break;
//
//       case "Compras":
//         const dataC = await prisma.transacciones.findMany({
//           where: {
//             fecha: dateFilter,
//             ...paymentFilter,
//           },
//         });
//         generateReport(
//           dataC,
//           ["ID", "Fecha", "Proveedor", "Medicamento", "Cantidad"],
//           "Reporte de Compras",
//         );
//         break;
//
//       case "Inventario":
//         const dataI = await prisma.detalleVentas.findMany({
//           where: {
//             createdAt: dateFilter,
//           },
//           include: {
//             Medicamentos: true,
//             Ventas: true,
//           },
//         });
//         generateReport(
//           dataI,
//           ["ID", "Nombre", "Categoria", "Stock", "Precio", "Valor", "Fecha"],
//           "Reporte de Inventario",
//         );
//         break;
//
//       default:
//         throw new Error(`Tabla no soportada: ${data.table}`);
//     }
//
//     console.log("Reporte generado con éxito. ", reportData);
//     return {
//       ok: true,
//       reportData,
//     };
//   } catch (error) {
//     console.error("Error al generar el reporte:", error);
//     throw new Error("No se pudo generar el reporte.");
//   }
// };
//
// // ------------------------------------------------------
// // Función global para manejar rangos de fechas con Luxon
// // ------------------------------------------------------
// const getDateRange = (value: string | { start: string; end: string }) => {
//   const now = DateTime.now();
//
//   if (typeof value === "string") {
//     switch (value) {
//       case "hoy":
//         return {
//           gte: now.startOf("day").toJSDate(), // Inicio del día
//           lte: now.endOf("day").toJSDate(), // Fin del día
//         };
//       case "7-dias":
//         return {
//           gte: now.minus({ days: 7 }).startOf("day").toJSDate(),
//           lte: now.endOf("day").toJSDate(),
//         };
//       case "30-dias":
//         return {
//           gte: now.minus({ days: 30 }).startOf("day").toJSDate(),
//           lte: now.endOf("day").toJSDate(),
//         };
//       case "mes":
//         return {
//           gte: now.startOf("month").toJSDate(),
//           lte: now.endOf("day").toJSDate(),
//         };
//       // case "hace-un-mes":
//       //   return {
//       //     gte: now.minus({ months: 1 }).startOf("month").toJSDate(),
//       //     lte: now.minus({ months: 1 }).endOf("month").toJSDate(),
//       //   };
//       default:
//         throw new Error(`Valor no válido para rango de fecha: ${value}`);
//     }
//   } else if (typeof value === "object" && value.start && value.end) {
//     // Caso de rango personalizado
//     return {
//       gte: DateTime.fromISO(value.start).startOf("day").toJSDate(),
//       lte: DateTime.fromISO(value.end).endOf("day").toJSDate(),
//     };
//   } else {
//     throw new Error("El formato de value no es válido.");
//   }
// };
