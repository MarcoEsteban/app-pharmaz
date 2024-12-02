// "use client";
//
// import { ImagenLoad } from "@/components";
// import { CartProduct, Producto } from "@/interfaces";
// import { useCartStore } from "@/store";
// import clsx from "clsx";
// import { useState } from "react";
// import {
//   FaAppStoreIos,
//   FaCartPlus,
//   FaCopyright,
//   FaCubes,
//   FaDollarSign,
//   FaFlask,
//   FaMortarPestle,
//   FaPills,
//   FaSyringe,
// } from "react-icons/fa";
//
// interface Props {
//   producto: Producto;
// }
//
// export const ItemCardVentas = ({ producto }: Props) => {
//   // ========
//   // Zustand:
//   // ========
//   const addProductToCart = useCartStore((state) => state.addProductToCart);
//
//   // const [ posted, setPosted ] = useState()<boolean>( false );
//   const [cantidad, setCandidad] = useState<number>(1);
//
//   const addTocart = () => {
//     // setPosted( true );
//
//     // if ( !size ) return;
//
//     const cartProduct: CartProduct = {
//       id: producto.id || "",
//       nombre: producto.nombre,
//       concentracion: producto.concentracion,
//       adicional: producto.adicional,
//       precio: producto.precio,
//       presentacionId: producto.presentacionId,
//       laboratoriosId: producto.laboratoriosId,
//       foto: producto.foto || "",
//       stock: producto.stock,
//       lote: "",
//       cantidadCart: cantidad,
//       estado: producto.estado,
//       // quantity: quantity,
//       // size: size,
//       // image: product.images[ 0 ]
//     };
//     addProductToCart(CartProduct);
//
//     // Retornamos a su valor inicial una vez se agrege al carrito:
//     // setPosted( false );
//     setCandidad(1);
//     // setSize( undefined );
//   };
//
//   return (
//     <div className="flex max-w-auto max-h-auto flex-col bg-gray-200 bg-clip-border text-gray-700 shadow-lg border rounded-xl justify-between">
//       <div
//         className={clsx(
//           "flex justify-between boder rounded-t-xl",
//           { "bg-red-500 text-gray-200": !producto.estado },
//         )}
//       >
//         <div className="p-4 flex-1">
//           <p className=" flex items-center gap-2 font-sans text-xl font-bold antialiased">
//             <FaCubes /> {producto.stock}
//           </p>
//           <h4 className="block font-sans text-xl uppercase leading-snug tracking-normal text-blue-gray-900 antialiased">
//             {producto.nombre}
//           </h4>
//           <p className=" flex items-center gap-2 font-sans text-2xl font-normal antialiased">
//             <FaDollarSign /> {producto.precio}
//           </p>
//           <div className="mt-2 flex flex-col text-sm gap-1 font-sans tracking-wide antialiased">
//             {producto.concentracion &&
//               (
//                 <p className="flex gap-1">
//                   <FaMortarPestle size={20} /> Concentracion:{" "}
//                   <span>{producto.concentracion}</span>
//                 </p>
//               )}
//             <p className="flex gap-1">
//               <FaAppStoreIos size={20} /> Adicional:{" "}
//               <span className="uppercase">{producto.adicional}</span>
//             </p>
//
//             {producto.presentacionId &&
//               (
//                 <p className="flex gap-1">
//                   <FaPills size={20} /> Presentacion:{" "}
//                   <span className="uppercase">{producto.presentacionId}</span>
//                 </p>
//               )}
//
//             {producto.tipo &&
//               (
//                 <p className="flex gap-1">
//                   <FaCopyright size={20} /> Tipo: {producto.tipo}
//                 </p>
//               )}
//             <p className="flex gap-1">
//               <FaFlask size={20} /> Laboratorio:{" "}
//               <span className="uppercase">{producto.laboratoriosId}</span>
//             </p>
//
//             {producto.tipo &&
//               (
//                 <p className="flex gap-1">
//                   <FaSyringe size={20} /> Via Administracion:{" "}
//                   {producto.viaAdministracionId}
//                 </p>
//               )}
//           </div>
//         </div>
//
//         <div className="flex-3 rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none my-auto">
//           <ImagenLoad
//             className="object-cover w-36 h-36 rounded-full mx-auto "
//             src={producto.foto as string}
//             alt={producto.foto as string}
//             width={100}
//             height={100}
//           />
//         </div>
//       </div>
//
//       {/* Button  */}
//       <div
//         className={clsx(
//           "flex items-center justify-end px-3 py-2 bg-gray-300 rounded-b-xl",
//           { "bg-red-600 text-gray-200": !producto.estado },
//         )}
//       >
//         {/*===================== Buton Cart ======================*/}
//         {/* <TooltipButton /> */}
//
//         <button
//           onClick={addTocart}
//           className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
//         >
//           Agregar
//           <FaCartPlus size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };
