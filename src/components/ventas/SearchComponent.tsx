"use client";

import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import clsx from "clsx";

interface SearchProps<T> {
  fetchData: (term: string) => Promise<T[]>; // Función para obtener resultados
  onSelect: (item: T) => void; // Callback cuando se selecciona un resultado
  placeholder?: string; // Placeholder del input
  displayField: (item: T) => string; // Función para mostrar el campo en la lista
}

const SearchComponent = <T extends { id: string }>({
  fetchData,
  onSelect,
  placeholder = "Buscar...",
  displayField,
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
        handleSelect(searchResults[highlightedIndex]);
        setInputValue(" ");
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="relative w-[500px] mr-2">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={clsx(
          "input-text",
          "border-gray-300 focus:ring-blue-500",
        )}
        autoComplete="off"
        aria-expanded={isDropdownOpen}
      />
      {isDropdownOpen && (
        <ul className="absolute z-10 bg-white border rounded-md shadow-lg mt-1 w-full max-h-48 overflow-y-auto">
          {searchResults.map((item, index) => (
            <li
              key={item.id}
              className={clsx(
                "cursor-pointer p-2",
                { "bg-gray-200": highlightedIndex === index },
                { "hover:bg-gray-100": highlightedIndex !== index },
              )}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {displayField(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
