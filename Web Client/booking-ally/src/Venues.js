import React from 'react';

const venues = ({venues}) => {

    console.log(venues);
    const venueList = venues.length ? (
        venues.map(venue => {
            return (
                <div className="collection-item" key={venue.id}>
                    <h2 className="blue-text text-darken-3">{venue.name}</h2>
                    <h3 className="blue-text text-lighten-1">{venue.partner.name}</h3>
                    <p>{venue.description}</p>
                </div>
            )
        })
    ) : (
        <p className="center">Loading the venues</p>
    );

    return (
        <div className="venues collection">
            {venueList}
        </div>
    )
}

export default venues;
