import React from "react";
import Modal from "react-modal";
import EditVenue from "./EditVenue";

Modal.setAppElement(document.getElementById('root'));

const editVenueModal = ({modalIsOpen, setIsOpen, venue}) => {

    let customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '50%',
            height                : '90%',
            borderRadius         : '10px'
        }
    };

    function closeModal() {
        setIsOpen(false);
    }

    return (
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Create Venue Form">
                    <EditVenue cancel={closeModal} venue={venue}/>
                </Modal>
            </div>
    )
}

export default editVenueModal;