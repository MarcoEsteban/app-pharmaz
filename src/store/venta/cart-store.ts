import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {

  // State:
  cart: CartProduct[];

  // Action:
  getTotalItem: () => number;
  getSummaryInformation: () => {
    subsTotal: number;
    impuesto: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: ( product: CartProduct ) => void;
  updateProductQuantity: ( product: CartProduct, quantity: number ) => void;
  removeProduct: ( product: CartProduct ) => void;
  emtyCart: () => void;

}

export const useCartStore = create<State>()(

  // Esto va a generar una Discrepancis, es decir un Problema cuando se realice la Rehidratacion == Renderizacion:
  // 'REHIDRATACION' :: Va a generar un discrepancia de lo que va a renderizar el Servidor y el Cliente
  persist(
    // get :: Me permite obtener el estado actual del Store de Zustand.
    // set :: Me permite realizar el cambio del estado actual del Store de Zustand.
    ( set, get ) => ( {

      // State Initial:
      cart: [],

      // ==================
      // Metodos ó Actions:
      // ==================
      emtyCart: () => {
        set( { cart: [] } );
      },
      
      getTotalItem: () => {
        // Destructuracion para obtener el cart:
        const { cart } = get();
        // reduce( funtion_que_retorna_el_new_value, value_initial)
        return cart.reduce( ( value_initial, itemCart ) => value_initial + itemCart.stock, 0 );
      },

      getSummaryInformation: () => {
        const { cart, getTotalItem } = get();

        const subsTotal = cart.reduce(
          ( subTotal, product ) => ( product.stock * product.precio ) + subTotal,
          0
        );

        const impuesto = subsTotal * 0.15;
        const total = subsTotal + impuesto;
        const itemsInCart = getTotalItem();

        return {
          subsTotal, impuesto, total, itemsInCart
        };

      },

      addProductToCart: ( product: CartProduct ) => {
        // Destructuracion para obtener el cart:
        const { cart } = get();

        //? 1. Revisar si el producto existe en el carrito con la talla seleccionada. 
        // .some() :: Determina que basta que uno cumpla la condicion que especifiquemos sale de la funcion.
        const productInCart = cart.some(
          ( item ) => ( item.id === product.id )
        );

        // Si no esta el Producto en el Carrito entonces lo Agregamos:
        if ( !productInCart ) {
          set( { cart: [ ...cart, product ] } );
          return;
        }

        //? 2. Si el producto existe por talla, entonces tengo que incrementar su cantidad.
        // const updateCartProducts = cart.map( item => {
        //   if ( item.id === product.id && item.size === product.size ) {
        //     // Devuelve el producto que cumple con la condicion e indicamos que modifique su cantidad
        //     return { ...item, quantity: item.quantity + product.quantity };
        //   }
        //
        //   return item;
        // } );

        // set( { cart: updateCartProducts } );
        set( { cart } );
      },

      updateProductQuantity: ( product: CartProduct, quantity: number ) => {
        const { cart } = get();

        // Actualiza el carrito de compra cuando hace clicp al button + ó -
        const updateCartProducts = cart.map( item => {
          if ( item.id === product.id && item.stock === product.stock ) {
            return { ...item, quantity: quantity };
          }

          return item;
        } );

        set( { cart: updateCartProducts } );
      },

      removeProduct: ( product: CartProduct ) => {
        const { cart } = get();

        // Indico que me devuelva todo el carrito de compras, pero ecepto el producto que cumpla esta condición.
        const updateCartProducts = cart.filter(
          ( item ) => item.id !== product.id
        );

        set( { cart: updateCartProducts } );
      }

    } ),
    {
      name: 'shopping-cart', // Nombre del LocalStorage.
      // skipHydration: true, //? 1ra Forma de Solucionar el Problema de la Rehidratacion.
    }
  )
);
