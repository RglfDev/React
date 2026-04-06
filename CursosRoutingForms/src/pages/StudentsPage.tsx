
import StudentList from "../components/Student/studentList";


//Esta pagina simplemente renderiza el componente StudentList dentro de una estructura de pagina con encabezado y seccion principal,
//  en la cual mostramos el componente de la tabla de estudiantes. No tiene mas...es sencill y directa.
const StudentPage = () => {
    return (
        <main className="container mt-4">
            <header className="row mb-4">
                <div className="col">
                    <h1>Gestión Académica</h1>
                    <p className="text-muted">
                        Administra el listado de alumnos y sus inscripciones a cursos.
                    </p>
                </div>
            </header>

            <div className="card shadow-sm">
                <div className="card-body">
                    <StudentList />
                </div>
            </div>
        </main>
    );
};

export default StudentPage;