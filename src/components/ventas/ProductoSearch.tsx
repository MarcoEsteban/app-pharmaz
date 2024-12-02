"use client";

import { searchProducto } from "@/actions";
import { useCartStore } from "@/store";
import SearchComponent from "./SearchComponent";

export const ProductoSearch = () => {
  const { addProductToCart } = useCartStore();

  return (
    <SearchComponent
      fetchData={searchProducto}
      onSelect={addProductToCart}
      placeholder="Buscar producto por nombre, principio activo o laboratorio..."
      displayField={(producto) =>
        `${producto.nombre} ${producto.concentracion} (${producto.adicional} ${producto.presentacionId})`}
    />
  );
};
