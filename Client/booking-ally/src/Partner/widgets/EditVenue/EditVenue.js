import React, { Component} from 'react';
import RestClient from "../../../utilities/rest/RestClient";
import types from "../../../Resources/VenueTypes";
import Uploadimage from "../../../utilities/UploadImage/UploadImage";
import {connect} from "react-redux";

class EditVenue extends Component {

    state = {
        venue: this.props.venue
    }

    restClient = new RestClient();

    onChange= (e) => {
        let venue = this.state.venue;
        venue[e.target.id] = e.target.value;
        this.setState({
            venue: venue
        });
    }

    setImageUrl = (url) => {
        let venue = this.state.venue;
        venue.image = url;
        this.setState({
            venue: venue
        });
    }

    updateVenue = async (e) => {
        e.preventDefault();
        let restClient = new RestClient();
        let response = await restClient.createVenue(this.state.venue);
        if(response.name) {
            alert("Venue Updated");
            this.props.cancel();
        } else {
            alert(response.message);
        }
    }

    typesDropdown = () => {
        let options = types.map(type => {
            return (
                (this.state.venue.venueType.toLowerCase() === type.toLowerCase()) ?
                    <option value={type} selected="selected">{type}</option>
                :
                    <option value={type}>{type}</option>
            )
        });

        return (
            <select className="input"  id="venueType" onChange={this.onChange}>
                {options}
            </select>
        );
    }

    render() {
        let venueTypes = this.typesDropdown();

        return (
            <div className="modal">
                <div className="w3-container w3-center" >
                    <form className="venueForm" onSubmit={this.handleLogin}>
                        <div>
                            <h1 className="formTitle">Edit your venue</h1>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="name">Venue Name:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <input
                                    className="input"
                                    type="text"
                                    id="name"
                                    onChange={this.onChange}
                                    value={this.state.venue.name}
                                />
                            </div>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="type">Type:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                {venueTypes}
                            </div>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="image">Image:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <Uploadimage setImage={this.setImageUrl} initialImage={this.state.venue.image}  partner={this.props.user.id}/>
                            </div>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="description">Description:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <textarea
                                    className="input"
                                    type="text"
                                    id="description"
                                    style={{height:"100px"}}
                                    onChange={this.onChange}
                                    value={this.state.venue.description}
                                />
                            </div>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="address1">Address 1:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <input
                                    className="input"
                                    type="text"
                                    id="address1"
                                    onChange={this.onChange}
                                    value={this.state.venue.address1}
                                />
                            </div>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="address2">Address 2:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <input
                                    className="input"
                                    type="text"
                                    id="address2"
                                    onChange={this.onChange}
                                    value={this.state.venue.address2}
                                />
                            </div>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="town">Town:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <input
                                    className="input"
                                    type="text"
                                    id="town"
                                    onChange={this.onChange}
                                    value={this.state.venue.town}
                                />
                            </div>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="postcode">Postcode:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <input
                                    className="input"
                                    type="text"
                                    id="postcode"
                                    onChange={this.onChange}
                                    value={this.state.venue.postalCode}
                                />
                            </div>
                        </div>
                        <div className="w3-container w3-center">
                            <div className="w3-container w3-cell buttons">
                                <button className="w3-text-black" onClick={this.updateVenue} style={{width:"150px"}}>
                                    Save
                                </button>
                            </div>
                            <div className="w3-container w3-cell buttons">
                                <button className="w3-text-black" onClick={this.props.cancel} style={{width:"150px"}}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <br/>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(EditVenue);