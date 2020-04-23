import * as React from 'react';
//bstp
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// footer statics
import facebook from '../../../assets/facebook.png';
import twitter from '../../../assets/twitter.png';
import instagram from '../../../assets/instagram.png';
import linkedin from '../../../assets/linkedin.png';




const Footer: React.FC = (props) => {
  return (
      <div>
           {/* footer starts here */}
           <Row className="fifthsecrow ">
                    <Col md={5}>
                       <div className="iconwrapper"><img src={facebook} className="iconimage" alt="facebook"/> <img src={twitter} className="iconimage" alt="twitter"/> <img src={instagram} className="iconimage" alt="instagram"/> <img src={linkedin} className="iconimage" alt="linkedin"/> </div>
                     </Col>
                    <Col md={7} className="text-center takeAssesment">
                       <div className="footer_first_wrapper">
                            <div>
                                <div className="footer_tit">Company</div>
                                <div className="About-Us">About Us</div>
                                <div className="About-Us">Terms and Condition</div>
                                <div className="About-Us">Privacy Policy</div>
                            </div>
                            <div>
                                <div className="footer_tit">Services</div>
                                <div className="About-Us">Clarity by Yudimy Services Ltd.</div>
                                <div className="About-Us">Clarity for Teams</div>
                            </div>
                            <div>
                                <div className="footer_tit">Connect</div>
                                <div className="About-Us">Contact Us</div>
                                <div className="About-Us">FAQ</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="reserved"> Clarity by Yudimy. All rights reserved</div>
                    </Col>
                </Row>
                {/* footer starts here */}
      </div>
  );
};

export default Footer;
