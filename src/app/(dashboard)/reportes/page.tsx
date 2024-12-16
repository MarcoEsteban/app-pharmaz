import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { Card, Title } from "@/components";
import DateInput from "@/components/reportes/DateInput";

interface Props {
  searchParams: {
    modal: string;
    query?: string;
    page?: string;
    filtro?: string;
  };
}

export default async function ReportesPage({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const modal = searchParams.modal;
  const filtro = searchParams?.filtro || "Efectivo";

  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?returnTo=/producto");
  }

  return (
    <Card>
      {/* ============================== */}
      {/*             Título             */}
      {/* ============================== */}
      <Title title={"Reportes"} />

      <div>
        <DateInput />
      </div>
    </Card>
  );
}
