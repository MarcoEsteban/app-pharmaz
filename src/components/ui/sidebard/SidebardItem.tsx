import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  nombre: string;
  icon: React.ReactNode;
  enlace: string;
  openMenu: boolean;
}

export const SidebardItem = ( { nombre, icon, enlace, openMenu }: Props ) => {

  const pathname = usePathname();

  return (
    <Link
      href={ enlace }
      className={ clsx(
        "flex items-center py-2 my-1 font-medium rounded-md cursor-pointer transition-colors",
        { 'px-0 justify-center': !openMenu, 'px-3': openMenu },
        { 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800': enlace == pathname },
        { 'hover:bg-indigo-50 text-gray-600': enlace != pathname, }
      ) }
    >
      { icon }
      <span className={ clsx(
        "w-52 ml-4 transition-all duration-400",
        { 'hidden transition-all duration-400': !openMenu }
      ) }>
        { nombre }
      </span>
    </Link>
  );
};