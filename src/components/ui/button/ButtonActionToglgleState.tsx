// 'use client';

// import clsx from 'clsx';
// import { FaPrescriptionBottleMedical, FaTrashCan, FaCheck } from 'react-icons/fa6';
// import Swal from 'sweetalert2';

// type ActionToggle = {
//   id: string;
//   newState: boolean;
// };

// interface Props {
//   id: string;
//   nombre: string;
//   estado: boolean;

//   // toggleActionState: ( id: string, newState: boolean ) => Promise<ActionToggle>;
//   toggleActionState?: ( id: string, newState: boolean ) => void | undefined;
// }

// export const ButtonActionToglgleState = ( { id, nombre, estado, toggleActionState }: Props ) => {

//   const title = estado ? 'Eliminar' : 'Habilitar';
//   const subtitle = estado ? 'Eliminado' : 'Habilitado';

//   // ============================ Muestra el Mensaje de SweetAlert =============================
//   const handleActionToggleState = async () => {
//     Swal.fire( {
//       title: `${ title } ?`,
//       // text: `Está seguro de ${ title.toLowerCase() } el ID "${ id }"`,
//       html: `<span class="tracking-wide">Está seguro de ${ title.toLowerCase() } el ID "${ id }"</span>`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: `Si, ${ title }!`,
//       customClass: {
//         title: 'tracking-wide',
//       }
//     } ).then( result => {
//       if ( result.isConfirmed ) {
//         const newState = !estado;
//         // toggleActionState( id, newState );
//         Swal.fire( {
//           title: `${ subtitle.charAt( 0 ).toUpperCase() + subtitle.slice( 1 ) }!`, //Obtengo la 1ra letra de la palabra y la convierto a mayuscula y le agrego el resto de la palabra menos la primera letra.
//           // text: `${ nombre } fue ${ subtitle } Exitosamente.`,
//           html: `<span class="tracking-wide">${ nombre } fue ${ subtitle } Exitosamente.</span>`,
//           icon: "success",
//           customClass: {
//             title: 'tracking-wide',
//           }
//         } );
//       }
//     } );
//   };

//   return (
//     <button
//       onClick={ () => handleActionToggleState() }
//       className={ clsx(
//         "btn-gnrl",
//         { 'gradient-enable': estado, 'gradient-delete': !estado }
//       ) }
//     >
//       {
//         estado
//           ? ( <FaPrescriptionBottleMedical size={ 18 } /> )
//           : ( <FaTrashCan size={ 18 } /> )
//       }
//     </button>
//   );
// };

'use client';

import clsx from 'clsx';
import { FaTimes } from 'react-icons/fa';
import { FaPrescriptionBottleMedical, FaTrashCan, FaCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

type ActionToggle = {
  id: string;
  newState: boolean;
};

interface Props {
  id: string;
  nombre: string;
  estado: boolean;

  // toggleActionState: ( id: string, newState: boolean ) => Promise<ActionToggle>;
  toggleActionState?: (id: string, newState: boolean) => void | undefined;
}

export const ButtonActionToglgleState = ({ id, nombre, estado, toggleActionState }: Props) => {

  // Permite Renderizar componente de React dentro de SweetAlert2:
  const MySwal = withReactContent(Swal);

  const title = estado ? 'Habilitar' : 'Eliminar';
  const subtitle = estado ? 'Habilitado' : 'Eliminado';

  const handleActionToggleState = async () => {
    MySwal.fire({
      title: <span className="font-sans tracking-wide">{title}?</span>,
      html: <span className="font-sans tracking-wide">Está seguro de {title.toLowerCase()} el ID "{id}"</span>,
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
        // toggleActionState(id, newState);
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
        { 'gradient-enable': estado, 'gradient-delete': !estado }
      )}
    >
      {
        estado
          ? (<FaPrescriptionBottleMedical size={18} />)
          : (<FaTrashCan size={18} />)
      }
    </button>
  );
};
