import React, { useState } from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import eye from "../../../assets/eye.png";
import eyeclose from "../../../assets/eye-off.png";

const Signin = withRouter((props: any) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errorMessage: "",
    successMessage: "",
    isLoading: false,
    passwordIsOpen: true,
    error: false,
  });
  const {
    email,
    password,
    passwordIsOpen,
    error,
    errorMessage,
    successMessage,
    isLoading,
  } = state;
  const sendFormData = () => {
    setState({
      ...state,
      isLoading: true,
    });
    const data = {
      email,
      password,
    };
    axios
      .post(`${API}/accounts/login`, data)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          localStorage.setItem(
            "userToken",
            JSON.stringify(response?.data?.token)
          );
          getUserInfo(response.data.token);
          getCurrentAssessmentPosition(response.data.token);
        }
        setState({
          ...state,
          isLoading: false,
        });
      })
      .catch((error) => {
        // console.log(error);
        window.scrollTo(-0, -0);
        if (error && error.response && error.response.data) {
          return setState({
            ...state,
            errorMessage: error?.response?.data[0].message,
            isLoading: false,
            error: true,
          });
        }
        setState({
          ...state,
          errorMessage: "Login failed, check your internet connection",
          isLoading: false,
          error: true,
        });
      });
  };
  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
  };
  const hidePassword = () => {
    setState({
      ...state,
      passwordIsOpen: state.passwordIsOpen ? false : true,
    });
  };
  const getCurrentAssessmentPosition = (token: string): void => {
    axios
      .get(`${API}/progress`, { headers: { Authorization: `Token ${token}` } })
      .then((response) => {
        if (response.status === 200) {
          if (
            response.data[0].onboarding_chat === false ||
            response.data[0].next === "onboarding_chat"
          ) {
            return props.history.push("/clientchat");
          }
          if(response.data[0].next){
            return props.history.push(`/overview/new`);
          } 
           else if (
            response.data[0].next === "phase_one" ||
            response.data[0].phase_one === false
          ) {
            return props.history.push(`/assessment/welcome`);
          } else if (
            response.data[0].phase_two_nature === false ||
            response.data[0].phase_two_health === false ||
            response.data[0].phase_two_building === false ||
            response.data[0].phase_two_creative === false
          ) {
            return props.history.push(`/assessment/phaseone/complete`);
          } else if (
            response.data[0].phase_two_sports === false ||
            response.data[0].phase_two_business === false ||
            response.data[0].phase_two_stem === false ||
            response.data[0].phase_two_humanitarian === false
          ) {
            return props.history.push(`/assessmentphasetwo1`);
          } else if (response.data[0].phase_three === false) {
            return props.history.push(`/assessment/phasetwo/complete`);
          } else if (response.data[0].phase_four === false) {
            return props.history.push(`/assessment/phasethree/complete`);
          } else if (
            response.data[0].next === "home" &&
            response.data[0].onboarding_chat === true &&
            response.data[0].phase_one === true &&
            response.data[0].phase_two_sports === true &&
            response.data[0].phase_two_business === true &&
            response.data[0].phase_two_stem === true &&
            response.data[0].phase_two_humanitarian === true &&
            response.data[0].phase_two_nature === true &&
            response.data[0].phase_two_health === true &&
            response.data[0].phase_two_building === true &&
            response.data[0].phase_two_creative === true &&
            response.data[0].phase_three === true &&
            response.data[0].phase_four === true
          ) {
            return props.history.push(`/overview`);
          }
        }
      })
      .catch((error) => {});
  };
  const getUserInfo = (token: string): any => {
    axios
      .get(`${API}/currentuser`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response?.data));
        }
      })
      .catch((error) => {});
  };
  const validateForm = (e) => {
    e.preventDefault();
    if (email == "" && password == "") {
      return setState({
        ...state,
        errorMessage: "please enter your details",
      });
    }
    if (email === "") {
      return setState({
        ...state,
        errorMessage: "Please enter your email",
      });
    }
    if (password === "") {
      return setState({
        ...state,
        errorMessage: "Please enter your password",
      });
    } else {
      sendFormData();
    }
  };
  return (
    <div>
      <Navbar />
      <div className="rdsignup-section paddit">
        <Container>
          <Row className="rsignuprow">
            <Col md={12} className="rsignupdiv">
              {/* <p>
                Registering to this website, you accept our
                <span className="t_plinkspn">
                  <Link to="/terms&conditions" target="_blank"> Terms of Use </Link>{" "}
                </span>{" "}
                and our
                <span className="t_plinkspn">
                  {" "}
                  <Link to="/privacy_policy" target="_blank">Privacy Policy</Link>{" "}
                </span>
              </p> */}
            </Col>
            <Col md={7}>
              <Form className="rdsignupform" onSubmit={validateForm}>
                <div className="rdsignupfrmdv">
                  <h4 className="sgnfrmhder">Log In</h4>
                  <div>
                    <div className="sgnupfrmline"></div>
                    <span className="sgnupdescr">(Welcome back)</span>
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
                <label>
                  <span className="rdfrmlbl">Password</span>
                  <input
                    type={passwordIsOpen ? "password" : "text"}
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    placeholder="Enter your Password"
                    size={75}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        validateForm(e);
                      }
                    }}
                    className="form-control rdsignupinput"
                  />
                </label>
                <div className="text-right">
                  {passwordIsOpen ? (
                    <img
                      src={eye}
                      className="hideeye"
                      onClick={hidePassword}
                      alt="hideeye"
                    />
                  ) : (
                    <img
                      src={eyeclose}
                      className="hideeye"
                      onClick={hidePassword}
                      alt="hideeye"
                    />
                  )}
                </div>
                <div className="rdsigninp">
                  <p>
                    <Link to="/password_recovery">Forgot your password?</Link>
                  </p>
                </div>
                <div className="rdsgnupfrmbtndv">
                  <button
                    type="submit"
                    onClick={validateForm}
                    className="rdsgnfrmbtn rdsgnup-animated"
                  >
                    {!isLoading ? "Login" : "Processing..."}
                  </button>
                </div>
                <p className="rdsgnalready">
                  <Link to="/signup"> Don't have an account?Sign Up</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});

export default Signin;
