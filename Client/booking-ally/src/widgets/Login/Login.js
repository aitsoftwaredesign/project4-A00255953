import React, { Component } from 'react';
import RestClient from "../../utilities/rest/RestClient";
import { connect } from 'react-redux';


class Login extends Component {

    state = {
        username: "",
        password: ""
    };

    restClient = new RestClient();

    onChange= (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    validateUsername= () => {
        if(this.state.username.length <= 3) {
            return "User names must be greater than 3 characters";
        } else if(this.state.password <= 3) {
            return "Passwords must be greater than 3 characters";
        } else return true;
    }

    handleLogin = async (e) => {
        e.preventDefault();
        let creds = {
            username: this.state.username,
            password: this.state.password
        }

        let response = await this.restClient.authenticate(creds);
        if(response.token) {
            //Store the token
            this.props.setToken(response.token);
            localStorage.setItem('token', response.token);
            this.props.setToken(response.token);

            //Store the user
            let user = await this.restClient.getUser(this.state.username);
            this.props.setUser(user);

            this.props.cancel();
        }
    }

    handleRegister = async (e) => {
        e.preventDefault();
        let valid = this.validateUsername();

        if(typeof valid !== "string") {
            let user = {
                username: this.state.username,
                password: this.state.password
            }

            let response = await this.restClient.register(user);
            if (response.username !== '') {
                //Store the user
                this.props.setUser(response);

                //Store the token
                let token = await this.restClient.authenticate(user);
                this.props.setToken(token.token);
                localStorage.setItem('token', token.token);
                this.props.setToken(token.token);

                this.props.cancel();
            }
        } else {
            alert(valid)
        }
    }

    cancel = () => {
        this.props.cancel();
    }

    render() {
        return (
            <div className="form">
                <div className="w3-container" >
                    <h5 className="center-align" >Login</h5>
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
                        <div><p></p></div>
                        <div className="w3-cell-row">
                            <div className="w3-cell w3-left">
                                <button className="w3-text-black" onClick={this.handleLogin}>
                                    Login
                                </button>
                            </div>
                            <div className="w3-cell w3-right">
                                <button className="w3-text-black" onClick={this.handleRegister}>
                                    Register
                                </button>
                            </div>
                        </div>
                        <br/>
                    </form>
                    <div className="w3-center">
                        <button className="w3-text-black" onClick={this.cancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        venues: state.venues,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);