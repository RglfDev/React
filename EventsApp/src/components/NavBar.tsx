import { NavLink } from "react-router-dom"

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
            <div className="container">
                <span className="navar-brand">Eventos y Participantes</span>
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/events">Events</NavLink>
                <NavLink className="nav-link" to="/participants">Participants</NavLink>

            </div>
        </nav>
    )
}

export default NavBar;