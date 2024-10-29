import { Card, Title } from '@/components';
import { FaFlask, FaPills, FaFilter, FaSyringe, FaDna } from 'react-icons/fa';
import { ItemAtributo } from '@/components/atributos';


const atributosItem = [
  // {
  //   nombre: 'Tipo',
  //   icon: <FaFilter className="w-4 h-4 me-2 " />,
  //   enlace: '/atributos/tipo',
  // },
  {
    nombre: 'Laboratorio',
    icon: <FaFlask className="w-5 h-4 me-2 " />,
    enlace: '/atributos/laboratorio',
  },
  {
    nombre: 'Presentación',
    icon: <FaPills className="w-5 h-4 me-2 " />,
    enlace: '/atributos/presentacion',
  },
  {
    nombre: 'Via Administración',
    icon: <FaSyringe className="w-5 h-5 me-2 " />,
    enlace: '/atributos/via-administracion',
  },
  {
    nombre: 'Principio Activo',
    icon: <FaDna className="w-5 h-4 me-2 " />,
    enlace: '/atributos/principio-activo',
  },
];

// Este layout va a interactuar con la pantalla (presentacion) y (atributos)
export default async function AtributoLayout( { children }: {
  children: React.ReactNode;
} ) {

  return (
    <Card>
      {/*********************** Title ***********************/ }
      <Title title={ "Atributos" } />


      <ul className="flex flex-wrap -mb-px font-semibold text-center text-gray-500 border-b border-gray-200">
        {
          atributosItem.map( item => (
            <ItemAtributo key={ item.enlace } { ...item } />
          ) )
        }
      </ul>

      <main className=" py-4">
        { children }
      </main>

    </Card>

  );
}

// Card Medicamento
{/* <FaCubes /> Cantidad */ }
// Nombre Medicamento
{/* <FaDollarSign /> Precio */ }

{/* <FaMortarPestle /> Concentracion */ }
{/* <FaFlask /> Laboratorio */ }
{/* <FaPills /> Presentacion */ }
{/* <FaCopyright /> Tipo Comercial */ }

// LayoutAtributo
{/* <FaFlask /> Laboratorio */ }
{/* <FaPills /> Presentacion */ }
{/* <FaCopyright /> Tipo Comercial */ }
{/* <FaSyringe /> Via Administracion */ }
