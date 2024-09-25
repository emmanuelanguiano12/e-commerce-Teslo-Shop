import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[]

    onSizeChangued: (size: Size) => void
}

export const SizeSelector = ({selectedSize, availableSizes, onSizeChangued}: Props) => {

  return (
    <div className="my-5">
        <h3 className="font-bold m-4">Tallas disponibles</h3>

        <div className="flex">
            {
                availableSizes.map(size => (
                    <button 
                        key={size} 
                        onClick={() => onSizeChangued(size)}
                        className={
                            clsx(
                                "mx-2 hover:underline text-lg",
                                {
                                    'underline': size === selectedSize
                                }
                            )
                        }
                    >
                        {size}
                    </button>
                ))
            }
        </div>
    </div>
  )
}
