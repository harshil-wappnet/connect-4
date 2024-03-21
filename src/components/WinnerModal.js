import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const WinnerModal = ({ show, onHide, winner }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Winner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{winner && `${winner.toUpperCase()} wins!`}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WinnerModal;
