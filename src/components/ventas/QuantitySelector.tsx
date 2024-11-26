"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;

  // Acciones:
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex">
      {/* Disminuir Cantidad */}
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} className="text-red-500" />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 rounded flex justify-center items-center font-medium">
        {quantity}
      </span>

      {/* Aumentar Cantidad */}
      <button onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={30} className="text-blue-500" />
      </button>
    </div>
  );
};
