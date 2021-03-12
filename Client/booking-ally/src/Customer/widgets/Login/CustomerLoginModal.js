import React from "react";
import Modal from "react-modal";
import CustomerLogin from "./CustomerLogin";
import './customerLogin.css';
import Menu from "../Menu/Menu";
import {connect} from "react-redux";

Modal.setAppElement(document.getElementById('root'));

function CustomerLoginModal({loggedin, setOpenLogin}){
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
        setIsOpen(true);
    }

    setOpenLogin(openModal);


    return (
        loggedin ?
            <div className="w3-container output w3-right">
                <Menu/>
            </div>
            :
            <div>
                <a className="w3-container w3-cell output w3-right" onClick={openModal}>
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

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOpenLogin: (openLogin) => { dispatch({ type:'SET_OPEN_LOGIN', login:openLogin})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerLoginModal);