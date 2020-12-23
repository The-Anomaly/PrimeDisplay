import React from'react';
import {Container, Row, Col} from 'react-bootstrap';
import clalogo from "../../../assets/clalogon.png";
import './affiliate_landing.css';
import backimg from "../../../assets/affbackimg.png";


const Afflanding =()=>{
    return(
        <div className="afflndbody">
            <Container>
            <Row className="afflndrow">
                <Col md={6}>
                    <img src={clalogo} className="affclalogo" />
                    <div>
                      <p className="affbltxt">Take your passion for people to the next level.</p>
                      <h1 className="afflndheading">Become A clarity Affiliate</h1>
                      <p className="afflndescr">Are you passionate about people and seeing them thrive? 
                          Share clarity with them and get 15% for every referral who 
                          subscribes to a paid plan. </p>
                          <span className="afflandgetstrdbtn">Get started</span>
                    </div>
                </Col>
                <Col md={6}>
                    <div><span>Sign In</span></div>
                  {/* <img src={backimg} /> */}
                </Col>
             </Row>
            </Container>
        </div>
    )
}
export default Afflanding;
 {/* <img src={backimg} className="afflndimage"></img> */}