import React from "react";
import Modal from "react-modal";
import { connect } from 'react-redux';
import"./createbooking.css";
import CreateBooking from "./CreateBooking";
import AccountTypes from "../../../Resources/AccountTypes";

Modal.setAppElement(document.getElementById('root'));

const CreateBookingModal = ({user, accountType, selectedService, slotHeight, time, date, login}) => {
    const [modalIsOpen,setIsOpen] = React.useState(false);

    let customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '50%',
            height                : '75%',
            borderRadius          : '10px',
            padding               : '0'
        }
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        if(selectedService && user && accountType === AccountTypes.Customer) {
            setIsOpen(true);
        } else if(!selectedService) {
            alert('Select a service to make booking.');
        } else {
            login();
        }
    }

    const content = () => {
        return (slotHeight === 6) ?
            <div>Free  <i className="fas fa-plus-square create-booking-icon" /></div>
            :
            <div />;
    }

    return (
        <div className="create-booking" onClick={openModal} style={{height:"100%"}}>
            {content()}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create Booking Form">
                <CreateBooking cancel={closeModal} time={time} date={date}/>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedService: state.selectedService,
        user: state.user,
        accountType: state.accountType,
        login: state.login
    }
}

export default connect(mapStateToProps)(CreateBookingModal);