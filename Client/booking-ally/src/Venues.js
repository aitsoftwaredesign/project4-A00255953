import React from 'react';

const venues = ({venues}) => {

    const venueList = venues.length ? (
        venues.map(venue => {
            return (
                <div className="collection-item" key={venue.id}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h2 className="blue-text text-darken-3">{venue.name}</h2>
                                    <p>{venue.description}</p>
                                </td>
                                <td>
                                    <img src={venue.image} style={{width:"200px", height:"200px", float:"right"}}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
