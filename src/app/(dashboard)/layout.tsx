import { getByIdRoles, getByIdUser, getFarma } from "@/actions";
import { auth } from "@/auth.config";
import { Header, Sidebard } from "@/components";
import { redirect } from "next/navigation";

export default async function DashboardLayout(
  { children }: { children: React.ReactNode },
) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?returnTo=/");
  }

  const user = await getByIdUser(session.user.id);
  const menus = await getByIdRoles(session.user.rolesId);
  const farma = await getFarma();

  if (!user || !menus) {
    redirect("/auth/login?returnTo=/");
  }
  const userPerfil = {
    nombre: user.personas.nombre ?? "",
    ap: user.personas.ap ?? "",
    foto: user.personas.foto ?? "",
    rol: user.rol ?? "",
  };

  const pharma = {
    foto: farma?.foto || "",
    nombre: farma?.nombre || "",
  };

  const menusData = menus.menus.map((menu) => {
    return {
      nombre: menu.nombre,
      enlace: menu.enlace,
      icon: menu.icon,
    };
  });

  return (
    <div className="min-h-screen grid grid-cols-custom p-3">
      <Sidebard
        img={pharma.foto}
        nombrePharma={pharma.nombre}
        menus={menusData}
      />

      <main className="">
        <Header {...userPerfil} />
        <div className="h-[87vh] overflow-y-scroll pl-4 pt-4">
          {children}
        </div>
      </main>
    </div>
  );
}
