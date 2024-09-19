import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

export default function({params}: Props) {

  const {slug} = params;
  const product = initialData.products.find(product => slug === product.slug) 

  if(!product) {
   notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">

        {/* Mobile view slideshow */}
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop View slideshow */}
        <ProductSlideShow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />

      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${(product.price).toFixed(2)}</p>

        {/* Selector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[1]}
          availableSizes={product.sizes}
        />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />

        {/* Botón para carrito */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
          <p className="font-light">
            {product.description}
          </p>
      </div>
    </div>
  );
}