import React, {Component} from 'react';
import {connect} from "react-redux";
import RestClient from "../../../utilities/rest/RestClient";

class CreateBooking extends Component {

    createBooking = async (e) => {
        e.preventDefault();
        let bookingTimings = this.getBookingTimes();

        const newBooking = {
            "id": null,
            "venueId": this.props.selectedService.venueId,
            "serviceId": this.props.selectedService.id,
            "customerId": this.props.user.id,
            "start": bookingTimings[0],
            "end": bookingTimings[1]
        };

        let restClient = new RestClient();
        let response = await restClient.createBooking(newBooking);
        if(response.id) {
            alert("Booking Created");
            window.location.reload();
        } else {
            alert(response.message);
        }
    }

    getBookingTimes = () => {
        let start = new Date();
        start.setDate(this.props.date.getDate());
        start.setMonth(this.props.date.getMonth());
        start.setFullYear(this.props.date.getFullYear());
        start.setHours(0, 0, 0,0);

        let timeSplit = this.props.time.split(':');
        timeSplit[0] = parseInt(timeSplit[0]);
        timeSplit[1] =  parseInt(timeSplit[1]);
        start.setHours( timeSplit[0], timeSplit[1]);

        let serviceTime = this.props.selectedService.length.split(':');
        serviceTime[0] = timeSplit[0] + parseInt(serviceTime[0]);
        serviceTime[1] = timeSplit[1] + parseInt(serviceTime[1]);

        let end = new Date();
        end.setDate(this.props.date.getDate());
        end.setMonth(this.props.date.getMonth());
        end.setFullYear(this.props.date.getFullYear());
        end.setHours(serviceTime[0], serviceTime[1], 0,0);

        return [start, end];

    }

    getFormattedDate = () => {
        let day = this.props.date.getDate();
        let month = this.props.date.getMonth()+1;
        let year = this.props.date.getFullYear();
        return day + "/" + month + "/" + year;
    }

    getFormattedTime = () => {
        let timeSplit = this.props.time.split(':');
        return this.props.time + (timeSplit[0] > 12 ? " pm" : " am");
    }

    render() {
        return (
            <div className="modal w3-container w3-center">
                <form className="serviceForm">
                    <div>
                        <h1 className="formTitle">Create a Booking</h1>
                    </div>
                    <div className="w3-container ">
                        <div className="w3-container" style={{paddingTop:"0", marginTop:"0"}}>
                            <h3 htmlFor="name">What: </h3>
                        </div>
                        <div className="create-booking-section">
                            <div className="w3-container">
                                <div className="w3-container w3-cell w3-left">
                                    <h3 htmlFor="name">Name: </h3>
                                </div>
                                <div className="w3-container w3-cell w3-right">
                                    <h3 htmlFor="name">{this.props.selectedService.name}</h3>
                                </div>
                            </div>
                            <div className="w3-container">
                                <div className="w3-container w3-cell w3-left">
                                    <h3 htmlFor="name">Description:</h3>
                                </div>
                                <div className="w3-container w3-cell w3-right">
                                    <h3 htmlFor="name">{this.props.selectedService.description}</h3>
                                </div>
                            </div>
                            <div className="w3-container">
                                <div className="w3-container w3-cell w3-left">
                                    <h3 htmlFor="name">Date and Time:</h3>
                                </div>
                                <div className="w3-container w3-cell w3-right">
                                    <h3 htmlFor="name">{this.getFormattedDate()} at {this.getFormattedTime()}</h3>
                                </div>
                            </div>
                            <div className="w3-container">
                                <div className="w3-container w3-cell w3-left">
                                    <h3 htmlFor="name">Booking Length:</h3>
                                </div>
                                <div className="w3-container w3-cell w3-right">
                                    <h3 htmlFor="name">{this.props.selectedService.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w3-container">
                        <div className="w3-container">
                            <h3 htmlFor="name">Where: </h3>
                        </div>
                        <div className="create-booking-section">
                            <div className="w3-container">
                                <div className="w3-container w3-cell w3-left">
                                    <h3 htmlFor="name">Name: </h3>
                                </div>
                                <div className="w3-container w3-cell w3-right">
                                    <h3 htmlFor="name">{this.props.selectedVenue.name}</h3>
                                </div>
                            </div>
                            <div className="w3-container">
                                <div className="w3-container w3-cell w3-left">
                                    <h3 htmlFor="name">Address:</h3>
                                </div>
                                <div className="w3-container w3-cell w3-right">
                                    <h3 htmlFor="name">{this.props.selectedVenue.address1}</h3>
                                    <h3 htmlFor="name">{this.props.selectedVenue.address2}</h3>
                                    <h3 htmlFor="name">{this.props.selectedVenue.town}</h3>
                                    <h3 htmlFor="name">{this.props.selectedVenue.postalCode}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="create-booking-buttons w3-container w3-center">
                        <div className="w3-cell w3-left">
                            <button className="buttons w3-text-black w3-green" onClick={this.createBooking} style={{width:"150px"}}>
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
        user: state.user,
        selectedService: state.selectedService,
        selectedVenue: state.selectedVenue
    }
}

export default connect(mapStateToProps)(CreateBooking);