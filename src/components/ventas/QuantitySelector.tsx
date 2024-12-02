"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useState } from "react";

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const [tempQuantity, setTempQuantity] = useState(quantity);

  const onValueChanged = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity < 1) return;
    setTempQuantity(newQuantity); // Actualiza el estado local
    onQuantityChanged(newQuantity); // Actualiza en el store
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTempQuantity(value === "" ? 0 : parseInt(value, 10)); // Permite valores temporales vacíos

    if (!isNaN(parseInt(value, 10)) && parseInt(value, 10) >= 1) {
      onQuantityChanged(parseInt(value, 10));
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} className="text-red-500" />
      </button>

      <input
        value={tempQuantity === 0 ? " " : tempQuantity}
        onChange={onInputChange}
        className="w-20 mx-3 px-5 bg-gray-100 rounded text-center font-medium hover:bg-white focus:outline-none focus:border-gray-200"
        min={1}
      />

      <button onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={30} className="text-blue-500" />
      </button>
    </div>
  );
};
