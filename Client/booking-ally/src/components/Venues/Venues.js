import React from 'react';
import "./venues.css"

const venues = ({venues}) => {

    const venueList = venues.length ? (
        venues.map(venue => {
            return (
                <div className="w3-card-4 w3-center w3-mobile venue" key={venue.id}>
                    <img alt="Venue Profile Image" src={venue.image} style={{width:"100%", height:"500px"}}/>
                    <div className="w3-container w3-center w3-white">
                        <h2 className="blue-text text-darken-3">{venue.name}</h2>
                        <p>{venue.description}</p>
                    </div>
                </div>
            )
        })
    ) : (
        <div className="w3-card w3-center w3-mobile w3-round-large loading" >
            <p className="center loading-text">Loading the venues</p>
        </div>
    );

    return (
        <div className="venues">
            {venueList}
        </div>
    )
}

export default venues;
