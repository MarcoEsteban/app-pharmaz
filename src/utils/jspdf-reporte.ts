import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReport = (
  data: any[],
  headers: string[], // Encabezados de la tabla
  reportTitle: string, // Título del reporte
) => {
  const doc = new jsPDF();

  // const numVenta = numeroVenta.toString().padStart(6, "0");
  const pageWidth = doc.internal.pageSize.width; // Obtener el ancho de la página.
  const leftX = 20; // Inicio a la izquierda
  const centerX = pageWidth / 2; // Centro de la página
  const rightX = pageWidth - 20; // Final a la derecha
  // const numeroVenta = generateNumberVenta();

  // ========================
  // Título: Nota de Venta
  // ========================
  const title = `Reportes de ${reportTitle}`;
  doc.setFontSize(26);
  doc.setFont("Sans", "bold");
  doc.setTextColor(8, 80, 162); // Azul
  doc.text(title, centerX - 35, 20); // Derecha

  // ===================
  // Información Factura
  // ===================
  doc.setFontSize(12);
  // doc.setFont("Sans", "bold");
  // doc.setTextColor(8, 80, 162); // Azul
  // doc.text("N° VENTA:", rightX - 30, 27);
  // doc.setFont("Sans", "normal");
  // doc.text(`#${numVenta}`, rightX - 4, 27);
  // doc.text(`#0001`, rightX - 4, 27);
  doc.setFont("Sans", "bold");
  doc.setTextColor(8, 80, 162); // Azul
  doc.text("FECHA:", rightX - 25, 33);
  doc.setFont("Sans", "normal");
  doc.text(`${new Date().toLocaleDateString()}`, rightX - 7, 33);

  // ======================
  // Logo y Encabezado
  // ======================
  // if (farma?.foto) {
  //   doc.addImage(farma.foto, "PNG", leftX - 10, 10, 37, 35); // Logo
  // }

  // ==================
  // Tabla de productos
  // ==================
  // const tableData = data.map((item: any, index: number) => [
  //   // index + 1,
  //   `${item.nombre} ${item.concentracion || ""} ${item.adicional || ""} ${item.presentacionId || ""
  //   }`,
  //   `${item.precio.toFixed(2)} Bs`,
  //   item.cantidadCart,
  //   `${(item.precio * item.cantidadCart).toFixed(2)} Bs`,
  // ]);
  const tableData = data.map((item) => headers.map((header) => item[header]));

  autoTable(doc, {
    startY: 40,
    // head: [["#", "DESCRIPCIÓN", "PRECIO", "CANTIDAD", "TOTAL"]],
    head: [headers],
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
    // columnStyles: {
    //   0: { halign: "center" },
    //   2: { halign: "right" },
    //   3: { halign: "center" },
    //   4: { halign: "right" },
    // },
    margin: { left: 10, right: 10 },
    tableWidth: "auto",
  });

  // ==================
  // Número de página
  // ==================
  const totalPages = doc.getNumberOfPages();
  doc.setFontSize(12);
  doc.setFont("Sans", "normal");
  doc.setTextColor(0, 0, 0);

  // Loop para agregar el número de página en cada página
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    const pageNumber = `Página ${page} de ${totalPages}`;
    doc.text(pageNumber, pageWidth / 2, 290, { align: "center" });
  }

  // ===========================
  // Mostrar previsualización
  // ===========================
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
//
// export const generateReport = (
//   data: any[],
//   headers: string[], // Encabezados de la tabla
//   reportTitle: string, // Título del reporte
// ) => {
//   const doc = new jsPDF();
//
//   const pageWidth = doc.internal.pageSize.width;
//   const centerX = pageWidth / 2;
//   const leftX = 20;
//   const rightX = pageWidth - 20;
//
//   // ========================
//   // Título del Reporte
//   // ========================
//   doc.setFontSize(18);
//   doc.setFont("times", "bold");
//   doc.setTextColor(8, 80, 162);
//   doc.text(reportTitle, centerX, 20, { align: "center" });
//
//   // ========================
//   // Tabla de Datos Dinámicos
//   // ========================
//   const tableData = data.map((row) => headers.map((header) => row[header]));
//
//   autoTable(doc, {
//     startY: 30,
//     head: [headers],
//     body: tableData,
//     theme: "grid",
//     styles: {
//       font: "times",
//       fontSize: 11,
//       textColor: 0,
//       fillColor: false,
//     },
//     headStyles: {
//       fontStyle: "bold",
//       fillColor: [8, 80, 162],
//       textColor: [255, 255, 255],
//     },
//     alternateRowStyles: {
//       fillColor: [240, 240, 240],
//     },
//     margin: { left: leftX, right: rightX },
//   });
//
//   // ==================
//   // Footer
//   // ==================
//   doc.setFontSize(12);
//   doc.setFont("Sans", "bold");
//   doc.setTextColor(0, 0, 0);
//   doc.text("Reporte generado automáticamente", centerX, 280, {
//     align: "center",
//   });
//
//   // ===========================
//   // Mostrar previsualización
//   // ===========================
//   const pdfBlob = doc.output("blob");
//   const pdfUrl = URL.createObjectURL(pdfBlob);
//   window.open(pdfUrl, "_blank");
// };
