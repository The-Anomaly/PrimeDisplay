import React,{ useState } from "react";
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from 'axios';
import { API } from '../../../config';
import Alert from "react-bootstrap/Alert";


const Signup = withRouter((props: any) => {
  const  [ state, setFormState ] = useState({
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

  const onSubmit=()=>{
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
    //posting data to the api
    axios.post(`${API}/accounts/signup/`, data)
    .then( ( response ) => {
      console.log(response)
      if (response.status === 200){
        localStorage.setItem(
          "userToken",
          JSON.stringify(response?.data?.token)
        );
        setTimeout(()=>{
          props?.history?.push("/confirm_email")
          console.log(props)
        },5000)
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
      
      }
    })
    .catch( (error) => {
      console.log(error.response);
      if (error){
        return setFormState({
              ...state,
            errorMessage: error?.response?.data[0].message,
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
//activating input actions
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
//form validation
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

  if (howYouHeardAboutUs == "") {
    return setFormState({
      ...state,
      errorMessage: "Please empty field",
    });
  }

  if (password == "") {
    return setFormState({
      ...state,
      errorMessage: "Please enter your password",
    });
  }
  if (password && email && firstname && lastname &&howYouHeardAboutUs) {
    onSubmit();
  }
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
                   <Form.Group > 
                  <label>
                  <span className="rdfrmlbl"> First Name</span>
                  <Form.Control
                    type="text"
                    name="firstname"
                    className=" rdsignupinput"
                    onChange={onChangeHandler}
                    value={firstname}
                    placeholder="Enter your first name"
                    
                  />
                </label>  
                </Form.Group> 
                  </Col>
                  <Col md={6}>
                   <Form.Group> 
                    <label>
                  <span className="rdfrmlbl"> Last Name</span>
                  <Form.Control
                    type="text"
                    name="lastname"
                    onChange={onChangeHandler}
                    value={lastname}
                    placeholder="Enter your Last name"
                    className="rdsignupinput"
                  />
                </label> 
                </Form.Group>
                  </Col>
                </Row>
               <Form.Group>
                <label>
                  <span className="rdfrmlbl"> Email Address </span>
                  <Form.Control
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    placeholder="Enter your Email Address"
                    className=" rdsignupinput"
                  />
                </label>
                </Form.Group>
                <Form.Group>
                <label>
                  <span className="rdfrmlbl">Password</span>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    placeholder="Enter your Password"
                    className=" rdsignupinput passwd-image"
                  />
                </label>
                </Form.Group>
                <p className="redsgnfrmpar">
                  Your password must be at least 6 characters long and must
                  contain letters, numbers and special characters. Cannot
                  contain whitespace.
                </p>
                <Row>
                  <Col md={6}>
                    {" "}
                    <Form.Group>
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
                    </Form.Group> 
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                    <span className="rdfrmlbl rdfrmlblrf"> Referral code </span>
                    <input
                      type="text"
                      name="referralCode"
                      className="rdfrmtinptt"
                      value={referralCode}
                      size={25}
                      onChange={onChangeHandler}
                      placeholder="form-control Enter referral code (optional)"
                    />
                    </Form.Group> 
                  </Col>
                </Row>
               
                <div className="rdsgnupfrmbtndv">
                  <span onClick={onSubmit}  className="rdsgnfrmbtn rdsgnup-animated">Sign Up</span>
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
});
export default Signup;
