import React from "react";
import Modal from "react-modal";
import"./bookingentry.css";
import RestClient from "../../../utilities/rest/RestClient";

Modal.setAppElement(document.getElementById('root'));

const BookingEntry = ({booking, bookingCust, service, startTime, slotSize}) => {
    const [modalIsOpen,setIsOpen] = React.useState(false);

    let customStyles = {
        overlay: {
            backgroundColor: 'rgba(255,255,255,0)'
        },
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '30%',
            height                : '30%',
            borderRadius          : '5px',
            border                : '1px solid black',
            padding               : '0'
        }
    };

    function deleteBooking() {
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

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div className="booking-entry">
            <div className="booking-entry-text" onMouseDown={openModal} onMouseUp={closeModal}>
                {slotSize > 3 ? service : ''}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Customer Booking">
                <div className="booking-entry-modal">
                    <div className="w3-container">
                        <h2 className="booking-entry-detail">Customer: {bookingCust}</h2>
                    </div>
                    <div className="w3-container">
                        <h2 className="booking-entry-detail">Service: {service}</h2>
                    </div>
                    <div className="w3-container">
                        <h2 className="booking-entry-detail">Time: {startTime }</h2>
                    </div>
                    <div className="w3-container w3-center booking-entry-button-row">
                        <div className="w3-container w3-cell booking-entry-button booking-entry-button-close" onClick={closeModal}>
                            Close
                        </div>
                        <div className="w3-container w3-cell" style={{width:'30px'}}/>
                        <div className="w3-container w3-cell booking-entry-button booking-entry-button-delete" onClick={deleteBooking}>
                            Delete
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default BookingEntry;