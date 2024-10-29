import { ButtonState } from '@/components/ui/button/ButtonState';
import { ButtonActionToglgleState } from '@/components/ui/button/ButtonActionToglgleState';
import { BtnModificar } from '@/components/ui/button/Button';
import { toggleStatePresent } from '@/actions';
import { Presentacion } from '@/interfaces';

interface Props {
  presentacion: Presentacion[]
}

export const TablePresentacion = ( { presentacion }: Props ) => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">

      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">

          {/*======================================= Cabecera =======================================*/ }
          <thead className="">
            <tr className={ "shadow-sm" }>
              <th className="table-th text-left font-bold">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left ">Nombre</th>
              <th className="table-th">Estado</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/ }
          <tbody className="bg-white divide-y divide-gray-200">

            {
              presentacion && presentacion.map( (present, index) => (
                <tr key={ present.id }>
                  <td className={ "table-td font-bold" }>{index + 1}</td>
                  
                  <td className={ "table-td" }>{present.id?.split('-').at(-1)}</td>
                  
                  <td className="table-td ">{ present.nombre }</td>

                  <td className="table-td text-center">
                    <ButtonState estado={ present.estado } />
                  </td>

                  {/*========== Botones ==========*/ }
                  <td className="text-center">

                    {/*============= Buton Eliminar || Habilitar =============*/ }
                    <ButtonActionToglgleState
                      id={ present.id }
                      nombre={ present.nombre }
                      estado={ present.estado }
                      toggleActionState={ toggleStatePresent }
                    />

                    {/*=================== Buton Actualizar ==================*/ }
                    <BtnModificar id={present.id} />

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
