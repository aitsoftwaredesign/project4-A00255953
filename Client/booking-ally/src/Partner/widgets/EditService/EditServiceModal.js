import React from "react";
import Modal from "react-modal";
import EditService from "./EditService";

Modal.setAppElement(document.getElementById('root'));

const EditServiceModal = ({service}) => {
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
            height                : '60%',
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
            <h1 className="service-edit-create w3-sans-serif w3-container w3-cell w3-hover-blue w3-round" onClick={openModal}>
                Edit Service <i className="fas fa-edit"/> </h1>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create Venue Form">
                <EditService cancel={closeModal} service={service}/>
            </Modal>
        </div>
    )
}

export default EditServiceModal;