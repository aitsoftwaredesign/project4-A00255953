import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerLoginModal from "../Login/CustomerLoginModal";
import headers from "../../../Resources/HeaderImages";
import './homepageheader.css';
import AccountTypes from "../../../Resources/AccountTypes";
import SearchBar from "../SearchBar/SearchBar";

const words = [
    "service",
    "manicure",
    "haircut"
]

class HomePageHeader extends Component {

    state = {
        image : 0,
        currentStyle : {
            backgroundImage: 'url(' + headers[0] + ')',
            backgroundSize: "cover",
            width: "100%"
        },
        text : '',
        letter : 0
    };

    async componentDidMount() {
        setInterval(this.updateBackgroundImage, 5000);
        setInterval( this.updateText, 250);
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
                width: "100%"
            },
            text : ''
        });

    }

    updateText = () => {
        let word = words[this.state.image];
        let newText = word[this.state.letter] ? this.state.text + word[this.state.letter] : this.state.text;
        this.setState( {
            text: newText,
            letter: this.state.letter+1
        });
    }

    render() {
        const loggedin = (this.props.token !== '' && this.props.accountType === AccountTypes.Customer);
        let loginModal = <CustomerLoginModal loggedin={loggedin}/>;
        return(
            <div className="nav sticky" style={this.state.currentStyle}>
                <div>
                    <div className="w3-container">
                        <div className="home-page-header-login">
                            {loginModal}
                        </div>

                        <h1 className=" w3-container w3-cell w3-left title">Booking Ally</h1>
                    </div>
                    <div className="w3-center">
                        <div className="w3-container text w3-cell-row header" style={{height:"200px"}}>
                            <div className="w3-cell w3-cell-middle" style={{height:"100%"}} >
                                <h2 className="w3-text-white text" >Book your next {this.state.text}</h2>
                            </div>
                        </div>
                        <SearchBar/>
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

export default connect(mapStateToProps)(HomePageHeader);