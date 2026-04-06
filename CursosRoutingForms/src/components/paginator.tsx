interface PaginatorProps {  
  currentPage: number;  
  totalPages: number;  
  onPageChange: (page: number) => void;  
  itemsPerPage: number;  
  totalItems: number;  
}  

//Componente del paginador, recibe la página actual, el total de páginas, la función para cambiar de página,
// los items por página y el total de items. Si el total de páginas es 1 o menos, no se muestra nada.
// Si hay más de una página, se muestran los botones para navegar entre ellas, con estilos para el botón.
const Paginator: React.FC<PaginatorProps> = ({  
  currentPage,  
  totalPages,  
  onPageChange,  
}: PaginatorProps) => {  
  if (totalPages <= 1) return null;  
  return (  
    <div className="d-flex flex-column align-items-center mt-4 mb-4 gap-3">  
      {/* Grupo de navegación */}  
      <div className="d-flex align-items-center justify-content-center bg-light p-2 rounded-pill shadow-sm border">  
        {/* Botón anterior */}  
        <button  
          className="btn btn-sm btn-light rounded-circle border-0 me-2 shadow-none"  
          onClick={() => onPageChange(currentPage - 1)}  
          disabled={currentPage === 1}  
          title="Anterior"  
        >  
          <span className="h5 mb-0">‹</span>  
        </button> 
        <div className="btn-group mx-2" role="group">  
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (  
            <button  
              key={page}  
              className={`btn btn-sm px-3 fw-semibold ${  
                currentPage === page  
                  ? "btn-primary shadow"  
                  : "btn-light border-0"  
              }`}  
              onClick={() => onPageChange(page)}  
            >  
              {page}  
            </button>  
          ))}  
        </div>    
        {/* Botón siguiente */}
        <button  
          className="btn btn-sm btn-light rounded-circle border-0 ms-2 shadow none"  
          onClick={() => onPageChange(currentPage + 1)}  
          disabled={currentPage === totalPages}  
          title="Siguiente"  
        >  
        <span className="h5 mb-0">›</span>  
        </button>  
      </div>  
    </div>  
  );  
};  
export default Paginator;