import React from "react";
import {Link} from "react-router-dom";
import Modal from "react-modal";
import Login from "./Login";
import Logout from "./Logout";
import './login.css';

Modal.setAppElement(document.getElementById('root'));

export default function LoginModal({loggedin}){
    const [modalIsOpen,setIsOpen] = React.useState(false);

    let customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
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
            <div>
                <a className="w3-container w3-cell output w3-right" onClick={openModal}>
                    Login
                </a>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Login Form">
                    <Login cancel={closeModal}/>
                </Modal>
            </div>
            :
                <a className="w3-container w3-cell output w3-right" to=''>
                    <Logout/>
                </a>
    )
}