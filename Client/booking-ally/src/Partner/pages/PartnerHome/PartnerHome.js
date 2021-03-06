import React, { Component} from 'react';
import { connect } from 'react-redux';
import "./partnerHome.css";
import PartnerLogin from "../PartnerLogin/PartnerLogin";
import RestClient from "../../../utilities/rest/RestClient";
import Venues from "../../widgets/Venues/Venues";
import NavBar from "../../widgets/NavBar/NavBar";
import CreateVenueModal from "../../widgets/CreateVenue/CreateVenueModal";
import EditVenueModal from "../../widgets/EditVenue/EditVenueModal";
import AccountTypes from "../../../Resources/AccountTypes";
import DeleteVenueModal from "../../widgets/DeleteVenue/DeleteVenueModal";

class PartnerHome extends Component {
    state = {
        isLoading: false,
        selectedService: null,
        services: null
    };

    async componentDidMount() {
        await this.getVenues();
    }

    selectVenue = async (venue) => {
        if(venue === this.props.selectedVenue) {
            venue = null;
            this.props.setServices(null);
        } else {
            let restClient = new RestClient();
            let services = await restClient.getServicesByVenueId(venue.id);
            this.props.setServices(services);
        }
        localStorage.setItem('BASelectedVenue', JSON.stringify(venue));
        this.props.setVenue(venue);
    }

    getOptions = () => {
        if(this.props.selectedVenue) {
            return (
                <div className="partner-options">
                    <div className="w3-container" style={{width:"100%", height:"50px", margin:"25px"}}>
                        <EditVenueModal refresh={this.getVenues}/>
                    </div>
                    <div className="w3-container" style={{width:"100%", height:"50px", margin:"25px"}}>
                        <DeleteVenueModal refresh={this.getVenues}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="w3-container partner-options" style={{width:"100%", height:"50px", margin:"25px"}}>
                    <CreateVenueModal refresh={this.getVenues}/>
                </div>
            )
        }
        return null;
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
        let selectedOptions = this.getOptions();

        return (
            <div className="center" >
                <NavBar/>
                <div className="w3-container w3-cell w3-center" style={{width:"50%"}}>
                    <div className="w3-container" style={{width:"100%"}} >
                        <Venues updateVenues={this.getVenues} selectVenue={this.selectVenue}/>
                    </div>
                </div>
                <div className="w3-container w3-cell" style={{width:"50%", height:"100vh", right:'0'}}>
                    <div className="home-menu w3-card-4">
                        {selectedOptions}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedVenue: state.selectedVenue,
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
        setPartnerVenues: (venues) => { dispatch({ type:'SET_PARTNER_VENUES', partnerVenues:venues})},
        setServices: (services) => { dispatch({ type:'SET_SERVICES', services:services})},
        setVenue: (venue) => { dispatch({ type:'SELECT_VENUE', venue:venue})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerHome);