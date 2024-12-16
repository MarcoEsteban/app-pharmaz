"use client";

import React, { ChangeEvent, useState } from "react";

interface SearchProps<T> {
  fetchData: (term: string) => Promise<T[]>; // Función para obtener resultados
  onSelect: (item: T) => void; // Callback cuando se selecciona un resultado
  placeholder?: string; // Placeholder del input
  displayField: (item: T) => string; // Función para mostrar el campo en la lista
  renderItem: (item: T) => React.ReactNode; // Componente de visualización personalizado
  className?: string;
}

const SearchComponent = <T extends { id: string }>({
  fetchData,
  onSelect,
  placeholder = "Buscar...",
  displayField,
  renderItem,
  className = "w-[500px]",
}: SearchProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    fetchData(value)
      .then((data) => {
        setSearchResults(data);
        setIsDropdownOpen(data.length > 0);
      })
      .catch(() => {
        setSearchResults([]);
        setIsDropdownOpen(false);
      });
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    setInputValue(displayField(item));
    setSearchResults([]);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`relative mr-2 ${className}`}>
      <div className="relative">
        <input
          type="search"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className="input-text w-full border-gray-300 focus:ring-blue-500"
          autoComplete="off"
        />
      </div>
      {isDropdownOpen && (
        <ul className="absolute z-10  rounded-md mt-1 w-full max-h-96 overflow-y-auto bg-transparent ">
          {searchResults.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
