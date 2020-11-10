import React from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="rdsignup-section">
        <Container>
          <Row className="rsignuprow">
            <Col md={12} className="rsignupdiv">
              <p>
                Registering to this website, you accept our
                <span className="t_plinkspn">
                  <Link to="/terms&conditions"> Terms of Use </Link>{" "}
                </span>{" "}
                and our
                <span className="t_plinkspn">
                  {" "}
                  <Link to="/privacy_policy">Privacy Policy</Link>{" "}
                </span>
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
                    placeholder="Enter your Email Address"
                    size={30}
                    className="form-control rdsignupinput"
                  />
                </label>
                <label>
                  <span className="rdfrmlbl">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    size={75}
                    className="form-control rdsignupinput passwd-image"
                  />
                </label>
                <p className="redsgnfrmpar">
                  Your password must be at least 6 characters long and must
                  contain letters, numbers and special characters. Cannot
                  contain whitespace.
                </p>
                <Row>
                  <Col md={6}>
                    {" "}
                    <span className="rdfrmlblslt">How you heard about us</span>
                    <select className="rdseltinpt form-control" required>
                      <option
                        value=""
                        className="rdsltopt"
                        disabled
                        selected
                        hidden
                      >
                        --Please select--
                      </option>
                      <option value="0" className="rdsltopt">
                        Facebook
                      </option>
                      <option value="1" className="rdsltopt">
                        Linkedin
                      </option>
                      <option value="2" className="rdsltopt">
                        Instagram
                      </option>
                      <option value="3" className="rdsltopt">
                        Referral link
                      </option>
                      <option value="4" className="rdsltopt">
                        Friend
                      </option>
                    </select>
                  </Col>
                  <Col md={6}>
                    <span className="rdfrmlbl rdfrmlblrf"> Referal code </span>
                    <input
                      type="text"
                      size={25}
                      className="rdfrmtinptt"
                      placeholder="Enter referal code (optional)"
                    />
                  </Col>
                </Row>
                <div className="rdsgnupfrmbtndv">
                  <span className="rdsgnfrmbtn rdsgnup-animated">Sign Up</span>
                </div>
                <p className="rdsgnalready">
                  Already Registered? <Link to="/signin">Sign In</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Signup;
