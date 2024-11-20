import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  nombre: string;
  icon: React.ReactNode;
  enlace: string;
  openMenu: boolean;
}

export const SidebardItem = ({ nombre, icon, enlace, openMenu }: Props) => {
  const pathname = usePathname();
  const atribu = pathname.split("/").at(1);
  console.log({ openMenu });

  return (
    <Link
      href={enlace}
      className={clsx(
        "flex items-center gap-3 py-2 my-1 font-semibold rounded-md cursor-pointer transition-colors",
        { "px-0 justify-center": openMenu, "px-3": !openMenu },
        {
          "bg-gradient-to-r from-blue-900/90 via-sky-500/90 to-indigo-800/90 text-white":
            enlace == `/${atribu}`,
        },
        { "hover:bg-blue-50 text-gray-600": enlace != pathname },
      )}
    >
      {icon}
      <span
        className={clsx(
          "w-full overflow-hidden transition-max-width duration-300 ease-in-out",
          // {
          //   "max-w-96 transition-all duration-300 w-full bg-blue-50": openMenu,
          //   "max-w-0": !openMenu,
          // },
          { "hidden": openMenu },
        )}
      >
        {nombre}
      </span>
    </Link>
  );
};
