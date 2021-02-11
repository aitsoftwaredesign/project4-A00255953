import React from "react";
import Modal from "react-modal";
import EditVenue from "./EditVenue";
import "./editvenuemodal.css";

Modal.setAppElement(document.getElementById('root'));

const EditVenueModal = ({venue,refresh}) => {
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
            width                 : '50%',
            height                : '90%',
            borderRadius         : '10px'
        }
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
            <div>
                <h1 className="create w3-sans-serif w3-container w3-cell w3-hover-blue w3-round " onClick={openModal}>
                    <i className="fas fa-edit"/>Edit Venue </h1>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Create Venue Form">
                    <EditVenue cancel={closeModal} venue={venue} refresh={refresh}/>
                </Modal>
            </div>
    )
}

export default EditVenueModal;