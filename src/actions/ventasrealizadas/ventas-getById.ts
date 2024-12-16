"use server";

import prisma from "@/libs/prisma";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";

export const getByIdVentas = async (id: string) => {
  console.log({ id });

  try {
    // Obtenemos las ventas y el total de registros en paralelo
    const venta = await prisma.ventas.findFirst({
      where: { id },
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

    if (!venta) {
      return {};
    }

    const vendedor = await prisma.usuario.findFirst({
      where: { id: venta.usuarioId },
      include: {
        personas: {
          select: {
            nombre: true,
            ap: true,
            am: true,
          },
        },
      },
    });

    if (!vendedor) {
      return {};
    }

    const fechaOriginal = venta?.Transacciones.fecha; // Tipo Date
    const fechaLuxon = DateTime.fromISO(fechaOriginal.toISOString()).setZone(
      "America/La_Paz",
    );

    const result = {
      ventaId: venta.id,
      fecha: fechaLuxon.toFormat("dd/MM/yyyy"),
      hora: fechaLuxon.toFormat("HH:mm"),
      metodoPago: venta.Transacciones.metodoPago,
      numeroVenta: venta.Transacciones.numeroVenta,
      total: venta.Transacciones.total,
      cliente:
        `${venta.Personas.nombre} ${venta.Personas.ap} ${venta.Personas.am}`,
      clienteNit: venta.Personas.ci,
      vendedor:
        `${vendedor?.personas.nombre} ${vendedor?.personas.ap} ${vendedor?.personas.am}`,
      detalles: venta.DetalleVentas.map((detalle) => {
        const adicional = detalle.Medicamentos.adicional
          ? detalle.Medicamentos.adicional
          : "";
        return {
          nombre: detalle.Medicamentos.nombre,
          concentracion: detalle.Medicamentos.concentracion,
          adicional,
          presentacionId:
            detalle.Medicamentos.presentacion[0].Presentacion.nombre,
          precio: detalle.Medicamentos.precio.toNumber(),
          cantidad: detalle.cantidad,
          subtotal: detalle.subTotal.toNumber(),
        };
      }),
    };
    console.log(JSON.stringify(venta));

    if (!result) {
      return {};
    }

    revalidatePath("/ventas_realizadas");

    return result;
  } catch (error) {
    console.log({ error });
    throw new Error("No se pudo cargar las ventas");
  }
};
