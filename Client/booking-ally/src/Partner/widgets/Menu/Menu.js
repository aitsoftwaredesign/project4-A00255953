import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logout from "../../../Common/widgets/Logout/Logout";
import './menu.css';
import RestClient from "../../../utilities/rest/RestClient";

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
            <div className="w3-margin w3-dropdown-hover w3-text-white w3-round-large w3-right" style={{backgroundColor:'transparent'}}>
                <div className="nav-user">{user}</div>
                <div id="content" className="partner-menu w3-animate-opacity w3-dropdown-content w3-card-4 w3-round w3-bar-block w3-border">
                    <div className="w3-bar-item w3-animate-right menu-user">{user}</div>
                    <div className="hl"/>
                    <div className=" w3-round w3-hover-blue w3-animate-right "><Logout logout={this.props.logout}/></div>
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