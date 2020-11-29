import React, { Component } from 'react';
import RestClient from "../../utilities/rest/RestClient";
import { connect } from 'react-redux';


class Signup extends Component {

    state = {
        username: "",
        password: ""
    };

    restClient = new RestClient();

    onChange= (e) => {
        this.setState({
            [e.target.id]:e.target.value
        });
    }



    render() {
        return (
            <div>
                <div className="collection-item" >
                    <h5 className="center-align" >Sign Up</h5>
                    <form onSubmit={this.handleLogin}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                onChange={this.onChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={this.onChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Re-Type Password:</label>
                            <input
                                type="password"
                                id="re-typed-password"
                                onChange={this.onChange}
                            />
                        </div>
                        <div>
                            <table>
                                <tbody className="center-align">
                                <tr>
                                    <td className="center-align">
                                        <button onClick={this.handleLogin}>
                                            Login
                                        </button>
                                    </td>
                                    <td className="center-align">
                                        <button onClick={this.props.cancel}>
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => { dispatch({ type:'SET_TOKEN', token:token })},
        setUser: (user) => { dispatch({ type:'SET_USER', user:user })}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);