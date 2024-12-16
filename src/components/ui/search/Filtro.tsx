"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  label1: string;
  label2: string;
  name: string;
}

export const FilterCategoria = ({ name, label1, label2 }: Props) => {
  // Obtener parámetros de la URL
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Estado local para manejar la categoría seleccionada, por defecto 'Farmacos' si no hay nada en la URL
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(
    // searchParams.get("filtro") || "Farmacos",
    searchParams.get("filtro"),
  );

  // Manejar el cambio de categoría
  const handleCategoriaChange = (filtro: string) => {
    setSelectedCategoria(filtro);

    // Crear/actualizar los parámetros de la URL
    const params = new URLSearchParams(searchParams);

    if (filtro) {
      params.set("filtro", filtro); // ?categoria=valor
    } else {
      params.delete("filtro"); // Remover el parámetro si no hay categoría seleccionada
    }

    // Actualizar la URL con la categoría seleccionada
    replace(`${pathname}?${params.toString()}`);
  };

  // Efecto para actualizar el estado cuando los searchParams cambien externamente
  useEffect(() => {
    const categoriaParam = searchParams.get("filtro");
    if (categoriaParam) {
      setSelectedCategoria(categoriaParam);
    }
  }, [searchParams]);

  return (
    <div className="flex gap-4 font-semibold text-gray-500">
      {/* Radio button para 'Fármacos' */}
      <label htmlFor={`${name}1`} className="flex items-center gap-2">
        <input
          id={`${name}1`}
          type="radio"
          value={label1}
          // checked={selectedCategoria === "Farmacos"}
          // checked={true}
          defaultChecked={true}
          name={name}
          onChange={() => handleCategoriaChange(label1)}
        />
        {label1}
      </label>

      {/* Radio button para 'Instrumento_Medicos' */}
      <label htmlFor={`${name}2`} className="flex items-center gap-2">
        <input
          id={`${name}2`}
          type="radio"
          name={name}
          value={label2}
          // checked={selectedCategoria === "Instrumento Médico"}
          onChange={() => handleCategoriaChange(label2)}
        />
        {label2}
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
