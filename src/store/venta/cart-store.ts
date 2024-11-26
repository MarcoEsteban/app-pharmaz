import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Swal from "sweetalert2";

interface Cliente {
  id: string;
  nombre: string;
  ap: string | null;
  am: string | null;
}

interface Farma {
  id: string;
  nombre: string;
  email: string;
  celular: number | null | undefined;
  direccion: string | null;
  foto: string | null;
}

interface State {
  // State:
  cart: CartProduct[];
  cliente: Cliente | null;
  vendedor: Cliente | null;
  farma: Farma | null;

  // Action:
  setCliente: (cliente: Cliente) => void;
  setVendedor: (vendedor: Cliente) => void;
  setFarma: (farma: Farma) => void;
  getTotalItem: () => number;
  getSummaryInformation: () => {
    subsTotal: number;
    impuesto: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  emtyCart: () => void;
}

export const useCartStore = create<State>()(
  // Esto va a generar una Discrepancis, es decir un Problema cuando se realice la Rehidratacion == Renderizacion:
  // 'REHIDRATACION' :: Va a generar un discrepancia de lo que va a renderizar el Servidor y el Cliente
  persist(
    // get :: Me permite obtener el estado actual del Store de Zustand.
    // set :: Me permite realizar el cambio del estado actual del Store de Zustand.
    (set, get) => ({
      // State Initial:
      cart: [],
      cliente: null,
      vendedor: null,
      farma: null,

      // ==================
      // Metodos ó Actions:
      // ==================
      emtyCart: () => {
        set({ cart: [], cliente: null, vendedor: null, farma: null });
      },
      setCliente: (cliente) => set({ cliente }),

      setVendedor: (vendedor) => set({ vendedor }),

      setFarma: (farma) => set({ farma }),

      getTotalItem: () => {
        // Destructuracion para obtener el cart:
        const { cart } = get();
        // reduce( funtion_que_retorna_el_new_value, value_initial)
        return cart.reduce(
          (value_initial, itemCart) => value_initial + itemCart.cantidadCart,
          0,
        );
      },

      getSummaryInformation: () => {
        const { cart, getTotalItem } = get();

        const subsTotal = cart.reduce(
          // (subTotal, product) => (product.stock * product.precio) + subTotal,
          (subTotal, product) =>
            (product.cantidadCart * product.precio) + subTotal,
          0,
        );

        const impuesto = subsTotal * 0.15;
        const total = subsTotal + impuesto;
        const itemsInCart = getTotalItem();

        return {
          subsTotal,
          impuesto,
          total,
          itemsInCart,
        };
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some((item) => item.id === product.id);

        if (!productInCart) {
          // Reduce el stock al agregar al carrito
          const updatedProduct = {
            ...product,
            stock: product.stock - product.cantidadCart,
          };
          set({ cart: [...cart, updatedProduct] });
          return;
        }

        // Si ya existe, incrementa la cantidad pero verifica que no exceda el stock disponible
        const updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            const newCantidad = item.cantidadCart + product.cantidadCart;
            if (newCantidad > item.stock) {
              // Mostrar alerta si no hay suficiente stock
              Swal.fire({
                title: "Stock insuficiente",
                text: `Solo hay ${item.stock} unidades disponibles.`,
                icon: "error",
                confirmButtonText: "Entendido",
              });
              return item; // Mantén el producto sin cambios
            }
            return {
              ...item,
              cantidadCart: newCantidad,
              stock: item.stock - product.cantidadCart,
            };
          }
          return item;
        });

        set({ cart: updatedCart });
      },

      updateProductQuantity: (product: CartProduct, newQuantity: number) => {
        const { cart } = get();

        const updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            const diff = newQuantity - item.cantidadCart;
            if (item.stock - diff < 0) {
              // Mostrar alerta si no hay suficiente stock
              Swal.fire({
                title: "Cantidad excedida",
                text: `No puedes agregar más de ${item.stock} unidades.`,
                icon: "warning",
                confirmButtonText: "Ok",
              });
              return item; // Mantén el producto sin cambios
            }
            return {
              ...item,
              cantidadCart: newQuantity,
              stock: item.stock - diff,
            };
          }
          return item;
        });

        set({ cart: updatedCart });
      },

      // addProductToCart: (product: CartProduct) => {
      //   // Destructuracion para obtener el cart:
      //   const { cart } = get();
      //
      //   //? 1. Revisar si el producto existe en el carrito con la talla seleccionada.
      //   // .some() :: Determina que basta que uno cumpla la condicion que especifiquemos sale de la funcion.
      //   const productInCart = cart.some(
      //     (item) => (item.id === product.id),
      //   );
      //
      //   // Si no esta el Producto en el Carrito entonces lo Agregamos:
      //   if (!productInCart) {
      //     set({ cart: [...cart, product] });
      //     return;
      //   }
      //
      //   //? 2. Si el producto existe por talla, entonces tengo que incrementar su cantidad.
      //   // const updateCartProducts = cart.map( item => {
      //   //   if ( item.id === product.id && item.size === product.size ) {
      //   //     // Devuelve el producto que cumple con la condicion e indicamos que modifique su cantidad
      //   //     return { ...item, quantity: item.quantity + product.quantity };
      //   //   }
      //   //
      //   //   return item;
      //   // } );
      //
      //   // set( { cart: updateCartProducts } );
      //   set({ cart });
      // },
      //
      // updateProductQuantity: (product: CartProduct, quantity: number) => {
      //   const { cart } = get();
      //
      //   // Actualiza el carrito de compra cuando hace clicp al button + ó -
      //   const updateCartProducts = cart.map((item) => {
      //     if (item.id === product.id) {
      //       return { ...item, cantidadCart: quantity };
      //     }
      //
      //     return item;
      //   });
      //
      //   set({ cart: updateCartProducts });
      // },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        // Indico que me devuelva todo el carrito de compras, pero ecepto el producto que cumpla esta condición.
        const updateCartProducts = cart.filter(
          (item) => item.id !== product.id,
        );

        set({ cart: updateCartProducts });
      },
    }),
    {
      name: "shopping-cart", // Nombre del LocalStorage.
      // skipHydration: true, //? 1ra Forma de Solucionar el Problema de la Rehidratacion.
    },
  ),
);
