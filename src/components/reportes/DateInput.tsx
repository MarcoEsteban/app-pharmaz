"use client";

import { DateTime } from "luxon";
import { useState } from "react";

const DateInput = () => {
  const [date, setDate] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const formattedDate = DateTime.fromISO(inputDate).setLocale("es")
      .toLocaleString(DateTime.DATE_FULL);
    setDate(formattedDate);
  };

  return (
    <div>
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
        Selecciona una fecha
      </label>
      <input
        id="date"
        type="date"
        onChange={handleDateChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {date && (
        <p className="mt-2 text-sm text-gray-600">
          Fecha seleccionada: <strong>{date}</strong>
        </p>
      )}
    </div>
  );
};

export default DateInput;
