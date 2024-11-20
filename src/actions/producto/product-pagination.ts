"use server";

import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface Pagination {
  currentPage?: number;
  take?: number;
  query?: string;
  categoria?: string;
}

export const getPaginationProducto = async ({
  currentPage = 1, // Número de página por defecto.
  take = 6, // Número de registros por página.
  query = "", // Permite realizar la búsqueda.
  categoria = "", // Filtrar por categoría.
}: Pagination) => {
  if (isNaN(Number(currentPage))) currentPage = 1;
  if (currentPage < 1) currentPage = 1;

  try {
    // =================================================
    // Condición para filtrar según la query del Search y categoría:
    // =================================================
    const conditions: Prisma.MedicamentosWhereInput = {
      AND: [
        query
          ? {
            OR: [
              {
                nombre: {
                  contains: query,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
              {
                laboratorios: {
                  some: {
                    Laboratorio: {
                      nombre: { contains: query, mode: "insensitive" },
                    },
                  },
                },
              },
              {
                presentacion: {
                  some: {
                    Presentacion: {
                      nombre: { contains: query, mode: "insensitive" },
                    },
                  },
                },
              },
              {
                viaAdministracion: {
                  some: {
                    ViaAdministracion: {
                      nombre: { contains: query, mode: "insensitive" },
                    },
                  },
                },
              },
              {
                principioActivo: {
                  some: {
                    PrincipioActivo: {
                      nombre: { contains: query, mode: "insensitive" },
                    },
                  },
                },
              },
            ],
          }
          : {},
        categoria
          ? {
            categoria: { equals: categoria },
          }
          : {},
      ],
    };

    // Obtenemos los medicamentos y el total de registros en paralelo
    const [medicamentos, totalCount] = await Promise.all([
      prisma.medicamentos.findMany({
        where: conditions,
        take, // Número de registros a mostrar
        skip: (currentPage - 1) * take, // Saltar registros para paginación
        orderBy: {
          createdAt: "asc",
        },
        include: { // Incluir relaciones si necesitas mostrar datos relacionados
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
          lotes: {
            where: { estado: true }, // Solo incluir lotes activos
            select: {
              stock: true,
            },
          },
        },
      }),
      prisma.medicamentos.count({
        where: conditions,
      }),
    ]);

    // Calcular stock total por medicamento
    const productos = medicamentos.map((item) => {
      const totalStock = item.lotes.reduce((acc, lote) => acc + lote.stock, 0);

      return {
        id: item.id,
        categoria: item.categoria,
        nombre: item.nombre,
        concentracion: item.concentracion,
        adicional: item.adicional,
        precio: item.precio.toNumber(),
        receta: item.receta || "",
        tipo: item.tipo,
        foto: item.foto,
        laboratoriosId: item.laboratorios?.[0]?.Laboratorio?.nombre || "", // Acceso a nombre de laboratorio
        presentacionId: item.presentacion?.[0]?.Presentacion?.nombre || "", // Acceso a nombre de presentación
        viaAdministracionId:
          item.viaAdministracion?.[0]?.ViaAdministracion?.nombre || "", // Acceso a nombre de vía de administración
        principioActivoId: item.principioActivo?.[0]?.PrincipioActivo?.nombre ||
          "", // Acceso a nombre de principio activo
        stock: totalStock,
        estado: item.estado,
      };
    });

    const totalPages = Math.ceil(totalCount / take);

    revalidatePath("/producto");

    return {
      currentPage,
      totalPages,
      productos, // Lista de productos con stock total
    };
  } catch (error) {
    console.log({ error });
    throw new Error("No se pudo cargar los medicamentos");
  }
};
