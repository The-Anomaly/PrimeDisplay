import React, { useState } from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { API } from "../../../config";
import eye from "../../../assets/eye.png";
import eye12 from "../../../assets/eye-off.png";

const ForgotPasswordCounselor= withRouter((props: any) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errorMessage: "",
    successMessage: "",
    isLoading: false,
    passwordIsOpen: false,
    error: false,
  });
  const {
    email,
    errorMessage,
    successMessage,
    isLoading,
  } = state;
  const sendFormData = () => {
    console.log("we are here")
    setState({ ...state, isLoading: true });
    const data = {
      email,
      domain:"clarity"
    };
    axios
      .post(`${API}/claritypasswordresetemail`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
         return setState({
            ...state,
            isLoading: false,
            successMessage: response?.data[0]?.message,
          });
        }
        setState({
          ...state,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error)
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "Sending Failed",
          isLoading: false,
        });
      });
  };
  const validateForm = (e) => {
    e.preventDefault();
    if (email === "") {
      return setState({
        ...state,
        errorMessage: "Please enter your email",
      });
    }
    if (email) {
      sendFormData();
    }
  };
  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
  };
 
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
              <Form className="rdsignupform" onSubmit={validateForm}>
                <div className="rdsignupfrmdv">
                  <h4 className="sgnfrmhder">Password Recovery</h4>
                  <div>
                    <div className="sgnupfrmline"></div>
                    <span className="sgnupdescr">Please enter your registered email Counsellor</span>
                  </div>
                </div>
                {successMessage && (
                  <Alert
                    key={2}
                    variant="success"
                    className=" alertzuccess text-center"
                  >
                    {successMessage}
                  </Alert>
                )}
                {errorMessage && (
                  <Alert
                    key={2}
                    variant="danger"
                    className="alertzuccess text-center"
                  >
                    {errorMessage}
                  </Alert>
                )}
                <label>
                  <span className="rdfrmlbl"> Email Address </span>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    placeholder="Enter your Email Address"
                    size={30}
                    className="form-control rdsignupinput"
                  />
                </label>
                <div className="rdsgnupfrmbtndv">
                  <span
                    onClick={validateForm}
                    className="rdsgnfrmbtn rdsgnup-animated"
                  >
                    {isLoading ? "Processing" : "Submit"}
                  </span>
                </div>
                <p className="rdsgnalready">
                  Don't have an account? <Link to="/counsellor/signup">Sign Up</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});

export default ForgotPasswordCounselor;
