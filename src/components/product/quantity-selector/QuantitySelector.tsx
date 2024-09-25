'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;

    onQuantityChangued: (value: number) => void
}

export const QuantitySelector = ({quantity, onQuantityChangued}: Props) => {

    const onValueChangue = (value: number) => {
        if(quantity + value < 1) return; //si es negativo hace la resta y si es positivo se suma
        if(quantity + value > 5) return;

        onQuantityChangued(quantity + value); //si es negativo hace la resta y si es positivo se suma
    }

  return (
    <div className="flex items-center">
        <button className={`${quantity <= 1 ? ('opacity-50 cursor-not-allowed') : ('')}`} onClick={() => onValueChangue(-1)}>
            <IoRemoveCircleOutline size={30} />
        </button>

        <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
            {quantity}
        </span>

        <button className={`${quantity >= 5 ? ('opacity-50 cursor-not-allowed') : ('')}`} onClick={() => onValueChangue(+1)}>
            <IoAddCircleOutline size={30} />
        </button>
    </div>
  )
}
