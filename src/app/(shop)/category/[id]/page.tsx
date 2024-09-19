import { notFound } from "next/navigation";
import { Product, Category } from "@/interfaces"
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";


const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  }
}

export default function({params}: Props) { //Extraer los params de la url

  const {id} = params
  
  const products = seedProducts.filter(product => id === product.gender) //Filtrar los productos por genero

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  // if(id === 'kids'){
  //   notFound() //Regresa never
  // }


  return (
    <>
      <Title title={`Tienda ${labels[id]}`} subtitle={`Productos ${labels[id]}`} className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}