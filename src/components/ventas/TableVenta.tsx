"use client";

import { useCartStore } from "@/store";
import { QuantitySelector } from "./QuantitySelector";
import clsx from "clsx";

export const TableVenta = () => {
  const productos = useCartStore((state) => state.cart);

  const updateProductQuantity = useCartStore((state) =>
    state.updateProductQuantity
  );
  const remove = useCartStore((state) => state.removeProduct);
  console.log({ productos });

  return (
    <div
      className={clsx("overflow-x-auto rounded-lg font-sans my-2", {
        "hidden": !productos || productos.length === 0,
      })}
    >
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-gray-200 font-bold text-gray-600 uppercase border-t rounded-lg">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs "
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs  tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs   tracking-wider"
            >
              Adicional
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs   tracking-wider"
            >
              Laboratorio
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs   tracking-wider"
            >
              Stock
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs   tracking-wider"
            >
              Precio
            </th>
            <th
              scope="col"
              className=" py-3 text-xs tracking-wider"
            >
              Cantidad
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs   tracking-wider"
            >
              Subtotal
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs   tracking-wider"
            >
              ELIMINAR
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productos.map((producto, index) => (
            <tr key={producto.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                {producto.nombre.toUpperCase() + " " + producto.concentracion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                {producto.adicional + " " + producto.presentacionId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                {producto.laboratorioId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {producto.stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {producto.precio.toFixed(2)} Bs
              </td>
              <td className="pl-6 py-4 whitespace-nowrap  text-sm text-gray-500">
                <QuantitySelector
                  // stock={producto.stock}
                  quantity={producto.cantidadCart}
                  onQuantityChanged={(newQuantity: number) =>
                    updateProductQuantity(producto, newQuantity)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {(producto.cantidadCart * producto.precio).toFixed(2)} Bs
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                <button
                  onClick={() =>
                    remove(producto)}
                  className=" bg-red-500 text-white font-bold px-2 py-1 rounded-lg border hover:bg-red-600"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-200">
          <tr>
            <td
              colSpan={7}
              className="px-6 py-3 text-right text-sm font-bold text-gray-600"
            >
              TOTAL:
            </td>
            <td
              colSpan={2}
              className="px-6 py-3 text-left text-sm font-medium text-gray-900"
            >
              {productos
                .reduce(
                  (acc, producto) =>
                    acc + producto.cantidadCart * producto.precio,
                  0,
                )
                .toFixed(2)} Bs
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
