import type { StudentSearchProps } from "../types/Student";

//Componente de búsqueda y filtro de estudiantes, no tiene nada reseñable, simplemente recibe la propiedad del filtro
// y la función para actualizarlo desde sus props definidas en Types. En el onChange, cambia el valor del filtro según lo que escriba el usuario.
function SearchFilter({ filter, setFilter }: StudentSearchProps) {
    return (
        <div className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Introduce una palabra clave para buscar..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchFilter;