import React from "react";
import Modal from "react-modal";
import "./createvenuemodal.css";
import CreateVenue from "./CreateVenue";

Modal.setAppElement(document.getElementById('root'));

export default function CreateVenueModal(){
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
                <h1 className="create w3-card-4 w3-sans-serif w3-container w3-cell output w3-hover-blue w3-round" onClick={openModal}>
                    <i className="fas fa-plus-square"/> Create Venue </h1>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Create Venue Form">
                    <CreateVenue cancel={closeModal}/>
                </Modal>
            </div>
    )
}