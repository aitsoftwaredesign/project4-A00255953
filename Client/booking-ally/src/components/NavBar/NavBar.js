import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginModal from "../../widgets/Login/LoginModal";
import './navbar.css';

const headers = [
    "https://booking-ally-images.s3.amazonaws.com/pexels-malte-luk-2244746.jpg",
    "https://booking-ally-images.s3.amazonaws.com/pexels-delbeautybox-853427.jpg",
    "https://booking-ally-images.s3.amazonaws.com/pexels-thgusstavo-santana-1813272.jpg"
]

const words = [
    "service",
    "manicure",
    "haircut"
]

class NavBar extends Component {

    state = {
        image : 0,
        currentStyle : {
            backgroundImage: 'url(' + headers[0] + ')',
            backgroundSize: "cover",
            width: "100%",
            height: "800px"
        },
        text : '',
        letter : 0
    };

    headingStyle = {
        "fontSize":"100px",
        "textShadow":"2px 2px 5px #555",
        "marginLeft": '15%'
    }

    async componentDidMount() {
        setInterval(() => {
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
                    height: "800px"
                },
                text : ''
            });

        }, 5000);


        window.setInterval( () => {
            let word = words[this.state.image];
            let newText = word[this.state.letter] ? this.state.text + word[this.state.letter] : this.state.text;
            this.setState( {
                text: newText,
                letter: this.state.letter+1
            });
        }, 250);
    }

    render() {
        const loggedin = this.props.token === '';
        let button = <LoginModal loggedin={loggedin}/>;
        return(
            <nav  style={this.state.currentStyle}>
                <div>
                    <div className="w3-container">
                        <a className=" w3-container w3-cell w3-left title">Booking Ally</a>
                        {button}
                    </div>
                    <div className="w3-container w3-center text w3-cell-row" style={{height:"500px"}}>
                        <div className="w3-cell w3-cell-middle" style={{height:"100%"}} >
                            <h1 className="w3-text-white w3-wide w3-left" style={this.headingStyle}>Book your next {this.state.text}</h1>
                        </div>
                    </div>
                    <div>
                        <form>
                            <input className="w3-input w3-white w3-border w3-round-large" type="text"/>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user

    }
}

export default connect(mapStateToProps)(NavBar);