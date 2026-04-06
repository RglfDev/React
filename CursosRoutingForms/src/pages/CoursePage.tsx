import CourseList from "../components/Course/CourseList";

// Página principal de gestión de cursos, es igual que la de Estudiantes pero adaptada a cursos. Simplemente prepara la vista con
//bootstrap y llama al componente CourseList.
const CoursePage = () => {
    return (
        <main className="container mt-4">
            <header className="row mb-4">
                <div className="col">
                    <h1>Gestión Académica</h1>
                    <p className="text-muted">
                        Administra el listado de cursos y sus detalles.
                    </p>
                </div>
            </header>

            <div className="card shadow-sm">
                <div className="card-body">
                    <CourseList />
                </div>
            </div>
        </main>
    );
};

export default CoursePage;