import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logout from "../../../Common/widgets/Logout/Logout";
import './menu.css';
import RestClient from "../../../utilities/rest/RestClient";
import CustomerBookings from "../../pages/CustomerBookings/CustomerBookings";
import {Link} from "react-router-dom";

class Menu extends Component {

    getUser = () => {
        if (this.props.user) {
            return this.props.user.username;
        } else {
            return "Account";
        }
    }

    render() {
        let user = this.getUser();
        return (
            <div className="w3-dropdown-hover customer-menu-dropdown w3-round-large" style={{backgroundColor:'transparent'}}>
                {user}
                <div id="content" className="customer-menu w3-animate-opacity w3-dropdown-content w3-card-4 w3-round w3-bar-block w3-border">
                    <a className="w3-bar-item w3-animate-right">{user}</a>
                    <div className="hl"></div>
                    <Link to="/bookings" className="w3-bar-item w3-margin-right w3-round w3-hover-blue w3-animate-right customer-menu-link">Bookings</Link>
                    <a className="w3-margin-right w3-round w3-hover-blue w3-animate-right "><Logout logout={this.props.logout}/></a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => { dispatch({ type:'SET_USER', user:user })},
        logout: () => { dispatch({ type:'LOGOUT' })}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Menu);