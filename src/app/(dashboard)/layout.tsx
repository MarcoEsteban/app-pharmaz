import { getByIdUser } from "@/actions";
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
  if (!user) {
    redirect("/auth/login?returnTo=/");
  }
  console.log(user);
  const userPerfil = {
    nombre: user.personas.nombre,
    ap: user.personas.ap,
    foto: user.personas.foto,
    rol: user.rol,
  };

  return (
    <div className="min-h-screen grid grid-cols-custom p-3">
      <Sidebard />

      <main className="">
        <Header {...userPerfil} />
        <div className="h-[87vh] overflow-y-scroll pl-4 pt-4">
          {children}
        </div>
      </main>
    </div>
  );
}
