import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext.js';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">E-Commerce</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    {user ? (
                        <>
                            <li className="nav-item">
                                <span className="nav-link">Welcome, {user.username}</span>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
