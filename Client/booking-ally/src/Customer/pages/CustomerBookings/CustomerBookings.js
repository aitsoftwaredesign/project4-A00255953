import React, {Component} from "react";
import { connect } from 'react-redux';
import './customerbookings.css';
import NavBar from "../../widgets/NavBar/NavBar";
import RestClient from "../../../utilities/rest/RestClient";

class CustomerBookings extends Component {

    state = {
        isLoading: true,
        bookings: [],
        bookingDetails: []
    }

    async componentDidMount() {
    let restClient = new RestClient();
        restClient.getCustomerBookings(this.props.user.id)
            .then( response => {
                this.setState({
                    bookings: response
                });
            })
            .then(() => {
                    this.getBookingDetails()
                }
            );
    }

    deleteBooking(booking) {
        let restClient = new RestClient();
        restClient.deleteBooking(booking)
            .then(response => {
                if(response.status === 200) {
                    alert('Booking deleted');
                } else {
                    alert('Failed to delete booking: ' + response.body );
                }
            })
            .then(() => {
                window.location.reload();
            });
    }

    async getBookingDetails() {
        this.state.bookings.map( async booking => {
            let serviceName = await this.getServiceName(booking.id);
            let date = this.getBookingDate(booking);
            let time = this.getTimeString(booking);
            let bookingDetails = this.state.bookingDetails;
            bookingDetails.push({
                booking: booking,
                serviceName: serviceName,
                date: date,
                time: time
            });
            this.setState({
                bookingDetails: bookingDetails
            });
        })

        this.setState({
            isLoading: false
        });
    }

    getBookings() {
        let bookings = [];
        if(!this.state.isLoading) {
            this.state.bookingDetails.map( booking => {
               bookings.push(
                   <div className="w3-col s10 l3 customer-booking">
                       <div className="w3-container">
                           <h2 className="">Service: {booking.serviceName}</h2>
                       </div>
                       <div className="w3-container">
                           <h2 className="">Date: {booking.date }</h2>
                       </div>
                       <div className="w3-container">
                           <h2 className="">Time: {booking.time }</h2>
                       </div>
                       <div className="w3-container w3-center ">
                           <div className="w3-container customer-booking-button-delete" onClick={() => {this.deleteBooking(booking.booking)}}>
                               Delete
                           </div>
                       </div>
                   </div>
               )
            });
        } else {
           bookings.push(
            <div className="customer-booking-loading">
                <h3>Loading your bookings</h3>
            </div>
           );
        }
        return bookings;
    }

    /**
     * Get the name of the service for the given booking
     * @param bookingId
     * @returns {*}
     */
    async getServiceName(bookingId) {
        let name = '';
        let booking = this.getBooking(bookingId);
        let restClient = new RestClient();
        let response = await restClient.getServiceById(booking.serviceId);
        name = response.name;

        return name;
    }

    /**
     * Get the booking for the given id
     * @param bookingId
     * @returns {*}
     */
    getBooking(bookingId) {
        let match;
        for (let index in this.state.bookings) {
            if(bookingId && this.state.bookings[index].id === bookingId) {
                match = this.state.bookings[index];
                break;
            }
        }
        return match;
    }

    /**
     * Get the start time for the given booking id
     * @param bookingId
     * @returns {string}
     */
    getBookingDate(booking) {
        let date = new Date(booking.start);

        return '' + date.getDay()   + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear();
    }

    /**
     * Creates a string representation of the given DateTime with added zeros for single digit minutes.
     * @param date
     * @returns {string}
     */
    getTimeString = (booking) => {
        let date = new Date(booking.start);
        let timeString = '' + date.getHours() + ":" +
            ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());

        return timeString;
    }

    render() {
        let bookings = this.getBookings();
        return (
            <div>
                <NavBar/>
                <div className='w3-container customer-booking-bookings-bar'>
                    <div className="w3-container w3-center customer-booking-bar-title">
                        <h1>Your Bookings</h1>
                    </div>
                    <div className="w3-row w3-container">
                        {bookings}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customerBookings: state.customerBookings,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCustomerBookings: (bookings) => { dispatch({ type: 'SET_CUSTOMER_BOOKINGS', bookings:bookings})},
        }
}

export default connect(mapStateToProps, mapDispatchToProps) (CustomerBookings);