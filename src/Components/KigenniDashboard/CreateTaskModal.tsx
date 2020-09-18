import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./todomodal.css";
import close from "../../assets/close.svg";

const CreateTaskModal = () => {
  const [state, setState] = useState({
    CreateTaskModalisOpen: true,
  });
  const closeModalCreateTaskModal = () => {
    setState({
      ...state,
      CreateTaskModalisOpen: false,
    });
  };

  return (
    <div>
      <Modal show={state.CreateTaskModalisOpen} centered={true} onHide={closeModalCreateTaskModal}>
      <Modal.Title className="modal_title create_title">Create Task</Modal.Title>
        <Modal.Body className="create_body">
          <div className="modal_det">
            <div className="titlee">Task Title</div>
            <textarea className="note_det create_det" placeholder="Enter a Task Title"></textarea>
          </div>
          <div className="modal_det">
            <div className="titlee">Description</div>
            <textarea className="note_det" placeholder="Enter a Task Description"></textarea>
          </div>
          <div className="modal_det">
            <div className="titlee">Task Duration</div>
            <input className="note_det create_det" type="text" placeholder="Enter Duration"/>
          </div>
          <div className="mark_complete">
            <div className="savebtn todo_button markit createit">Create Task</div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CreateTaskModal;
