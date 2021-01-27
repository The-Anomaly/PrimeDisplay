import React, { useState, useEffect } from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { API } from "../../../config";
import Alert from "react-bootstrap/Alert";
import eye from "../../../assets/eye.png";
import eyeclose from "../../../assets/eye-off.png";
import drpdwnarr from "../../../assets/dwn-arrw.png";

const AffiliatesSignup = withRouter((props: any) => {
  const [state, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    affiliate_name: "",
    referralCode: "",
    successMessage: "",
    errorMessage: "",
    passwordIsOpen: true,
    error: false,
    isLoading: false,
  });
  const {
    firstname,
    email,
    passwordIsOpen,
    password,
    isLoading,
    affiliate_name,
    referralCode,
    lastname,
    successMessage,
    errorMessage,
  } = state;

  const onSubmit = () => {
    setFormState({ ...state, isLoading: true });
    const data = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      affiliate_name: affiliate_name,
    };
    //posting data to the api
    axios
      .post(`${API}/affiliate/signup/`, data)
      .then((response) => {
        window.scrollTo(-0,-0)
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("userEmail", JSON.stringify(email));
          setTimeout(() => {
            setFormState({
              ...state,
              successMessage:"SignUp successfull",
              errorMessage:""
            })
            localStorage.setItem(
              "userToken",
              JSON.stringify(response?.data.token)
            );
          return  props?.history?.push("/affiliates");
          }, 5000);
          setFormState({
            ...state,
            errorMessage: "",
            successMessage: response.data.message,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
        window.scrollTo(-0, -0);
        if (error && error.response && error.response.data) {
          return setFormState({
            ...state,
            errorMessage: error?.response?.data.message,
            isLoading: false,
            error: true,
          });
        }
        setFormState({
          ...state,
          errorMessage: "signup failed, check your internet connection",
          isLoading: false,
          error: true,
        });
      });
  };
  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const referralKey = query.get("referral");
    if (referralKey) {
      setFormState({
        ...state,
        referralCode: referralKey,
      });
    }
  }, []);
  const onChangeHandler = (e) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      successMessage: "",
    });
  };
  const formActionHandler = (e) => {
    setFormState({
      ...state,
      affiliate_name: e.target.value,
    });
  };
  const validateForm = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return setFormState({
        ...state,
        errorMessage: "Password must be at least 6 characters long",
        isLoading: false,
      });
    }
    if (firstname == "" && lastname == "" && email == "" && password == "") {
      return setFormState({
        ...state,
        errorMessage: "please enter your details",
      });
    }
    if (firstname == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your first name",
      });
    }
    if (lastname == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your lastname",
      });
    }
    if (affiliate_name == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter you heard",
      });
    }
    if (email == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your email",
      });
    }

    if (password == "") {
      return setFormState({
        ...state,
        errorMessage: "Please enter your password",
      });
    } else {
      onSubmit();
    }
  };
  const hidePassword = () => {
    setFormState({
      ...state,
      passwordIsOpen: state.passwordIsOpen ? false : true,
    });
  };
  return (
    <div>
      <Navbar />
      <div className="rdsignup-section paddit">
        <Container>
          <Row className="rsignuprow">
            <Col md={12} className="rsignupdiv">
              <p>
                Registering to this website, you accept our
                <span className="t_plinkspn">
                  <Link to="/terms&conditions" target="_blank">
                    {" "}
                    Terms of Use{" "}
                  </Link>{" "}
                </span>{" "}
                and our
                <span className="t_plinkspn">
                  {" "}
                  <Link to="/privacy_policy" target="_blank">
                    Privacy Policy
                  </Link>{" "}
                </span>
              </p>
            </Col>
            <Col md={7}>
              <Form className="rdsignupform" onSubmit={validateForm}>
                <div className="rdsignupfrmdv">
                  <h4 className="sgnfrmhder">Sign Up</h4>
                  <div>
                    <div className="sgnupfrmline"></div>
                    <span className="sgnupdescr">(to get Clarity)</span>
                  </div>
                </div>
                {successMessage && (
                  <Alert key={2} variant="success" className=" alertzuccess">
                    {successMessage}
                  </Alert>
                )}
                {errorMessage && (
                  <Alert key={2} variant="danger" className="alertzuccess">
                    {errorMessage}
                  </Alert>
                )}
                <Row>
                  <Col md={6}>
                    <label>
                      <span className="rdfrmlbl"> First Name</span>
                      <input
                        type="text"
                        name="firstname"
                        onChange={onChangeHandler}
                        value={firstname}
                        placeholder="Enter your first name"
                        size={75}
                        className="form-control rdsignupinput"
                      />
                    </label>
                  </Col>
                  <Col md={6}>
                    <label>
                      <span className="rdfrmlbl"> Last Name</span>
                      <input
                        type="text"
                        name="lastname"
                        onChange={onChangeHandler}
                        value={lastname}
                        placeholder="Enter your Last name"
                        size={75}
                        className="form-control rdsignupinput"
                      />
                    </label>
                  </Col>
                </Row>

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
                <p className="redsgnfrmpar">
                  Your password must be at least 6 characters long and must
                  contain letters, numbers and special characters. Cannot
                  contain whitespace.
                </p>
                <Row>
                  <Col md={12}>
                    <label>
                      <span className="rdfrmlbl"> Affiliate Name</span>
                      <input
                        type="text"
                        name="affiliate_name"
                        onChange={onChangeHandler}
                        value={affiliate_name}
                        placeholder="Enter Affiliate Name"
                        size={75}
                        className="form-control rdsignupinput"
                      />
                    </label>
                  </Col>
                </Row>
                <div className="rdsgnupfrmbtndv">
                  <button
                    type="submit"
                    onClick={validateForm}
                    className="rdsgnfrmbtn rdsgnup-animated"
                  >
                    {!isLoading ? "Sign Up" : "Processing..."}
                  </button>
                </div>
                <p className="rdsgnalready">
                  <Link to="/affiliates/signin">
                    {" "}
                    Already Registered? Sign In
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});
export default AffiliatesSignup;
