// 'use server';
//
// import prisma from "@/libs/prisma";
// import { Prisma } from "@prisma/client";
//
// interface SearchPresentacionesParams {
//   search: string;
//   page?: number;
//   limit?: number;
// }
//
// export const searchPresentaciones = async ({
//   search,
//   page = 1,
//   limit = 5,
// }: SearchPresentacionesParams): Promise<any> => {
//   const skip = (page - 1) * limit;
//
//   console.log({search})
//
//     const conditions = search
//       ? { 
//           OR: [
//             {
//               nombre: { startsWith: search, mode: 'insensitive' as Prisma.QueryMode },
//             },
//           ],
//         }
//       : {};
//
//   try {
//     const [presentaciones] = await prisma.$transaction([
//       prisma.presentacion.findMany({
//         where: conditions,
//         select: {
//           id: true,
//           nombre: true,
//         },
//         skip,
//         take: limit,
//         orderBy: {
//           nombre: 'asc',
//         },
//       }),
//     ]);
//
//     console.log({presentaciones})
//
//     return {
//       data: presentaciones,
//     };
//   } catch (error) {
//     console.error('Error en searchPresentaciones:', error);
//     throw new Error('No se pudieron obtener las presentaciones Server.');
//   }
// };

'use server';

import prisma from "@/libs/prisma";


export const searchPresentaciones = async (searchTerm: string) => {
  
  if (!searchTerm) return [];

  try {
    
    const results = await prisma.presentacion.findMany({
      where: {
        estado: true,  // Filtramos solo los laboratorios activos
        OR: [
          { nombre: { startsWith: searchTerm, mode: 'insensitive' } },       // Buscar por el nombre
        ],
      },
      select: {
        id: true,
        nombre: true,
      },
      take: 5, // Limitamos a 5 resultados
    });

    return results;
  } catch (error) {
    console.error('Error en searchPresentaciones:', error);
    throw new Error('No se pudieron obtener las presentaciones de la BD.');
    
  }

};
