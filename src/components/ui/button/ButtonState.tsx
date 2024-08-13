import clsx from 'clsx';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface Props {
  estado: boolean;
}

export const ButtonState = ( { estado }: Props ) => {
  return (
    <span className={ clsx(
      { 'btn-activo': estado, 'btn-inactivo': !estado }
    ) }>
      {
        estado
          ? ( <><FaCheck /> Activo</> )
          : ( <><FaTimes /> Inactivo</> )
      }
    </span>
  );
};