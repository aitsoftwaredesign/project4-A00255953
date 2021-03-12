import React, { Component} from 'react';
import { connect } from 'react-redux';
import RestClient from "../../../utilities/rest/RestClient";
import types from "../../../Resources/VenueTypes";
import Uploadimage from "../../../utilities/UploadImage/UploadImage";
import "./createvenuemodal.css";

class CreateVenue extends Component {

    restClient = new RestClient();

    state = {
        page:0,
        active:false,
        previousImage: null,
        businessWeek: {
            "monday": {
                "day": "MONDAY",
                "businessHours": "00:00_00:00",
                "breakTime": "00:00_00:00"
            },
            "tuesday": {
                "day": "TUESDAY",
                "businessHours": "00:00_00:00",
                "breakTime": "00:00_00:00"
            },
            "wednesday": {
                "day": "WEDNESDAY",
                "businessHours": "00:00_00:00",
                "breakTime": "00:00_00:00"
            },
            "thursday": {
                "day": "THURSDAY",
                "businessHours": "00:00_00:00",
                "breakTime": "00:00_00:00"
            },
            "friday": {
                "day": "FRIDAY",
                "businessHours": "00:00_00:00",
                "breakTime": "00:00_00:00"
            },
            "saturday": {
                "day": "SATURDAY",
                "businessHours": "00:00_00:00",
                "breakTime": "00:00_00:00"
            },
            "sunday": {
                "day": "SUNDAY",
                "businessHours": "00:00_00:00",
                "breakTime": "00:00_00:00"
            }
        }
    }

    onChange= (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onChangeTime = (e) => {
        let day = e.target.id.split(".");
        let currentHours = this.state.businessWeek[day[0]].businessHours.split("_");

        if(day[1] === "open") {
            currentHours[0] = this.getRoundedTime(e.target.value.split(':'));
        } else if(day[1] === "close") {
            currentHours[1] = this.getRoundedTime(e.target.value.split(':'));
        }

        let businessWeek = this.state.businessWeek;
        businessWeek[day[0]].businessHours = currentHours[0] + "_" + currentHours[1];

        this.setState({
            businessWeek: businessWeek
        });
    }

    getRoundedTime = (time) => {
        let minutes = parseInt(time[1]);
        if(minutes % 5 > 0) {
            minutes += (minutes % 5 > 2) ? (5 -(minutes % 5)) : -(minutes % 5);
            time[1] = minutes;
        }

        let timeString = time[0] + ':' + time[1];
        return timeString;
    }

    setImageUrl = async (url) => {
        let previousImage = this.state.image ? this.state.image : null;
        if(previousImage !== null){
            let restClient = new RestClient();
            let response = await restClient.deleteImage(this.state.image);
            if(response.status === 200) {
                previousImage = null;
            }
        }
        this.setState({
            image: url,
            previousImage: previousImage
        });
    }

    publishVenue = async (e) => {
        e.preventDefault();
        this.setState({
            active:true
        })
        await this.createVenue(e);
    }

    createVenue = async (e) => {
        e.preventDefault();
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
            "image": this.state.image,
            "active":this.state.active,
            "businessWeek": this.state.businessWeek
        };

        let restClient = new RestClient();
        let response = await restClient.createVenue(newVenue);
        if(response.name) {
            alert("New Venue Created");
            if(this.state.previousImage !== null) await restClient.deleteImage(this.state.image);
            this.props.refresh();
            this.props.cancel();
        } else {
            alert(response.message);
        }
    }

    typesDropdown = () => {
        let options = types.map(type => {
            return (
                <option value={type} key={type}>{type}</option>
            )
        });

        return (
            <select className="input"  id="type" onChange={this.onChange}>
                {options}
            </select>
        );
    }

    setPage = (e) => {
        e.preventDefault();
        this.setState({
            page: (this.state.page === 0 ) ? 1 : 0
        });
    }

    onClosed = (e) => {
        let element = e.target.id.toString().substring(3, e.target.id.toString().length)
        if (document.getElementById(element).classList.contains("w3-border-green")) {
            document.getElementById(element).classList.remove("w3-border-green");
            document.getElementById(element).classList.add("w3-border-red");
        } else if (document.getElementById(element).classList.contains("w3-border-red")) {
            document.getElementById(element).classList.remove("w3-border-red");
            document.getElementById(element).classList.add("w3-border-green");
        }

        if(e.target.checked) {
            let businessWeek = this.state.businessWeek;
            businessWeek[element].businessHours = "00:00_00:00";

            this.setState({
                "businessWeek": businessWeek
            });
        }
    }

    formPageOne = () => {
        let venueTypes = this.typesDropdown();
        return (
            <div className="modal w3-container w3-center">
                <form className="venueForm" onSubmit={this.setPage}>
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
                            <Uploadimage setImage={this.setImageUrl} partner={this.props.user.id} />
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
                    <div className="button-container w3-container w3-center">
                        <div className="w3-center w3-cell">
                            <button className="buttons w3-text-black" onClick={this.createVenue} style={{width:"150px"}}>
                                Save
                            </button>
                        </div>
                        <div className="w3-center w3-cell">
                            <button className="buttons w3-text-black" onClick={this.props.cancel} style={{width:"150px"}}>
                                Cancel
                            </button>
                        </div>
                        <div className="w3-center w3-cell">
                            <button className="buttons w3-text-black w3-green" onClick={this.setPage} style={{width:"150px"}}>
                                Next <i className="fa fa-arrow-right" />
                            </button>
                        </div>
                    </div>
                    <br/>
                </form>
            </div>
        )
    }

    formPageTwo = () => {
        return (
            <div className="modal w3-container w3-center" >
                <form className="venueForm" onSubmit={this.handleLogin}>
                    <div>
                        <h1 className="formTitle">Create your venue</h1>
                    </div>
                    <div>
                        <h2 className="formTitle">Business Hours</h2>
                    </div>
                    <div className="w3-container w3-cell-row w3-border w3-border-green" id="monday">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="monday" className="day-header">Monday:     </h3>
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Open</label>
                            <input
                                className="time"
                                type="time"
                                id="monday.open"
                                value={this.state.businessWeek.monday.businessHours.split('_')[0].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Close</label>
                            <input
                                className="time"
                                type="time"
                                id="monday.close"
                                value={this.state.businessWeek.monday.businessHours.split('_')[1].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Closed</label>
                            <input
                                className="time"
                                type="checkbox"
                                id="id.monday"
                                onChange={this.onClosed}
                            />
                        </div>
                    </div>
                    <div className="w3-container w3-cell-row w3-border w3-border-green" id="tuesday">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="tuesday" className="day-header">Tuesday:</h3>
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Open</label>
                            <input
                                className="time"
                                type="time"
                                id="tuesday.open"
                                value={this.state.businessWeek.tuesday.businessHours.split('_')[0].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Close</label>
                            <input
                                className="time"
                                type="time"
                                id="tuesday.close"
                                value={this.state.businessWeek.tuesday.businessHours.split('_')[1].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Closed</label>
                            <input
                                className="time"
                                type="checkbox"
                                id="id.tuesday"
                                onChange={this.onClosed}
                            />
                        </div>
                    </div>
                    <div className="w3-container w3-cell-row w3-border w3-border-green" id="wednesday">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="wednesday" className="day-header">Wednesday:</h3>
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Open</label>
                            <input
                                className="time"
                                type="time"
                                id="wednesday.open"
                                value={this.state.businessWeek.wednesday.businessHours.split('_')[0].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Close</label>
                            <input
                                className="time"
                                type="time"
                                id="wednesday.close"
                                value={this.state.businessWeek.wednesday.businessHours.split('_')[1].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Closed</label>
                            <input
                                className="time"
                                type="checkbox"
                                id="id.wednesday"
                                onChange={this.onClosed}
                            />
                        </div>
                    </div>
                    <div className="w3-container w3-cell-row w3-border w3-border-green" id="thursday">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="thursday" className="day-header">Thursday:</h3>
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Open</label>
                            <input
                                className="time"
                                type="time"
                                id="thursday.open"
                                value={this.state.businessWeek.thursday.businessHours.split('_')[0].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Close</label>
                            <input
                                className="time"
                                type="time"
                                id="thursday.close"
                                value={this.state.businessWeek.thursday.businessHours.split('_')[1].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Closed</label>
                            <input
                                className="time"
                                type="checkbox"
                                id="id.thursday"
                                onChange={this.onClosed}
                            />
                        </div>
                    </div>
                    <div className="w3-container w3-cell-row w3-border w3-border-green" id="friday">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="friday" className="day-header">Friday:</h3>
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Open</label>
                            <input
                                className="time"
                                type="time"
                                id="friday.open"
                                value={this.state.businessWeek.friday.businessHours.split('_')[0].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Close</label>
                            <input
                                className="time"
                                type="time"
                                id="friday.close"
                                value={this.state.businessWeek.friday.businessHours.split('_')[1].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Closed</label>
                            <input
                                className="time"
                                type="checkbox"
                                id="id.friday"
                                onChange={this.onClosed}
                            />
                        </div>
                    </div>
                    <div className="w3-container w3-cell-row w3-border w3-border-green" id="saturday">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="saturday" className="day-header">Saturday:</h3>
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Open</label>
                            <input
                                className="time"
                                type="time"
                                id="saturday.open"
                                value={this.state.businessWeek.saturday.businessHours.split('_')[0].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Close</label>
                            <input
                                className="time"
                                type="time"
                                id="saturday.close"
                                value={this.state.businessWeek.saturday.businessHours.split('_')[1].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Closed</label>
                            <input
                                className="time"
                                type="checkbox"
                                id="id.saturday"
                                onChange={this.onClosed}
                            />
                        </div>
                    </div>
                    <div className="w3-container w3-cell-row w3-border w3-border-green" id="sunday">
                        <div className="w3-container w3-cell">
                            <h3 htmlFor="sunday" className="day-header">Sunday:</h3>
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Open</label>
                            <input
                                className="time"
                                type="time"
                                id="sunday.open"
                                value={this.state.businessWeek.sunday.businessHours.split('_')[0].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Close</label>
                            <input
                                className="time"
                                type="time"
                                id="sunday.close"
                                value={this.state.businessWeek.sunday.businessHours.split('_')[1].toString()}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="w3-container w3-cell time-picker">
                            <label className="time-label time">Closed</label>
                            <input
                                className="time"
                                type="checkbox"
                                id="id.sunday"
                                onChange={this.onClosed}
                            />
                        </div>
                    </div>
                    <div className="w3-container button-container w3-cell-row">
                        <div className="w3-cell">
                            <button className="buttons w3-text-black" onClick={this.setPage} style={{width:"150px"}}>
                                <i className="fa fa-arrow-left" /> Previous
                            </button>
                        </div>
                        <div className="w3-cell">
                            <button className="buttons w3-text-black" onClick={this.props.cancel} style={{width:"150px"}}>
                                Cancel
                            </button>
                            <button title="Saves and makes your Venue viewable to customers" className="buttons w3-text-black w3-green" onClick={this.publishVenue} style={{width:"150px"}} >
                                Save and Publish
                            </button>
                        </div>
                        <div className="w3-cell">
                            <button title="Saves your Venue for later, not visible to Customers" className="buttons w3-text-black w3-green" onClick={this.createVenue} style={{width:"150px"}}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        let currentPage = (this.state.page === 0) ? this.formPageOne() : this.formPageTwo();
        return (
            currentPage
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(CreateVenue);