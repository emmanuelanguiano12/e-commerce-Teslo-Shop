import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  //Metodos
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const {cart} = get();
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce( (subTotal, item) => (item.quantity * item.price) + subTotal , 0 /* Valor inicial */ )
        const tax = subTotal * 0.15;
        const total = tax + subTotal;

        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)
        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        }
      },
      //Methods
      addProductToCart: (product: CartProduct) => {
        //Obtener el state
        const { cart } = get();

        //Revisar si el prodcuto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        ); //Determina si hay minimo 1 elemento y se sale

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //Se que el producto ya existe en talla, ahora hay que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.id) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts }); //Añadir el carrito nuevo
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {

        const {cart} = get()
        const updatedCartProducts = cart.map(item => {

          if(item.id === product.id && item.size === product.size){
            return {...item, quantity: quantity}
          }
          return item
        })

        set({cart: updatedCartProducts}) //Actualizar el carrito nuevo
      },
      removeProduct: (product: CartProduct) => {
        const {cart} = get()
        const updatedCartProducts = cart.filter( item => item.id !== product.id || item.size !== product.size )

        set({cart: updatedCartProducts}) //Actualizar el carrito nuevo
      },
      
    }),

    {
      name: "shopping-cart",
    }

  )
);
