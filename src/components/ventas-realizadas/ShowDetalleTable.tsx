"use client";

import { Detalles } from "@/interfaces";
import clsx from "clsx";

interface Props {
  productos: Detalles[] | undefined;
}

export const TableDetalleVentaShow = ({ productos }: Props) => {
  return (
    <div
      className={clsx("overflow-x-auto rounded-lg font-sans my-2", {
        "hidden": !productos || productos.length === 0,
      })}
    >
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-blue-800 font-bold text-gray-50 uppercase border-t rounded-lg">
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
              DESCRIPCIÓN
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs   tracking-wider"
            >
              PRECIO
            </th>
            <th
              scope="col"
              className=" py-3 text-xs tracking-wider"
            >
              CANTIDAD
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs   tracking-wider"
            >
              SUBTOTAL
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productos &&
            productos.map((producto, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                  {producto.nombre.toUpperCase() + " " +
                    producto.concentracion + " " +
                    producto.adicional?.toUpperCase() + " " +
                    producto.presentacionId.toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {producto.precio.toFixed(2)} Bs
                </td>
                <td className="pl-6 py-4 whitespace-nowrap  text-sm text-gray-500">
                  {producto.cantidad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(producto.cantidad * producto.precio).toFixed(2)} Bs
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot className="bg-gray-200">
          <tr>
            <td
              colSpan={4}
              className="px-6 py-3 text-right text-sm font-bold text-gray-600"
            >
              TOTAL:
            </td>
            <td
              colSpan={1}
              className="px-6 py-3 text-left text-sm font-medium text-gray-900"
            >
              {productos &&
                productos.reduce(
                  (acc, producto) => acc + producto.cantidad * producto.precio,
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
