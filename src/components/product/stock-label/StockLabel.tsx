'use client'

import { getStockBySlug } from "@/actions"
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

interface Props {
    slug: string
}

export const StockLabel = ({slug}: Props) => {
    const [stock, setStock] = useState<number>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        getStock()

    }, []);

    const getStock = async() => {
        //Mandar a llamar el server action
        const inStock = await getStockBySlug(slug)
        
        setStock(inStock)
        setIsLoading(!isLoading)
    }

  return (
    <>
        {
            isLoading
            ? (
                <h1 className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
                    &nbsp;
                </h1>
            ) : (
                <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
                    {
                        isLoading ? 'Cargando Stock...' : `Stock: ${stock}` 
                    }
                </h1>
            )
        }
    </>
  )
}
