import React from 'react';
import "./venues.css"

const venues = ({venues}) => {

    const venueList = (venues && venues.length) ? (
        venues.map(venue => {
            return (
                <div className="venue w3-col s10 m10 l3" key={venue.id}>
                    <div className="venue-card w3-container w3-card-4 w3-round w3-hover-blue">
                        <img className="venue-card-top w3-hover-grayscale" alt="Venue Profile Image" src={venue.image} style={{width:"100%", height:"30vh"}}/>
                        <div className="venue-card-bottom w3-container w3-center">
                            <h2 className="blue-text text-darken-3">{venue.name}</h2>
                            <p>{venue.description}</p>
                        </div>
                    </div>
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

export default venues;
