'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const FilterCategoria = () => {
  // Obtener parámetros de la URL
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  
  // Estado local para manejar la categoría seleccionada, por defecto 'Farmacos' si no hay nada en la URL
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(searchParams.get('filtro') || 'Farmacos');

  // Manejar el cambio de categoría
  const handleCategoriaChange = (filtro: string) => {
    setSelectedCategoria(filtro);

    // Crear/actualizar los parámetros de la URL
    const params = new URLSearchParams(searchParams);
    
    if (filtro) {
      params.set('filtro', filtro); // ?categoria=valor
    } else {
      params.delete('filtro'); // Remover el parámetro si no hay categoría seleccionada
    }
    
    // Actualizar la URL con la categoría seleccionada
    replace(`${pathname}?${params.toString()}`);
  };

  // Efecto para actualizar el estado cuando los searchParams cambien externamente
  useEffect(() => {
    const categoriaParam = searchParams.get('filtro');
    if (categoriaParam) {
      setSelectedCategoria(categoriaParam);
    }
  }, [searchParams]);

  return (
    <div className="flex gap-4 font-semibold text-gray-500">
      {/* Radio button para 'Fármacos' */}
      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="Farmacos"
          checked={selectedCategoria === 'Farmacos'}
          onChange={() => handleCategoriaChange('Farmacos')}
        />
        Fármacos
      </label>

      {/* Radio button para 'Instrumento_Medicos' */}
      <label className="flex items-center gap-2">
        <input
          type="radio"
          value="Instrumento_Medicos"
          checked={selectedCategoria === 'Instrumento Médico'}
          onChange={() => handleCategoriaChange('Instrumento Médico')}
        />
        Instrumento Médicos
      </label>
    </div>
  );
};


// 'use client';
//
// import { useCategoriaStore } from '@/store';
//
// export const FilterCategoria = () => {
//   const { categoria, setCategoria } = useCategoriaStore();
//
//   // Manejar el cambio de categoría
//   const handleCategoriaChange = (categoria: string) => {
//     setCategoria(categoria);
//   };
//
//   return (
//     <div className="flex gap-4 font-semibold text-gray-500">
//       <label className="flex items-center gap-2">
//         <input
//           type="radio"
//           value="Farmacos"
//           checked={categoria === 'Farmacos'}
//           onChange={() => handleCategoriaChange('Farmacos')}
//         />
//         Fármacos
//       </label>
//
//       <label className="flex items-center gap-2">
//         <input
//           type="radio"
//           value="Instrumento Medico"
//           checked={categoria === 'Instrumento Médico'}
//           onChange={() => handleCategoriaChange('Instrumento Médico')}
//         />
//         Instrumento Médicos
//       </label>
//     </div>
//   );
// };
