import React, {Component} from 'react';
import "./venues.css"
import EditVenueModal from "../EditVenue/EditVenueModal";
import {connect} from "react-redux";

class Venues extends Component {

    state = {
        modalIsOpen: false,
        selectedVenue: null
    }

    editVenue = (venue) => {
        this.setState({
            modalIsOpen: true,
            selectedVenue: venue
        })
    }

    setIsOpen = (open) => {
        this.setState({
            modalIsOpen: open
        })
    }

    createVenueList = () => {
        let venueList;
        if (this.props.partnerVenues && this.props.partnerVenues.length) {
            venueList = this.props.partnerVenues.map(venue => {
                return (
                    <div className="w3-card-4 w3-round w3-center w3-hover-blue w3-mobile partner-venue" key={venue.id}
                         onClick={() => {this.editVenue(venue)
                         }}>
                        <img className="w3-round" alt="Venue Profile Image" src={venue.image} style={{width: "100%"}}/>
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
                    <h3 className="venue-name">Create one now with the button to right</h3>
                </div>
        }

        return venueList;
    }

    render() {
        let venueList = this.createVenueList();
        return (
            <div className="venues">
                {venueList}
                <EditVenueModal modalIsOpen={this.state.modalIsOpen} setIsOpen={this.setIsOpen}
                                venue={this.state.selectedVenue} updateVenues/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        partnerVenues: state.partnerVenues
    }
}

export default connect(mapStateToProps) (Venues);
