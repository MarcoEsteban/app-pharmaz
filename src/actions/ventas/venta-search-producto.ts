"use server";

import prisma from "@/libs/prisma";
import { DateTime } from "luxon";

export const searchProducto = async (searchTerm: string) => {
  if (!searchTerm) return [];

  // Fechas para las condiciones
  const now = DateTime.now();
  const threeMonthsFromNow = now.plus({ months: 3 });
  const oneMonthFromNow = now.plus({ months: 1 });

  try {
    const results = await prisma.medicamentos.findMany({
      where: {
        estado: true, // Solo medicamentos activos
        OR: [
          { nombre: { contains: searchTerm, mode: "insensitive" } },
          {
            laboratorios: {
              some: {
                Laboratorio: {
                  nombre: { contains: searchTerm, mode: "insensitive" },
                },
              },
            },
          },
          {
            principioActivo: {
              some: {
                PrincipioActivo: {
                  nombre: { contains: searchTerm, mode: "insensitive" },
                },
              },
            },
          },
          // { categoria: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        nombre: true,
        concentracion: true,
        adicional: true,
        precio: true,
        foto: true,
        estado: true,
        presentacion: {
          select: {
            Presentacion: {
              select: { id: true, nombre: true },
            },
          },
        },
        laboratorios: {
          select: {
            Laboratorio: {
              select: { id: true, nombre: true },
            },
          },
        },
        lotes: {
          select: {
            id: true,
            stock: true,
            vencimiento: true,
          },
        },
      },
      take: 20,
    });

    return results.map((med) => {
      // Ordenar lotes por vencimiento más próximo
      const lotesOrdenados = med.lotes.sort((a, b) =>
        DateTime.fromISO(a.vencimiento.toString()).toMillis() -
        DateTime.fromISO(b.vencimiento.toString()).toMillis()
      );

      const loteProximo = lotesOrdenados[0] || null;

      // Calcular el total de stock
      const totalStock = med.lotes.reduce(
        (acc, lote) => acc + (lote.stock || 0),
        0,
      );

      // Condiciones
      let statusColor = "default";
      if (loteProximo) {
        const vencimiento = DateTime.fromISO(
          loteProximo.vencimiento.toString(),
        );
        if (vencimiento <= oneMonthFromNow) {
          statusColor = "orange";
        } else if (vencimiento <= threeMonthsFromNow) {
          statusColor = "green";
        }
      }
      if (totalStock < 15) {
        statusColor = "red";
      }

      console.log({ med });

      return {
        id: med.id,
        nombre: med.nombre,
        concentracion: med.concentracion,
        adicional: med.adicional,
        precio: med.precio.toNumber(),
        presentacionId: med.presentacion?.[0]?.Presentacion?.nombre || null,
        laboratorioId: med.laboratorios?.[0]?.Laboratorio?.nombre || null,
        foto: med.foto,
        stock: totalStock,
        lote: loteProximo
          ? {
            id: loteProximo.id,
            stock: loteProximo.stock,
            vencimiento: loteProximo.vencimiento,
          }
          : null,
        cantidadCart: 1, // Inicialmente 1
        estado: med.estado,
        statusColor,
      };
    });
  } catch (error) {
    console.error("Error en searchMedicamentos:", error);
    throw new Error("No se pudieron obtener los medicamentos de la BD.");
  }
};
