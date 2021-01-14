import React, { Component } from 'react';
import { connect } from 'react-redux';


class Logout extends Component {

    handleLogout = (e) => {
        e.preventDefault();

        this.props.logout('');

        window.location.reload();
    }


    render() {
        return (
            <div className="w3-round w3-hover-blue" onClick={this.handleLogout}>
                <h3 className="w3-bar-item">Logout</h3>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch({ type:'LOGOUT' })}
    }
}

export default connect(mapDispatchToProps)(Logout);