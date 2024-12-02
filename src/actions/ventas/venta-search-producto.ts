"use server";

import prisma from "@/libs/prisma";

export const searchProducto = async (searchTerm: string) => {
  if (!searchTerm) return [];

  // Calcular la fecha de inicio del rango (2 semanas desde ahora)
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

  try {
    const results = await prisma.medicamentos.findMany({
      where: {
        estado: true, // Filtrar solo medicamentos activos
        OR: [
          { nombre: { contains: searchTerm, mode: "insensitive" } }, // Buscar por nombre
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
          { categoria: { contains: searchTerm, mode: "insensitive" } }, // Buscar por categoría
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
        // Buscar presentacionId
        presentacion: {
          select: {
            Presentacion: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
        // Buscar laboratoriosId
        laboratorios: {
          select: {
            Laboratorio: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
        // Lotes
        lotes: {
          select: {
            id: true,
            stock: true,
            vencimiento: true,
          },
        },
      },
      take: 5, // Limitar a 5 resultados
    });

    // Transformar los resultados para adaptarlos al formato deseado
    return results.map((med) => {
      // Calcular el lote más próximo a vencer dentro de 2 semanas en adelante
      const lotesProximos = med.lotes.filter(
        (lote) => lote.vencimiento > twoWeeksFromNow, // Lotes con vencimiento en el rango
      ).sort((a, b) =>
        new Date(a.vencimiento).getTime() - new Date(b.vencimiento).getTime()
      ); // Ordenar por fecha más próxima

      // Tomar el lote más cercano dentro del rango de 2 semanas en adelante
      const loteProximo = lotesProximos[0] || null;

      // Calcular el total de stock (incluyendo lotes vencidos)
      const totalStock = med.lotes.reduce(
        (acc, lote) => acc + (lote.stock || 0),
        0,
      );

      return {
        id: med.id,
        nombre: med.nombre,
        concentracion: med.concentracion,
        adicional: med.adicional,
        precio: med.precio.toNumber(), // Convertir Decimal a número
        presentacionId: med.presentacion?.[0]?.Presentacion?.nombre || null,
        laboratoriosId: med.laboratorios?.[0]?.Laboratorio?.nombre || null,
        foto: med.foto,
        stock: totalStock, // Total de stock (incluye vencidos)
        lote: loteProximo, // Lote más cercano dentro del rango
        cantidadCart: 1, // Inicialmente 0, puedes actualizarlo desde el frontend
        estado: med.estado,
      };
    });
  } catch (error) {
    console.error("Error en searchMedicamentos:", error);
    throw new Error("No se pudieron obtener los medicamentos de la BD.");
  }
};
