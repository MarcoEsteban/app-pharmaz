"use client";

import React, { useState } from "react";
import { getReport } from "@/actions/reportes/get-report";
import { generateReport } from "@/utils/jspdf-reporte";

interface MenuOption {
  label: string;
  value?: string;
  isDateRange?: boolean;
}

interface MultiLevelDropdownProps {
  buttonLabel: string;
  menuOptions: MenuOption[];
  pago?: string;
  table: string;
}

const MultiLevelDropdown: React.FC<MultiLevelDropdownProps> = ({
  buttonLabel,
  menuOptions,
  pago = "no",
  table,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown padre
  const [isRangeOpen, setIsRangeOpen] = useState(false); // Sub-dropdown (Rango de fechas)
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("Efectivo");

  // Toggle del dropdown padre
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsRangeOpen(false); // Cerrar sub-dropdown al abrir/cerrar dropdown padre
  };

  // Toggle del sub-dropdown (Rango de Fechas)
  const toggleRangeDropdown = () => {
    setIsRangeOpen(!isRangeOpen); // Abrir/Cerrar sub-dropdown
  };

  // Generar reporte para rango de fechas
  const handleRangeSubmit = async () => {
    if (startDate && endDate) {
      const data = await getReport({
        type: "range",
        value: { start: startDate, end: endDate },
        payment: selectedPayment,
        table,
      });

      let headTable;
      switch (table) {
        case "Ventas":
          headTable = ["ID", "Cliente", "Metodo", "Numero", "Fecha", "Total"];
          break;

        case "Compras":
          headTable = ["ID", "Fecha", "Proveedor", "Medicamento", "Cantidad"];
          break;

        case "Inventarios":
          headTable = [
            "ID",
            "Nombre",
            "Clasificacion",
            "Stock",
            "Precio",
            "Valor Total",
            "Fecha Ultima actualizacion",
          ];
          break;
      }
      console.log({ headTable });

      generateReport(
        data.reportData as any,
        headTable as any,
        table,
      );

      // Cerrar tanto el sub-dropdown como el dropdown padre
      setIsRangeOpen(false);
      setIsOpen(false);

      // Limpiar valores de las fechas
      setStartDate("");
      setEndDate("");
    } else {
      console.error("Por favor selecciona un rango de fechas válido.");
    }
  };

  // Generar reporte para opciones directas
  const handleOptionClick = async (option: MenuOption) => {
    if (!option.isDateRange && option.value) {
      const data = await getReport({
        type: "fixed",
        value: option.value,
        payment: selectedPayment,
        table,
      });
      let headTable;
      switch (table) {
        case "Ventas":
          headTable = ["ID", "Cliente", "Metodo", "Numero", "Fecha", "Total"];
          break;

        case "Compras":
          headTable = ["ID", "Fecha", "Proveedor", "Medicamento", "Cantidad"];
          break;

        case "Inventario":
          headTable = [
            "ID",
            "Nombre",
            "Clasificacion",
            "Stock",
            "Precio",
            "Valor Total",
            "Ultima Fecha ",
          ];
          break;
      }
      console.log({ headTable });

      generateReport(
        data.reportData as any,
        headTable as any,
        table,
      );
      setIsOpen(false); // Cerrar dropdown padre
    }
  };

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {buttonLabel}
      </button>

      {/* Dropdown principal */}
      {isOpen && (
        <div className="absolute bg-white shadow-md border rounded mt-2 w-48 z-10">
          {pago === "si" && (
            <div className="p-2 border-b">
              <label className="block text-sm font-medium text-gray-700">
                Método de Pago
              </label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                <option value="">Todos</option>
                <option value="Efectivo">Efectivo</option>
                <option value="QR">QR</option>
              </select>
            </div>
          )}

          {menuOptions.map((option, index) => (
            <div key={index} className="p-2 border-b last:border-none">
              {!option.isDateRange
                ? (
                  <button
                    className="w-full text-left hover:bg-gray-100 p-2 rounded"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </button>
                )
                : (
                  <button
                    className="w-full text-left hover:bg-gray-100 p-2 rounded"
                    onClick={toggleRangeDropdown} // Abrir/Cerrar sub-dropdown
                  >
                    {option.label}
                  </button>
                )}
            </div>
          ))}
        </div>
      )}

      {/* Sub-dropdown para Rango de Fechas */}
      {isRangeOpen && (
        <div className="absolute left-full top-[360px] bg-white shadow-md border rounded w-auto z-20 p-4 ml-2">
          <div className="flex justify-between items-center space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <span className="mx-2 text-gray-500">a</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={handleRangeSubmit}
              className="px-4 py-2 bg-green-700 text-white rounded"
            >
              Generar Reporte
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiLevelDropdown;
