import React, {Component} from 'react';
import {connect} from "react-redux";
import RestClient from "../../../utilities/rest/RestClient";

class CreateService extends Component {

    state = {
        name: "",
        description: "",
        cost: 0.00,
        length: "00:30"
    }

    onChange= (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onChangeTime = (e) => {
        e.preventDefault();

        let time = e.target.value.split(':');
        let minutes = parseInt(time[1]);
        if(minutes % 5 > 0) {
            minutes += (minutes % 5 > 2) ? (5 -(minutes % 5)) : -(minutes % 5);
            time[1] = minutes;
        }

        let timeString = time[0] + ':' + time[1];

        this.setState({
            length: timeString
        });
    }

    createService = async (e) => {
        e.preventDefault();
        const newService = {
            "id": null,
            "venueId": this.props.venue.id,
            "name": this.state.name,
            "description": this.state.description,
            "cost":this.state.cost,
            "length":this.state.length
        };

        let restClient = new RestClient();
        let response = await restClient.createService(newService);
        if(response.name) {
            alert("New Service Created");
            this.props.getServices(this.props.venue.id);
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
                        <h1 className="formTitle">Create your Service</h1>
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
                                step="60"
                                id="length"
                                value={this.state.length.toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                    </div>
                    <div className="service-button-container w3-container w3-center">
                        <div className="w3-cell w3-left">
                            <button className="buttons w3-text-black w3-green" onClick={this.createService} style={{width:"150px"}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateService);