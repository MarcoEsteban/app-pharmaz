"use client";

import { searchCliente } from "@/actions";
import { useCartStore } from "@/store";
import SearchComponent from "./SearchComponent";
import { Cliente, Farmacia } from "@/interfaces";
import { generateNumeroVenta } from "@/actions/ventas/generate-numero-venta";

interface Props {
  vendedor: Omit<Cliente, "ci">;
  farma: Omit<Farmacia, "usuarioId">;
}

export const ClienteSearch = ({ vendedor, farma }: Props) => {
  const { setCliente, setFarma, setVendedor, setNumVenta } = useCartStore();

  const addCliVendeFarma = async (cliente: Cliente) => {
    setCliente(cliente);
    setFarma(farma);
    setVendedor(vendedor);
    const numero = await generateNumeroVenta();
    setNumVenta(numero as number);
  };

  return (
    <SearchComponent
      className="w-[400px]"
      fetchData={searchCliente}
      onSelect={addCliVendeFarma}
      placeholder="Buscar cliente por NIT | Nombre..."
      displayField={(cliente) =>
        `${cliente.nombre} ${cliente.ap || ""} ${cliente.am || ""}`.trim()}
      renderItem={(client) => <ClientItem client={client} />}
    />
  );
};

const ClientItem = ({ client }: { client: Cliente }) => (
  <div
    key={client.id}
    className={`font-sans bg-white hover:bg-gray-100 shadow-b-sm`}
  >
    <h3 className="border-b-gray-200 border-b px-3 py-2.5">
      {client.nombre + " " + client.ap + " " + client.am + " (NIT: " +
        client.ci + ")"}
    </h3>
  </div>
);
