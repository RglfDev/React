import { NavLink } from "react-router-dom"

//Barra de navegacion superior con enlaces a las diferentes secciones de la aplicación. utiliza el Routing de React Router
// para navegar entre las diferentes url dependiendo de la ruta seleccionada.
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
            <div className="container-fluid">
                <span className="navbar-brand text-primary">Gestor de cursos</span>
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink to="/" className="nav-link">Inicio</NavLink>
                <NavLink to="/courses" className="nav-link">Cursos</NavLink>
                    <NavLink to="/students" className="nav-link">Estudiantes</NavLink>
                </div>
            </div>
        </nav>
                
    )
}

export default NavBar;