import React,{ useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import locator from "../../../assets/locator.png";
import seticon from "../../../assets/seticon.png";
import Alert from "react-bootstrap/Alert";
import mail from "../../../assets/mail_icon.png";
import map from "../../../assets/yudimy-map.png";
import "./contact_page.css";
import Navbar from "../HomeComponents/newnavbar";
import Footer from "../HomeComponents/newfooter";
import Think from "../HomeComponents/ThinkThisIsYou";
import { API } from "../../../config";
import axios from 'axios';

const Contactpage = () => {

  const [ state, setState ] = useState({
    name:'',
    email: '',
    message: '',
    successMessage:'' 
  })
     const {name, email, message, successMessage} = state
     
     const onSubmit=()=>{

       const data={
         name: name,
         email: email,
         message: message
       }
       console.log(data);
      
         axios.post(`${API}/send-contact-support/`,data)
         .then( response => {
           setState({
             ...state,
             successMessage: 'your message has been sent'
           })
         })
         .catch(error => {
          setState({
            ...state,
            successMessage: 'failed to send message'
          })
         })
     }

     const validateForm= (e)=>{
      e.preventDefault();
      if ( name==='' || email === '' || message=== '' ) {
        return setState({
            ...state,
            successMessage: 'all fields are required'
           })
      
      }
      if(name && email && message){
        onSubmit();
      }
     }
     
     const onChangeHandler= (e) =>{
          setState({
            ...state,
            [e.target.name]: e.target.value
          })
     }

  return (
    <div>
    <Navbar contact={true} />
    <Container className="homecontainer" fluid={true}>
      <div className="section-1 newsection-1">
        
          <Row>
            <Col md={12} className="contact_us_div cntctdiv">
              <h2 className="heading_primary pry_heading2">Contact Us</h2>
              <p className="weare">
                We are always excited to hear from you.<br/>Have questions
                or inquiries? Need to integrate Clarity to your system or
                organizations?<br/>Get in contact with our experts let us
                set things in motion.
              </p>
            </Col>
          </Row>
        
      </div>
      <div className="section-2">
        <Container>
          <Row className="margintop">
            <Col md={4}>
              <form className="contactform " onSubmit={validateForm}>
                 
                <h6 className="contact_form_header">Contact Us</h6>
                <input
                  type="text"
                  placeholder="Your Name"
                  name= "name"
                  onChange={onChangeHandler}
                  value = {name}
                  className="contact_info form-control"
                />
                <br/>
                <input
                  type="text"
                  name="email"
                  onChange={onChangeHandler}
                  value= {email}
                  placeholder="Your Email"
                  className="contact_info form-control"
                />
                <br/>
                <textarea
                  placeholder="Your Message"
                  name="message"
                  onChange={onChangeHandler}
                  value= {message}
                  cols={30}
                  rows={10}
                  className="contact_info form-control"
                />
                 {successMessage && (
                   <Alert key={2} variant="success" className="cntfrm-mssg">
                     {successMessage}
                   </Alert>
                   )}
                <div className="cnrtctfrmd">
                  {" "}
                  <span className="contact_btn" onClick={onSubmit} >Send </span>
                </div>
              </form>
            </Col>
            <Col md={8}>
              <Row className="contact_content">
                <Col md={4} className="contact_icons">
                  <img src={locator} className="cnticns" />
                  <p>
                    3, Samuel Street, Ogudu, Lagos, Nigeria.
                  </p>
                </Col>
                <Col md={4} className="contact_icons">
                  <img src={seticon} className="cnticns" />
                  <a href="tel:+2348176100160"><p>+2348176100160</p></a>
                </Col>
                <Col md={4} className="contact_icons">
                  <img src={mail} className="cnticns" />
                  <a href="mailto:Ask@yudimy.com"><p>Ask@yudimy.com</p></a>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="contact_map">
                    <img src={map} className=" img-fluid" />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="contact_social">
             <a href="https://twitter.com/askyudimy?s=08" target="blank"><span className="social_icn twitter"></span></a>
             <a href="https://free.facebook.com/pages/category/Product-Service/109680753747119/?_rdc=1&_rdr" target="blank"><span className="social_icn facebook"></span></a>
             <a href="https://ng.linkedin.com/company/yudimy" target="blank"><span className="social_icn linkedin"></span></a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="section-3">
        <Container>
          <Row>
            <Col md={12}>
              <div className="help-section">
                <h4>
                  THINK THIS IS YOU? LET'S HELP YOU FIX THAT.<br></br>TAKE THE
                  FREE ASSESMENT
                </h4>
                <span className="help-btn">Get Started</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
      <Think />
      <Footer />
    </Container>
    </div>
  );
};
export default Contactpage;
