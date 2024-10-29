// Obtener los parámetros de la URL actual
export const getUrlParams = ( searchParams: any ) => {
  
  const page = searchParams.get('page');
  const query = searchParams.get('query');
  const filtro = searchParams.get('filtro');
  let params = '';
  
  if (page) params += `page=${page}&`;
  if (query) params += `query=${query}&`;
  if (filtro) params += `filtro=${filtro}&`;
  
  // Elimina el último & si existe
  return params ? `?${params.slice(0, -1)}` : '';
  
};
