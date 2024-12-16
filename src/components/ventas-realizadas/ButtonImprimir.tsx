"use client";

import { getFarma } from "@/actions";
import { generatePDF } from "@/utils";
import { FaFilePdf } from "react-icons/fa";
import Swal from "sweetalert2";

interface Props {
  data: string;
}

export const BtnImprimir = ({ data }: Props) => {
  const parsedData = JSON.parse(data);
  const { cliente, vendedor, cart, numeroVenta, transaccion } = parsedData;

  const handleGeneratePDF = async () => {
    try {
      const farma = await getFarma();

      if (farma) {
        generatePDF(
          JSON.stringify({
            cart,
            farma,
            cliente,
            vendedor,
            transaccion,
            numeroVenta,
          }),
        ); // Genera el PDF
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al generar el PDF. Intenta nuevamente.",
        });
      }
    } catch (error) {
      // Manejo de errores si algo falla
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al generar el PDF. Intenta nuevamente.",
      });
    }
  };

  return (
    <button
      onClick={handleGeneratePDF}
      className="px-3 py-1.5 bg-blue-700 rounded-lg text-white font-semibold flex items-center gap-2"
    >
      Imprimir
      <FaFilePdf />
    </button>
  );
};
