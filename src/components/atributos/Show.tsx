
import { BtnVolver } from '@/components';
import { FaBuildingUser, FaCircleUser, FaUserGroup, FaUserSecret } from 'react-icons/fa6';

interface Props {
  id?: string;
}

const menus = [

  // Usuario
  {
    nombre: 'Gestión Perfil',
    icon: <FaCircleUser className={ "text-2xl" } />,
    enlace: '/dashboard/perfil',
  },
  {
    nombre: 'Gestión Roles',
    icon: <FaUserGroup className={ "text-2xl" } />,
    enlace: '/dashboard/roles',
  },
  {
    nombre: 'Gestión Usuario',
    icon: <FaUserSecret className={ "text-2xl" } />,
    enlace: '/dashboard/usuarios'
  },
  {
    nombre: 'Adm. Datos Farmacia',
    icon: <FaBuildingUser className={ "text-2xl" } />,
    enlace: '/dashboard/data_farmacia'
  },
];


export const Show = ( { id }: Props ) => {

  return (
    <>
      <div className={ "w-full mb-4 text-xl font-semibold" }>
        Administrador
      </div>

      <div className={ "w-full my-2 grid grid-cols-1 md:grid-cols-2 gap-2" }>
        {
          menus.slice( 0, 4 ).map( menu => (
            <button className={"gradient text-white rounded-md flex p-2 gap-3 items-center"}>
              { menu.icon }
              { menu.nombre }
            </button>
          ) )
        }
      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnVolver />
      </div>
    </>
  );
};