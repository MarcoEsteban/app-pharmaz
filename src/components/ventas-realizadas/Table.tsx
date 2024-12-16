import { BtnVer } from "../";
import { Ventas } from "@/interfaces";

interface Props {
  ventas: Ventas[];
}

export const VentasRealizadasTable = ({ ventas }: Props) => {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">
      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full bg-white divide-y divide-gray-200  text-slate-500">
          {/*======================================= Cabecera =======================================*/}
          <thead className="align-bottom">
            <tr className={"border-b border-gray-200 "}>
              <th className="table-th text-left ">#</th>
              <th className="table-th text-left ">ID</th>
              <th className="table-th text-left">Cliente</th>
              <th className="table-th text-left">NIT</th>
              <th className="table-th text-left">Fecha</th>
              <th className="table-th text-left">Hora</th>
              <th className="table-th">Total</th>
              <th className="table-th">ACTIONS</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/}
          <tbody className="bg-white divide-y divide-gray-200">
            {ventas && ventas.map((venta, index) => (
              <tr key={venta.ventaId}>
                <td className={"table-td font-bold"}>{index + 1}</td>

                <td className={"table-td"}>
                  {venta.ventaId?.split("-").at(-1)}
                </td>

                <td className="table-td">
                  <div className="flex">
                    <div className="flex flex-col justify-center">
                      <h6 className="mb-0 leading-normal ">
                        {venta.cliente}
                      </h6>
                    </div>
                  </div>
                </td>

                <td className="table-td ">{venta.clienteNit}</td>

                <td className="table-td ">{venta.fecha}</td>

                <td className="table-td text-center">{venta.hora}</td>
                <td className="table-td text-center">
                  {venta.total.toFixed(2)} Bs
                </td>

                {/*========== Botones ==========*/}
                <td className="text-center">
                  {/*=================== Buton Actualizar ==================*/}
                  <BtnVer id={venta.ventaId ?? ""} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
