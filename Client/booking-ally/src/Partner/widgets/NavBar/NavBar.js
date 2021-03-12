import React, { Component } from 'react';
import Menu from "../Menu/Menu";
import "./navbar.css";
import {Link} from "react-router-dom";

class NavBar extends Component {

    render() {
        return(
            <div className="partner-nav">
                <div>
                    <div className="w3-container">
                        <Menu/>
                        <Link to="/partner">
                            <h1 className=" w3-container w3-cell w3-left partner-title">Booking Ally</h1>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default NavBar;