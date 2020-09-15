import * as React from "react";
import "../Home/Home.css";
import "./About.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../HomeComponents/footer";
import Navbar from "../HomeComponents/navbar";
// team
import zino from "../../../assets/zino.png";
import ibk from "../../../assets/ibk.png";
import Rotimi from "../../../assets/Rotimi.png";
import mo from "../../../assets/mo.png";
import imglarge4 from "../../../assets/professional3.png";
import imglarge1 from "../../../assets/professional1.png";
import imglarge2 from "../../../assets/professional2.png";
import imglarge3 from "../../../assets/professional4.png";
//team ends

import stepgood from "../../../assets/stepgood.png";
import stepone from "../../../assets/steptwo.png";
import steptwo from "../../../assets/stepthree.png";
import RightTopImageSmall from "../../../assets/blank_image_container_small.png";
import hilary from "../../../assets/Hilary.jpg";
import cardecor from "../../../assets/cardecor.png";
import TakeAssessment from "../HomeComponents/TakeAssesment/takeAssessment";
import firstImg from "../../../assets/take.png";
import secondImg from "../../../assets/maintain.png";
import thirdImg from "../../../assets/achieve.png";
import { useEffect } from "react";

export const About = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  });
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrow">
          <Col
            md={12}
            sm={{ span: 12 }}
            xs={{ span: 12 }}
            className="firstrowtxt firsab"
          >
            <div className="ftweight">
              <div> Clarity was created so working</div>
              <div> professionals can create a </div>
              <div>meaningful work-life.</div>
            </div>
            <div className="Clarity-is-the-solution">
              It's easy to get lost in the rat-race so clarity helps working
              professionals
            </div>
          </Col>
          <Col md={{ span: 9, offset: 1 }}>
            <div className="wrap001">
              <div>
                <img src={firstImg} className="firstImg" alt="firstImg" />
                <div className="takecharge"></div>
              </div>
              <div className="secondoso">
                <img src={secondImg} className="firstImg1" alt="firstImg" />
                <div className="takecharge"></div>
              </div>
              <div className="secondoso">
                <img src={thirdImg} className="firstImg1" alt="firstImg" />
                <div className="takecharge"></div>
              </div>
            </div>
            <div className="-of-life-is">
              80% of life is spent working, so instead of trying to
              compartmentalizing your life it’s better to integrate so every day
              you live your potential to the fullest.
            </div>
            <div className="Do-work-that-counts">Do work that counts !</div>
          </Col>
          <Col md={7} className="aboutimsec">
            <Row>
              <Col md={{ span: 4, offset: 1 }}>
                <div className="ca102">
                  <img
                    src={imglarge2}
                    className="aboutimgonebg"
                    alt="RightTopImageSmall"
                  />
                  <img
                    src={imglarge3}
                    className="aboutimgonesmal img-fluid"
                    alt="RightTopImageSmall"
                  />
                </div>
              </Col>
              <Col md={5}>
                <div>
                  <img
                    src={imglarge1}
                    className="aboutimgonesmall"
                    alt="RightTopImageSmall"
                  />
                  <img
                    src={imglarge4}
                    className="aboutimgonebg ff33"
                    alt="RightTopImageSmall"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <div className="ab_cards-section1">
              <div className="Assess b12">
                With Clarity all year long professionals can
              </div>
              <div className="howcardwrapper">
                <div className="aboutaccess">
                  <img src={stepgood} className="stepgood" alt="imggood" />
                  <span>
                    Evaluate and get constructive feedback on their present
                    career trajectory
                  </span>
                </div>
              </div>
              <div className="howcardwrapper">
                <div className="aboutaccess">
                  <img src={stepgood} className="stepgood" alt="imggood" />
                  <span>
                    See recommendations on career tracks they're likely to
                    succeed at and steps to take to improve their career
                    prospects
                  </span>
                </div>
              </div>
              <div className="howcardwrapper">
                <div className="aboutaccess">
                  <img src={stepgood} className="steptwo" alt="imggood" />
                  <span>
                    Monitor their career-health by seeing work and leadership
                    competencies they need to develop on the roll
                  </span>
                </div>
              </div>
              <div className="howcardwrapper">
                <div className="aboutaccess">
                  <img src={stepgood} className="steptwo" alt="imggood" />
                  <span>
                    Articulate career or life goals they want to achieve monthly
                    and get a road map of actionable steps to get there
                  </span>
                </div>
              </div>
              <div className="howcardwrapper">
                <div className="aboutaccess">
                  <img src={stepgood} className="steptwo" alt="imggood" />
                  <span>
                    Build willpower by having access to counsellors and coaches
                    that keep them accountable to achieving those goals{" "}
                  </span>
                </div>
              </div>
              <div className="howcardwrapper">
                <div className="aboutaccess">
                  <img src={stepgood} className="steptwo" alt="imggood" />
                  <span>
                    Personalized follow-up of opportunities and learning
                    resources to help them stay on top of their game
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="secondRow bglight padleftabout">
          <Col md={12} className="We-are-lyk">
            <div className="ourteamheader">Meet our team</div>
            <div className="wrap123">
              <div className="about-card-wrap">
                <div className="FounderCEO">Founder/CEO</div>
                <img src={zino} alt="userimg" className="userimgjj" />
                <div className="wrap11">
                  <div className="usernameabout">Omozino Eguh</div>
                  <div>
                    <img src={cardecor} className="cardecor" alt="cardecor" />
                  </div>
                </div>
              </div>
              <div className="about-card-wrap">
                <div className="FounderCEO">COO</div>
                <img src={ibk} alt="userimg" className="userimgjj" />
                <div className="wrap11">
                  <div className="usernameabout">Ibukunoluwa Adebayo</div>
                  <div>
                    <img src={cardecor} className="cardecor" alt="cardecor" />
                  </div>
                </div>
              </div>
              <div className="about-card-wrap">
                <div className="FounderCEO">Machine Learning</div>
                <img src={Rotimi} alt="userimg" className="userimgjj" />
                <div className="wrap11">
                  <div className="usernameabout">Rotimi Akanni</div>
                  <div>
                    <img src={cardecor} className="cardecor" alt="cardecor" />
                  </div>
                </div>
              </div>
              <div className="about-card-wrap">
                <div className="FounderCEO">Product Designer</div>
                <img src={mo} alt="userimg" className="userimgjj" />
                <div className="wrap11">
                  <div className="usernameabout">Morakinyo Adejare</div>
                  <div>
                    <img src={cardecor} className="cardecor" alt="cardecor" />
                  </div>
                </div>
              </div>
              <div className="about-card-wrap">
                <div className="FounderCEO">Fullstack Developer</div>
                <img src={hilary} alt="userimg" className="userimgjj" />
                <div className="wrap11">
                  <div className="usernameabout">Hilary Oba</div>
                  <div>
                    <img src={cardecor} className="cardecor" alt="cardecor" />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="We-are-w">
              We are making the world a better place by fitting square pegs into
              square holes
            </div>
            <div>
              <TakeAssessment background="#9c1258" />
            </div>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};
