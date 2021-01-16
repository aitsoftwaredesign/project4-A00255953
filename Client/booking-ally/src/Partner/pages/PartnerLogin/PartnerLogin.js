import React, { Component} from 'react';
import { connect } from 'react-redux';
import headers from "../../../Resources/HeaderImages";
import "./partnerLogin.css"
import RestClient from "../../../utilities/rest/RestClient";
import AccountTypes from "../../../Resources/AccountTypes";

class PartnerLogin extends Component {

    state = {
        image: 0,
        currentStyle: {
            backgroundImage: 'url(' + headers[0] + ')',
            backgroundSize: "cover",
            width: "100%"
        },
        message: "",
        register: false
    }

    async componentDidMount() {
        setInterval(this.updateBackgroundImage, 5000);
    }

    updateBackgroundImage = () => {
        if (this.state.image < headers.length - 1) {
            this.setState({
                image: this.state.image + 1,
                letter: 0
            });
        } else {
            this.setState({
                image: 0,
                letter: 0
            });
        }

        let image = headers[this.state.image];
        this.setState({
            currentStyle: {
                backgroundImage: 'url(' + image + ')',
                backgroundSize: "cover",
                width: "100%",
                height: window.innerHeight
            },
            text : ''
        });
    }

    restClient = new RestClient();

    onChange= (e) => {
        let val = e.target.value;
        val = val.trim();
        this.setState({
            [e.target.id]: val
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

    setRegister = (e) => {
        e.preventDefault();

        this.setState({
            register: !this.state.register
        });
    }

    handleLogin = async (e) => {
        e.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password
        }

        let response = await this.restClient.authenticate(credentials, true);
        if(response.token && response.accountType === AccountTypes.Partner) {
            //Store the token
            this.props.setToken(response.token);
            localStorage.setItem('BAtoken', response.token);

            //Store the user
            this.props.setUser(response.account);
            this.props.setType(response.accountType);

            window.location.reload();
        }
    }

    handleRegister = async (e) => {
        e.preventDefault();
        let valid = this.validateUsername() && this.checkWarnings();

        if (valid) {
            let user = {
                id: null,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }

            let response = await this.restClient.registerPartner(user);
            if (response.username) {
                //Store the user
                this.props.setUser(response);

                //Store the token
                let token = await this.restClient.authenticate(user, false);
                this.props.setToken(token.token);
                localStorage.setItem('BAtoken', token.token);
                this.props.setToken(token.token);

                //Register the account type
                this.props.setType(response.accountType);

                this.props.cancel();
            } else {
                this.setState({
                    message: "Username already exists"
                });
            }
        }
    }

    render() {
        return (
            (this.state.register) ?
                <div className="background" style={this.state.currentStyle}>
                    <div className="w3-card panel" style={{width:"800px"}}>
                        <div className="w3-container w3-center" >
                            <form className="registerForm" onSubmit={this.handleLogin}>
                            <h1 className="w3-center" >Register</h1>
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
                            <div className="w3-container w3-center">
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
                            <h5 className="message w3-center">{this.state.message}</h5>
                            <div className="w3-container w3-center">
                                <div className="buttons w3-center">
                                    <button className="w3-text-black" onClick={this.handleRegister} style={{width:"150px"}}>
                                        Register
                                    </button>
                                </div>
                                <div className="w3-center">
                                    <p className="w3-text-black" onClick={this.setRegister}>
                                        Already a User? Login..
                                    </p>
                                </div>
                            </div>
                            <br/>
                        </form>

                    </div>
                </div>
                </div>
                :
            <div className="background" style={this.state.currentStyle}>
                <div className="w3-card panel">
                    <div className="w3-container w3-center" >
                        <form className="loginForm" onSubmit={this.handleLogin}>
                            <h1 className="w3-center" >Login</h1>
                            <div className="w3-cell">
                                <div className="labelDiv">
                                    <label htmlFor="username">Username:</label>
                                </div>
                                <div className="labelDiv">
                                    <label htmlFor="password">Password:</label>
                                </div>
                            </div>
                            <div className="w3-cell">
                                <input
                                    className="inputs"
                                    type="text"
                                    id="username"
                                    onChange={this.onChange}
                                />
                                <input
                                    className="inputs"
                                    type="password"
                                    id="password"
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="w3-container w3-center">
                                <div className="buttons w3-center">
                                    <button className="w3-text-black" onClick={this.handleLogin} style={{width:"150px"}}>
                                        Login
                                    </button>
                                </div>
                                <div className="buttons w3-center">
                                    <a href="" className="w3-text-black" onClick={this.setRegister}>
                                        Not a User? Sign up..
                                    </a>
                                </div>
                            </div>
                            <br/>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(PartnerLogin);