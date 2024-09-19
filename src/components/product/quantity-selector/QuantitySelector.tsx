'use client'

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
}

export const QuantitySelector = ({quantity}: Props) => {

    const [count, setCount] = useState(quantity);

    const onQuantityChangue = (value: number) => {
        if(count + value < 1) return; //si es negativo hace la resta y si es positivo se suma
        if(count + value > 5) return; //si es negativo hace la resta y si es positivo se suma

        setCount(count + value); //si es negativo hace la resta y si es positivo se suma
    }

  return (
    <div className="flex items-center">
        <button className={`${count <= 1 ? ('opacity-50 cursor-not-allowed') : ('')}`} onClick={() => onQuantityChangue(-1)}>
            <IoRemoveCircleOutline size={30} />
        </button>

        <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
            {count}
        </span>

        <button className={`${count >= 5 ? ('opacity-50 cursor-not-allowed') : ('')}`} onClick={() => onQuantityChangue(+1)}>
        <IoAddCircleOutline size={30} />
        </button>
    </div>
  )
}
