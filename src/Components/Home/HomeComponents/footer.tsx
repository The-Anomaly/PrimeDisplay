import * as React from 'react';
//bstp
import './footer.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// footer statics
import facebook from '../../../assets/facebook.png';
import twitter from '../../../assets/twitter.png';
import instagram from '../../../assets/instagram.png';
import { Link } from 'react-router-dom';
import linkedin from '../../../assets/linkedin.png';




const Footer: React.FC = (props) => {
  return (
      <div>
           {/* footer starts here */}
           <Row className='fifthsecrow '>
                    <Col md={5}>
                       <div className='iconwrapper'><img src={facebook} className='iconimage' alt='facebook'/> <img src={twitter} className='iconimage' alt='twitter'/> <img src={instagram} className='iconimage' alt='instagram'/> <img src={linkedin} className='iconimage' alt='linkedin'/> </div>
                     </Col>
                    <Col md={7} className='text-center takeAssesment'>
                       <div className='footer_first_wrapper'>
                            <div>
                                <div className='footer_tit'>Company</div>
                                <div className='About-Us'><Link to='/about' className='linksss'>About Us</Link></div>
                                <div className='About-Us'>Terms and Condition</div>
                                <div className='About-Us'>Privacy Policy</div>
                            </div>
                            <div>
                                <div className='footer_tit'>Services</div>
                                <div className='About-Us'>Clarity by Yudimy Services Ltd.</div>
                                <div className='About-Us'><Link to='/clarityforteams' className='linksss'>Clarity for Teams</Link></div>
                                <div className='About-Us'><Link to='/faq' className='linksss'>FAQ</Link></div>
                            </div>
                            <div>
                                <div className='footer_tit'>Contact Us</div>
                                <div className='About-Us'><span className='linksss'>Email: clarity@yudimy.com</span></div>
                                <div className='About-Us'><span className='linksss'>Phone: +234817610060</span></div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className='reserved'> Clarity by Yudimy. All rights reserved</div>
                    </Col>
                </Row>
                {/* footer starts here */}
      </div>
  );
};

export default Footer;
