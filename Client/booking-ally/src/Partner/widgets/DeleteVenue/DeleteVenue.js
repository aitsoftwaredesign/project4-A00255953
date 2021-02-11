import React, { Component} from 'react';
import { connect } from 'react-redux';
import RestClient from "../../../utilities/rest/RestClient";
import "./deletevenuemodal.css";

class DeleteVenue extends Component {

    restClient = new RestClient();

    state = {
        input: "",
        active: false
    }

    onChange= (e) => {
        this.setState({
            input: e.target.value
        });

        if(e.target.value.toString().trim() === this.props.venue.name.toString().trim()) {
            this.setValid(true);
        } else {
            this.setValid(false);
        }

    }

    setValid = (valid) => {
        if (valid) {
            this.setState({
                active: true
            });
            document.getElementById("delete-button").classList.add("w3-red");
        } else {
            document.getElementById("delete-button").classList.remove("w3-red");
            this.setState({
                active: false
            });
        }
    }

    deleteVenue = async (e) => {
        e.preventDefault();
        if (this.state.active) {
            let restClient = new RestClient();
            let response = await restClient.deleteVenue(this.props.venue);
            if (response.status === 200) {
                alert("Venue Deleted");
                await restClient.deleteImage(this.props.venue.image);
                this.props.refresh();
                this.props.cancel();
            } else {
                alert(response);
            }
        }
    }

    render() {
        return (
            <div className="modal w3-container w3-center" >
                <form className="venueForm" onSubmit={this.handleLogin}>
                    <div>
                        <h1 className="formTitle">Delete your venue</h1>
                    </div>
                    <div className="w3-container" id="delete">
                        <div className="w3-container">
                            <h3 htmlFor="delete" className="delete-header">Are you sure you want to delete {this.props.venue.name}?</h3>
                        </div>
                        <div className="w3-container">
                            <label className="delete-label time">Type the name of the venue to confirm: </label>
                            <input
                                className="delete-input-text"
                                type="text"
                                id="input"
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="w3-container button-container w3-cell-row">
                        <div className="w3-cell">
                            <button className="buttons w3-text-black" onClick={this.props.cancel} style={{width:"150px"}}>
                                Cancel
                            </button>
                        </div>
                        <div className="w3-cell">
                            <button id="delete-button" title="Deletes your venue" className="buttons w3-text-black" onClick={this.deleteVenue} style={{width:"150px"}}>
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(DeleteVenue);