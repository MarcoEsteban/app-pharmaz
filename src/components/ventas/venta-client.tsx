"use client";

import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
// import { useClienteStore } from "./store";
import clsx from "clsx";
import { searchCliente } from "@/actions";
import { BtnAgregar } from "../ui/button/Button";
import { useCartStore } from "@/store";

interface Cliente {
  id: string;
  ci: string;
  nombre: string;
  ap: string | null;
  am: string | null;
}

type Farma = {
  id: string;
  nombre: string;
  email: string;
  celular: number | null | undefined;
  direccion: string | null;
  foto: string | null;
};

interface Props {
  farma: Farma;
  vendedor: Omit<Cliente, "ci">;
}

const SimpleClienteSearch = ({ farma, vendedor }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<Cliente[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // const { setClienteId } = useClienteStore();
  const { setCliente, setFarma, setVendedor } = useCartStore();

  // Función para buscar clientes en la API
  const fetchClientes = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    try {
      const data = await searchCliente(term);
      setSearchResults(data);
      setIsDropdownOpen(data.length > 0);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    fetchClientes(value);
  };

  const handleSelect = (cliente: Cliente) => {
    setCliente(cliente); // Guarda el ID en Zustand
    setFarma(farma);
    setVendedor(vendedor);
    setInputValue(cliente.nombre); // Actualiza el input con el nombre
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
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="relative w-[500px] mr-2">
      <input
        type="text"
        placeholder="Buscar cliente..."
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
          {searchResults.map((cliente, index) => (
            <li
              key={cliente.id}
              className={clsx(
                "cursor-pointer p-2",
                { "bg-gray-200": highlightedIndex === index },
                { "hover:bg-gray-100": highlightedIndex !== index },
              )}
              onClick={() => handleSelect(cliente)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {cliente.nombre + " " + cliente.ap + " " + cliente.am}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleClienteSearch;
