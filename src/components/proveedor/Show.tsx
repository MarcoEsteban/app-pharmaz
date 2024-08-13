
import Image from 'next/image';
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
      <div className="flex flex-col items-center p-2 ">
        <div>
          <Image
            className="object-cover h-24 w-24 rounded-full"
            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
            width={ 8 }
            height={ 8 }
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h6 className="mb-0 leading-normal text-lg ">Laurent Perrier</h6>
          <p className="mb-0 text-slate-400">laurent@creative-tim.com</p>
        </div>
      </div>

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnVolver />
      </div>
    </>
  );
};