import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCartStore } from "@/store";

export const generatePDF = () => {
  const { cliente, vendedor, farma, cart } = useCartStore.getState();

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.width; // Obtener el ancho de la página.
  const leftX = 20; // Inicio a la izquierda
  const centerX = pageWidth / 2; // Centro de la página
  const rightX = pageWidth - 20; // Final a la derecha
  const numeroVenta = generateNumberVenta();

  // ========================
  // Título: Nota de Venta
  // ========================
  const title = "NOTA DE VENTA";
  doc.setFontSize(26);
  doc.setFont("Sans", "bold");
  doc.setTextColor(8, 80, 162); // Azul
  doc.text(title, rightX - 65, 20); // Derecha

  // ===================
  // Información Factura
  // ===================
  doc.setFontSize(12);
  doc.setFont("Sans", "bold");
  doc.setTextColor(8, 80, 162); // Azul
  doc.text("N° VENTA:", rightX - 30, 27);
  doc.setFont("Sans", "normal");
  doc.text(`#${numeroVenta}`, rightX - 4, 27);
  doc.setFont("Sans", "bold");
  doc.setTextColor(8, 80, 162); // Azul
  doc.text("FECHA:", rightX - 30, 33);
  doc.setFont("Sans", "normal");
  doc.text(`${new Date().toLocaleDateString()}`, rightX - 7, 33);

  // ======================
  // Logo y Encabezado
  // ======================
  if (farma?.foto) {
    doc.addImage(farma.foto, "PNG", leftX - 10, 10, 37, 35); // Logo
  }

  // ======================
  // Datos Farmacia
  // ======================
  doc.setFont("Sans", "bold");
  doc.setFontSize(13);
  doc.setTextColor(8, 80, 162); // Azul
  doc.text(`Farmacia ${farma?.nombre || "Farmacia N/A"}`, centerX - 55, 22);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0); // Negro
  doc.setFont("Sans", "normal");
  doc.text(`Celular: ${farma?.celular || "N/A"}`, centerX - 55, 27);
  doc.text(`Correo: ${farma?.email || "N/A"}`, centerX - 55, 32);
  doc.text(`${farma?.direccion || "N/A"}`, centerX - 55, 37);

  // =======================
  // Información del Cliente
  // =======================
  doc.setFontSize(12);
  doc.setFont("Sans", "bold");
  doc.setTextColor(8, 80, 162); // Azul
  doc.text("Datos del Cliente:", leftX - 10, 55);

  doc.setFont("Sans", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0); // Negro
  doc.text(
    `${cliente?.nombre || "N/A"} ${cliente?.ap || ""} ${cliente?.am || ""}`,
    10,
    60,
  );

  // ========================
  // Información del Vendedor
  // ========================
  doc.setFontSize(12);
  doc.setFont("Sans", "bold");
  doc.setTextColor(8, 80, 162); // Azul
  doc.text("Datos del Vendedor", centerX - 10, 55);
  doc.setFont("Sans", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0); // Negro
  doc.text(
    `${vendedor?.nombre || "N/A"} ${vendedor?.ap || ""} ${vendedor?.am || ""}`,
    centerX - 10,
    60,
  );

  // ==================
  // Tabla de productos
  // ==================
  const tableData = cart.map((item, index) => [
    index + 1,
    `${item.nombre} ${item.concentracion || ""} ${item.adicional || ""} ${
      item.presentacionId || ""
    }`,
    `${item.precio.toFixed(2)} Bs`,
    item.cantidadCart,
    `${(item.precio * item.cantidadCart).toFixed(2)} Bs`,
  ]);

  autoTable(doc, {
    startY: 65,
    head: [["#", "DESCRIPCIÓN", "PRECIO", "CANTIDAD", "TOTAL"]],
    body: tableData,
    theme: "grid",
    styles: {
      font: "Sans",
      fontSize: 11,
      textColor: 0, // Negro
      fillColor: false,
    },
    headStyles: {
      fontStyle: "bold",
      fillColor: [8, 80, 162], // Azul
      lineColor: [255, 255, 255], // Blanco
      textColor: [255, 255, 255], // Blanco
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255], // Blanco
    },
    columnStyles: {
      0: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "center" },
      4: { halign: "right" },
    },
    margin: { left: 10, right: 10 },
    tableWidth: "auto",
  });

  // ===================
  // Tabla de totales
  // ===================
  const subtotal = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidadCart,
    0,
  );
  const taxRate = 0.03; // 3% de impuestos
  const shipping = 10; // Costo de envío
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipping;

  autoTable(doc, {
    body: [
      ["SUBTOTAL", `${subtotal.toFixed(2)} Bs`],
      ["TOTAL", `${total.toFixed(2)} Bs`],
    ],
    theme: "grid",
    styles: {
      font: "Sans",
      fontStyle: "bold",
      fontSize: 11,
      textColor: 0, // Negro
    },
    columnStyles: {
      0: { halign: "left", cellWidth: 40 },
      1: { halign: "right", cellWidth: 30 },
    },
    tableWidth: "auto",
    margin: { left: pageWidth - 80 },
  });

  // ==================
  // Footer
  // ==================
  doc.setFontSize(12);
  doc.setFont("Sans", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Gracias por su compra", pageWidth / 2, 280, { align: "center" });

  // ===========================
  // Mostrar previsualización
  // ===========================
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

// ==========================
// Generar número de factura
// ==========================
const generateNumberVenta = () => {
  const maxInvoiceNumber = 999999;
  const minInvoiceNumber = 1;

  // Obtener el número actual de localStorage
  const currentInvoiceNumber = parseInt(
    localStorage.getItem("numero-venta") || "0",
    10,
  );

  // Calcular el siguiente número
  const nextInvoiceNumber = currentInvoiceNumber >= maxInvoiceNumber
    ? minInvoiceNumber // Reinicia a 1 si alcanza el máximo
    : currentInvoiceNumber + 1;

  // Guardar el siguiente número en localStorage
  localStorage.setItem("invoiceNumber", nextInvoiceNumber.toString());

  // Formatear con ceros a la izquierda (6 dígitos)
  return nextInvoiceNumber.toString().padStart(6, "0");
};
