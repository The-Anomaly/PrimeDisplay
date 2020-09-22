import * as React from 'react';
import '../Home/Home.css';
import './recruitmentform.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../HomeComponents/footer';
import Navbar from '../HomeComponents/navbar';
import Form from 'react-bootstrap/Form';
import CustomButton from './CustomButton';
import CustomButton_1 from './CustomButton_1';
import {userContext} from '../../../createContext';
// team


export const RecruitmentAnalysisForm =()=> {
    const [ buttonIsActive,setIsactive ]:any = React.useState({FirstbuttonIsClicked:false,SecondbuttonIsClicked:false,ThirdbuttonIsClicked:false,FourthtbuttonIsClicked:false});
    return (
    <div>
        <Navbar/>
        <Container fluid={true}>
            <Row className="firstrowcf cftcontent">
                <Col md={8}>
                    <div className="rfheader">
                        Recruitment Needs Analysis Form
                    </div>
                    <div className="rfborderw"><div className="rfborder"></div></div>
                </Col>
                <Col md={5} className="formwrap">
                    <Form>
                        <Form.Group className="llsss" controlId="formBasicName">
                            <Form.Label className="offserr"> <span className="questionno">1</span><span className="questionarrow">&#8594;</span> Name <span className="reqfield">*</span></Form.Label>
                            <Form.Control type="Name" className="reqname" placeholder="Type your answer here..." />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="llsss" controlId="formBasicOganization">
                            <Form.Label className="offserr"> <span className="questionno">2</span><span className="questionarrow">&#8594;</span> Organization <span className="reqfield">*</span></Form.Label>
                            <Form.Control type="Name" className="reqname" placeholder="Type your answer here..." />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="llsss" controlId="formBasicMobileNumber">
                            <Form.Label className="offserr"> <span className="questionno">3</span><span className="questionarrow">&#8594;</span> Mobile number <span className="reqfield">*</span></Form.Label>
                            <Form.Control type="Name" className="reqname" placeholder="Type your answer here..." />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="llsss" controlId="formBasicEmail">
                            <Form.Label className="offserr"> <span className="questionno">4</span><span className="questionarrow">&#8594;</span> Email <span className="reqfield">*</span></Form.Label>
                            <Form.Control type="Name" className="reqname" placeholder="Type your answer here..." />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="llsss" controlId="formBasicEmail">
                            <Form.Label className="offserr"> <span className="questionno">5</span>
                                <span className="questionarrow">&#8594;</span> Do you have a job description prepared <span className="reqfield">*</span></Form.Label>
                                    <userContext.Provider value={{...buttonIsActive,setIsactive}}>
                                        <CustomButton questionNumber='A' Answer="No"/>
                                        <CustomButton_1 questionNumber='B' Answer="Yes"/>
                                    </userContext.Provider>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        <Footer/>
        </Container>
    </div>
  )
}
