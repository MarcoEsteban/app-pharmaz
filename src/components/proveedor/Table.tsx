import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { BtnModificar, BtnPhoto, BtnVer, ButtonActionToglgleState, ButtonState } from '../';
import { Proveedor } from '@/interfaces/proveedor.interface';
import { toggleStateProveedor } from '@/actions';

interface Props {
  proveedor: Proveedor[]
}

export const ProveedorTable = ({proveedor}: Props) => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">

      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">

          {/*======================================= Cabecera =======================================*/ }
          <thead className="align-bottom">
            <tr className={ "border-b border-gray-200 " }>
              <th className="table-th text-left ">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left">Proveedor</th>
              <th className="table-th text-left">NIT</th>
              <th className="table-th">Celular</th>
              <th className="table-th">Estado</th>
              <th className="table-th">ACTIONS</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/ }
          <tbody className="bg-white divide-y divide-gray-200">

            {
              proveedor && proveedor.map( (proveedor, index) => (
                <tr className="border-b" key={proveedor.id}>
                  <td className={ "table-td font-bold" }>{index + 1}</td>
                  
                  <td className={ "table-td" }>{proveedor.id?.split('-').at(-1)}</td>
                  
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
                        <h6 className="mb-0 leading-normal ">{ proveedor.personas.nombre +' '+ proveedor.personas.ap }</h6>
                        <p className="mb-0 text-sm text-slate-400">{ proveedor.email }</p>
                      </div>
                    </div>
                  </td>

                  <td className="table-td ">{ proveedor.personas.ci }</td>

                  <td className="table-td text-center">{ proveedor.personas.celular }</td>

                  <td className="table-td text-center">
                    <ButtonState estado={ proveedor.personas.estado } />
                  </td>

                  {/*========== Botones ==========*/ }
                  <td className="text-center">

                    {/*============= Buton Eliminar || Habilitar =============*/ }
                    <ButtonActionToglgleState
                      id={ proveedor.id }
                      nombre={ proveedor.personas.nombre +' '+ proveedor.personas.ap }
                      estado={ proveedor.personas.estado }
                      toggleActionState={ toggleStateProveedor }
                    />

                    {/*=================== Buton Actualizar ==================*/ }
                    <BtnModificar id={proveedor.id} />

                    {/*====================== Buton Ver ======================*/ }
                    <BtnVer id={proveedor.id} />

                    {/*===================== Buton Foto ======================*/ }
                    <BtnPhoto id={proveedor.id} />
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
