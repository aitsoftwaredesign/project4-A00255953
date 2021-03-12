import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bookingstable.css';
import CreateBookingModal from "../CreateBooking/CreateBookingModal";
import RestClient from "../../../utilities/rest/RestClient";

class BookingsTable extends Component {

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
        }
    }

    FIVE_MINUTES_IN_SECONDS = 300;
    HALF_HOUR_IN_SECONDS = 1800;
    DAY_NAMES = ['SUNDAY','MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    FIRST_LOAD = true;
    INCREMENTED = false;
    componentDidMount() {
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
        date.setDate(date.getDate() + (this.state.weekIncrement*5));
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

    populateTableWithBookings = async () => {
        let table = this.state.table;
        this.props.venueBookings.map(booking => {
            let startDate = new Date(booking.start);
            let endDate = new Date(booking.end);
            let checkDate = startDate;
            let bookingAdded = false;
            for (let key in table) {
                if(key !== 'time') {
                    let tableKeyDate = table[key][0].date;
                    if (tableKeyDate.getDate() === checkDate.getDate() && tableKeyDate.getDay() === checkDate.getDay()
                        && tableKeyDate.getFullYear() === checkDate.getFullYear()) {
                        let timeString = this.getTimeString(checkDate);
                        let endTimeString = this.getTimeString(endDate);
                        for (let cell in table[key]) {
                            if (table[key][cell].time === timeString) {
                                checkDate.setSeconds(this.FIVE_MINUTES_IN_SECONDS);
                                timeString = this.getTimeString(checkDate);
                                if(table[key][cell].time === endTimeString){
                                    bookingAdded = true;
                                    break;
                                } else {
                                    table[key][cell].empty = false;
                                }
                            }
                        }

                    }
                }
                if(bookingAdded) {
                    break;
                }
            }
        });
        this.setState({
            table: table
        });
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
                    <div className="w3-cell booking-table-arrow" onClick={() =>  {this.incrementWeek(-1)}}><i className="fas fa-arrow-left"></i></div>
                    <div className="booking-table-time w3-container w3-cell">{this.buildTimeColumn()}</div>
                    {this.createTable()}
                    <div className="w3-cell booking-table-arrow" onClick={() =>  {this.incrementWeek(1)}}><i className="fas fa-arrow-right"></i></div>
                </div>
            )
        } else {
            let message = "This Venue currently can not take any bookings";
            return (
                <div className="w3-container booking-table-no-bookings">
                    <h2 className="w3-container w3-cell w3-cell-middle">{message}</h2>
                </div>
            )
        }
    }

    incrementWeek = (num) =>{
        this.setState({ weekIncrement: this.state.weekIncrement+num});
        this.INCREMENTED = true;
    }

    createTable = () => {
        let date = new Date();
        date.setDate(date.getDate() + (this.state.weekIncrement*5));
        let tableColumns = [...Array(5).keys()].map( day => {
            let dayNum = date.getDay();
            let dayName = ['SUNDAY','MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][dayNum];
            let dateString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
            date.setDate(date.getDate()+1);

            return (
                <div className="booking-table-column w3-container w3-cell">
                    <div className="w3-container booking-table-header">
                        {dayName}
                        <p className="booking-table-header-date">({dateString})</p>
                    </div>
                    {this.createDailyCells(dayName)}
                </div>
            )
        });

        return (
            <div className="w3-container w3-cell booking-table-bookings">
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

            index++;
            if(slot.open === prevSlot.open && slot.empty === prevSlot.empty) {
                count++;
            } else if(count > 0 && !prevSlot.empty && slot.empty && this.state.table[dayName.toLowerCase()][index+1].empty) {
                let size = 0;
                for(let i = index-2; i >= 0; i-- ){
                    if(!this.state.table[dayName.toLowerCase()][i].empty && this.state.table[dayName.toLowerCase()][i].open) {
                        size++;
                    } else if(!this.state.table[dayName.toLowerCase()][i-1].empty && this.state.table[dayName.toLowerCase()][i-1].open){
                        size++
                    } else {
                        break;
                    }
                }

                cell = <div className="w3-container booking-table-data booking-table-data-booked"
                         style={{height: (5 * size) + 'px'}}/>;
                count = 0;
            } else if(count > 0 && !prevSlot.open){
                cell = <div className="w3-container booking-table-data booking-table-data-closed"
                                style={{height: (5 * count) + 'px'}}/>;
                count = 0;
            }

            if((slot.open && count >= nextOpenSlotSize) || (prevSlot.open && prevSlot.empty && !slot.empty && count+1 >= nextOpenSlotSize)) {
                count++;
                if(nextOpenSlotSize > 0 && firstOpen) {
                    cell = (
                        <div className="w3-container booking-table-data booking-table-data-free" style={{height: (5 * nextOpenSlotSize) + 'px'}}>
                            <CreateBookingModal slotHeight={nextOpenSlotSize} date={slot.date} time={firstOpen.time}/>
                        </div>
                    );
                }
                firstOpen = null;
                count = 0;
                nextOpenSlotSize = 6;
            } else if(open !== prev && prev && !open && count > 1) {
                count++;
                cell = (
                    <div className="w3-container booking-table-data booking-table-data-free" style={{height: (5 * count) + 'px'}}>
                        <CreateBookingModal slotHeight={count} date={slot.date} time={firstOpen.time}/>
                    </div>
                );
                firstOpen = null;
                count = 0;
                nextOpenSlotSize = 6;
            }

            if(index === this.state.table[dayName.toLowerCase()].length-1 && count > 0 && slot.empty && !slot.open) {
                count++;
                cell =
                    <div className="w3-container booking-table-data booking-table-data-closed" style={{height:(5*count)+'px'}}/>;
                count = 0;
            }

            if(cell !== null ) {
                cells.push(cell);
            }

            prev = open;
            prevSlot = slot;

        });

        return cells;
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
                    <div className="booking-table-time-cell-header">
                        {slot}
                    </div>
                    :
                    (index % 2 === 0) ?
                    <div className="booking-table-time-cell">
                        {slot}
                    </div>
                        :
                    <div className="booking-table-time-cell booking-table-odd-cell">
                        {slot}
                    </div>
            )
        });

        return slots;
    }

    render() {
        let output = this.getTable();
        return (
            <div className="booking-table">
                {output}
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        selectedService: state.selectedService,
        venueBookings: state.venueBookings,
        services: state.services
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBookings: (bookings) => { dispatch({ type:'SET_VENUE_BOOKINGS', bookings:bookings})}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BookingsTable)