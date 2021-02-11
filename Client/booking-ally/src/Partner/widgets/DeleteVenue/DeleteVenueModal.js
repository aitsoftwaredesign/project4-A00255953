import React from "react";
import Modal from "react-modal";
import"./deletevenuemodal.css";
import DeleteVenue from "./DeleteVenue";

Modal.setAppElement(document.getElementById('root'));

const DeleteVenueModal = ({venue, refresh}) => {
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
            height                : '40%',
            borderRadius         : '10px'
        }
    };

    function closeModal() {
        setIsOpen(false);
        window.location.reload();
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div>
            <h1 className="create w3-sans-serif w3-container w3-cell w3-hover-blue w3-round" onClick={openModal}>
                <i className="fas fa-edit"/>Delete Venue </h1>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Delete Venue Form">
                <DeleteVenue cancel={closeModal} venue={venue} refresh={refresh}/>
            </Modal>
        </div>
    )
}

export default DeleteVenueModal;