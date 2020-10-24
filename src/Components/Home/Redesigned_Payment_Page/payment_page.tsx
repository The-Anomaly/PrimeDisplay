import React from 'react'
import { Container, Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import  mark  from '../../../assets/mark-icn.png'

const Paymentpage=()=>{
    return(
        <div>
            <div className="section-one">
                <Container>
                    <Row>
                        <Col md={4}>
                            <Card className="h-300 shadow-sm bg-white rounded">
                               <Card.Header>
                                   <strong>N0.00</strong> <span>/one-off</span>
                               </Card.Header>
                               <Card.Body>
                                   <div>
                                     <h6>Free</h6>
                                     <p>pilnar pivinar tempus o tempor impermjidiet mattis acumsan nulia vel</p>
                                   </div>
                                   <div>
                                       <div className="flexed-div"><img src={mark} /><p>Career fitness score</p></div>
                                       <div className="flexed-div"><img src={mark}/><p>Career personality type</p></div>
                                       <div className="flexed-div"><img src={mark}/><p>Cv builder</p></div>
                                   </div>
                               </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>

                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default Paymentpage;