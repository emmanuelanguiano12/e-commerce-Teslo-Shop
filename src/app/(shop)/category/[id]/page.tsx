import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string
  }
}

export default function({params}: Props) { //Extraer los params de la url

  const {id} = params

  if(id === 'kids'){
    notFound() //Regresa never
  }

  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}