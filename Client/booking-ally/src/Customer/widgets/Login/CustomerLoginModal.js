import React from "react";
import Modal from "react-modal";
import CustomerLogin from "./CustomerLogin";
import './customerLogin.css';
import Menu from "../Menu/Menu";

Modal.setAppElement(document.getElementById('root'));

export default function CustomerLoginModal({loggedin}){
    const [modalIsOpen,setIsOpen] = React.useState(false);

    let customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            transform             : 'translate(-50%, -50%)',
            backgroundColor       : ' rgba(250, 250, 255, 1)'
        }
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);;
    }

    return (
        loggedin ?
            <div className="w3-container w3-cell output w3-right">
                <Menu/>
            </div>
            :
            <div>
                <a className="w3-container w3-cell output w3-right w3-hover-white w3-round-large" onClick={openModal}>
                    Login
                </a>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Customer Login Form">
                    <CustomerLogin cancel={closeModal}/>
                </Modal>
            </div>
    )
}