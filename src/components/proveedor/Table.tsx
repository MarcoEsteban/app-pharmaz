import { FaUserCircle } from "react-icons/fa";
import {
  BtnModificar,
  BtnPhoto,
  BtnVer,
  ButtonActionToglgleState,
  ButtonState,
  ImagenLoad,
} from "../";
import { Proveedor } from "@/interfaces";
import { toggleStateProveedor } from "@/actions";

interface Props {
  proveedor: Proveedor[];
}

export const ProveedorTable = ({ proveedor }: Props) => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">
      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">
          {/*======================================= Cabecera =======================================*/}
          <thead className="align-bottom">
            <tr className={"border-b border-gray-200 "}>
              <th className="table-th text-left ">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left">Proveedor</th>
              <th className="table-th text-left">NIT</th>
              <th className="table-th">Celular</th>
              <th className="table-th">Estado</th>
              <th className="table-th">ACTIONS</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/}
          <tbody className="bg-white divide-y divide-gray-200">
            {proveedor &&
              proveedor.map((proveedor, index) => (
                <tr key={proveedor.id}>
                  <td className={"table-td font-bold"}>{index + 1}</td>

                  <td className={"table-td"}>
                    {proveedor.id?.split("-").at(-1)}
                  </td>

                  <td className="table-td">
                    <div className="flex">
                      <div>
                        {proveedor.foto
                          ? (
                            <ImagenLoad
                              className="object-cover inline-flex items-center justify-center mr-3 h-12 w-12 rounded-full"
                              src={proveedor.foto}
                              alt={proveedor.foto}
                              width={20}
                              height={20}
                            />
                          )
                          : (
                            <FaUserCircle
                              className="inline-flex items-center justify-center mr-4 h-9 w-9 rounded-xl"
                              size={28}
                            />
                          )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h6 className="mb-0 leading-normal ">
                          {proveedor.nombre}
                        </h6>
                        <p className="mb-0 text-sm text-slate-400">
                          {proveedor.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="table-td ">{proveedor.nit}</td>

                  <td className="table-td text-center">{proveedor.celular}</td>

                  <td className="table-td text-center">
                    <ButtonState estado={proveedor.estado} />
                  </td>

                  {/*========== Botones ==========*/}
                  <td className="text-center">
                    {/*============= Buton Eliminar || Habilitar =============*/}
                    <ButtonActionToglgleState
                      id={proveedor.id}
                      nombre={proveedor.nombre}
                      estado={proveedor.estado}
                      toggleActionState={toggleStateProveedor}
                    />

                    {/*=================== Buton Actualizar ==================*/}
                    <BtnModificar id={proveedor.id} />

                    {/*====================== Buton Ver ======================*/}
                    <BtnVer id={proveedor.id} />

                    {/*===================== Buton Foto ======================*/}
                    <BtnPhoto id={proveedor.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
