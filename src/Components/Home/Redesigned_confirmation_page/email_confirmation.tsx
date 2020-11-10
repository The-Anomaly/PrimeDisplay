import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Navbar from "../HomeComponents/newnavbar";
import "./email_confirmation.css";


const Email_confirm_page = () => {
  return (
    <div>
      <Navbar />
      <div className="cnfirmemail_sectn">
        <Container>
          <Row>
            <Col md={12}>
              <p className="cnfim-heading">Confirm your Email</p>
              <p className="cnfim-messg">
                A code has been sent to [{" "}
                <span className="cnfirmspan">~userEmail </span>], please enter
                code below <br /> to confirm your Account
              </p>
            </Col>
          </Row>
          <Row className="cnfrmmailrow2">
            <Col md={7}>
              <Form className="cnfirmmailform">
                <Row>
                  <Col md={8}>
                    <input
                      type="text"
                      size={50}
                      className="cnfimmailinpt form-control"
                      placeholder="Please enter the code you received"
                    />
                  </Col>
                  <Col md={4} className="confirmtn-btn">
                    Confirm Account
                  </Col>
                </Row>
              </Form>
              <div className="cnfrmdiv">
                <p>Didn’t Recieve any mail? <span className="rsendmail">Resend!</span></p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Email_confirm_page;
