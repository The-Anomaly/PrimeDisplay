import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import mark from "../../../assets/mark-icn.png";
import mark_blue from "../../../assets/blue-mark.png";
import mark_green from "../../../assets/green-mark.png";
import "./payment.css";
import Navbar from "../HomeComponents/newnavbar";
import Footer from "../HomeComponents/newfooter";

const Paymentpage=()=>{
    return(
        <div>
            <Navbar/>
            <div className="payment-section">
                <Container>
                    <div className="payment-decription"><h3>We have curated payments plans with you in mind</h3></div>
                    <Row className="payment-plans">
                          <Col md={5} className="margined_col">
                             <Card className="plan-cards one-off">
                                 <Card.Body>
                                 <Link to="/payment"><h6>One off Clarity Experience</h6></Link>
                                 </Card.Body>
                             </Card>
                             <div className="plan-card-arr"><i className="fas fa-caret-down"></i></div>
                         </Col>
                        <Col md={5}>
                            <Card className="plan-cards pce">
                              <Card.Body>
                                  <Link to="/progressive_clarity_experience"><h6>Progressive Clarity Experience</h6></Link>
                              </Card.Body>
                            </Card>
                            
                        </Col>
                    </Row>
                    <Row className="centered_payment">
                        <Col md={3} sm={6} className="margined_col">
                            <Card className="h-300 shadow-sm bg-white payment-card">
                               <Card.Header className="payment-header">
                                   <h4>N0.00  <span>/one-off</span></h4> 
                               </Card.Header>
                               <Card.Body>
                                   <div className="card-div">
                                     <h6>Free</h6>
                                     <p>pilnar pivinar tempus o tempor impermjidiet mattis acumsan nulia vel</p>
                                   </div>
                                   <ul className="card-list">
                                       <li><img src={mark} className="card-image" />Career fitness score</li>
                                       <li><img src={mark} className="card-image"/>Career personality type</li>
                                       <li><img src={mark} className="card-image"/>Cv builder</li>
                                   </ul>
                                   <span className="card_btn btn-yellow">Subscribe</span>
                               </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} sm={6} className="margined_col">
                         <Card className=" shadow-sm bg-white payment-card">
                              <Card.Header className="payment-header">
                                   <h4>N3500  <span>/one-off</span></h4> 
                               </Card.Header>
                               <Card.Body>
                                   <div className="card-div ">
                                     <h6 className="blue">Insight Plan</h6>
                                     <p>Quis cras adipiscing vestibulum ut praesent lorem aliquam dictum habitant.</p>
                                   </div>
                                   <ul className="card-list">
                                       <li><img src={mark_blue} className="card-image" />Everything under <span>FREE</span></li>
                                       <li><img src={mark_blue} className="card-image"/>Strenght & Weaknes Report</li>
                                       <li><img src={mark_blue} className="card-image"/>Competence analysis Report </li>
                                       <li><div className="card-list-box"><div><img src={mark_blue} className="card-image"/></div>Most suitable career business expression</div> </li>
                                       <li><img src={mark_blue} className="card-image"/>Report on best roles to apply </li>
                                       <li><div className="card-list-box"><div><img src={mark_blue} className="card-image"/></div>Career drivers and how to leverage them</div></li>
                                       <li><div className="card-list-box"><div><img src={mark_blue} className="card-image"/></div>Highlights on areas for career optimization.</div></li>
                                   </ul>
                                   <span className="card_btn btn-blue">Upgrade to Insight</span>
                               </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} sm={6} className="margined_col">
                        <Card className="h-300 shadow-sm bg-white payment-card">
                               <Card.Header className="payment-header">
                                   <h4>N10000  <span>/one-off</span></h4> 
                               </Card.Header>
                               <Card.Body>
                                   <div className="card-div">
                                     <h6 className="green">Direction Plan</h6>
                                     <p>pilnar pivinar tempus o tempor impermjidiet mattis acumsan nulia vel</p>
                                   </div>
                                   <ul className="card-list">
                                       <li><img src={mark_green} className="card-image" />Everything under <span className="blue">INSIGHT</span></li>
                                       <li><div className="card-list-box"><div><img src={mark_green} className="card-image"/></div>40 minutes career-planning session with a clarity counsellor</div></li>
                                   </ul>
                                   <span className="card_btn btn-green card_btn--animated">Upgrade to Diamond</span>
                               </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="centered_payment">
                        <Col md={3} sm={6} className="margined_col">
                            <Card className="subcription-card">
                                <Card.Header className="subscription-header">
                                    <h6 className="red">Gift a Subscription</h6> 
                                </Card.Header>
                                <Card.Body>
                                   <p className="sub-p">Give a gift of success. Choose from among the three different plans</p>
                                   <span className="card_btn btn-red card_btn--animated">Give a Clarity Subscription</span>    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
         <Footer/>
       </div>
    );   
};
export default Paymentpage;
