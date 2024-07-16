import { Card, Modal, Title } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { FaCamera, FaEnvelope, FaMobile, FaUserCircle } from 'react-icons/fa';
import { FaLocationDot, FaMobileScreen, FaPenToSquare, FaPhoneFlip, FaUnlockKeyhole } from 'react-icons/fa6';

interface Props {
  searchParams: {
    modal: string;
  };
}

export default function PerfilPage( { searchParams }: Props ) {

  // Params URL:
  const modal = searchParams.modal;

  return (
    <Card>
      <Title title={ "Perfil" } />

      <div className={ "my-4 flex gap-10 w-full" }>
        <div className={ "relative" }>
          <Image
            className="object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
            width={ 400 }
            height={ 400 }
          />
          {/*============ Button ===========*/ }
          <Link
            href={ '/dashboard/perfil/?modal=modificar' }
            className={ "btn-gnrl gradient-photo absolute bottom-2 right-1" }
          >
            <FaCamera size={ 20 } />
          </Link>
        </div>

        <div className={ "flex-2 font-sans relative" }>
          <div className={ "w-full mb-8" }>
            <span className={ "flex items-center gap-1 font-semibold" }><FaUserCircle size={ 17 } className={ "text-blue-800" } /> Nombre y Apellido</span>
            <p className={ "border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide" }>Marco Esteban Campos Subelza</p>
          </div>

          <div className={ "flex gap-12" }>

            <div className={ "w-80 mb-8" }>
              <span className={ "flex items-center gap-1 font-semibold" }><FaEnvelope size={ 17 } className={ "text-blue-800" } /> Email</span>
              <p className={ "border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide" }>marcocampo@gmail.com</p>
            </div>

            <div className={ "w-72 mb-8" }>
              <span className={ "flex items-center gap-1 font-semibold" }><FaPhoneFlip size={ 17 } className={ "text-blue-800" } /> Celular</span>
              <p className={ "border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide" }>77170999</p>
            </div>

          </div>

          <div className={ "w-full mb-8" }>
            <span className={ "flex items-center gap-1 font-semibold" }><FaLocationDot size={ 17 } className={ "text-blue-800" } /> Direccion</span>
            <p className={ "border-b-2 border-blue-800 pl-1 pt-2 font-medium tracking-wide" }>B./ Lourdes entre victor</p>
          </div>

          <div className="flex absolute bottom-2 right-0">

            <button type="button" className="btn-gnrl gradient-update ">
              <FaPenToSquare size={ 18 } />
            </button>

            <button type="button" className="btn-gnrl gradient">
              <FaUnlockKeyhole size={ 18 } />
            </button>
          </div>

        </div>
      </div>

      { modal && <Modal titleModal="modificar" children={ <div className={ "font-sans" }><label className="label-text">Nombre</label> <input type="text" placeholder="nombre" className="input-text" /></div> } /> }
    </Card>
  );
}