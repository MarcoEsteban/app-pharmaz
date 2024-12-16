import { BtnVolver } from "@/components";
import { FaAddressCard, FaUser, FaUserTie } from "react-icons/fa";
import { Ventas } from "@/interfaces/venta.interface";
import { TableDetalleVentaShow } from "./ShowDetalleTable";
import { GiMoneyStack } from "react-icons/gi";
import { BsQrCode } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { BtnImprimir } from "./ButtonImprimir";

interface Props {
  venta: Partial<Ventas>;
}

export const ShowDetalle = ({ venta }: Props) => {
  const cli = venta.cliente?.split(" ");
  const vende = venta.vendedor?.split(" ");
  const cliente = {
    ci: venta.clienteNit,
    nombre: cli ? cli[0] : "",
    ap: cli ? cli[1] : "",
    am: cli ? cli[2] : "",
  };
  const vendedor = {
    nombre: vende ? vende[0] : "",
    ap: vende ? vende[1] : "",
    am: vende ? vende[2] : "",
  };
  const cart = venta.detalles?.map((item) => ({
    ...item,
    cantidadCart: item.cantidad,
  }));

  const data = JSON.stringify({
    cart,
    cliente,
    vendedor,
    numeroVenta: venta.numeroVenta,
  });

  return (
    <>
      {/* <pre> */}
      {/*   {JSON.stringify(venta, null, 2)} */}
      {/* </pre> */}
      <div className="flex  justify-between">
        {/* ============== */}
        {/* NIT && CLIENTE */}
        {/* ============== */}
        <div className="flex flex-col ">
          <div className="flex gap-8 justify-between bg-gray-200 w-auto p-1.5 px-4 rounded-lg mb-2">
            <p className="text-gray-600 flex gap-2 items-center">
              <FaAddressCard size={20} className="text-gray-700" />
              <span className="">{venta.clienteNit}</span>
            </p>
          </div>

          <div className="flex gap-8 justify-between bg-gray-200 w-auto p-1.5 px-4 rounded-lg mb-2">
            <p className="text-gray-600 flex gap-2 items-center">
              <FaUserTie size={20} className="text-gray-700" />
              <span className="">{venta.cliente}</span>
            </p>
          </div>
        </div>

        {/* ============= */}
        {/* PAGO && FECHA */}
        {/* ============= */}
        <div>
          <div className="flex gap-8 justify-between bg-gray-200 w-auto p-1.5 px-8 rounded-lg mb-2">
            <p className="text-gray-600 flex items-center gap-2">
              {/* <span className="font-bold">FECHA::</span> */}
              <FaCalendarDays size={16} /> {venta.fecha}
              {/* <IoTimeSharp size={20} /> {venta.hora} */}
            </p>
          </div>

          <div className="flex gap-8 justify-between bg-gray-200 w-auto p-1.5 px-8 rounded-lg mb-2">
            <p className="text-gray-600 flex items-center gap-2">
              {venta.metodoPago === "Efectivo"
                ? <GiMoneyStack size={22} className="text-gray-800" />
                : <BsQrCode size={20} className="text-gray-800" />}
              <span className="">{venta.metodoPago}</span>
            </p>
          </div>
        </div>

        {/* =============== */}
        {/* HORA && USUARIO */}
        {/* =============== */}
        <div>
          <div className="flex gap-8 justify-between bg-gray-200 w-auto p-1.5 px-2.5 rounded-lg mb-2">
            <p className="text-gray-600 flex items-center gap-2">
              {/* <span className="font-bold">FECHA::</span> */}
              {/* <FaCalendarDays size={16} /> {venta.fecha} */}
              <IoTimeSharp size={20} /> {venta.hora}
            </p>
          </div>
          <div className="flex gap-8 justify-between bg-gray-200 w-auto p-1.5 px-4 rounded-lg mb-2">
            <p className="text-gray-600 flex gap-2 items-center">
              <FaUser size={20} />
              <span className="">{venta.vendedor}</span>
            </p>
          </div>
        </div>
      </div>

      <TableDetalleVentaShow productos={venta.detalles} />

      <div className={"flex justify-end gap-4 pt-2"}>
        <BtnVolver />
        <BtnImprimir data={data} />
      </div>
    </>
  );
};
