import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCartStore } from "@/store";

export const generatePDF = () => {
  const { cliente, vendedor, farma, cart } = useCartStore.getState();

  const doc = new jsPDF();

  // Logo y encabezado
  doc.setFontSize(16);
  doc.text(`${farma?.nombre}`, 20, 20);
  // doc.setFontSize(12);
  // doc.text("Your Brand Slogan Here", 20, 25);
  doc.setFontSize(10);
  doc.text(`Celular: ${farma?.celular || "N/A"}`, 20, 35);
  doc.text(`Email: ${farma?.email || "N/A"}`, 20, 40);
  doc.text(`Direccion: ${farma?.direccion || "N/A"}`, 20, 45);

  // Información de la factura
  // doc.setFontSize(14);
  // doc.text("INVOICE", 160, 20);
  doc.setFontSize(18);
  // doc.text(`${farma?.nombre}`, 10, 10);
  if (`${farma?.foto}`) {
    doc.addImage(`${farma?.foto}`, "PNG", 160, 5, 40, 20);
  }
  doc.setFontSize(10);
  doc.text(`Number: #${Math.floor(Math.random() * 100000)}`, 160, 30);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 160, 35);

  // Información del cliente
  doc.setFontSize(12);
  doc.text("Datos:", 20, 60);
  doc.setFontSize(10);
  doc.text(
    `Cliente: ${cliente?.nombre || "N/A"} ${cliente?.ap || ""} ${cliente?.am || ""
    }`,
    20,
    65,
  );
  doc.text(
    `Vendedor: ${vendedor?.nombre || "N/A"} ${vendedor?.ap || ""}`,
    20,
    70,
  );

  // Tabla de productos
  const tableData = cart.map((item, index) => [
    index + 1,
    `${item.nombre + " " + item.concentracion + " " + item.adicional + " " +
    item.presentacionId
    }`,
    `$${item.precio.toFixed(2)}`,
    item.cantidadCart,
    `$${(item.precio * item.cantidadCart).toFixed(2)}`,
  ]);

  autoTable(doc, {
    head: [["ITEM", "DESCRIPCION", "PRECIO", "CANTIDAD", "TOTAL"]],
    body: tableData,
    startY: 80,
    theme: "striped",
  });

  // Subtotales
  const subtotal = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidadCart,
    0,
  );
  const taxRate = 0.1; // 10% de impuestos
  const shipping = 10;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipping;

  doc.text(
    `Sub Total: $${subtotal.toFixed(2)}`,
    160,
    doc.lastAutoTable.finalY + 10,
  );
  // doc.text(
  //   `Shipping: $${shipping.toFixed(2)}`,
  //   160,
  //   doc.lastAutoTable.finalY + 15,
  // );
  // doc.text(`Tax Rate: $${tax.toFixed(2)}`, 160, doc.lastAutoTable.finalY + 20);
  doc.text(`TOTAL: $${total.toFixed(2)}`, 160, doc.lastAutoTable.finalY + 30);

  // Footer
  doc.setFontSize(10);
  doc.text("Gracias por su compra", 20, 280);

  // Descargar el PDF
  doc.save("venta.pdf");
};

