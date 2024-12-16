"use client";

import { createVenta } from "@/actions";
import { useCartStore } from "@/store";
import { generatePDF } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation"; // Importamos useRouter
import { ChangeEvent, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import Swal from "sweetalert2";

const PDFButton = () => {
  const [transaccion, setTransaccion] = useState<string>("");
  const router = useRouter(); // Inicializamos el hook useRouter
  const { cliente, vendedor, farma, cart, numeroVenta, emtyCart } =
    useCartStore();

  const handleGeneratePDF = async () => {
    if (!cliente || !vendedor || !farma || cart.length === 0) {
      // --------------------------
      // Alerta cuando faltan datos
      // --------------------------
      Swal.fire({
        icon: "warning",
        title: "Faltan datos",
        text: "Por favor, seleccione un Cliente.",
      });
      return;
    }

    if (transaccion === "") {
      Swal.fire({
        icon: "warning",
        title: "Faltan datos",
        text: "Por favor, seleccione el tipo de pago.",
      });
      return;
    }

    try {
      const result = await createVenta(
        JSON.stringify({
          cart,
          farma,
          cliente,
          vendedor,
          transaccion,
          numeroVenta,
        }),
      );

      // ---------------
      // Alerta de éxito
      // ---------------
      if (result?.ok) {
        Swal.fire({
          icon: "success",
          title: "Venta guardada",
          // text: "El PDF se ha generado y la venta se ha guardado con éxito.",
          text: result.message,
        }).then(() => {
          emtyCart(); // Resetea el carrito y los valores
          router.push("/ventas_realizadas"); // Redirige a la página de ventas realizadas
        });

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

  const handleChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setTransaccion(e.target.value);
  };

  return (
    <div
      className={clsx("flex items-center justify-between my-2 font-sans", {
        "hidden transition-all duration-100": !cart || cart.length === 0,
      })}
    >
      <div className="w-80">
        <select
          className="input-select"
          onChange={handleChanged}
          defaultValue=""
        >
          <option value="" disabled>Seleccione forma pago...</option>
          <option value={"Efectivo"}>Efectivo</option>
          <option value={"QR"}>QR</option>
        </select>
      </div>

      <button
        onClick={handleGeneratePDF}
        className="px-3 py-1.5 bg-green-700 rounded-lg text-white font-semibold flex items-center gap-2"
      >
        Generar Venta
        <FaFilePdf />
      </button>
    </div>
  );
};

export default PDFButton;
