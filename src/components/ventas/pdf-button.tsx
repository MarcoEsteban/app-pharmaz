"use client";

import { useCartStore } from "@/store";
import { generatePDF } from "@/utils";
import { useRouter } from "next/navigation"; // Importamos useRouter
import Swal from "sweetalert2";

const PDFButton = () => {
  const { cliente, vendedor, farma, cart, emtyCart } = useCartStore();
  const router = useRouter(); // Inicializamos el hook useRouter

  const handleGeneratePDF = () => {
    if (!cliente || !vendedor || !farma || cart.length === 0) {
      // Alerta cuando faltan datos
      Swal.fire({
        icon: "warning",
        title: "Faltan datos",
        text:
          "Por favor, selecciona un cliente, vendedor, y asegúrate de agregar productos al carrito.",
      });
      return;
    }

    try {
      generatePDF(); // Genera el PDF

      // Alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Venta guardada",
        text: "El PDF se ha generado y la venta se ha guardado con éxito.",
      }).then(() => {
        emtyCart(); // Resetea el carrito y los valores
        router.push("/ventas_realizadas"); // Redirige a la página de ventas realizadas
      });
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
      className="px-2 py-1 my-2 bg-green-700 rounded-lg text-white"
    >
      Generar PDF
    </button>
  );
};

export default PDFButton;

