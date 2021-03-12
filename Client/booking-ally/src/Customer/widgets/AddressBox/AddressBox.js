import React from "react";

export default function AddressBox({venue}) {

    return (
        <div className="w3-container w3-row">
            <h4 className="w3-col m2">Address:</h4>
            <div className="w3-col m4">
            <h4>{venue.address1}</h4>
            <h4>{venue.address2}</h4>
            <h4>{venue.town}</h4>
            <h4>{venue.postalCode}</h4>
            </div>
        </div>
    )
}