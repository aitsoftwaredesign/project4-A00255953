import React, {Component} from 'react';
import "./venues.css";
import {connect} from "react-redux";
import Services from "../Services/Services";

class Venues extends Component {

    state = {
        modalIsOpen: false,
        services: null,
        selectedService: null
    }

    setIsOpen = (open) => {
        this.setState({
            modalIsOpen: open
        })
    }

    selectVenue = async (venue) => {
        this.props.selectVenue(venue);
    }

    createVenueList = () => {
        let venueList;
        if (this.props.partnerVenues && this.props.partnerVenues.length) {
            venueList = this.props.partnerVenues.map(venue => {
                return (
                    (venue === this.props.selectedVenue) ?
                        <div className="w3-container partner-venue selected-venue">
                            <div className="w3-container w3-cell w3-card-4 w3-round selected-venue-card" key={venue.id} onClick={async () => {await this.selectVenue(venue)}}>
                                <img className="w3-round w3-greyscale-max selected-venue-image" alt="Venue Profile" src={venue.image}/>
                                <div className="w3-container w3-center">
                                    <h2 className="venue-name">{venue.name}</h2>
                                    <p className="desc">{venue.description}</p>
                                </div>
                            </div>
                            <div className="w3-container w3-cell">
                                <Services venue={venue}/>
                            </div>
                        </div>
                        :
                        <div className="w3-card-4 w3-round w3-center w3-hover-blue w3-mobile partner-venue" key={venue.id}
                             onClick={async () => { await this.selectVenue(venue)
                             }}>
                            <img className="w3-round w3-hover-grayscale" alt="Venue Profile" src={venue.image} style={{width: "100%", height:"500px"}}/>
                            <div className="w3-container w3-center">
                                <h2 className="venue-name">{venue.name}</h2>
                                <p className="desc">{venue.description}</p>
                            </div>
                        </div>
                )
            });
        } else {
            venueList =
                <div className="w3-card-4 w3-round w3-mobile partner-venue w3-container w3-cell w3-cell-middle"
                     style={{width: "33vw", height: "33vh"}}>
                    <h1 className="venue-name">You have no venues yet..</h1>
                    <h3 className="venue-name">Create one now with the button to the right</h3>
                </div>
        }

        return venueList;
    }

    render() {
        let venueList = this.createVenueList();
        return (
            <div className="venues">
                {venueList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        partnerVenues: state.partnerVenues,
        services: state.services
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setServices: (services) => { dispatch({ type:'SET_SERVICES', services:services})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Venues);
