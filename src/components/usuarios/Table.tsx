import { FaUserCircle } from "react-icons/fa";
import {
  BtnModificar,
  BtnPassword,
  BtnPhoto,
  BtnVer,
  ButtonActionToglgleState,
  ButtonState,
  ImagenLoad,
} from "../";
import { toggleStateUsuario } from "@/actions";
import { Usuario } from "@/interfaces";

interface Props {
  usuario: Usuario[];
}

export const UsuariosTable = ({ usuario }: Props) => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">
      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">
          {/*======================================= Cabecera =======================================*/}
          <thead className="align-bottom">
            <tr className={"border-b border-gray-200 "}>
              <th className="table-th text-left ">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left">Usuario</th>
              <th className="table-th text-left">Rol</th>
              <th className="table-th">Celular</th>
              <th className="table-th">Estado</th>
              <th className="table-th">ACTIONS</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/}
          <tbody className="bg-white divide-y divide-gray-200">
            {usuario && usuario.map((user, index) => (
              <tr key={user.id}>
                <td className={"table-td font-bold"}>{index + 1}</td>

                <td className={"table-td"}>{user.id?.split("-").at(-1)}</td>

                <td className="table-td">
                  <div className="flex">
                    <div>
                      {user.personas.foto
                        ? (
                          <ImagenLoad
                            className="object-cover inline-flex items-center justify-center mr-3 h-12 w-12 rounded-full"
                            src={user.personas.foto}
                            alt={user.personas.foto}
                            width={20}
                            height={20}
                          />
                        )
                        : (
                          <FaUserCircle
                            className="inline-flex items-center justify-center mr-4 h-12 w-12 rounded-xl"
                            size={30}
                          />
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h6 className="mb-0 leading-normal ">
                        {user.personas.nombre + " " + user.personas.ap}
                      </h6>
                      <p className="mb-0 text-sm text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="table-td ">{user.rol}</td>

                <td className="table-td text-center">
                  {user.personas.celular}
                </td>

                <td className="table-td text-center">
                  <ButtonState estado={user.personas.estado} />
                </td>

                {/*========== Botones ==========*/}
                <td className="text-center">
                  {/*============= Buton Eliminar || Habilitar =============*/}
                  <ButtonActionToglgleState
                    id={user.id}
                    nombre={user.personas.nombre + " " + user.personas.ap}
                    estado={user.personas.estado}
                    toggleActionState={toggleStateUsuario}
                  />

                  {/*=================== Buton Actualizar ==================*/}
                  <BtnModificar id={user.id} />

                  {/*====================== Buton Ver ======================*/}
                  <BtnVer id={user.id} />

                  {/*===================== Buton Foto ======================*/}
                  <BtnPhoto id={user.id} />

                  {/*=================== Buton Password ====================*/}
                  <BtnPassword id={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
