import React from "react";
import { CourseContext } from "../../context/CourseContext";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/StudentContext";
import { useFilteredCourses } from "../../hooks/Course/useFilteredCourse";
import SearchFilter from "../searchFilter";
import { usePagination } from "../../hooks/usePagination";
import Paginator from "../paginator";
import Alert from "../alert";
import LoadSpinner from "../loadSpinner";

//Listado de cursos con opciones para editar, borrar y añadir nuevos cursos. Similar al de estudiantes, con tabla, paginación
//y filtro de búsqueda. El filtro de búsqueda se maneja mediante un hook personalizado. Como es casi identica al de estudiantes,
//los comentarios se centran en las diferencias y aspectos reseñables.
//Añadido el extra para mostrar los alumnos de un curso en concreto al pulsar un botón.
function CourseList() {
    const {courses,deleteCourse, askConfirmationModal, loading, message, type, alertOpen, countStudents } = React.useContext(CourseContext);
    const navigate = useNavigate();
    const { students } = React.useContext(StudentContext);
    const { filter, setFilter, filteredCourses } = useFilteredCourses("");
    const { currentPage, onPageChange, totalPages, itemsPerPage } = usePagination(filteredCourses, 5);
    const [selectedCourseId, setSelectedCourseId] = React.useState<number | null>(null);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc' | 'none'>('none');

// Función para mostrar u ocultar la lista de estudiantes inscritos en un curso
const handleShowStudents = (courseId: number) => {
    // Si ya está abierto el mismo, lo cerramos (toggle)
    if (selectedCourseId === courseId) {
        setSelectedCourseId(null);
    } else {
        setSelectedCourseId(courseId);
    }
    };
    
// Función para obtener los cursos ordenados y paginados según el estado actual (añadido extra de ordenación)
    const getSortedAndPaginatedCourses = () => {
    let items = [...filteredCourses]; // Copiamos la lista filtrada

    // Si hay un orden seleccionado, ordenamos
    if (sortOrder !== 'none') {
        items.sort((a, b) => {
            return sortOrder === 'asc' 
                ? a.title.localeCompare(b.title) 
                : b.title.localeCompare(a.title);
        });
    }

    // Paginamos el resultado
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
};

    // Obtenemos el curso seleccionado para mostrar su título en la sección de estudiantes inscritos
    //Por falta de tiempo se maneja desde aqui, pero lo suyo seria manejarlo desde el contexto.
    const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
            <h2 className="fw-bold text-dark m-0">Lista de Cursos</h2>
            <button
                className="btn btn-primary shadow-sm"
                onClick={() => navigate("/courses/new")}
            >
                Añadir nuevo curso
            </button>
        </div>

        {/* Alertas */}
        {message && <Alert type={type} message={message} isOpen={alertOpen} />}

        {loading ? (
            <div className="text-center py-5">
                <LoadSpinner message="Cargando cursos..." />
            </div>
        ) : (
            <>
                <div className="card border-0 shadow-sm mb-4 bg-light">
                    <div className="card-body py-3">
                        <p className="form-label fw-semibold text-muted small text-uppercase mb-2">Filtrar cursos por instructor:</p>
                        <SearchFilter filter={filter} setFilter={setFilter} />
                    </div>
                </div>

                <div className="card shadow-sm border-0 overflow-hidden">
                    <table className="table table-hover align-middle text-center m-0">
                        <thead className="table-light">
                                  <tr>
                                      {/* Añadido extra: Columna de título con opción de ordenación que,
                                      mediante el estado sortOrder, cambia el orden entre ascendente, descendente y ninguno al hacer click en el encabezado
                                      */}
                                <th 
                                    className={`px-4 py-3 small text-uppercase fw-bold border-start border-end ${sortOrder !== 'none' ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary'}`}
                                        role="button"
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    >
                                    <div className="d-flex align-items-center justify-content-center">
                                        Titulo
                                    <div className="ms-2">
                                    {sortOrder === 'asc' && <i className="bi bi-sort-alpha-down fs-5"></i>}
                                    {sortOrder === 'desc' && <i className="bi bi-sort-alpha-up-alt fs-5"></i>}
                                    {sortOrder === 'none' && <i className="bi bi-arrow-down-up opacity-25"></i>}
                                    </div>
                                </div>
                                </th>
                                <th className="py-3 text-secondary small text-uppercase">Instructor</th>
                                <th className="py-3 text-secondary small text-uppercase">Capacidad</th>
                                <th className="py-3 text-secondary small text-uppercase">Alumnos inscritos</th>
                                <th className="px-4 py-3 text-end text-secondary small text-uppercase"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {getSortedAndPaginatedCourses().map((course) => (
                                <tr key={course.id}>
                                    <td className="px-4 py-3 fw-bold">{course.title}</td>
                                    <td className="py-3 text-muted">{course.instructor}</td>
                                    <td className="py-3">{course.capacity}</td>
                                    <td className="py-3">
                                        {/* Mostramos el número de estudiantes inscritos en el curso usando la función del contexto */}
                                        <span className="badge rounded-pill bg-secondary px-3">
                                            {countStudents(course.id!, students)}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-info me-2"
                                            onClick={() => handleShowStudents(course.id!)}>
                                            <i className="bi bi-people-fill"></i> {selectedCourseId === course.id ? 'Ocultar' : 'Alumnos'}
                                            
                                        </button>
                                        
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => navigate(`/courses/edit/${course.id}`)}
                                        >
                                            Editar
                                        </button>
                                        {/* Botón para borrar curso con confirmación, el cual llama al metodo que lanza la modal
                                        y le pasa los parametros necesarios para que los muestre en la modal, junto con la funcion de
                                        borrado */}
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                askConfirmationModal(
                                                    "Borrar curso",
                                                    `¿Estás seguro de que deseas borrar ${course.title}?`,
                                                    () => deleteCourse(course.id!, students)
                                                )
                                            }
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                          </table>
                          
                      </div>

                      {/* Paginador */}
                <div className="mt-4">
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredCourses.length}
                    />
                      </div>
                      {/* Sección para mostrar los estudiantes inscritos en el curso seleccionado */}
                      {selectedCourseId && (
                        <div className="card shadow-sm border-0 mt-4 bg-light animate__animated animate__fadeIn">
                            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                                <h5 className="m-0">
                                    Alumnos inscritos en "{selectedCourse?.title}"
                                </h5>
                                <button className="btn-close btn-close-white" onClick={() => setSelectedCourseId(null)}></button>
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush">
                                    {students.filter(s => s.courseId === selectedCourseId).length > 0 ? (
                                        students
                                            .filter(s => s.courseId === selectedCourseId)
                                            .map(student => (
                                                <li key={student.id} className="list-group-item bg-transparent d-flex justify-content-between px-4 py-3">
                                                    <span className="fw-bold">{student.name}</span>
                                                    <span className="text-muted small">{student.email}</span>
                                                </li>
                                            ))
                                    ) : (
                                        <li className="list-group-item bg-transparent text-center py-4 text-muted">No hay alumnos en este curso.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                
            </>
        )}
    </div>
);
}

export default CourseList;
