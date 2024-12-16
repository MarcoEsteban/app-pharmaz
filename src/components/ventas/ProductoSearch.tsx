"use client";

import { searchProducto } from "@/actions";
import { useCartStore } from "@/store";
import SearchComponent from "./SearchComponent";
import { ProductoSearch as InterfaceProducto } from "@/interfaces";
import { ImagenLoad } from "../ui/image/ImagenLoad";
import { DateTime } from "luxon";

export const ProductoSearch = () => {
  const { addProductToCart } = useCartStore();

  return (
    <SearchComponent
      className="w-[900px]"
      fetchData={searchProducto}
      onSelect={addProductToCart}
      placeholder="Buscar producto por nombre, principio activo o laboratorio..."
      displayField={(producto) =>
        `${producto.nombre.toUpperCase()} ${producto.concentracion} (${producto.adicional?.toUpperCase()} ${producto.presentacionId?.toUpperCase()}) (${producto.laboratorioId?.toUpperCase()})`}
      renderItem={(producto) => <ProductItem producto={producto} />}
    />
  );
};

const ProductItem = ({ producto }: { producto: InterfaceProducto }) => {
  return (
    <div
      key={producto.id}
      className={`rounded-l border font-sans p-1 ${producto.statusColor === "green"
          ? "bg-green-600 border-green-600 hover:bg-green-700"
          : producto.statusColor === "orange"
            ? "bg-orange-500 border-orange-500 "
            : producto.statusColor === "red"
              ? "bg-red-500 border-red-500 text-gray-100 hover:bg-red-600"
              : "bg-white border-gray-300"
        }`}
    >
      <div className="flex items-center font-sans text-sm">
        <ImagenLoad
          src={producto.foto || "/images/fondo-medical.png"}
          // src={producto.foto as string}
          alt={producto.nombre}
          className="object-cover rounded-md mr-4"
          width={70}
          height={70}
        />
        <div className="flex items-center gap-2 uppercase">
          <h3 className="font-bold">{producto.nombre}</h3>
          <p>{producto.concentracion}</p>
          <p>{producto.adicional}</p>
          <p>{producto.presentacionId}</p>
          <p>({producto.laboratorioId})</p>
          {producto.lote && (
            <p className="text-sm text-gray-600 ">
              Vencimiento:{" "}
              {DateTime.fromISO(producto.lote.vencimiento.toISOString())
                .toFormat(
                  "dd/MM/yyyy",
                )}
            </p>
          )}
          <p className="text-sm">Stock: {producto.stock}</p>
        </div>
      </div>
    </div>
  );
};
