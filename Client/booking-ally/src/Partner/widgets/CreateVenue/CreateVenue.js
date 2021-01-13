import React, { Component} from 'react';
import { connect } from 'react-redux';
import RestClient from "../../../utilities/rest/RestClient";
import types from "../../../Resources/VenueTypes";
import Uploadimage from "../../../utilities/UploadImage/UploadImage";

class CreateVenue extends Component {

    restClient = new RestClient();

    onChange= (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    setImageUrl = (url) => {
        this.setState({
            image: url
        });
    }

    createVenue = async (e) => {
        const newVenue = {
            "id": null,
            "partnerId": this.props.user.id,
            "name": this.state.venuename,
            "description": this.state.description,
            "venueType": this.state.type,
            "address1": this.state.address1,
            "address2": this.state.address2,
            "town": this.state.town,
            "postCode": this.state.postcode,
            "image": this.state.image
        };

        let restClient = new RestClient();
        let response = await restClient.createVenue(newVenue);
        if(response.name) {
            alert("New Venue Created");
            this.props.cancel();
        } else {
            alert(response.message);
        }
    }

    typesDropdown = () => {
        let options = types.map(type => {
            return (
                <option value={type}>{type}</option>
            )
        });

        return (
            <select className="input"  id="type" onChange={this.onChange}>
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
                            <h1 className="formTitle">Create your venue</h1>
                        </div>
                        <div className="w3-container w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="venuename">Venue Name:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <input
                                    className="input"
                                    type="text"
                                    id="venuename"
                                    onChange={this.onChange}
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
                                <Uploadimage setImage={this.setImageUrl}/>
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
                                />
                            </div>
                        </div>
                        <div className="w3-container w3-center">
                            <div className="buttons w3-center">
                                <button className="w3-text-black" onClick={this.createVenue} style={{width:"150px"}}>
                                    Create
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

export default connect(mapStateToProps)(CreateVenue);