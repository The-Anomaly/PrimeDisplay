import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./todomodal.css";
import close from "../../assets/close.svg";

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
        <Modal.Title className="modal_title">Task Details</Modal.Title>
        <a className="close_view" onClick={closeModal}>
          <img className="closeview" src={close} alt="close" />
        </a>
        <Modal.Body>
          <div className="modal_det">
            <div className="titlee">Task Title</div>
            <textarea className="task_det"></textarea>
          </div>
          <div className="modal_det">
            <div className="titlee">Task Description</div>
            <textarea className="task_det"></textarea>
          </div>
          <div className="modal_det">
            <div className="titlee">Notes</div>
            <textarea className="task_det"></textarea>
          </div>
          <div className="date_det modal_det">
            <div className="date_section">
              <div className="titlee">Date Created</div>
              <input className="date_info" type="date" name="date created"/>
            </div>
            <div className="date_section sec1">
              <div className="titlee">Date Completed</div>
              <input className="date_info" type="date" name="date completed"/>
            </div>
          </div>
          <div className="modal_det">
            <div className="titlee">Counselor's Input</div>
            <textarea className="task_det"></textarea>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ViewMoreModal;
