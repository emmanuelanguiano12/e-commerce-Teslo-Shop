export const revalidate = 60; //60 Segundos de revalidación

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string //Obtener la page de la url
  }
}

export default async function ShopPage({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {products, totalPages} = await getPaginatedProductsWithImages({page})

  if(products.length === 0) {
    redirect('/')
  }
  

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
