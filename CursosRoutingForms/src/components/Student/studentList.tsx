import React from "react";
import { StudentContext } from "../../context/StudentContext";
import { CourseContext } from "../../context/CourseContext";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import type { Student } from "../../types/Student";
import Paginator from "../paginator";
import SearchFilter from "../searchFilter";
import Alert from "../alert";
import LoadSpinner from "../loadSpinner";
import { useFilteredStudents } from "../../hooks/Student/useFilteredStudents";

//Listado del estudiantes con opciones para editar, borrar y añadir nuevos estudiantes. Es lo mismo de siempre, una tabla con paginación
//y un filtro de búsqueda. Lo único reseñable es que ahora el filtro de búsqueda se maneja mediante un hook personalizado.
function StudentList() {
    const { deleteStudent, askConfirmationModal, loading, message, type, alertOpen } = React.useContext(StudentContext);
    const { courses } = React.useContext(CourseContext);
    const { filter, setFilter, filteredStudents } = useFilteredStudents("");
    const { currentPage, onPageChange, totalPages, itemsPerPage } = usePagination(filteredStudents, 5);
    //La variable necesaria para navegar entre rutas
    const navigate = useNavigate();
    
    //funcion para obtener el título del curso a partir del ID
    const getCourseTitle = (courseId: number) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.title : "Desconocido";
    };

    //funcion para obtener los estudiantes paginados según la página actual y los items por página
    const getPaginatedStudents = () :Student[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredStudents.slice(startIndex, endIndex);
    }

    //Renderizamos el componente
return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
            <h2 className="fw-bold text-dark m-0">
                <i className="bi bi-people-fill me-2"></i>Lista de Estudiantes
            </h2>
            <button
                className="btn btn-primary d-flex align-items-center shadow-sm"
                onClick={() => navigate("/students/new")}
            >
                <i className="bi bi-plus-lg me-2"></i> Añadir nuevo estudiante
            </button>
        </div>

        {/* Alertas */}
        {message && (
            <div className="mb-4">
                <Alert type={type} message={message} isOpen={alertOpen} />
            </div>
        )}

        {/* Spinner de carga que se muestra cuando loading es true (añadidos estilos para centrar y dar altura mínima) */}
        {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <LoadSpinner message="Cargando estudiantes..." />
            </div>
        ) : (
            <>
                {/* Sección de la barra de busqueda, que recibe el estado y la functionProp para cambiarlo */}
                <div className="card border-0 shadow-sm mb-4 bg-light">
                    <div className="card-body py-3">
                        <label className="form-label fw-semibold text-muted small text-uppercase mb-2">
                            Filtrar estudiantes por curso
                        </label>
                        <SearchFilter filter={filter} setFilter={setFilter} />
                    </div>
                </div>

                {/* Tabla de estudiantes paginados */}
                <div className="card shadow-sm border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle text-center m-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-4 py-3 text-secondary small text-uppercase">Nombre</th>
                                    <th className="py-3 text-secondary small text-uppercase">Correo Electrónico</th>
                                    <th className="py-3 text-secondary small text-uppercase">Curso</th>
                                    <th className="px-4 py-3 text-end text-secondary small text-uppercase">Acciones</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {/* Mapeamos los estudiantes paginados */}
                                {getPaginatedStudents().map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-4 py-3">
                                            <div className="fw-bold text-dark">{student.name}</div>
                                        </td>
                                        <td className="py-3 text-muted">{student.email}</td>
                                        <td className="py-3">
                                            {/* Mostramos el título del curso correspondiente al estudiante */}
                                            <span className="badge rounded-pill bg-info-subtle text-info-emphasis border border-info-subtle px-3">
                                                {getCourseTitle(student.courseId)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <div className="btn-group shadow-sm">
                                                {/* Botones de editar(redirige a la página de edición con el id) y borrar (borra directamente por id) */}
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    title="Editar"
                                                    onClick={() => navigate(`/students/edit/${student.id}`)}
                                                >
                                                    <i className="bi bi-pencil"></i> Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Borrar"
                                                    onClick={() =>
                                                        askConfirmationModal(
                                                            "Borrar estudiante",
                                                            `¿Estás seguro de que deseas borrar a ${student.name}?`,
                                                            () => deleteStudent(student.id!)
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i> Borrar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                    {/* Mensaje cuando no hay estudiantes que mostrar con los filtros actuales */}
                                {getPaginatedStudents().length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-5 text-muted">
                                            No se encontraron estudiantes con los filtros actuales.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* El componente de paginación */}
                <div className="mt-4">
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredStudents.length}
                    />
                </div>
            </>
        )}
    </div>
);
}

export default StudentList;
