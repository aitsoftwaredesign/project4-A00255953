import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from "../Menu/Menu";
import "./navbar.css";

class NavBar extends Component {

    render() {
        return(
            <div className="nav">
                <div>
                    <div className="w3-container">
                        <Menu/>
                        <h1 className=" w3-container w3-cell w3-left title">Booking Ally</h1>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user

    }
}

export default connect(mapStateToProps)(NavBar);