import React, { Component} from 'react';
import Venues from '../Venues';
import UploadImage from './UploadImage';
import RestClient from "../utilities/rest/RestClient";

class Home extends Component {
    state = {
        venues: [],
        isLoading: false
    };

    async componentDidMount() {

        this.setState({
            isLoading: true
        });
        let restClient = new RestClient();
        let venues = await restClient.getVenues();
        this.setState({
            venues: venues,
            isLoading: false
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Upload</h1>
                <UploadImage/>
                <h1 className="center blue-text">Venues</h1>
                <Venues venues={this.state.venues}/>
            </div>
        )
    }
}

export default Home;