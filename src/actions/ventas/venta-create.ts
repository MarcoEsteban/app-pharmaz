"use server";

import { ProductoSearch } from "@/interfaces";
import prisma from "@/libs/prisma";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";

export const createVenta = async (data: string) => {
  const parsedData = JSON.parse(data);
  console.log("Data: ", parsedData);

  try {
    const { cart, cliente, vendedor, transaccion, numeroVenta } = parsedData;

    const fechaActual = DateTime.now().setZone("America/La_Paz");
    const total = cart.reduce(
      (sum: number, item: ProductoSearch) =>
        sum + item.precio * item.cantidadCart,
      0,
    );

    const prismaTx = await prisma.$transaction(async () => {
      // --------------------------
      // Data for transaction table
      // --------------------------
      const transaction = {
        metodoPago: transaccion,
        numeroVenta: numeroVenta,
        fecha: fechaActual.toISO() ?? "",
        total,
      };
      const transactionDB = await prisma.transacciones.create({
        data: transaction,
      });

      // ---------------------------
      // Data for Sales(venta) table
      // ---------------------------
      if (!transactionDB) {
        return {
          ok: false,
          message: "Error al realizar la Venta",
        };
      }
      const venta = {
        personasId: cliente.id,
        usuarioId: vendedor.id,
        metodoPagoId: transactionDB.id,
      };
      const ventaDB = await prisma.ventas.create({
        data: venta,
      });

      // ----------------------------------------
      // Data for DetailSales(Detalleventa) table
      // ----------------------------------------
      if (!ventaDB) {
        return {
          ok: false,
          message: "Error al realizar la Venta",
        };
      }
      const detalle = cart.map((item: ProductoSearch) => {
        return {
          cantidad: item.cantidadCart,
          precio: item.precio.toFixed(2),
          subTotal: (item.precio * item.cantidadCart).toFixed(2),
          ventaId: ventaDB.id,
          medicamentoId: item.id,
        };
      });
      await prisma.detalleVentas.createMany({
        data: detalle,
      });

      // ----------------------------------------
      // Descontar stock de los lotes
      // ----------------------------------------
      for (const item of cart) {
        let cantidadPorDescontar = item.cantidadCart;

        while (cantidadPorDescontar > 0) {
          // Buscar el siguiente lote más próximo a vencer (ignorar vencidos)
          const lote = await prisma.lotes.findFirst({
            where: {
              productoId: item.id,
              vencimiento: {
                gt: fechaActual.toISO() ?? "", // Ignorar vencidos
              },
              stock: {
                gt: 0, // Ignorar lotes sin stock
              },
            },
            orderBy: {
              vencimiento: "asc", // Más próximo a vencer
            },
          });

          if (!lote) {
            throw new Error(
              `No hay suficiente stock disponible para el medicamento ${item.id}`,
            );
          }

          // Calcular cuánto se puede descontar del lote actual
          const cantidadDescontarLote = Math.min(
            cantidadPorDescontar,
            lote.stock,
          );

          // Actualizar el stock del lote
          await prisma.lotes.update({
            where: { id: lote.id },
            data: {
              stock: lote.stock - cantidadDescontarLote,
            },
          });

          // Eliminar el lote si el stock llega a 0
          if (lote.stock - cantidadDescontarLote === 0) {
            await prisma.lotes.delete({
              where: { id: lote.id },
            });
          }

          // Reducir la cantidad restante por descontar
          cantidadPorDescontar -= cantidadDescontarLote;
        }
      }

      return {
        ok: true,
        message: "El PDF se ha generado y la venta se ha guardado con exito",
      };
    });

    // Revalidacion de las Rutas para Actualizar en Tiempo Real:
    revalidatePath("/");
    revalidatePath("/ventas_realizadas");

    return {
      ok: prismaTx.ok,
      message: prismaTx.message,
    };
  } catch (error) {
    console.error({ error });
  }
};
