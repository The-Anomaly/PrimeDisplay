import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import locator from "../../../assets/locator.png";
import seticon from "../../../assets/seticon.png";
import email from "../../../assets/mail_icon.png";
import map from "../../../assets/map.png";
import "./contact_page.css";
import Navbar from "../HomeComponents/newnavbar";
import Footer from "../HomeComponents/newfooter";
import Think from "../HomeComponents/ThinkThisIsYou";

const Contactpage = () => {
  return (
    <div>
    <Navbar contact={true} />
    <Container className="homecontainer" fluid={true}>
      <div className="section-1">
        <Container>
          <Row>
            <Col md={12} className="contact_us_div">
              <h2 className="heading_primary">Contact Us</h2>
              <p>
                We are always excited to hear from you.<br></br>Have questions
                or enquiries, need to integrate clarity to your system or
                organizations?<br></br>Get in contact with our experts let us
                set things in motion.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section-2">
        <Container>
          <Row className="margintop">
            <Col md={4}>
              <form className="contactform ">
                <h6 className="contact_form_header">Contact Us</h6>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="contact_info form-control"
                />
                <br></br>
                <input
                  type="text"
                  placeholder="Your Email"
                  className="contact_info form-control"
                />
                <br></br>
                <textarea
                  placeholder="Your Message"
                  cols={30}
                  rows={10}
                  className="contact_info form-control"
                />
                <div>
                  {" "}
                  <span className="contact_btn">Send </span>
                </div>
              </form>
            </Col>
            <Col md={8}>
              <Row className="contact_content">
                <Col md={4} className="contact_icons">
                  <img src={locator} className="cnticns" />
                  <p>
                    6386 spring St undefined Anchorage, Georgia 12473 united
                    states
                  </p>
                </Col>
                <Col md={4} className="contact_icons">
                  <img src={seticon} className="cnticns" />
                  <p>(843)555-0130</p>
                </Col>
                <Col md={4} className="contact_icons">
                  <img src={email} className="cnticns" />
                  <p>willie.jennings@example.com</p>
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
                <span className="social_icn twitter"></span>
                <span className="social_icn facebook"></span>
                <span className="social_icn linkedin"></span>
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
