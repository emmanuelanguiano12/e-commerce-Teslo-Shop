import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem";

interface Props {
    products: Product[]; //Arreglo de productos
}

export const ProductGrid = ({products}: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
        {
            products.map(product => (
                <ProductGridItem product={product} key={product.slug} />
            ))
        }
    </div>
  )
}
