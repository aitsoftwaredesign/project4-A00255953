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
            <div onClick={this.handleLogout}>
                Logout - {this.props.user.username}
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

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch({ type:'LOGOUT' })}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);