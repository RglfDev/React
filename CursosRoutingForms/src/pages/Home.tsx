import { Link } from "react-router-dom";

//Pagina principal de entrada a la app. Aqui encontramos dos botones grandes que nos llevan a las paginas de gestion de cursos
//  y de estudiantes. Se utiliza un Link para redirigir a las otras paginas a traves de Routing.

const Home = () => {
    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-4 font-weight-bold mb-4">
                        Bienvenido a la Plataforma Educativa
                    </h1>
                    
                    <p className="lead text-muted mb-5">
                        Tu herramienta centralizada para la gestión académica. 
                        Optimiza el seguimiento de tus alumnos y organiza tu catálogo de formación 
                        de forma sencilla y rápida. ¡Comienza ahora mismo!
                    </p>

                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/courses" className="btn btn-primary btn-lg px-4 shadow">
                            <i className="bi bi-journal-bookmark-fill me-2"></i>
                            Gestionar Cursos
                        </Link>
                        
                        <Link to="/students" className="btn btn-outline-dark btn-lg px-4 shadow">
                            <i className="bi bi-people-fill me-2"></i>
                            Ver Estudiantes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;