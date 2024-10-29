'use server'

import prisma from "@/libs/prisma"

export const getByIdProducto = async (id: string) => {
  try {
    const productoById = await prisma.medicamentos.findUnique({
      where: { id },
      include: {
        laboratorios: {
          select: {
            Laboratorio: {
              select: {
                nombre: true,
              },
            },
          },
        },
        presentacion: {
          select: {
            Presentacion: {
              select: {
                nombre: true,
              },
            },
          },
        },
        viaAdministracion: {
          select: {
            ViaAdministracion: {
              select: {
                nombre: true,
              },
            },
          },
        },
        principioActivo: {
          select: {
            PrincipioActivo: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });
    
    if (!productoById) return null;

    const producto = {
      id: productoById.id,
      categoria: productoById.categoria,
      nombre: productoById.nombre,
      concentracion: productoById.concentracion ?? undefined,
      adicional: productoById.adicional ?? undefined,
      precio: productoById.precio.toNumber(), // Convertir Prisma.Decimal a number
      receta: productoById.receta ?? undefined,
      tipo: productoById.tipo ?? undefined,
      laboratoriosId: productoById.laboratorios.map((labo) => labo.Laboratorio.nombre).join(''),
      presentacionId: productoById.presentacion.map((presen) => presen.Presentacion.nombre).join(''),
      viaAdministracionId: productoById.viaAdministracion.map((viaAdm) => viaAdm.ViaAdministracion.nombre).join(''),
      principioActivoId: productoById.principioActivo.map((princi) => princi.PrincipioActivo.nombre).join(''),
      estado: productoById.estado,
    };

    return producto;

  } catch (error) {
    console.log(error);
    return null;
  }
};
