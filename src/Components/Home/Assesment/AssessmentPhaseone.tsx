import * as React from "react";
import "../Home/Home.css";
import "./assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../HomeComponents/newfooter";
import Navbar from "../HomeComponents/newnavbar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import NewAssessmentPhaseOne from "./NewAssessmentPhaseOne";


const AssessmentFirstPhase = (props: any) => {
  const [show, setShow] = useState(false);
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    setShow(true);
  }, []);

  //component state
 
  const handleClose = () => setShow(false);

  //submit form
  const notify = (message: string) => toast(message, { containerId: "B" });

  return (
    <div>
      <Navbar />
      <Modal
        size="sm"
        show={show}
        centered
        onHide={handleClose}
        animation={true}
        className="assessmod"
      >
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A fulfilling life, career or business starts with intentional
          self-awareness, evaluating where you are, to determine the right
          direction forward. The objective of this assessment is to help you
          kick-start this process. Be relaxed and honest when answering all the
          questions, this will help you to gain maximum benefit.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="hgjs" onClick={handleClose}>
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent assesspadd">
          <AssessmentFirstSection
            progressBar={10}
            phase="Phase 1"
            nextPhase="Phase 2"
            time={15}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <NewAssessmentPhaseOne />
               </Col>
            </Row>
          </Col>
        </Row>
        {/* <Footer /> */}
      </Container>
    </div>
  );
};

export default AssessmentFirstPhase;
