import React, { Component } from 'react';
import { NavLink, Link} from "react-router-dom";

class NavBar extends Component {
    render() {
        return(
            <nav className="nav-wrapper blue darken-4">
                <div className="container">
                    <a className="brand-logo">Booking Ally</a>
                    <ul className="right">
                        <li><Link to="/">Venues</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;