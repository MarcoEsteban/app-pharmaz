
export const generatePaginationNumbers = ( currentPage: number, totalPages: number ) => {

  // Si el numero total de páginas es 7 o menos
  // Vamos a mostrar todas las páginas sin puntos suspensivos
  if ( totalPages <= 7 ) {
    return Array.from( { length: totalPages }, ( _, i ) => i + 1 ); // Convierte el objeto en un Array y Recorre el Array [1,2,3,4,5,6,7]
  }

  // Si la página actual está entre las primeras 3 páginas
  // Mostrar las primeras 3, puntos suspensivos, y las ultimas 2
  if ( currentPage <= 3 ) {
    return [ 1, 2, 3, '...', totalPages - 1, totalPages ]; // [1,2,3, '...', 49, 50]
  }

  // Si la página actual está entre las últimas 3 páginas
  // Mostrar las primeras 2, puntos suspensivos, las últimas 3 páginas
  if (currentPage >= currentPage - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]; // [1,2, '...', 48, 49, 50]
  }

  // Si la página actual está en otro lugar medio
  // Mostrar la primera página, puntos suspensivos, la página actual y vecinos
  return [
    1, 
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];

};
