"use client";

import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { Record } from "@prisma/client/runtime/library";

interface AutocompleteProps<T> {
  label: string; // Etiqueta del campo
  name: string; // Nombre del campo en el formulario
  value: string; // ID seleccionado
  onChange: (value: string) => void; // Función para actualizar el ID en el formulario
  fetchResults: (term: string) => Promise<T[]>; // Función para buscar resultados
  displayValue: (option: T) => string; // Cómo se muestra cada opción
  error?: string; // Mensaje de error
}

const Autocomplete = <T extends Record<string, any>>({
  label,
  name,
  value,
  onChange,
  fetchResults,
  displayValue,
  error,
  valueKey = "id", // Agregamos `valueKey` como nueva propiedad para determinar qué dato enviar.
}: AutocompleteProps<T> & { valueKey?: keyof T }) => {
  const [inputValue, setInputValue] = useState("");
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      fetchResults(value).then((results) => {
        if (results.length > 0) {
          const selectedOption = results[0];
          onChange(selectedOption?.[valueKey] as string); // Usa `valueKey` para determinar qué dato enviar.
          setInputValue(displayValue(selectedOption)); // Muestra el nombre en el input
        }
      });
    }
  }, [value, fetchResults, displayValue, onChange, valueKey]);

  // --------------------------------------
  // Función debounced para buscar opciones
  // --------------------------------------
  const debouncedFetch = useDebouncedCallback(async (term: string) => {
    if (term.trim() === "") {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }
    setLoading(true);
    try {
      const results = await fetchResults(term);
      if (results.length === 0) {
        // Envía el término al backend aunque no haya resultados del fetchResults
        onChange(term);
        setInputValue(term); // Muestra el nombre en el input
        await fetchResults(term);
      }
      setSearchResults(results);
      setIsDropdownOpen(true);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error("Error fetching autocomplete options:", error);
      setSearchResults([]);
      setIsDropdownOpen(false);
    } finally {
      setLoading(false);
    }
  }, 300); // 300ms de debounce

  useEffect(() => {
    debouncedFetch(term);
    return () => {
      debouncedFetch.cancel();
    };
  }, [term, debouncedFetch]);

  // -----------------------------------
  // Cerrar dropdown al hacer clic fuera
  // -----------------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current && !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ----------------------------------
  // Manejar la selección de una opción
  // ----------------------------------
  const handleSelect = (option: T) => {
    onChange(option[valueKey] as string); // Usa `valueKey` para determinar qué dato enviar.
    setInputValue(displayValue(option)); // Muestra el nombre en el input
    setSearchResults([]); // Limpia los resultados
    setIsDropdownOpen(false); // Cierra el dropdown
  };

  // Manejar cambios en el input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setTerm(e.target.value);
    onChange(""); // Resetea el valor en el formulario al escribir
    if (e.target.value.trim() !== "" || e.target.value !== value) {
      setIsDropdownOpen(true); // Abre el dropdown al escribir
    } else {
      setIsDropdownOpen(false); // Cierra el dropdown si el input está vacío
    }
  };

  // --------------------------
  // Manejar eventos de teclado
  // --------------------------
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((
        prev,
      ) => (prev < searchResults.length - 1 ? prev + 1 : prev));
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
    <div className="relative" ref={wrapperRef}>
      <label htmlFor={name} className="label-text">
        {label}
      </label>
      <input
        type="text"
        id={name}
        className={clsx(
          "input-text",
          {
            "border-red-500 focus:ring-red-500": error,
            "border-gray-300 focus:ring-blue-500": !error,
          },
        )}
        autoFocus
        placeholder={`Buscar ${label.toLowerCase()}...`}
        value={inputValue} // Muestra el nombre seleccionado o el término de búsqueda
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={`${name}-listbox`}
        aria-expanded={isDropdownOpen} // Asegúrate de que este atributo esté habilitado
      />
      {loading && (
        <div className="absolute right-2 top-9 text-blue-500">Cargando...</div>
      )}
      {isDropdownOpen === true && searchResults.length > 0 && ( // Abre el dropdown solo si está habilitado
        <ul
          id={`${name}-listbox`}
          role="listbox"
          className="absolute z-10 bg-white border rounded-md shadow-lg mt-1 w-full max-h-48 overflow-y-auto"
        >
          {searchResults.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={highlightedIndex === index}
              className={clsx(
                "cursor-pointer p-2",
                {
                  "bg-gray-200": highlightedIndex === index,
                  "hover:bg-gray-100": highlightedIndex !== index,
                },
              )}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {displayValue(option)}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Exportando de esta forma se puede mandar funciones & promesar por las Props.
export default Autocomplete;
