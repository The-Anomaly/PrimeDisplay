import * as React from 'react';
import './Home.css';
import Navbar from '../HomeComponents/navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RightTopImage from '../../../assets/blank_image_container.png';
import RightTopImageSmall from '../../../assets/blank_image_container_small.png';
import one from '../../../assets/one.png';
import two from '../../../assets/two.png';
import three from '../../../assets/three.png';
import four from '../../../assets/four.png';
import Footer from '../HomeComponents/footer';
import TakeAssessment from '../HomeComponents/TakeAssesment/takeAssessment';
import stepgood from '../../../assets/stepgood.png';
import stepone from '../../../assets/steptwo.png';
import steptwo from '../../../assets/stepthree.png';


const Home:React.FC =()=>{
    return(
        <div>
           <Navbar/>
           <Container fluid={true}>
                <Row className="firstrow">
                    <Col md={5} sm={{span:12,order:1}} xs={{span:12,order:12}} className="firstrowtxt">
                        <div>Not feeling in control</div>
                        <div>of your life, career</div>
                        <div>or business?</div>
                        <div className="Clarity-is-the-solution">
                            Clarity is the solution
                        </div>
                    </Col>
                    <Col md={7} sm={{span:12,order:12}} xs={{span:12,order:1}}>
                        <img src={RightTopImage} className="homebanner0" alt="homebanner"/>
                    </Col>
                </Row>
                <Row className="secondRow Rectangle-8">
                    <Col md={12} className="We-are-like">
                        We are like Google Maps but for your life
                    </Col>
                    <Col md={12} className="secondimagearea">
                       <Row>
                           <Col md={4}>
                                <div>
                                    <img src={RightTopImageSmall} className="homebanner1" alt='homebanner1'/>
                                </div>
                           </Col>
                           <Col md={7}>
                                <div className="cards-section1">
                                    <div className="clarity-card">
                                        <div className="Ellipse-4">
                                        <div id="wrapper"> <img src={one} className="oneimg" alt="one" /><div className="line-top"></div></div>
                                        </div>
                                        <div className="Clarity-of-Thought">
                                            Clarity of Thought
                                        </div>
                                        <div className="Clairty-lorem">Clairty lorem ipsum dolor sit amet</div>
                                    </div>
                                    <div className="clarity-card">
                                        <div className="Ellipse-4"><div id="wrapper"><img src={two} className="oneimg" alt="one" /><div className="line-top secondline"></div></div></div>
                                        <div className="Clarity-of-Thought">
                                        Self Discovery
                                        </div>
                                        <div className="Clairty-lorem">Clairty lorem ipsum dolor sit amet</div>
                                    </div>
                                    <div className="clarity-card">
                                        <div className="Ellipse-4"><div id="wrapper"><img src={three} className="oneimg" alt="one" /><div className="line-top"></div></div></div>
                                        <div className="Clarity-of-Thought">
                                            Level
                                        </div>
                                        <div className="Clarity-of-Thought">Up</div>
                                        <div className="Clairty-lorem">Clairty lorem ipsum dolor sit amet</div>
                                    </div>
                                    <div className="clarity-card">
                                        <div className="Ellipse-4"><img src={four} className="oneimg" alt="one" /></div>
                                        <div className="Clarity-of-Thought">
                                            Experience Rest of Mind
                                        </div>
                                        <div className="Clairty-lorem">Clairty lorem ipsum dolor sit amet</div>
                                    </div>
                                </div>
                           </Col>
                       </Row>
                    </Col>
                </Row>
                <Row className="thirdrow">  
                    <Col sm={{span:6,offset:6}} md={{span:6,offset:6}}>
                        <div className="How-it-works">
                            How it works
                        </div>
                    </Col>
                    <Col md={12}>
                        <Row>
                        <Col md={{span:5,offset:1}}>
                                <div>
                                    <img src={RightTopImage} className="homebanner3" alt='homebanner1'/>
                                </div>
                           </Col>
                           <Col md={4}>
                                <div className="cards-section1">
                                   <div className="howcardwrapper">
                                        <div className="Assess"><img src={stepgood} className="stepgood" alt="imggood"/>Assess</div>
                                       <div className="straight_line"></div> <div className="The-best-way">The best way to chart a way forward is to understand where you are by taking the Clarity test.</div>
                                   </div>
                                   <div className="howcardwrapper">
                                        <div className="Assess"><img src={stepone} className="stepgood" alt="imggood"/>Learn</div>
                                        <div className="The-best-way">Get insights on how your present personality type is influencing your career or business growth with pros and cons.</div>
                                   </div>
                                   <div className="howcardwrapper">
                                        <div className="Assess"><img src={steptwo} className="steptwo" alt="imggood"/>Get to work</div>
                                        {/* <div className="The-best-way">The best way to chart a way forward is to understand where you are by taking the Clarity test.</div> */}
                                    </div>
                                </div>
                           </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="fourthsecrow">
                    <Col md={6}>
                        <img src={RightTopImage} className="homebanner5" alt='homebanner1'/>
                    </Col>
                    <Col md={5} className="shii11">
                        <div className="I-found">
                        "I found clarity by Yudimy at my lowest
                        point, confused and without any sense
                        of direction whatsoever, now I have a
                        grip of things in my life thanks to 
                        clarity. My thoughts are decluttered
                        and I know what to do.”
                        </div>
                        <div className="--Marta-Vaughn">
                        - Marta Vaughn.
                        </div>
                        <div className="--Marta-Vaughn">
                        <button className="readmore">READ MORE STORIES</button>
                        </div>
                    </Col>
                </Row>
                <Row className="fifthsecrow ">
                    <Col md={12}>
                       <p className="Knowing-yourself">Knowing yourself is the first step to clarity.</p>
                    </Col>
                    <TakeAssessment background="#f7931e"/>
                    <Col md={5}>
                        <div className="I-found">
                        </div>
                    </Col>
                </Row>
                <Footer/>
           </Container>
        </div>
    )
}

export default Home