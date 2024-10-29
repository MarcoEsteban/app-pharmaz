import { BtnModificar } from '../';
import { PersonaType } from '@/interfaces';

interface Props {
  cliente: PersonaType[]
}

export const ClienteTable = ({ cliente }: Props) => {
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
              <th className="table-th text-left">Direccion</th>
              <th className="table-th">Celular</th>
              <th className="table-th">ACTIONS</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/ }
          <tbody className="bg-white divide-y divide-gray-200">

            {
              cliente && cliente.map( (cliente, index) => (
                <tr key={cliente.id}>
                  <td className={ "table-td font-bold" }>{index + 1}</td>
                  
                  <td className={ "table-td" }>{cliente.id?.split('-').at(-1)}</td>
                  
                  <td className="table-td">
                    
                    <div className="flex">
                      <div className="flex flex-col justify-center">
                        <h6 className="mb-0 leading-normal ">{ cliente.nombre + ' ' + cliente.ap }</h6>
                      </div>
                    </div>
                  </td>

                  <td className="table-td ">{ cliente.ci }</td>
                  
                  <td className="table-td ">{ cliente.direccion }</td>

                  <td className="table-td text-center">{ cliente.celular }</td>

                  {/*========== Botones ==========*/ }
                  <td className="text-center">

                    {/*=================== Buton Actualizar ==================*/ }
                    <BtnModificar id={cliente.id ?? ''} />

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
