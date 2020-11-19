import React, { useState } from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { API } from "../../../config";
import Alert from "react-bootstrap/Alert";
import eye from "../../../assets/eye.png";
import eyeclosed from "../../../assets/eye-off.png";
import { useEffect } from "react";

const counsellorSignup = withRouter((props: any) => {
  const [state, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    howYouHeardAboutUs: "",
    referralCode: "",
    successMessage: "",
    errorMessage: "",
    passwordIsOpen: false,
    error: false,
    isLoading: false,
  });
  const {
    firstname,
    email,
    passwordIsOpen,
    password,
    howYouHeardAboutUs,
    referralCode,
    lastname,
    isLoading,
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
      info: howYouHeardAboutUs,
      referral_code: referralCode,
    };
    console.log(data);
    //posting data to the api
    axios.post(`${API}/accounts/counsellor-signup/`, data)
    .then( ( response ) => {
      console.log(response)
      setFormState({
          ...state,
          successMessage: response.data[0].message,
          isLoading: false,
      })
      if (response.status === 200){
       
         localStorage.setItem(
          "userEmail",
          JSON.stringify(email)
        );
        setTimeout(()=>{
          props?.history?.push("/confirm_email")
          console.log(props)
        },5000)
         setFormState({
          ...state,
          errorMessage: "",
          successMessage: response.data.message, 
          isLoading:false,
          error: true
        });
       
      
      }
    })
    .catch( (error) => {
      console.log(error.response);
      if (error && error.response && error.response.data){
        return setFormState({
              ...state,
            errorMessage: error?.response?.data[0].message,
            isLoading: false,
            error: true,
          });
        }
        setFormState({
          ...state,
          errorMessage: "signup failed",
          isLoading: false,
          error: true,
        });
      });
  };
  const validateForm = (e) => { 
    e.preventDefault();
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
    }
    if (password && email) {
      onSubmit();
    }
  };
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
      howYouHeardAboutUs: e.target.value,
    });
  };
  const hidePassword=()=>{
    setFormState({
      ...state,
      passwordIsOpen:state.passwordIsOpen?false:true
    })
  }
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
                  <h4 className="sgnfrmhder">Sign Up</h4>
                  <div>
                    <div className="sgnupfrmline"></div>
                    <span className="sgnupdescr">(Become a Clarity Counsellor)</span>
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
                  <img src={eyeclosed} className="hideeye" onClick={hidePassword} alt="hideeye" />
                </div>
                <p className="redsgnfrmpar">
                  Your password must be at least 6 characters long and must
                  contain letters, numbers and special characters. Cannot
                  contain whitespace.
                </p>
                <Row>
                  <Col md={6}>
                    {" "}
                    <span className="rdfrmlblslt">How you heard about us</span>
                    <select
                      onChange={formActionHandler}
                      className="rdseltinpt form-control"
                      required
                    >
                      <option
                        value=""
                        className="rdsltopt"
                        disabled
                        selected
                        hidden
                      >
                        --Please select--
                      </option>
                      <option value="Facebook" className="rdsltopt">
                        Facebook
                      </option>
                      <option value="Linkedin" className="rdsltopt">
                        Linkedin
                      </option>
                      <option value="Instagram" className="rdsltopt">
                        Instagram
                      </option>
                      <option value="Referral Link" className="rdsltopt">
                        Referral link
                      </option>
                      <option value="4" className="rdsltopt">
                        Friend
                      </option>
                    </select>
                  </Col>
                  <Col md={6}>
                    <span className="rdfrmlbl rdfrmlblrf"> Referral code </span>
                    <input
                      type="text"
                      size={25}
                      name="referralCode"
                      className="rdfrmtinptt"
                      value={referralCode}
                      onChange={onChangeHandler}
                      placeholder="Enter referral code (optional)"
                    />
                  </Col>
                </Row>
                <div className="rdsgnupfrmbtndv">
                  <span
                    onClick={onSubmit}
                    className="rdsgnfrmbtn rdsgnup-animated"
                  >
                    {!isLoading ? "Sign Up" : "Signing Up"}
                  </span>
                </div>
                <p className="rdsgnalready">
                  Already Registered? <Link to="/counsellorsignin">Sign In</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});
export default counsellorSignup;
