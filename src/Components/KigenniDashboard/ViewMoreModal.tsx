import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./kegennidashboard.css";

const ViewMoreModal = () => {
  const [state, setState] = useState({
    isOpen: true,
  });
  const closeModal = () => {
    setState({
      ...state,
      isOpen: true,
    });
  };

  return (
    <div>
      <Modal show={state.isOpen} centered={true} onHide={closeModal}>
        <Modal.Body>
            Text
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ViewMoreModal;
