import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./venues.css";

const Venues = ({venues, selectVenue}) => {

    const storeAndSelectVenue = (venue) => {
        selectVenue(venue);
        localStorage.setItem('BASelectedVenue', JSON.stringify(venue));
    }

    const venueList = (venues && venues.length) ? (
            venues.map(venue => {
                return (
                    <div className="venue w3-col s10 m10 l3" key={venue.id} onClick={ () => {storeAndSelectVenue(venue)}}>
                        <Link to={'/venue/' + venue.id} style={{ textDecoration: 'none' }}>
                            <div className="venue-card w3-container w3-card-4 w3-round w3-hover-blue">
                                <img className="venue-card-top w3-hover-grayscale" alt="Venue Profile Image" src={venue.image} style={{width:"100%", height:"30vh"}}/>
                                <div className="venue-card-bottom w3-container w3-center">
                                    <h2 className="">{venue.name}</h2>
                                    <p className="venue-card-desc" >{venue.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
        ) : (
            <div className="w3-center w3-mobile loading w3-container" >
                <div className="w3-cell icon">
                    <i className="fa fa-frown" />
                </div>
                <div className="w3-container w3-cell w3-cell-middle loading-text">
                    <h1 className="w3-container " >Nothing to show... </h1>
                    <p className="w3-container" >That's unfortunate! We have no venues matching your search yet.</p>
                </div>
            </div>
        );

    return (
        <div className="w3-row venues">
            {venueList}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        venues: state.venues,
        selectedVenue: state.selectedVenue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectVenue: (venue) => { dispatch({ type: 'SELECT_VENUE', venue:venue})},
        setServices: (services) => { dispatch({ type:'SET_SERVICES', services:services})},
        setSelectedService: (service) => { dispatch({ type:'SET_SELECTED_SERVICE', service:service})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Venues);
