import Image from 'next/image';
import { FaCamera, FaCheck, FaEye } from 'react-icons/fa';
import { FaPenToSquare, FaUnlockKeyhole } from 'react-icons/fa6';
import { BtnAction, ButtonActionToglgleState, ButtonState } from '..';
import Link from 'next/link';

interface Props {
  nombre?: string;
}

export const Table = ( { nombre }: Props ) => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">

      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">

          {/*======================================= Cabecera =======================================*/ }
          <thead className="">
            <tr className={ "shadow-sm" }>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left ">Nombre</th>
              {
                nombre === 'Laboratorio'
                  ? ( <th className="table-th text-left">Imagen</th> )
                  : ( '' )
              }
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

              <td className="table-td">Pomada</td>

              {
                nombre === 'Laboratorio'
                  ? (
                    <td className="table-td">
                      <Image
                        className="object-cover inline-flex items-center justify-center mr-3 h-9 w-9 rounded-xl"
                        src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                        alt=""
                        width={ 8 }
                        height={ 8 }
                      />
                    </td>
                  )
                  : ( '' )
              }

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
                <BtnAction
                  params={ `?modal=editar/${ '123456' }` }
                  className={ 'gradient-update' }
                >
                  <FaPenToSquare size={ 18 } />
                </BtnAction>

                {/*====================== Buton Ver ======================*/ }
                <Link href={ `/dashboard/roles?modal=ver/${ '123456' }` } className="btn-gnrl gradient-show">
                  <FaEye size={ 18 } />
                </Link>

              </td>
            </tr>

            <tr className={ "border-b" }>

              <td className={ "table-td" }>892382</td>

              <td className="table-td">Comprimido</td>

              {
                nombre === 'Laboratorio'
                  ? (
                    <td className="table-td">
                      <Image
                        className="object-cover inline-flex items-center justify-center mr-3 h-9 w-9 rounded-xl"
                        src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                        alt=""
                        width={ 8 }
                        height={ 8 }
                      />
                    </td>
                  )
                  : ( '' )
              }

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