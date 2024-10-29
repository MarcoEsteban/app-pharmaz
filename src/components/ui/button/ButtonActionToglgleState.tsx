'use client';

import clsx from 'clsx';
import { FaTimes } from 'react-icons/fa';
import { FaPrescriptionBottleMedical, FaTrashCan, FaCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface Props {
  id: string;
  nombre: string;
  estado: boolean;

  toggleActionState?: ( id: string, newState: boolean ) => Promise<{}>;
}

export const ButtonActionToglgleState = ({ id, nombre, estado, toggleActionState }: Props) => {

  // Permite Renderizar componente de React dentro de SweetAlert2:
  const MySwal = withReactContent(Swal);

  const title = !estado ? 'Habilitar' : 'Eliminar';
  const subtitle = !estado ? 'Habilitado' : 'Eliminado';
  const codigo = id.split('-').at(-1)

  const handleActionToggleState = async () => {
    MySwal.fire({
      title: <span className="font-sans tracking-wide">{title}?</span>,
      html: <span className="font-sans tracking-wide">Está seguro de {title.toLowerCase()} el ID "{codigo}"</span>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: (
        <span className="font-sans flex items-center">
          <FaCheck className="font-sans mr-1" /> Sí, {title}!
        </span>
      ),
      cancelButtonText: (
        <span className="font-sans flex items-center">
          <FaTimes className="mr-1" /> Cancelar
        </span>
      ),
    }).then(result => {
      if (result.isConfirmed) {
        const newState = !estado;
        toggleActionState && toggleActionState(id, newState);
        MySwal.fire({
          title: <span className="font-sans tracking-wide">{subtitle.charAt(0).toUpperCase() + subtitle.slice(1)}!</span>,
          html: <span className="font-sans tracking-wide"><span className={"font-semibold"}>{nombre}</span> fue {subtitle} Exitosamente.</span>,
          icon: "success",
        });
      }
    });
  };

  return (
    <button
      onClick={() => handleActionToggleState()}
      className={clsx(
        "btn-gnrl",
        { 'gradient-enable': !estado, 'gradient-delete': estado }
      )}
    >
      {
        estado
          ? (<FaTrashCan size={18} />)
          : (<FaPrescriptionBottleMedical size={18} />)
      }
    </button>
  );
};
