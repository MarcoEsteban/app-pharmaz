import Image from 'next/image';
import { FaCamera, FaCheck, FaEye, FaTimes, FaUserCircle } from 'react-icons/fa';
import { FaPenToSquare, FaPrescriptionBottleMedical, FaTrashCan, FaUnlockKeyhole } from 'react-icons/fa6';
import { ButtonActionToglgleState } from '../ui/button/ButtonActionToglgleState';
import { BtnAction } from '../ui/button/Button';

export const UsuariosTable = () => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">

      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">

          {/*======================================= Cabecera =======================================*/ }
          <thead className="align-bottom">
            <tr className={ "border-b border-gray-200 " }>
              <th className="table-th text-left">Usuario</th>
              <th className="table-th text-left">Rol</th>
              <th className="table-th">Celular</th>
              <th className="table-th">Estado</th>
              <th className="table-th">ACTIONS</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/ }
          <tbody className="bg-white divide-y divide-gray-200">

            <tr className="border-b">

              <td className="table-td">
                <div className="flex">
                  <div>
                    {/* <Image
                      className="object-cover inline-flex items-center justify-center mr-3 h-9 w-9 rounded-xl"
                      src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                      alt=""
                      width={ 8 }
                      height={ 8 }
                    /> */}
                    <FaUserCircle
                      className="inline-flex items-center justify-center mr-4 h-9 w-9 rounded-xl"
                      size={ 28 } />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h6 className="mb-0 leading-normal ">Laurent Perrier</h6>
                    <p className="mb-0 text-sm text-slate-400">laurent@creative-tim.com</p>
                  </div>
                </div>
              </td>

              <td className="table-td ">
                Administrador
              </td>

              <td className="table-td text-center">
                71727321
              </td>

              <td className="table-td text-center">
                <span className="btn-inactivo">
                  <FaTimes />
                  Inactivo
                </span>
              </td>

              {/*========== Botones ==========*/ }
              <td className="text-center">

                <ButtonActionToglgleState id={ '123456' } nombre={ 'Marco' } estado={ true } />

                <BtnAction params={ '?modal=editar' } className={ 'gradient-update' }>
                  <FaPenToSquare size={ 18 } />
                </BtnAction>

                <BtnAction params={ '?modal=ver' } className={ 'gradient-show' }>
                  <FaEye size={ 18 } />
                </BtnAction>

                <BtnAction params={ '?modal=foto' } className={ 'gradient-photo' }>
                  <FaCamera size={ 18 } />
                </BtnAction>

                <BtnAction params={ '?modal=password' } className={ 'gradient' }>
                  <FaUnlockKeyhole size={ 18 } />
                </BtnAction>
              </td>
            </tr>

            <tr className="border-b">

              <td className="table-td">
                <div className="flex">
                  <div>
                    <Image
                      className="object-cover inline-flex items-center justify-center mr-3 h-9 w-9 rounded-xl"
                      src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                      alt=""
                      width={ 8 }
                      height={ 8 }
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h6 className="mb-0 leading-normal ">Laurent Perrier</h6>
                    <p className="mb-0 text-sm text-slate-400">laurent@creative-tim.com</p>
                  </div>
                </div>
              </td>

              <td className="table-td">
                Administrador
              </td>

              <td className="table-td text-center">
                71727321
              </td>

              <td className="table-td text-center">
                <span className="btn-activo">
                  <FaCheck />
                  Activo
                </span>
              </td>

              {/*========== Botones ==========*/ }
              <td className="text-center">

                <ButtonActionToglgleState id={ '1234567' } nombre={ 'Marco' } estado={ false } />

                <button type="button" className="btn-gnrl gradient-update">
                  <FaPenToSquare size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient-show">
                  <FaEye size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient-photo">
                  <FaCamera size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient">
                  <FaUnlockKeyhole size={ 18 } />
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};