import React from'react';
import {Container, Row, Col} from 'react-bootstrap';
import clalogo from "../../../assets/clalogon.png";
import './affiliate_landing.css';
import arrow from '../../../assets/Arrowright.png';
import facebk from '../../../assets/afffacebk.png';
import twitter from '../../../assets/afftwitter.png';
import instagram from '../../../assets/affinsta.png';
import linkedin from '../../../assets/afflinkedin.png';


const Afflanding =()=>{
    return(
        <div className="afflndbody">
            <Container>
            <div className="afflndrow">
                    <img src={clalogo} className="affclalogo" />
                    <div className="afflndbtn">Sign In</div>
            </div>   
            <Row >
               <Col md={6}>
                    <div>
                      <p className="affbltxt">Take your passion for people to the next level.</p>
                      <h1 className="afflndheading">Become A clarity Affiliate</h1>
                      <p className="afflndescr">Are you passionate about people and seeing them thrive? 
                          Share clarity with them and get 15% for every referral who 
                          subscribes to a paid plan. </p>
                          <span className="afflandgetstrdbtn">Get started</span>
                    </div>
                    <div>
                        <img src={arrow} className="affsocialmedia" />
                        <img src={facebk} className="affsocialmedia" />
                        <img src={twitter} className="affsocialmedia"/>
                        <img src={instagram} className="affsocialmedia"/>
                        <img src={linkedin} className="affsocialmedia"/>
                    </div>
                </Col>
             </Row>
            </Container>
        </div>
    )
}
export default Afflanding;
 