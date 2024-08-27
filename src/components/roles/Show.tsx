
import { BtnVolver, ButtonState } from '@/components';
import { RolMe } from '@/interfaces';
import { ItemMenus } from './menus/ItemMenus';

interface Props {
  roles: RolMe;
}

export const Show = ( { roles }: Props ) => {

  return (
    <>
      <div className={ "w-full mb-6 text-gray-600 uppercase font-semibold pb-1 border-b shadow-lg text-center" }>
        Detalle del Rol
      </div>
      
      <div className={ "w-full mb-4 text-gray-400 pb-2 flex justify-between" }>
        <p className='flex items-center gap-2'> 
          <span className='uppercase text-sm font-semibold'>Nombre Rol:</span>{ roles.nombre }
        </p> 
        
        <p className='flex items-center gap-2'> 
          <span className='uppercase text-sm font-semibold'>Estado:</span>
          <ButtonState estado={ roles.estado } />
        </p> 
      </div>
      
      <ItemMenus roles={ roles } />

      <div className={ "flex justify-end gap-4 pt-2" }>
        <BtnVolver />
      </div>
    </>
  );
};
