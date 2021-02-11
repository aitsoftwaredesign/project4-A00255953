import React, {Component} from 'react';
import {connect} from "react-redux";
import RestClient from "../../../utilities/rest/RestClient";

class EditService extends Component {

    state = {
        id: this.props.service.id,
        venueId: this.props.service.venueId,
        name: this.props.service.name,
        description: this.props.service.description,
        cost: this.props.service.cost,
        length: this.props.service.length
    }

    onChange= (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    editService = async (e) => {
        e.preventDefault();

        let restClient = new RestClient();
        let response = await restClient.createService(this.state);
        if(response.name) {
            alert("Service Updated");
            this.props.getServices(this.state.venueId);
            this.props.cancel();
        } else {
            alert(response.message);
        }
    }

    render() {
        return (
            <div className="modal w3-container w3-center">
                <form className="serviceForm">
                    <div>
                        <h1 className="formTitle">Edit your Service</h1>
                    </div>
                    <div className="w3-container w3-right">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="name">Service Name:</h3>
                        </div>
                        <div className="w3-container w3-cell">
                            <input
                                className="input"
                                type="text"
                                id="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
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
                                    value={this.state.description}
                                    onChange={this.onChange}
                                />
                        </div>
                    </div>
                    <div className="w3-container w3-right">
                        <div className="w3-right">
                            <div className="w3-container w3-cell">
                                <h3 htmlFor="cost">Cost:</h3>
                            </div>
                            <div className="w3-container w3-cell">
                                <input
                                    className="service-time-input"
                                    type="number"
                                    min="1"
                                    step="any"
                                    id="cost"
                                    value={this.state.cost}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w3-container w3-right">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="cost">Length:</h3>
                        </div>
                        <div className="w3-container w3-cell">
                            <input
                                className="service-time-input w3-center"
                                title="How long will the service take? In hours and minutes."
                                type="time"
                                id="length"
                                value={this.state.length}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="service-button-container w3-container w3-center">
                        <div className="w3-cell w3-left">
                            <button className="buttons w3-text-black w3-green" onClick={this.editService} style={{width:"150px"}}>
                                Save
                            </button>
                        </div>
                        <div className="w3-cell w3-right">
                            <button className="buttons w3-text-black" onClick={this.props.cancel} style={{width:"150px"}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <br/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        getServices: (id) => { dispatch({ type:'GET_SERVICE', id:id})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditService);