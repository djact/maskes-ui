import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = (props) => {
    const { showConfirmModal, closeModalHandler, confirmHandler, label, message } = props
    return (
        < Modal show={showConfirmModal} centered onHide={closeModalHandler} >
            <Modal.Header closeButton>
                <Modal.Title>{label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModalHandler}>
                    Close
          </Button>
                <Button variant="primary" className='confirm-button' onClick={confirmHandler}>
                    Yes, Confirm
          </Button>
            </Modal.Footer>
        </Modal >
    )
};

export default ConfirmModal;