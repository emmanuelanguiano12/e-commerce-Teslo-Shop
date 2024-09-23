
export const generatePaginationNumber = (currentPage: number, totalPages: number) => {

    // Si el numero total de parinas es 7 o menos
    //Vamos a mostrar todas las paginas sin puntos suspensivos
    if(totalPages <= 7){
        return Array.from({length: totalPages}, (_, i) => i+1) //[1,2,3,4,5,6,7]
    }

    //Si la pagina actual está las primeras 3 páginas
    //Mostrar las primeras 3, ... y las ultimas 2
    if(totalPages <= 3){
        return [1,2,3, '...', totalPages-1, totalPages] //[1,2,3, ..., 49, 50]
    }

    //Si la pagina actual está entre las ultimas 3 paginas
    //Mostrar las últimas 2, ... y las uktimas 3
    if(currentPage >= totalPages - 2){
        return [1,2, '...', totalPages - 2, totalPages - 1, totalPages] 
    }

    //Si la pagina actual está en otro lugar medio
    //Mostrar la primera pagina, ..., la pagina actual y vecinos
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ]
}