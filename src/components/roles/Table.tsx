import { BtnModificar, BtnVer, ButtonActionToglgleState, ButtonState } from '../';
import { RolMe } from '@/interfaces';
import { toggleStateRoles } from '@/actions';

interface Props {
  roles: RolMe[]
}

export const RolesTable = async ({roles}: Props) => {
  
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">

      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">

          {/*======================================= Cabecera =======================================*/ }
          <thead className="">
            <tr className={ "shadow-sm" }>
              <th className="table-th text-left ">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left ">Nombre</th>
              <th className="table-th text-left">Menus</th>
              <th className="table-th">Estado</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/ }
          <tbody className="bg-white divide-y divide-gray-200">

            {
              roles.map( (rol, index) => (
                <tr key={ rol.id }>

                  <td className={ "table-td font-bold" }>{index + 1}</td>
                  
                  <td className={ "table-td" }>{rol.id?.split('-').at(-1)}</td>

                  <td className="table-td">{rol.nombre}</td>

                  <td className="table-td">
                    <select className={ "input-select" }>
                      {
                        rol.menus.map(menu => (
                          <option key={ menu.id }>{menu.nombre.split(' ').at(-1)}</option>
                        ))
                      }
                    </select>
                  </td>

                  <td className="table-td text-center">
                    <ButtonState estado={ rol.estado } />
                  </td>

                  <td className="text-center">
                    {/*============= Buton Eliminar || Habilitar =============*/ }
                    <ButtonActionToglgleState
                      id={ rol.id }
                      nombre={ rol.nombre }
                      estado={ rol.estado }
                      toggleActionState={ toggleStateRoles }
                    />

                    {/*=================== Buton Actualizar ==================*/ }
                    <BtnModificar id={rol.id} />

                    {/*====================== Buton Ver ======================*/ }
                    <BtnVer id={rol.id} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
