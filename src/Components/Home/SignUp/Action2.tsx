import * as React from "react";
import Navbar from "../HomeComponents/newnavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import "./Action2.css";
import ArrowDown from "../../../assets/arrow-down.svg";



const Action2 = () =>{
    return(
        <>
        <Navbar />
        <div className="action2-section">

        <Container className="action2-container" fluid ={true}>
        <div className="action2-header">
                <p className="action2-heading">Please select a plan</p>
            </div>
            <Row className="action2-row">
                <Col md={6} sm={12} className="action2-cards">
                    <div className="card2-body">
                        <div className="card2-header">
                            <h1> Trial Discount</h1>
                        </div>
                        <div className="card2-info">
                            <p>Sed turpis urna velit at. Vulputate eget fermentum, aliquam sagittis, a.</p>
                        </div> 
                        <div className="card2-amount">
                            <p>N5000 <span className="for-1-month"> for 1 month </span></p>
                            </div>
                            <div className="buy-button">
                                <button className="buy-btn">Buy</button>
                                </div>
                            </div>
                                <hr className ="line-divider" />
                                
                                <div className= "whats-included">
                                    <p>Whats included</p> <div className="down-arrow"><img src={ArrowDown} className="arrow-down"/></div>

                                </div>

                    


                    </Col>

                    <Col md={6} sm={12} className="action2-cards">
                    <div className="card2-body">
                        <div className="card2-header">
                            <h1> Trial Discount</h1>
                        </div>
                        <div className="card2-info">
                            <p>Sed turpis urna velit at. Vulputate eget fermentum, aliquam sagittis, a.</p>
                        </div> 
                        <div className="card2-amount">
                            <p>N15000 <span className="for-1-month"> for 3 months </span></p>
                            </div>
                            <div className="buy-button">
                                <button className="buy-btn">Buy</button>
                                </div>
                            </div>
                                <hr className ="line-divider" />
                                
                                <div className= "whats-included whats-included1">
                                    <p>Whats included</p> <div className="down-arrow"><img src={ArrowDown} className="arrow-down"/></div>

                                </div>

                    


                    </Col>
            
            
            
            </Row>


        </Container>

        
        </div>

        </>

    )
}

export default Action2