import React, { Component } from 'react';
import { connect } from 'react-redux';
import './venuemenu.css';
import AddressBox from "../../widgets/AddressBox/AddressBox";
import RestClient from "../../../utilities/rest/RestClient";
import Services from "../../../Customer/widgets/Services/Services";
import BookingsTable from "../../widgets/BookingsTable/BookingsTable";
import NavBar from "../../widgets/NavBar/NavBar";

class VenueMenu extends Component {

    state = {
        selectedVenue: this.props.selectedVenue || JSON.parse(localStorage.getItem('BASelectedVenue'))
    }

    async componentDidMount() {
        if(!this.props.selectedVenue) {
            this.props.selectVenue(JSON.parse(localStorage.getItem('BASelectedVenue')));
        }
        let restClient = new RestClient();
        restClient.getServicesByVenueId(this.state.selectedVenue.id)
            .then((services) => {
                this.props.setServices(services);
                localStorage.setItem('BASelectedVenueServices', JSON.stringify(services));
            });

    }

    render() {
        return(
            <div>
                <NavBar/>
                <div className="w3-container venue-menu">
                    <div className="w3-container w3-row">
                        <div className="w3-container w3-col l4">
                            <img className="venue-menu-image" src={this.state.selectedVenue.image}/>
                        </div>
                        <div className="w3-container venue-menu-text w3-col l7">
                            <div className="venue-menu-description">
                                <h3 style={{textAlign:"center"}}>{this.state.selectedVenue.name}</h3>
                                <div className="hl"/>
                                <p>{this.state.selectedVenue.description}</p>
                                <div className="hl"/>
                            </div>
                            <AddressBox venue={this.state.selectedVenue}/>
                        </div>
                    </div>
                    <div className="w3-container w3-row">
                        <div className="w3-container w3-col l4 venue-menu-services">
                            <Services services={this.state.services}/>
                        </div>
                        <div className="w3-container w3-col vl"/>
                        <div className="w3-container w3-col l7 venue-menu-table">
                            <BookingsTable selectedVenue={this.state.selectedVenue}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        selectedVenue: state.selectedVenue,
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectVenue: (venue) => { dispatch({ type:'SELECT_VENUE', venue:venue})},
        setServices: (services) => { dispatch({ type:'SET_SERVICES', services:services})},
        setUser: (user) => { dispatch({ type:'SET_USER', user:user })},
        setType: (accountType) => { dispatch({ type:'SET_TYPE', account:accountType })}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueMenu);