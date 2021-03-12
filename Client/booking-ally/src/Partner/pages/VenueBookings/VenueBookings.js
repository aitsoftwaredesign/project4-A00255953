import React, { Component } from 'react';
import { connect } from 'react-redux';
import './venuebookings.css';
import RestClient from "../../../utilities/rest/RestClient";
import BookingCalendar from "../../widgets/BookingCalendar/BookingCalendar";
import NavBar from "../../widgets/NavBar/NavBar";

class VenueBookings extends Component {

    constructor(props) {
        super(props);

        let venue;
        if(!this.props.selectedVenue) {
            venue = JSON.parse(localStorage.getItem('BASelectedVenue'));
            this.props.selectVenue(venue);
        }
        let restClient = new RestClient();
        restClient.getServicesByVenueId(this.props.selectedVenue ? this.props.selectedVenue.id : venue.id)
            .then((services) => {
                this.props.setServices(services);
                localStorage.setItem('BASelectedVenueServices', JSON.stringify(services));
            });
    }

    render() {
        return(
            <div>
                <NavBar/>
                <div className="w3-container venue-bookings">
                    <div className="w3-container">
                        <div className="w3-container venue-bookings-table">
                            <BookingCalendar/>
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

export default connect(mapStateToProps, mapDispatchToProps)(VenueBookings);