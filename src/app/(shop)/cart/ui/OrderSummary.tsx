'use client'

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from '../../../../utils/currencyFormat';

export const OrderSummary = () => {
    const [loader, setLoader] = useState(false);
    const {itemsInCart, subTotal, tax, total} = useCartStore(state => state.getSummaryInformation()) //Mandarla a llamar para extrar su return

    useEffect(() => {
        setLoader(true)
    }, []);

    if(!loader) return <h1>Cargando...</h1>

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{ itemsInCart === 1 ? '1 Articulo' : `${itemsInCart} Articulos` }</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos 15%</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total</span>
      <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
    </div>
  );
};
