import { useState, useMemo, useEffect } from "react"; 

// Hook personalizado para la paginación de una lista de ítems. Usamos <T> para que sea genérico
//  y funcione con cualquier tipo de dato. (estudiante o curso). Este tendra un valor inicial de 5 items por página para mostrar.
export const usePagination = <T>(items: T[], itemsPerPage: number = 5) => {  
  // Estado para la página actual (en la que nos encontremos ahora mismo)
  const [currentPage, setCurrentPage] = useState(1);  
  
  // Cada vez que cambie el número de ítems (items.length), el useEffect reiniciará la página actual a 1
  useEffect(() => {  
    setCurrentPage(1);  
  }, [items.length]);  

  // Calculamos el total de páginas necesarias según el número de ítems y los ítems por página, siempre y cuando los valores cambien con el MEMO.
  const totalPages = useMemo(  () => Math.ceil(items.length / itemsPerPage),  
    [items.length, itemsPerPage],  
  );  


  // Calculamos los ítems que se deben mostrar en la página actual, teniendo en cuenta el índice de inicio y fin,
  // usando MEMO para optimizar el rendimiento y evitar cálculos innecesarios. Retornamos un objeto con toda la info necesaria.
  const paginatedItems = useMemo(() => {  
    const startIndex = (currentPage - 1) * itemsPerPage;  
    return items.slice(startIndex, startIndex + itemsPerPage);  
    }, [items, currentPage, itemsPerPage]);  
  return {  
    currentPage,  
    onPageChange: setCurrentPage,  
    paginatedItems,  
    totalPages,  
    totalItems: items.length,  
    itemsPerPage,  
  };  
}; 