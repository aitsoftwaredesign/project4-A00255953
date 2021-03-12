import React, { Component} from 'react';
import Venues from '../../widgets/Venues/Venues';
import RestClient from "../../../utilities/rest/RestClient";
import { connect } from 'react-redux';
import HomePageHeader from "../../widgets/HomePageHeader/HomePageHeader";

class Home extends Component {

    async componentDidMount() {
        try {
            let restClient = new RestClient();
            let venues = await restClient.getVenues();
            this.props.setVenues(venues);
        } catch (e) {
            console.log("Could not contact venue resource: " + e.toString());
        }

    }

    render() {
        return (
            <div className="center">
                <HomePageHeader/>
                <Venues/>
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