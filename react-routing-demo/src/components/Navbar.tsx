import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
            <div className="container">
                <span className="navbar-brand">Routing Demo</span>
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/products">Products</NavLink>
                <NavLink className="nav-link" to="/suppliers">Suppliers</NavLink>
            </div>
        </nav>
    )
}

export default NavBar;