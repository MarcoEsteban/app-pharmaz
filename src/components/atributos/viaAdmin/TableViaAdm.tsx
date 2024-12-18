import { ButtonState } from "@/components/ui/button/ButtonState";
import { ButtonActionToglgleState } from "@/components/ui/button/ButtonActionToglgleState";
import { BtnModificar } from "@/components/ui/button/Button";
import { toggleStateClasifi } from "@/actions";
import { Clasificacion } from "@/interfaces";

interface Props {
  clasifi: Clasificacion[];
}

export const TableViaAdm = ({ clasifi }: Props) => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">
      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">
          {/*======================================= Cabecera =======================================*/}
          <thead className="">
            <tr className={"shadow-sm"}>
              <th className="table-th text-left font-bold">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left ">Nombre</th>
              <th className="table-th">Estado</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/}
          <tbody className="bg-white divide-y divide-gray-200">
            {clasifi && clasifi.map((clasi, index) => (
              <tr key={clasi.id}>
                <td className={"table-td font-bold"}>{index + 1}</td>

                <td className={"table-td"}>{clasi.id?.split("-").at(-1)}</td>

                <td className="table-td ">{clasi.nombre}</td>

                <td className="table-td text-center">
                  <ButtonState estado={clasi.estado} />
                </td>

                {/*========== Botones ==========*/}
                <td className="text-center">
                  {/*============= Buton Eliminar || Habilitar =============*/}
                  <ButtonActionToglgleState
                    id={clasi.id}
                    nombre={clasi.nombre}
                    estado={clasi.estado}
                    toggleActionState={toggleStateClasifi}
                  />

                  {/*=================== Buton Actualizar ==================*/}
                  <BtnModificar id={clasi.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
