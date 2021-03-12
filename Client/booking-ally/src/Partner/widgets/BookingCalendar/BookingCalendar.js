import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bookingcalendar.css';
import RestClient from "../../../utilities/rest/RestClient";
import BookingEntry from "../BookingEntry/BookingEntry";

class BookingCalendar extends Component {

    state = {
        weekIncrement: 0,
        week: 0,
        table: {
            time: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        },
        bookingCustomers: {}
    }

    FIVE_MINUTES_IN_SECONDS = 300;
    HALF_HOUR_IN_SECONDS = 1800;
    DAY_NAMES = ['SUNDAY','MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    FIRST_LOAD = true;

    componentDidMount() {
        this.FIRST_LOAD = false;
    }

    /**
     * Create the time slots for the table based on the businesses longest business day
     */
    buildTableTimeData = () => {
        let businessHoursInSeconds = this.getBusinessHours(this.getLongestOpenHours());
        let numOfSlots = Math.ceil( businessHoursInSeconds[2] / this.HALF_HOUR_IN_SECONDS);
        let day = new Date();
        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);

        day.setSeconds( this.getSeconds(businessHoursInSeconds[0]));
        let timeSlots = ['TIME'];
        [...Array(numOfSlots).keys()].map( slot => {
            day.setSeconds(day.getSeconds() + ((slot > 0) ? this.HALF_HOUR_IN_SECONDS : 0));
            timeSlots.push(this.getTimeString(day));
        });

        let table = this.state.table;
        table.time = timeSlots;
        this.setState({
            table: table
        });
    }

    /**
     * Create the week day slots based on the business hours of each day
     */
    buildTableData() {
        let date = new Date();
        date.setDate(date.getDate() + (this.state.weekIncrement*7));
        for(let i = 0; i < 7; i++) {
            let dayName = this.DAY_NAMES[date.getDay()];
            let businessHours = this.getBusinessHours(this.getLongestOpenHours());
            let numOfSlots = Math.ceil( businessHours[2] / this.FIVE_MINUTES_IN_SECONDS);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);

            let totalSeconds = this.getSeconds(businessHours[0]);
            date.setSeconds(totalSeconds);
            let timeSlots = [];
            [...Array(numOfSlots+1).keys()].map( slot => {
                let seconds = ((slot > 0) ? this.FIVE_MINUTES_IN_SECONDS : 0);
                date.setSeconds(seconds);
                totalSeconds += seconds;
                timeSlots.push({
                    date: date,
                    time: this.getTimeString(date),
                    empty: true,
                    bookingId: null,
                    open: this.isOpen(dayName, totalSeconds)
                });
            });

            let table = this.state.table;
            table[dayName.toLowerCase()] = timeSlots;
            this.setState({
                table: table
            });

            let nextDay = new Date();
            nextDay.setDate(date.getDate() + 1);
            date = nextDay;
        }
    }

    /**
     * Add the venue bookings to the table data
     * @returns {Promise<void>}
     */
    populateTableWithBookings = async () => {
        let table = this.state.table;
        if(this.props.venueBookings) {
            this.props.venueBookings.map(booking => {
                let startDate = new Date(booking.start);
                let endDate = new Date(booking.end);
                let checkDate = startDate;
                let bookingAdded = false;
                for (let key in table) {
                    if (key !== 'time') {
                        let tableKeyDate = table[key][0].date;
                        if (tableKeyDate.getDate() === checkDate.getDate() && tableKeyDate.getDay() === checkDate.getDay()
                            && tableKeyDate.getFullYear() === checkDate.getFullYear()) {
                            let timeString = this.getTimeString(checkDate);
                            let endTimeString = this.getTimeString(endDate);
                            for (let cell in table[key]) {
                                if (table[key][cell].time === timeString) {
                                    checkDate.setSeconds(this.FIVE_MINUTES_IN_SECONDS);
                                    timeString = this.getTimeString(checkDate);
                                    if (table[key][cell].time === endTimeString) {
                                        bookingAdded = true;
                                        break;
                                    } else {
                                        table[key][cell].empty = false;
                                        table[key][cell].bookingId = booking.id;
                                    }
                                }
                            }

                        }
                    }
                    if (bookingAdded) {
                        break;
                    }
                }
            });
            this.setState({
                table: table
            });
        }
    }

    getTable = () => {
        if(this.FIRST_LOAD) {
            let restClient = new RestClient();
            restClient.getBookingsByVenueId(this.props.selectedVenue.id)
                .then((bookings) => {
                    this.props.setBookings(bookings);
                })
                .then(async () => {
                    this.buildTableTimeData();
                    this.buildTableData();
                    await this.populateTableWithBookings();
                });
            this.FIRST_LOAD = false;
        }

        if(this.INCREMENTED) {
            this.buildTableTimeData();
            this.buildTableData();
            this.populateTableWithBookings();
            this.INCREMENTED = false;
        }

        if(this.props.services && this.props.services.length) {
            return (
                <div className="w3-container ">
                    <div className="w3-cell booking-calendar-arrow" onClick={() =>  {this.incrementWeek(-1)}}><i className="fas fa-arrow-left"></i></div>
                    <div className="booking-calendar-time w3-container w3-cell">{this.buildTimeColumn()}</div>
                    {this.createTable()}
                    <div className="w3-cell booking-calendar-arrow" onClick={() =>  {this.incrementWeek(1)}}><i className="fas fa-arrow-right"></i></div>
                </div>
            )
        } else {
            let message = "This Venue currently can not take any bookings";
            return (
                <div className="w3-container booking-calendar-no-bookings">
                    <h2 className="w3-container w3-cell w3-cell-middle">{message}</h2>
                </div>
            )
        }
    }

    incrementWeek = (num) =>{
        this.setState({ weekIncrement: this.state.weekIncrement+num});
        this.INCREMENTED = true;
    }

    /**
     * Build the HTML table to be viewed
     * @returns {JSX.Element}
     */
    createTable = () => {
        let date = new Date();
        date.setDate(date.getDate() + (this.state.weekIncrement*7));
        let tableColumns = [...Array(7).keys()].map( day => {
            let dayNum = date.getDay();
            let dayName = ['SUNDAY','MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][dayNum];
            let dateString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
            date.setDate(date.getDate()+1);

            return (
                <div key={dayName} className="booking-calendar-column w3-container w3-cell">
                    <div key={dayName+"header"} className="w3-container booking-calendar-header">
                        {dayName}
                        <p className="booking-calendar-header-date">({dateString})</p>
                    </div>
                    {this.createDailyCells(dayName)}
                </div>
            )
        });

        return (
            <div className="w3-container w3-cell booking-calendar-bookings">
                {tableColumns}
            </div>
        )
    }

    /**
     * Create the visual table cells to be added to the table
     * @param dayName
     * @returns {[]}
     */
    createDailyCells = (dayName) => {
        let prev = false;
        let prevSlot = {empty: true, open:false};
        let firstOpen = null;
        let count = 0;
        let nextOpenSlotSize  = 6;
        let cells = [];
        let index = 0;
        this.state.table[dayName.toLowerCase()].map( slot => {
            let open = false;
            let cell = null;
            index++;

            //Checks if the current slot is both empty and open
            if(slot.empty && slot.open) {
                open = true;
                if(firstOpen === null){
                    firstOpen = slot;
                }

                prev = index === 0 ? true : prev;
                if(open && open !== prev) {
                    let difference = Math.abs((parseInt(slot.time.split(':')[1]) - 30));
                    difference = difference/5;
                    nextOpenSlotSize = 6 - difference;
                }
            }

            //Checks if the current and previous slots have the same states
            if(slot.open === prevSlot.open && slot.empty === prevSlot.empty) {
                count++;
            } else if(count > 0 && !prevSlot.empty && slot.empty && this.state.table[dayName.toLowerCase()][index+1].empty) {
                //If the current slot is open and empty but the previous slot(s) where booked
                let size = 0;
                let bookingCells = [];
                let previousBookingId = prevSlot.bookingId;
                for(let i = index-2; i >= 0; i-- ) {
                    if(!this.state.table[dayName.toLowerCase()][i].empty && this.state.table[dayName.toLowerCase()][i].open
                        && previousBookingId === this.state.table[dayName.toLowerCase()][i].bookingId) {
                        size++;
                    } else if(!this.state.table[dayName.toLowerCase()][i].empty && this.state.table[dayName.toLowerCase()][i].open
                        && previousBookingId !== this.state.table[dayName.toLowerCase()][i].bookingId && this.state.table[dayName.toLowerCase()][i].bookingId !== null) {
                       bookingCells.push(
                           <div  key={previousBookingId} className="w3-container booking-calendar-data booking-calendar-data-booked"
                                              style={{height: (5 * size) + 'px'}}>
                               <BookingEntry booking={this.getBooking(previousBookingId)} bookingCust={this.getBookingCustomer(previousBookingId)} startTime={this.getBookingTime(previousBookingId)} service={this.getServiceName(previousBookingId)} slotSize={size}/>
                           </div>
                       );
                       size = 0;
                       previousBookingId = this.state.table[dayName.toLowerCase()][i].bookingId;
                    } else {
                        break;
                    }
                }

                cells.push(
                    <div key={previousBookingId} className="w3-container booking-calendar-data booking-calendar-data-booked"
                                style={{height: (5 * size+5) + 'px'}}>
                        <BookingEntry booking={this.getBooking(previousBookingId)} bookingCust={this.getBookingCustomer(previousBookingId)} startTime={this.getBookingTime(previousBookingId)} service={this.getServiceName(previousBookingId)} slotSize={size}/>
                    </div>
                );
                for(let i = bookingCells.length-1; i >= 0; i--){
                    cells.push(bookingCells[i]);
                }
                count = 0;
            } else if(count > 0 && !prevSlot.open){
                //If the previous slots were closed create a closed block
                cell = <div key={dayName+prevSlot.time} className="w3-container booking-calendar-data booking-calendar-data-closed"
                            style={{height: (5 * count) + 'px'}}/>;
                count = 0;
            }

            //If the previous slots were open then create an open/free block
            if((count > 0 && !open && prev) ||(count > 0 && open && index === this.state.table[dayName.toLowerCase()].length-1)) {
                let size = 0;
                //Count the amount of previous open slots
                for(let i = index-2; i >= 0; i-- ){
                    if(this.state.table[dayName.toLowerCase()][i].empty && this.state.table[dayName.toLowerCase()][i].open) {
                        size++;
                    } else {
                        break;
                    }
                }

                if(size > 1) {
                    cell = (
                        <div key={dayName+prevSlot.time} className="w3-container booking-calendar-data booking-calendar-data-free"
                             style={{height: (5 * size+5) + 'px'}}/>

                    );
                }
                firstOpen = null;
                count = 0;
                nextOpenSlotSize = 6;
            }

            //If the previous slots were closed and there are no more slots
            if(index === this.state.table[dayName.toLowerCase()].length-1 && count > 0 && slot.empty && !slot.open) {
                count++;
                cell =
                    <div className="w3-container booking-calendar-data booking-calendar-data-closed" style={{height:(5*count)+'px'}}/>;
                count = 0;
            }

            //If there is a cell add it to the list
            if(cell !== null ) {
                cells.push(cell);
            }
            prev = open;
            prevSlot = slot;

        });
        return cells;
    }

    /**
     * Get the name of the customer for the given booking
     * @param bookingId - the booking id to get the booking of
     * @returns {Promise<*>}
     */
    getBookingCustomer(bookingId) {
        if(bookingId && this.state.bookingCustomers[bookingId]) {
            return this.state.bookingCustomers[bookingId];
        } else if(bookingId) {
            let restClient = new RestClient();
            let username;
            return restClient.getBookingsById(bookingId, true).then(
                    response => { username = response[0]}
                )
                .then(() => {
                    let bookingCustomers = {
                        ...this.state.bookingCustomers
                    }
                    bookingCustomers[bookingId] = username;

                    this.setState({
                        bookingCustomers: bookingCustomers
                    });

                    return username;
                });
        }
    }

    /**
     * Get the name of the service for the given booking
     * @param bookingId
     * @returns {*}
     */
    getServiceName(bookingId) {
        let match;
        let booking = this.getBooking(bookingId);
        for (let index in this.props.services) {
            if (booking && this.props.services[index].id === booking.serviceId) {
                match = this.props.services[index];
                break;
            }
        }
        return match.name;
    }

    /**
     * Get the booking for the given id
     * @param bookingId
     * @returns {*}
     */
    getBooking(bookingId) {
        let match;
        for (let index in this.props.venueBookings) {
            if(bookingId && this.props.venueBookings[index].id === bookingId) {
                match = this.props.venueBookings[index];
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
    getBookingTime(bookingId) {
        let booking = this.getBooking(bookingId);
        let date = new Date(booking.start);

        return this.getTimeString(date);
    }

    /**
     * Find the longest business day for the venue
     * @returns {string} - name of the longest day
     */
    getLongestOpenHours = () => {
        let longestDay = 0;
        let day = '';
        for(const [key] of Object.entries(this.props.selectedVenue.businessWeek)) {
            let hours = this.getBusinessHours(key)[2];
            if(hours > longestDay) {
                longestDay = hours;
                day = key;
            }
        }
        return day;
    }

    /**
     * Get the business hours for a particular day in a venue
     * @param day - name of the day eg 'monday'
     * @returns {[opentime['HH':'MM'], closingtime['HH':'MM'], business day length in seconds]}
     */
    getBusinessHours = (day) => {
        let businessHours = this.props.selectedVenue.businessWeek[day.toLowerCase()].businessHours
        businessHours = businessHours.split('_');

        let openTime = businessHours[0];
        openTime = openTime.split(':');
        let closeTime = businessHours[1];
        closeTime = closeTime.split(':');
        let businessDayInSeconds = this.getSeconds(closeTime) - this.getSeconds(openTime);
        return [openTime, closeTime, businessDayInSeconds];
    }

    /**
     * Checks if the venue is open at a given time on a given day
     * @param day
     * @param seconds
     * @returns {boolean}
     */
    isOpen = (day, seconds) => {
        let businessHours = this.getBusinessHours(day);
        let openTime = this.getSeconds(businessHours[0]);
        let closeTime = this.getSeconds(businessHours[1]);
        if(seconds >= openTime && seconds <= closeTime) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Converts the given hours and minutes into seconds
     * @param time - [HH, MM]
     * @returns {number}
     */
    getSeconds = (time) => {
        let seconds = parseInt(time[0]) * 60 * 60;
        seconds = seconds + (parseInt(time[1]) * 60);
        return seconds;
    }

    /**
     * Creates a string representation of the given DateTime with added zeros for single digit minutes.
     * @param date
     * @returns {string}
     */
    getTimeString = (date) => {
        let timeString = '' + date.getHours() + ":" +
            ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());

        return timeString;
    }

    /**
     * Builds the UI representation of the time column
     * @returns {JSX.Element[]}
     */
    buildTimeColumn = () => {
        let index = 0;
        let slots = this.state.table.time.map( slot => {
            index++;
            return (
                (slot === 'TIME') ?
                    <div className="booking-calendar-time-cell-header">
                        {slot}
                    </div>
                    :
                    (index % 2 === 0) ?
                        <div className="booking-calendar-time-cell">
                            {slot}
                        </div>
                        :
                        <div className="booking-calendar-time-cell booking-calendar-odd-cell">
                            {slot}
                        </div>
            )
        });

        return slots;
    }

    render() {
        let output = this.getTable();
        return (
            <div className="booking-calendar">
                {output}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        selectedService: state.selectedService,
        venueBookings: state.venueBookings,
        services: state.services,
        selectedVenue: state.selectedVenue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBookings: (bookings) => { dispatch({ type:'SET_VENUE_BOOKINGS', bookings:bookings})}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingCalendar)