"use server";

import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";

interface Pagination {
  currentPage?: number;
  take?: number;
  query?: string;
  categoria?: string;
}

export const getPaginationLotes = async ({
  currentPage = 1, // Número de página por defecto.
  take = 6, // Número de registros por página.
  query = "", // Permite realizar la búsqueda.
  categoria = "", // Filtrar por categoría.
}: Pagination) => {
  console.log({ currentPage, query });

  if (isNaN(Number(currentPage))) currentPage = 1;
  if (currentPage < 1) currentPage = 1;

  try {
    // ================================================
    // Condición para filtrar según la query del Search
    // ================================================

    const conditions: Prisma.LotesWhereInput = {
      AND: [
        query
          ? {
            OR: [
              {
                Producto: { nombre: { contains: query, mode: "insensitive" } },
              },
              {
                Producto: {
                  laboratorios: {
                    some: {
                      Laboratorio: {
                        nombre: { contains: query, mode: "insensitive" },
                      },
                    },
                  },
                },
              },
              {
                Producto: {
                  presentacion: {
                    some: {
                      Presentacion: {
                        nombre: { contains: query, mode: "insensitive" },
                      },
                    },
                  },
                },
              },
              {
                Producto: {
                  principioActivo: {
                    some: {
                      PrincipioActivo: {
                        nombre: { contains: query, mode: "insensitive" },
                      },
                    },
                  },
                },
              },
              {
                Producto: {
                  viaAdministracion: {
                    some: {
                      ViaAdministracion: {
                        nombre: { contains: query, mode: "insensitive" },
                      },
                    },
                  },
                },
              },
            ],
          }
          : {},
        categoria
          ? {
            Producto: { categoria: { contains: query, mode: "insensitive" } },
          }
          : {},
      ],
    };

    // Obtenemos los lotes y el total de registros en paralelo
    const [lotes, totalCount] = await Promise.all([
      prisma.lotes.findMany({
        where: conditions,
        take, // Número de registros a mostrar
        skip: (currentPage - 1) * take, // Saltar registros para paginación
        orderBy: {
          createdAt: "asc",
        },
        include: { // Incluir relaciones necesarias
          Producto: {
            include: {
              laboratorios: {
                include: {
                  Laboratorio: {
                    select: { nombre: true },
                  },
                },
              },
              presentacion: {
                include: {
                  Presentacion: {
                    select: { nombre: true },
                  },
                },
              },
              viaAdministracion: {
                include: {
                  ViaAdministracion: {
                    select: { nombre: true },
                  },
                },
              },
              principioActivo: {
                include: {
                  PrincipioActivo: {
                    select: { nombre: true },
                  },
                },
              },
            },
          },
          Proveedor: {
            select: { nombre: true },
          },
        },
      }),
      prisma.lotes.count({
        where: conditions,
      }),
    ]);

    // Formateamos los datos
    const lotesData = lotes.map((lote) => {
      const now = DateTime.now(); // Fecha actual
      const vencimiento = lote.vencimiento
        ? DateTime.fromJSDate(lote.vencimiento)
        : null;

      let mesesRestantes = 0;
      let diasRestantes = 0;

      if (vencimiento) {
        const diff = vencimiento.diff(now, ["months", "days"]); // Obtener la diferencia en meses y días
        mesesRestantes = diff.months > 0 ? Math.floor(diff.months) : 0; // Meses restantes
        diasRestantes = diff.days > 0 ? Math.floor(diff.days) : 0; // Días restantes
      }

      return {
        id: lote.id,
        precio: lote.Producto.precio.toNumber() || 0,
        nombre: lote.Producto.nombre || "",
        concentracion: lote.Producto?.concentracion || "",
        adicional: lote.Producto.adicional || "",
        laboratorio: lote.Producto.laboratorios?.[0]?.Laboratorio?.nombre || "",
        tipo: lote.Producto?.tipo || "",
        presentacion: lote.Producto?.presentacion?.[0]?.Presentacion?.nombre ||
          "",
        viaAdministracion:
          lote.Producto?.viaAdministracion?.[0]?.ViaAdministracion?.nombre ||
          "",
        principioActivo:
          lote.Producto?.principioActivo?.[0]?.PrincipioActivo?.nombre || "",
        proveedorId: lote.Proveedor.nombre || "",
        usuarioId: lote.usuarioId || "",
        productoId: lote.productoId || "",
        stock: lote.stock,
        foto: lote.Producto.foto || "",
        vencimiento: lote.vencimiento
          ? lote.vencimiento.toISOString().split("T")[0]
          : "", // Formatear fecha a ISO
        mes: mesesRestantes,
        dia: diasRestantes,
        estado: lote.estado,
      };
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage,
      totalPages,
      lotes: lotesData, // Lista de productos formateados
    };
  } catch (error) {
    console.log({ error });
    throw new Error("No se pudo cargar los medicamentos");
  }
};
