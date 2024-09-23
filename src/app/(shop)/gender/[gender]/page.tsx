export const revalidate = 60; //60 Segundos de revalidación

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}

export default async function GenderPage({params, searchParams}: Props) { //Extraer los params de la url

  const {gender} = params
  
  const page = searchParams.page ? parseInt(searchParams.page) : 1; // ?page=1 = http://localhost:3000/gender/men?page=1

  const {products, totalPages} = await getPaginatedProductsWithImages({page, gender: gender as Gender})

  if(products.length === 0) {
    redirect(`/gender/${gender}`)
  }
  

  const labels: Record<string, string> = {
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
      <Title title={`Tienda ${labels[gender]}`} subtitle={`Productos ${labels[gender]}`} className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}