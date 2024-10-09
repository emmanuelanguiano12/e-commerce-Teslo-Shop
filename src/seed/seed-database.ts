import { initialData } from "./seed";
import prisma from '../lib/prisma'

async function main() {

    // 1. Borrar regsitros previos
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany()
    
    const {categories, products, users} = initialData //Traer las categorias, productos y usuarops

    //Users
    await prisma.user.createMany({
        data: users
    }); //Crear los usuarios conforme el initialData (seed)

    // Categorias
    const categoryData = categories.map(category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoryData //Agregar a la bd las categorias []
    })

    const categoriesDB = await prisma.category.findMany();
    const categoriasMap = categoriesDB.reduce((map, category) => { //reduce permite acumular los cambios (parecido a un foreach)
        map[(category.name.toLowerCase())] = category.id; //Agregar el categoryName con categoryID
        
        return map
    }, {} as Record<string, string>); //<string=shirt, string=categoryID>

    // Productos
    products.forEach(async(product) => {
        const {type, images, ...rest} = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriasMap[type]
            }
        })

        //Imagenes
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });

    })


    console.log("Seed ejecutado correctamente")
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    
    main();
})();