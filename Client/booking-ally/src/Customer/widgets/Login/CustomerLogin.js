import React, { Component } from 'react';
import RestClient from "../../../utilities/rest/RestClient";
import { connect } from 'react-redux';
import AccountTypes from "../../../Resources/AccountTypes";

class CustomerLogin extends Component {

    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        message: "",
        register: false
    };

    restClient = new RestClient();

    onChange= (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    confirmPassword = (e) => {
        if(this.state.password !== e.target.value) {
            this.setState({
                message: "Passwords do not match"
            });
        } else {
            this.setState({
                message: ""
            });
        }
    }

    checkWarnings = () => {
        return (this.state.message === "")
    }

    validateUsername= () => {
        if(this.state.username.length <= 3) {
            this.setState({
                message: "User names must be greater than 3 characters"
            });
            return false;
        } else if(this.state.password <= 3) {
            this.setState({
                message: "Passwords must be greater than 3 characters"
            });
            return false;
        } else return true;
    }

    handleLogin = async (e) => {
        e.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password
        }

        let response = await this.restClient.authenticate(credentials, true);
        if(response.token && response.accountType === AccountTypes.Customer) {
            //Store the token
            this.props.setToken(response.token);
            localStorage.setItem('BAtoken', response.token);
            this.props.setToken(response.token);

            //Store the user
            this.props.setUser(response.account);
            this.props.setType(AccountTypes.Customer);

            this.props.cancel();
        } else {
            this.setState({
                message:"Invalid username or password"
            })
        }
    }

    setRegister = (e) => {
        e.preventDefault();

        this.setState({
            register: !this.state.register
        });
    }

    handleRegister = async (e) => {
        e.preventDefault();
        let valid = this.validateUsername() && this.checkWarnings();

        if(valid) {
            let user = {
                id:null,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }

            let response = await this.restClient.registerCustomer(user);
            if (response.username) {
                //Store the user
                this.props.setUser(response);
                this.props.setType(AccountTypes.Customer);

                //Store the token
                let token = await this.restClient.authenticate(user, false);
                this.props.setToken(token.token);
                localStorage.setItem('BAtoken', token.token);
                this.props.setToken(token.token);

                this.props.cancel();
            } else {
                this.setState({
                    message: "Username already exists"
                });
            }
        }
    }

    cancel = () => {
        this.props.cancel();
    }

    render() {
        return (
            (this.state.register) ?
                <div className="modal">
                    <div className="w3-container w3-center" >
                        <h5 className="w3-center" >Register</h5>
                        <form onSubmit={this.handleRegister}>
                            <div className="w3-container w3-center" >
                                <div className="w3-container">
                                    <div className="w3-container row">
                                        <label htmlFor="firstname">Firstname:</label>
                                        <input
                                            className="w3-border w3-round  w3-right"
                                            type="text"
                                            id="firstname"
                                            onChange={this.onChange}
                                            style={{width:"180px"}}
                                        />
                                    </div>
                                    <div className="w3-container row">
                                        <label htmlFor="lastname">Lastname:</label>
                                        <input
                                            className="w3-border w3-round  w3-right"
                                            type="text"
                                            id="lastname"
                                            onChange={this.onChange}
                                            style={{width:"180px"}}
                                        />
                                    </div>
                                </div>
                                <div className="w3-container ">
                                    <div className="w3-container row">
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            className="w3-border w3-round  w3-right"
                                            type="text"
                                            id="username"
                                            onChange={this.onChange}
                                            style={{width:"180px"}}
                                        />
                                    </div>
                                    <div className="w3-container row">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            className="w3-border w3-round w3-right"
                                            type="email"
                                            id="email"
                                            onChange={this.onChange}
                                            style={{width:"180px"}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w3-container">
                                <div className="w3-container w3-cell">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        className="w3-border w3-round"
                                        type="password"
                                        id="password"
                                        onChange={this.onChange}
                                        style={{width:"180px"}}
                                    />
                                </div>
                                <div className="w3-container w3-cell">
                                    <label htmlFor="confirm-password">Confirm Password:</label>
                                    <input
                                        className="w3-border w3-round"
                                        type="password"
                                        id="confirm-password"
                                        onChange={this.confirmPassword}
                                        style={{width:"180px"}}
                                    />
                                </div>
                            </div>
                            <div className="w3-cell-row" style={{marginTop:"20px"}}>
                                <div className="w3-cell" style={{marginLeft:"80%"}}>
                                    <button className="w3-text-black" onClick={this.handleRegister}>
                                        Register
                                    </button>
                                </div>
                                <div className="w3-cell" style={{marginRight:"80%"}} >
                                    <button className="w3-text-black" onClick={this.cancel}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <br/>
                        </form>
                        <h5 className="message w3-center">{this.state.message}</h5>
                        <div className="w3-center">
                            <a href="" className="w3-text-blue" onClick={this.setRegister}>
                                Already a User? Login..
                            </a>
                        </div>
                    </div>
                </div>
            :
                <div className="modal">
                    <div className="w3-container w3-center" >
                        <h5 className="w3-center" >Login</h5>
                        <form onSubmit={this.handleLogin}>
                            <div className="row">
                                <label htmlFor="username">Username:</label>
                                <input
                                    className="w3-border w3-round"
                                    type="text"
                                    id="username"
                                    onChange={this.onChange}
                                    style={{width:"180px"}}
                                />
                            </div>
                            <div className="row">
                                <label htmlFor="password">Password:</label>
                                <input
                                    className="w3-border w3-round"
                                    type="password"
                                    id="password"
                                    onChange={this.onChange}
                                    style={{width:"180px"}}
                                />
                            </div>
                            <div className="w3-cell-row" style={{marginTop:"20px"}}>
                                <div className="w3-cell w3-left">
                                    <button className="w3-text-black" onClick={this.handleLogin}>
                                        Login
                                    </button>
                                </div>
                                <div className="w3-cell w3-right">
                                    <button className="w3-text-black" onClick={this.cancel}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <br/>
                        </form>
                        <h5 className="message w3-center">{this.state.message}</h5>
                        <div className="w3-center">
                            <a href="" className="w3-text-blue" onClick={this.setRegister}>
                                Not a User? Sign up..
                            </a>
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
        setUser: (user) => { dispatch({ type:'SET_USER', user:user })},
        setType: (type) => { dispatch({ type:'SET_TYPE', account:type })}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLogin);