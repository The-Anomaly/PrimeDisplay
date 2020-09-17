import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./todomodal.css";
import close from "../../assets/close.svg";

const CompleteTaskModal = () => {
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
      <Modal.Title className="modal_title">Complete Task</Modal.Title>
        <span className="close_view">
          <img className="closeview" src={close} alt="close" />
        </span>
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
            <div className="titlee">Add Note</div>
            <textarea className="note_det" placeholder="Enter Extra Notes"></textarea>
          </div>
          <div className="request_input">
            <a className="request" href="#" >Request Counselors Input</a>
          </div>
          <div className="mark_complete">
            <div className="savebtn todo_button markit">Mark as Complete</div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CompleteTaskModal;
