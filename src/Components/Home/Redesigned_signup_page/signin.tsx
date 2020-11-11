import React,{ useState } from 'react';
import Navbar from "../HomeComponents/newnavbar";
import "./signup.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from 'axios';
import { API } from '../../../config';



const Signin = ()=>{
  const [ state, setState ] = useState({
    email: '',
    password: '',
    errorMessage: '',
    successMessage: '',
    isLoading: false
  });
  const {email, password, errorMessage, successMessage, isLoading} = state
  const sendFormData = () => {
    setState({
    ...state,
    isLoading: true
    });
    const data ={
    email,
    password
    };
   axios.post(`${API}/accounts/login`, data )
   .then((response) => {
     if (response.status === 200){
         
      setState ({
       ...state,
       successMessage: response.data[0].message,
       isLoading: false 
     });
    }
   })
}


    return(
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
                  <h4 className="sgnfrmhder">Log In</h4>
                  <div>
                    <div className="sgnupfrmline"></div>
                    <span className="sgnupdescr">(Welcome back)</span>
                  </div>
                </div>
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
                <div className="rdsigninp">
                    <p><Link to="/newsignin">Forgot your password?</Link></p>
                </div>
                <div className="rdsgnupfrmbtndv">
                  <span className="rdsgnfrmbtn rdsgnup-animated">Log In</span>
                </div>
                <p className="rdsgnalready">
                  Don't have an account? <Link to="/newsignup">Sign Up</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
   </div>
    )
}

export default Signin;