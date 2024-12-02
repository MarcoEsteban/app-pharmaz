import Image from "next/image";
import { ButtonState } from "@/components/ui/button/ButtonState";
import { ButtonActionToglgleState } from "@/components/ui/button/ButtonActionToglgleState";
import { BtnModificar, BtnPhoto } from "@/components/ui/button/Button";
import { toggleStateLabo } from "@/actions";
import { Laboratorio } from "@/interfaces";
import { ImagenLoad } from "@/components/ui/image/ImagenLoad";

interface Props {
  laboratorios: Laboratorio[];
}

export const TableLabo = ({ laboratorios }: Props) => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">
      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">
          {/*======================================= Cabecera =======================================*/}
          <thead className="">
            <tr className={"shadow-sm"}>
              <th className="table-th text-left font-bold">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left ">Imagen</th>
              <th className="table-th text-left ">Nombre</th>
              <th className="table-th">Estado</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/}
          <tbody className="bg-white divide-y divide-gray-200">
            {laboratorios &&
              laboratorios.map((labo, index) => (
                <tr key={labo.id}>
                  <td className={"table-td font-bold"}>{index + 1}</td>

                  <td className={"table-td"}>{labo.id?.split("-").at(-1)}</td>

                  <td className="table-td">
                    <ImagenLoad
                      className="object-cover justify-center h-12 w-12 rounded-full border"
                      src={labo.foto as string}
                      alt={labo.foto as string}
                      width={90}
                      height={90}
                    />
                  </td>

                  <td className="table-td ">{labo.nombre}</td>

                  <td className="table-td text-center">
                    <ButtonState estado={labo.estado} />
                  </td>

                  {/*========== Botones ==========*/}
                  <td className="text-center">
                    {/*============= Buton Eliminar || Habilitar =============*/}
                    <ButtonActionToglgleState
                      id={labo.id}
                      nombre={labo.nombre}
                      estado={labo.estado}
                      toggleActionState={toggleStateLabo}
                    />

                    {/*=================== Buton Actualizar ==================*/}
                    <BtnModificar id={labo.id} />

                    {/*====================== Buton Photo ====================*/}
                    <BtnPhoto id={labo.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
