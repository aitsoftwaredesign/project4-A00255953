import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./navbar.css";
import CustomerLoginModal from "../Login/CustomerLoginModal";
import AccountTypes from "../../../Resources/AccountTypes";

class NavBar extends Component {

    componentDidMount() {
        if(localStorage.getItem('BAToken') !== null ){

        }
    }

    render() {
        const loggedIn = (this.props.token !== '' && this.props.accountType === AccountTypes.Customer);
        return(
            <div className="nav-bar">
                <div>
                    <div className="w3-container">
                        <div className="customer-navbar-login">
                            <CustomerLoginModal loggedin={loggedIn}/>
                        </div>

                        <Link to="/">
                            <h1 className=" w3-container w3-cell w3-left nav-bar-title">Booking Ally</h1>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        accountType: state.accountType
    }
}

export default connect(mapStateToProps)(NavBar);