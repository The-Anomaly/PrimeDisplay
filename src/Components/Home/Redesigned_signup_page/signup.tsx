import React,{ useState } from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from 'axios';
import { API } from '../../../config';
import Alert from "react-bootstrap/Alert";


const Signup = () => {
  const  [ state, setFormState ] =useState({
    firstname:'',
    lastname: '',
    email: '',
    password: '',
    howYouHeardAboutUs: '',
    referralCode: '',
    successMessage: '',
    errorMessage: '',
    error: false,
    isLoading: false
  })
  const {firstname, email, password, howYouHeardAboutUs, referralCode,lastname,successMessage,errorMessage} = state

  const onSubmit=(props:any)=>{
      setFormState({...state, isLoading: true })
    const data= {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      info: howYouHeardAboutUs,
      referral_code: referralCode
    }
    console.log(data);
    axios.post(`${API}/accounts/signup/`, data)
    .then( ( response ) => {
      if (response.status === 200){
         setFormState({
          ...state,
          errorMessage: "",
          successMessage: response.data.message, //question
          isLoading:false,
          error: true
        });
        localStorage.setItem(
          "userEmail",
          JSON.stringify(email)
        );
        setTimeout(()=>{
          props.history.push("/confirm_email")
        },5000)
      }
    })
    .catch( (error) => {
      console.log(error.response);
      if (error){
        return setFormState({
              ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
            error: true
         })
    }
    setFormState({
      ...state,
      errorMessage: "signup failed",
      isLoading: false,
      error: true
    });
  });
 };

  const onChangeHandler =(e) =>{
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage:"",
      successMessage:""
    })
  };
 const formActionHandler = (e) => {
    setFormState({
      ...state,
      howYouHeardAboutUs: e.target.value,
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
              <Form className="rdsignupform">
                <div className="rdsignupfrmdv">
                  <h4 className="sgnfrmhder">Sign Up</h4>
                  <div>
                    <div className="sgnupfrmline"></div>
                    <span className="sgnupdescr">(to get Clarity)</span>
                  </div>
                </div>
                {successMessage && (
                <Alert key={2} variant="success" className=" alertzuccess" >
                   {successMessage}
                </Alert>
                )}
                {errorMessage && (
                <Alert key={2} variant="danger" className="alertzuccess" >
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
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
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
                    <select onChange={formActionHandler} className="rdseltinpt form-control" required>
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
                  <span onClick={onSubmit} className="rdsgnfrmbtn rdsgnup-animated">Sign Up</span>
                </div>
                <p className="rdsgnalready">
                  Already Registered? <Link to="/newsignin">Sign In</Link>
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
