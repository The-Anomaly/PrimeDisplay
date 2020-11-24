import React, { useState } from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { API } from "../../../config";
import eye from "../../../assets/eye.png";
import eyeclose from "../../../assets/eye-off.png";

const counsellorSignin = withRouter((props: any) => {
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
      .post(`${API}/accounts/counsellor-login`, data)
      .then((response) => {
        console.log(response);
        getUserInfo(response.data.token);
        localStorage.setItem(
          "userToken",
          JSON.stringify(response?.data?.token)
        );
        setState({
          ...state,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error && error?.response?.status == 500) {
          return setState({
            ...state,
            errorMessage: "Failed to login, internal server error.",
            isLoading: false,
          });
        }
        if (error && error.response && error.response.data) {
          return setState({
            ...state,
            errorMessage: error?.response?.data[0]?.message,
            isLoading: false,
          });
        }
        if (error && error?.response?.status === 404) {
          return setState({
            ...state,
            errorMessage: error?.response?.data.error,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "Failed to Login",
          isLoading: false,
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

  const getUserInfo = (token: string): any => {
    axios
      .get(`${API}/currentuser`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response?.data));
          props.history.push("/counselloroverview");
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
                    <span className="sgnupdescr">
                      (Welcome back Counsellor)
                    </span>
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
                    <Link to="/counsellor/signin/forgotpassword">
                      Forgot your password?
                    </Link>
                  </p>
                </div>
                <div className="rdsgnupfrmbtndv">
                  <button
                    type="submit"
                    onClick={validateForm}
                    className="rdsgnfrmbtn rdsgnup-animated"
                  >
                    {!isLoading ? "Log In" : "Processing..."}
                  </button>
                </div>
                <p className="rdsgnalready">
                <Link to="/counsellor/signup"> Don't have an account? Sign Up</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});

export default counsellorSignin;
