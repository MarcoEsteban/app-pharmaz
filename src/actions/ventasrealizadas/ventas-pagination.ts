"use server";

import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";

interface PaginationVentas {
  currentPage?: number;
  take?: number;
  query?: string;
  metodoPago?: string; // Filtro para el método de pago
}

export const getPaginationVentas = async ({
  currentPage = 1, // Número de página por defecto.
  take = 10, // Número de registros por página.
  query = "", // Permite realizar la búsqueda.
  metodoPago = "", // Filtrar por método de pago.
}: PaginationVentas) => {
  if (isNaN(Number(currentPage))) currentPage = 1;
  if (currentPage < 1) currentPage = 1;

  try {
    // =================================================
    // Condición para filtrar según la query del Search y método de pago:
    // =================================================
    const conditions: Prisma.VentasWhereInput = {
      AND: [
        metodoPago
          ? {
            Transacciones: {
              metodoPago: { equals: metodoPago },
            },
          }
          : {},
        query
          ? {
            OR: [
              {
                Personas: {
                  OR: [
                    {
                      nombre: {
                        startsWith: query,
                        mode: "insensitive" as Prisma.QueryMode,
                      },
                    },
                    {
                      ap: {
                        startsWith: query,
                        mode: "insensitive" as Prisma.QueryMode,
                      },
                    },
                    {
                      am: {
                        startsWith: query,
                        mode: "insensitive" as Prisma.QueryMode,
                      },
                    },
                    {
                      ci: {
                        startsWith: query,
                        mode: "insensitive" as Prisma.QueryMode,
                      },
                    },
                  ],
                },
              },
            ],
          }
          : {},
      ],
    };

    // Obtenemos las ventas y el total de registros en paralelo
    const [ventas, totalCount] = await Promise.all([
      prisma.ventas.findMany({
        where: conditions,
        take, // Número de registros a mostrar
        skip: (currentPage - 1) * take, // Saltar registros para paginación
        orderBy: {
          createdAt: "desc",
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
      }),
      prisma.ventas.count({
        where: conditions,
      }),
    ]);

    // Procesamos los datos
    const result = ventas.map((venta) => {
      const fechaOriginal = venta.Transacciones.fecha; // Tipo Date

      const fechaLuxon = DateTime.fromISO(fechaOriginal.toISOString()).setZone(
        "America/La_Paz",
      ); // Asegúrate de usar la zona horaria correcta

      return {
        ventaId: venta.id,
        fecha: fechaLuxon.toFormat("dd/MM/yyyy"),
        hora: fechaLuxon.toFormat("HH:mm"),
        metodoPago: venta.Transacciones.metodoPago,
        numeroVenta: venta.Transacciones.numeroVenta,
        total: venta.Transacciones.total.toNumber(),
        cliente: `${venta.Personas.nombre} ${venta.Personas.ap || ""} ${
          venta.Personas.am || ""
        }`,
        clienteNit: venta.Personas.ci,
        vendedor: venta.Usuario.id,
        detalles: venta.DetalleVentas.map((detalle) => ({
          nombre: detalle.Medicamentos.nombre,
          concentracion: detalle.Medicamentos.concentracion,
          adicional: detalle.Medicamentos.adicional,
          presentacionId:
            detalle.Medicamentos.presentacion[0].Presentacion.nombre,
          precio: detalle.Medicamentos.precio.toNumber(),
          cantidad: detalle.cantidad,
          subtotal: detalle.subTotal.toNumber(),
        })),
      };
    });

    const totalPages = Math.ceil(totalCount / take);

    revalidatePath("/ventas_realizadas");
    console.log(result);

    return {
      currentPage,
      totalPages,
      ventas: result, // Lista de ventas con detalles
    };
  } catch (error) {
    console.log({ error });
    throw new Error("No se pudo cargar las ventas");
  }
};
