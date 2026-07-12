import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { token, logout } = useAuth();

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold fs-3"
                    to="/"
                >
                    📚 BookStore
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <div className="navbar-nav ms-auto align-items-center">

                        <NavLink
                            to="/"
                            className="nav-link"
                        >
                            Home
                        </NavLink>

                        {!token ? (

                            <>

                                <NavLink
                                    to="/login"
                                    className="nav-link"
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className="nav-link"
                                >
                                    Register
                                </NavLink>

                            </>

                        ) : (

                            <>

                                <NavLink
                                    to="/cart"
                                    className="nav-link"
                                >
                                    🛒 Cart
                                </NavLink>

                                <NavLink
                                    to="/orders"
                                    className="nav-link"
                                >
                                    📦 Orders
                                </NavLink>

                                <NavLink
                                    to="/admin"
                                    className="nav-link"
                                >
                                    👨‍💼 Admin
                                </NavLink>

                                <button
                                    className="btn btn-danger ms-3 rounded-pill"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;