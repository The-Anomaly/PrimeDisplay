import React from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import formline from "../../../assets/form-line.png";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="rdsignup-section">
        <Container>
          <Row className="rsignuprow">
            <Col md={12} className="rsignupdiv">
              <p>
                Registering to this website, you accept our Terms of Use and our
                Privacy Policy
              </p>
            </Col>
            <Col md={7}>
              <Form className="rdsignupform">
                <div className="rdsignupfrmdv">
                  <h4 className="sgnfrmhder">Sign Up</h4>
                  <div>
                    <div className="sgnupfrmline"></div>
                    <span className="sgnupdescr">(to get Clarity)</span>
                  </div>
                </div>
                <label>
                  <span className="rdfrmlbl"> Full Name</span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    size={75}
                    className="form-control rdsignupinput"
                  />
                </label>
                <label>
                  <span className="rdfrmlbl"> Email Address </span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    size={75}
                    className="form-control rdsignupinput"
                  />
                </label>
                <label>
                  <span className="rdfrmlbl">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your full name"
                    size={75}
                    className="form-control rdsignupinput"
                  />
                </label>
                <div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Signup;
