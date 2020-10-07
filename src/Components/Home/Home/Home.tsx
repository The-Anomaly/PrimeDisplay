import * as React from "react";
import "./Home.css";
import Navbar from "../HomeComponents/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightTopImage from "../../../assets/2.png";
import testimonial from "../../../assets/testimonial.png";
import likegoogle from "../../../assets/1.png";
import howitwk from "../../../assets/3.jpg";
import Footer from "../HomeComponents/footer";
import TakeAssessment from "../HomeComponents/TakeAssesment/takeAssessment";
import stepgood from "../../../assets/stepgood.png";
import stepone from "../../../assets/steptwo.png";
import steptwo from "../../../assets/stepthree.png";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    localStorage.clear()
  }, []);
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrow">
          <Col
            md={5}
            sm={{ span: 12, order: 1 }}
            xs={{ span: 12, order: 12 }}
            className="firstrowtxt"
          >
            <div className="txtheavy">Not feeling in control</div>
            <div className="txtheavy">of your life, career</div>
            <div className="txtheavy">or business?</div>
            <div className="Clarity-is-the-solution">
              Take the Clarity Assessment to find direction
            </div>
            <Link to="/signin">
              <div className="firstassesbtn">Take Assessment</div>
            </Link>
          </Col>
          <Col md={7} sm={{ span: 12, order: 12 }} xs={{ span: 12, order: 1 }}>
            <img src={RightTopImage} className="homebanner0" alt="homebanner" />
          </Col>
        </Row>
        <Row className="secondRow Rectangle-8">
          <Col md={12} className="We-are-like">
            Like Google maps we take you through the best path that gets you to
            the desired destination.
          </Col>
          <Col md={12} className="secondimagearea">
            <Row>
              <Col md={{ span: 3, offset: 1 }}>
                <div>
                  <img
                    src={likegoogle}
                    className="homebanner1"
                    alt="homebanner1"
                  />
                </div>
              </Col>
              <Col md={7}>
                <div className="cards-section1">
                  <div className="clarity-card">
                    <div className="Ellipse-4">
                      <div id="">
                        <div className="wraper22">
                          <div className="inner21">One</div>
                        </div>
                        <div className="line-top"></div>
                      </div>
                    </div>
                    <div className="Clarity-of-Thought">Clarity of Thought</div>
                    <div className="Clairty-lorem"></div>
                  </div>
                  <div className="clarity-card">
                    <div className="Ellipse-4">
                      <div id="">
                        <div className="wraper22">
                          <div className="inner21">Two</div>
                        </div>
                        <div className="line-top secondline"></div>
                      </div>
                    </div>
                    <div className="Clarity-of-Thought">Self Discovery</div>
                    <div className="Clairty-lorem"></div>
                  </div>
                  <div className="clarity-card">
                    <div className="Ellipse-4">
                      <div id="">
                        <div className="wraper22">
                          <div className="inner21">Three</div>
                        </div>
                        <div className="line-top"></div>
                      </div>
                    </div>
                    <div className="Clarity-of-Thought">Level</div>
                    <div className="Clarity-of-Thought">Up</div>
                    <div className="Clairty-lorem"></div>
                  </div>
                  <div className="clarity-card">
                    <div className="Ellipse-4">
                      <div className="wraper22">
                        <div className="inner21">Four</div>
                      </div>
                    </div>
                    <div className="Clarity-of-Thought">
                      Experience Rest of Mind
                    </div>
                    <div className="Clairty-lorem"></div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="thirdrow">
          <Col sm={{ span: 6, offset: 6 }} md={{ span: 6, offset: 6 }}>
            <div className="How-it-works">How it works</div>
          </Col>
          <Col md={12}>
            <Row>
              <Col md={{ span: 5, offset: 1 }}>
                <div>
                  <img
                    src={howitwk}
                    className="homebanner3"
                    alt="homebanner1"
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="cards-section1">
                  <div className="howcardwrapper">
                    <div className="Assess">
                      <img src={stepgood} className="stepgood" alt="imggood" />
                      Assess
                    </div>
                    <div className="straight_line"></div>{" "}
                    <div className="The-best-way">
                      The best way to chart a way forward is to understand where
                      you are by taking the Clarity test.
                    </div>
                  </div>
                  <div className="howcardwrapper">
                    <div className="Assess">
                      <img src={stepone} className="stepgood" alt="imggood" />
                      Learn
                    </div>
                    <div className="The-best-way">
                      Get insights on how your present personality type is
                      influencing your career or business growth with pros and
                      cons.
                    </div>
                  </div>
                  <div className="howcardwrapper">
                    <div className="Assess">
                      <img src={steptwo} className="steptwo" alt="imggood" />
                      Get to work
                    </div>
                    <div className="The-best-way">
                      With a clear personal development road map and access to
                      expert counsel to keep you accountable you get started on
                      acheiving your goals
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="fourthsecrow">
          <Col md={{ span: 5, offset: 1 }}>
            <img src={testimonial} className="homebanner5" alt="homebanner1" />
          </Col>
          <Col md={5} className="shii11">
            <div className="I-found">
              "I found clarity by Yudimy at my lowest point, confused and
              without any sense of direction whatsoever, now I have a grip of
              things in my life thanks to clarity. My thoughts are decluttered
              and I know what to do.”
            </div>
            <div className="--Marta-Vaughn">- Marta Vaughn.</div>
            <div className="--Marta-Vaughn">
              <button className="readmore">READ MORE STORIES</button>
            </div>
          </Col>
        </Row>
        <Row className="fifthsecrow ">
          <Col md={12}>
            <p className="Knowing-yourself">
              Knowing yourself is the first step to clarity.
            </p>
          </Col>
          <TakeAssessment background="#9c1258" />
          <Col md={5}>
            <div className="I-found"></div>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
