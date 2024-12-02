"use client";

import { searchCliente } from "@/actions";
import { useCartStore } from "@/store";
import SearchComponent from "./SearchComponent";
import { Cliente, Farmacia } from "@/interfaces";

interface Props {
  vendedor: Omit<Cliente, "ci">;
  farma: Omit<Farmacia, "usuarioId">;
}

export const ClienteSearch = ({ vendedor, farma }: Props) => {
  const { setCliente, setFarma, setVendedor } = useCartStore();

  const addCliVendeFarma = (cliente: Cliente) => {
    setCliente(cliente);
    setFarma(farma);
    setVendedor(vendedor);
  };

  return (
    <SearchComponent
      fetchData={searchCliente}
      onSelect={addCliVendeFarma}
      placeholder="Buscar cliente por nombre..."
      displayField={(cliente) =>
        `${cliente.nombre} ${cliente.ap || ""} ${cliente.am || ""}`.trim()}
    />
  );
};
