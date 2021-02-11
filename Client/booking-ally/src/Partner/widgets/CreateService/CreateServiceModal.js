import React from "react";
import Modal from "react-modal";
import"./createservice.css";
import CreateService from "./CreateService";

Modal.setAppElement(document.getElementById('root'));

const CreateServiceModal = ({venue}) => {
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
        window.location.reload();
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div>
            <h1 className="service-edit-create w3-sans-serif w3-container w3-cell w3-hover-blue w3-round" onClick={openModal}>
                 Create Service <i className="fas fa-plus-square"/> </h1>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create Venue Form">
                <CreateService cancel={closeModal} venue={venue}/>
            </Modal>
        </div>
    )
}

export default CreateServiceModal;