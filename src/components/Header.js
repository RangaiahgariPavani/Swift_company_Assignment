import React from "react";
import { NavLink } from "react-router-dom";
import './Header.css';


function Header(){
    return(
        <header className="header">
            <div className="header-title">User App</div>
            <nav className="nav-links">
                <NavLink to="/" className="nav-link">Dashboard</NavLink>
                <NavLink to="/profile" className="nav-link">Profile</NavLink>
            </nav>
        </header>
    );
}

export default Header;