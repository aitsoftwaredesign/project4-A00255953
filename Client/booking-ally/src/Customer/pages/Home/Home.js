import React, { Component} from 'react';
import Venues from '../../widgets/Venues/Venues';
import RestClient from "../../../utilities/rest/RestClient";
import { connect } from 'react-redux';
import NavBar from "../../widgets/NavBar/NavBar";
import styles from "./home.css"


class Home extends Component {
    state = {
        isLoading: false,
    };

    async componentDidMount() {
        this.setState({
            isLoading: true
        });

        try {
            let restClient = new RestClient();
            let venues = await restClient.getVenues();
            this.props.setVenues(venues);
            this.setState({
                isLoading: false
            });
        } catch (e) {
            console.log("Could not contact venue resource: " + e.toString());
        }

    }

    render() {
        return (
            <div className="center">
                <NavBar/>
                <Venues venues={this.props.venues}/>
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
        setVenues: (venues) => { dispatch({ type: 'SET_VENUES', venues:venues})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);