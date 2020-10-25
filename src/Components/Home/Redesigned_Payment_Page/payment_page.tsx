import React from 'react'
import { Container, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  mark  from '../../../assets/mark-icn.png';
import mark_blue from  '../../../assets/blue-mark.png';
import mark_green from '../../../assets/green-mark.png';
import './payment.css';

const Paymentpage=()=>{
    return(
        <div>
            <div className="payment-section">
                <Container>
                    <div className="payment-decription"><h3>We have curated payments plans with you in mind</h3></div>
                    <Row className="centered_payment">
                        <Col md={3} className="margined_col">
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
                        <Col md={3} sm={9} className="margined_col">
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
                                       <li><img src={mark_blue} className="card-image"/> Most suitable career business expression </li>
                                       <li><img src={mark_blue} className="card-image"/>Report on best roles to apply </li>
                                       <li><img src={mark_blue} className="card-image"/>Career drivers and how to leverage them</li>
                                       <li><img src={mark_blue} className="card-image"/>Highlights on areas for career optimization.</li>
                                   </ul>
                                   <span className="card_btn btn-blue">Upgrade to Insight</span>
                               </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} sm={9} className="margined_col">
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
                                       <li><img src={mark_green} className="card-image"/>40 minutes career-planning session with a clarity counsellor</li>
                                   </ul>
                                   <span className="card_btn btn-green card_btn--animated">Upgrade to Diamond</span>
                               </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="centered_payment">
                        <Col md={3}>
                            <Card className="subcription-card">
                                <Card.Header>
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
        </div>
    )
}
export default Paymentpage;