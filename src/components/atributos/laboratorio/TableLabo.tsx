import Image from 'next/image';
import { ButtonState } from '@/components/ui/button/ButtonState';
import { ButtonActionToglgleState } from '@/components/ui/button/ButtonActionToglgleState';
import { BtnModificar } from '@/components/ui/button/Button';
import { toggleStateLabo } from '@/actions';
import { Laboratorio } from '@/interfaces';

interface Props {
  laboratorios: Laboratorio[]
}

export const TableLabo = ( { laboratorios }: Props ) => {

  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">

      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">

          {/*======================================= Cabecera =======================================*/ }
          <thead className="">
            <tr className={ "shadow-sm" }>
              <th className="table-th text-left font-bold">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left ">Imagen</th>
              <th className="table-th text-left ">Nombre</th>
              <th className="table-th">Estado</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/ }
          <tbody className="bg-white divide-y divide-gray-200">

            {
              laboratorios && laboratorios.map( (labo, index) => (
                <tr key={labo.id}>
                  <td className={ "table-td font-bold" }>{index + 1}</td>
                  
                  <td className={ "table-td" }>{labo.id?.split('-').at(-1)}</td>
                  
                  <td className="table-td">
                    <Image
                      className="object-cover inline-flex items-center justify-center mr-3 h-9 w-9 rounded-xl"
                      src={
                        labo.foto ? labo.foto : "https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                      }
                      alt=""
                      width={ 8 }
                      height={ 8 }
                    />
                  </td>
                  
                  <td className="table-td ">{ labo.nombre }</td>

                  <td className="table-td text-center">
                    <ButtonState estado={ labo.estado } />
                  </td>

                  {/*========== Botones ==========*/ }
                  <td className="text-center">

                    {/*============= Buton Eliminar || Habilitar =============*/ }
                    <ButtonActionToglgleState
                      id={ labo.id }
                      nombre={ labo.nombre }
                      estado={ labo.estado }
                      toggleActionState={ toggleStateLabo }
                    />

                    {/*=================== Buton Actualizar ==================*/ }
                    <BtnModificar id={labo.id} />

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
