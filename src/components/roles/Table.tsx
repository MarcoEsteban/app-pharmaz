import { FaCheck, FaEye } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { BtnAction, ButtonActionToglgleState, ButtonState } from '../';

export const RolesTable = () => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">

      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">

          {/*======================================= Cabecera =======================================*/ }
          <thead className="">
            <tr className={ "shadow-sm" }>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left ">Nombre</th>
              <th className="table-th text-left">Menus</th>
              <th className="table-th">Estado</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/ }
          <tbody className="bg-white divide-y divide-gray-200">

            <tr className="border-b">

              <td className={ "table-td" }>
                892341
              </td>

              <td className="table-td">Administrador</td>

              <td className="table-td">
                <select className={ "input-select" }>
                  <option>Perfil</option>
                  <option>Usuario</option>
                </select>
              </td>

              <td className="table-td text-center">
                <ButtonState estado={ false } />
              </td>

              <td className="text-center">

                {/*============= Buton Eliminar || Habilitar =============*/ }
                <ButtonActionToglgleState
                  id={ '123456' }
                  nombre={ "Administrador" }
                  estado={ true }
                />

                {/*=================== Buton Actualizar ==================*/ }
                <BtnAction params={ `?modal=editar/${ '123456' }` } className={ 'gradient-update' }>
                  <FaPenToSquare size={ 18 } />
                </BtnAction>

                {/*====================== Buton Ver ======================*/ }
                <BtnAction params={ '?modal=ver' } className={ 'gradient-show' }>
                  <FaEye size={ 18 } />
                </BtnAction>

              </td>
            </tr>

            <tr className={ "border-b" }>

              <td className={ "table-td" }>892382</td>

              <td className="table-td">Farmaceutico</td>

              <td className="table-td">
                <select className={ "input-select" }>
                  <option>Usuario</option>
                  <option>Perfil</option>
                </select>
              </td>

              <td className="table-td text-center">
                <span className="btn-activo">
                  <FaCheck />
                  Activo
                </span>
              </td>

              <td className="table-td text-center">

                <ButtonActionToglgleState
                  id={ '123456' }
                  nombre={ "Administrador" }
                  estado={ false }
                />

                <button type="button" className="btn-gnrl gradient-update">
                  <FaPenToSquare size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient-show">
                  <FaEye size={ 18 } />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};