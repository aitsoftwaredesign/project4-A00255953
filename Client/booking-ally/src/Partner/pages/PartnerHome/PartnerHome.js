import React, { Component} from 'react';
import { connect } from 'react-redux';
import "./partnerHome.css";
import PartnerLogin from "../PartnerLogin/PartnerLogin";
import RestClient from "../../../utilities/rest/RestClient";
import Venues from "../../widgets/Venues/Venues";
import NavBar from "../../widgets/NavBar/NavBar";
import CreateVenueModal from "../../widgets/CreateVenue/CreateVenueModal";
import AccountTypes from "../../../Resources/AccountTypes";

class PartnerHome extends Component {
    state = {
        isLoading: false,
    };

    async componentDidMount() {
        if(this.props.token !== "" && this.props.user !== {}) {
            await this.getUser();
        }

        await this.getVenues();
    }

    getUser = async () => {
        let restClient = new RestClient();
        let response = await restClient.getUser()
        if(response) {
            this.props.setUser(response[1]);
            this.props.setType(response[0]);
        }
    }

    getVenues = async () => {
        try {
            let restClient = new RestClient();
            let venues = await restClient.getPartnersVenues(this.props.user.id);
            this.props.setPartnerVenues(venues);
            this.setState({
                isLoading: false
            });
        } catch (e) {
            console.log("Could not contact venue resource: " + e.toString());
        }
    }

    render() {
        let loggedIn = (this.props.token !== "" && this.props.accountType === AccountTypes.Partner);
        return (
            loggedIn ?
                <div className="center">
                    <NavBar/>
                    <div className="w3-container w3-cell w3-center" style={{width:"50%"}}>
                        <div className="w3-container" style={{width:"100%"}}>
                            <Venues updateVenues={this.getVenues}/>
                        </div>
                    </div>
                    <div className="w3-container w3-cell">
                        <div className="w3-container" style={{margin:"0 0 0 25%", width:"100%"}}>
                            <CreateVenueModal/>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <PartnerLogin/>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        venues: state.venues,
        user: state.user,
        accountType: state.accountType,
        token: state.token,
        partnerVenues: state.partnerVenues
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => { dispatch({ type:'SET_USER', user:user })},
        setType: (accountType) => { dispatch({ type:'SET_TYPE', account:accountType })},
        setPartnerVenues: (venues) => { dispatch({ type:'SET_PARTNER_VENUES', partnerVenues:venues})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerHome);