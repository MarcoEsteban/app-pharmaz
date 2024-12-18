import { Card, Title } from "@/components";
import MultiLevelDropdown from "@/components/reportes/MultiLevelDropdown";

export default async function ReportesPage() {
  const reportOptions = [
    { label: "Hoy", value: "hoy" },
    { label: "Hace 7 días", value: "7-dias" },
    { label: "Hace 1 mes", value: "30-dias" },
    { label: "Del mes", value: "mes" },
    { label: "Rango", isDateRange: true },
  ];

  return (
    <Card>
      {/* ============================== */}
      {/*             Título             */}
      {/* ============================== */}
      <Title title={"Reportes"} />

      <div className="mt-4 flex gap-[150px]">
        <MultiLevelDropdown
          buttonLabel="Generar Reporte Venta"
          menuOptions={reportOptions}
          pago="si"
          table="Ventas"
        />

        <MultiLevelDropdown
          buttonLabel="Generar Reporte Compras"
          menuOptions={reportOptions}
          table="Compras"
        />

        <MultiLevelDropdown
          buttonLabel="Generar Reporte Inventario"
          menuOptions={reportOptions}
          table="Inventario"
        />
      </div>
    </Card>
  );
}
