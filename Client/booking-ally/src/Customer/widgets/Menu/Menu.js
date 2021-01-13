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
            this.setUser().then();
            return "Account";
        }
    }

    setUser = async () => {
        let restClient = new RestClient();
        let response = await restClient.getUser();
        if(response != null) this.props.setUser(response);
    }

    render() {
        let user = this.getUser();
        return (
            <div className="w3-dropdown-hover w3-text-white w3-round-large" style={{backgroundColor:'transparent'}}>
                {user}
                <div id="content" className="dropdown w3-dropdown-content w3-card-4 w3-round w3-bar-block w3-border">
                    <a className="w3-bar-item w3-animate-right">{user}</a>
                    <div className="hl"></div>
                    <a className="w3-margin-right w3-round w3-hover-blue w3-animate-right "><Logout/></a>
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