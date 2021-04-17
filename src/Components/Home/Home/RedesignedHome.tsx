import * as React from "react";
import "./Home.css";
import "../../Dashboard/kegennidashboard.css"
import Navbar from "../HomeComponents/newnavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "../../../Fonts/Brfirma/BRFirma-Regular.ttf";
import "../../../Fonts/Brfirma/BRFirma-Bold.ttf";
import "../../../Fonts/Brfirma/BRFirma-ExtraLight.ttf";
import "../../../Fonts/Brfirma/BRFirma-BoldItalic.ttf";
import downarrow from "../../../assets/Arrow.png";
import facebook from "../../../assets/Vectorfacebook.png";
import insta from "../../../assets/Vectorinsta.png";
import linkedin from "../../../assets/Vectorlinkedin.png";
import twitter from "../../../assets/Vectortwitter.png";
import rect from "../../../assets/Landingrectangle.png";
import circle1 from "../../../assets/circle1.svg";
import circle2 from "../../../assets/circle2.svg";
import arrow1 from "../../../assets/arrow1.svg";
import circle3 from "../../../assets/circle3.svg";
import arrow2 from "../../../assets/arrow2.svg";
import arrow3 from "../../../assets/arrow3.svg";
import circle4 from "../../../assets/circle4.svg";
import circle5 from "../../../assets/circle5.svg";
import arrow4 from "../../../assets/arrow4.svg";
import circle6 from "../../../assets/circle6.svg";
import arrow5 from "../../../assets/arrow5.svg";
import arrow6 from "../../../assets/arrow6.svg";
import ClientReview from "../HomeComponents/HearFromClients";
import Think from "../HomeComponents/ThinkThisIsYou";
import Footer from "../HomeComponents/newfooter";
import laptop from "../../../assets/laptop.svg";
import trust1 from "../../../assets/trust1.png";
import trust2 from "../../../assets/trust2.png";
import trust3 from "../../../assets/trust3.png";
import trust4 from "../../../assets/trust4.png";
import trust5 from "../../../assets/trust5.png";
import { Card } from "react-bootstrap";
import close from "../../../assets/close.png";
import border1 from "../../../assets/border1.png";
import border2 from "../../../assets/border2.png";
import border3 from "../../../assets/border3.png";
import border4 from "../../../assets/border4.png";
import border5 from "../../../assets/border5.png";
import smarrow1 from "../../../assets/smarrow1.svg";
import smarrow2 from "../../../assets/smarrow2.svg";
import smarrow4 from "../../../assets/smarrow4.svg";
import smarrow5 from "../../../assets/smarrow5.svg";
import smcircle1 from "../../../assets/circle3.svg";
import smcircle2 from "../../../assets/smcircle2.svg";
import smborder from "../../../assets/smborder.png";
import jaiye from "../../../assets/jaiye.svg";
import mobileimg from "../../../assets/mobilebackdrop2.svg";
import ellipse1 from "../../../assets/ellipse1.png";
import ellipse2 from "../../../assets/ellipse2.png";
import Axios from "axios";
import { API } from "../../../config";
import preloader2 from "../../../assets/preloader2.gif";
import ReactGA from "react-ga";
import AOS from "aos";
import "aos/dist/aos.css";

ReactGA.initialize("UA-151203321-1");
const RedesignedHome: React.FC = (props: any) => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    AOS.init({
      duration: 1500,
      offset: 300,
      easing: "ease-in-out",
    });
    AOS.refresh();
    // ReactGA.pageview(window.location.pathname);
  }, []);

  const [state, setState] = React.useState<any>({
    press: false,
    showPreloader: false,
    isloading: false,
    IsUser: false,
  });

  const GetStarted = () => {
    setState({
      ...state,
      press: true,
    });
  };

  const CloseGetStarted = () => {
    setState({
      ...state,
      press: false,
    });
  };

  const { press, isloading } = state;

  const getCurrentAssessmentPosition = (token): void => {
    Axios.get(`${API}/progress`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        console.log(response);
        setState({
          ...state,
          isloading: false,
        });
         if (response.status === 200) {
          if (
            response.data[0].onboarding_chat === false ||
            response.data[0].next === "onboarding_chat"
          ) {
            return props.history.push("/clientchat");
          } else if (
            response.data[0].next === "phase_one" ||
            response.data[0].phase_one === false
          ) {
            return props.history.push(`/assessment/welcome`);
          } else if (
            response.data[0].phase_two_nature === false ||
            response.data[0].phase_two_health === false ||
            response.data[0].phase_two_building === false ||
            response.data[0].phase_two_creative === false
          ) {
            return props.history.push(`/assessment/phaseone/complete`);
          } else if (
            response.data[0].phase_two_sports === false ||
            response.data[0].phase_two_business === false ||
            response.data[0].phase_two_stem === false ||
            response.data[0].phase_two_humanitarian === false
          ) {
            return props.history.push(`/assessmentphasetwo1`);
          } else if (response.data[0].phase_three === false) {
            return props.history.push(`/assessment/phasetwo/complete`);
          } else if (response.data[0].phase_four === false) {
            return props.history.push(`/assessment/phasethree/complete`);
          } else if (
            response.data[0].next === "home" &&
            response.data[0].onboarding_chat === true &&
            response.data[0].phase_one === true &&
            response.data[0].phase_two_sports === true &&
            response.data[0].phase_two_business === true &&
            response.data[0].phase_two_stem === true &&
            response.data[0].phase_two_humanitarian === true &&
            response.data[0].phase_two_nature === true &&
            response.data[0].phase_two_health === true &&
            response.data[0].phase_two_building === true &&
            response.data[0].phase_two_creative === true &&
            response.data[0].phase_three === true &&
            response.data[0].phase_four === true
          ) {
            return props.history.push(`/overview`);
          }
        }
      })
      .catch((error) => {
        setState({
          ...state,
          isloading: false,
        });
      });
  };

  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    setState({
      ...state,
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    if (token) {
      getCurrentAssessmentPosition(token);
    } else {
      setState({
        ...state,
        isloading: false,
      });
    }
  }, []);

  return (
    <div>
      <Navbar home={true} />
      {isloading && (
        <div className="c4ipreloader center-it">
          <div className="c4ispinner"></div>
          <h1><i>Hold on...</i></h1>
        </div>
      )}
      {!isloading && (
        <>
          <Container fluid={true} className="mobilepaddingredo">
            <Row md={12} className="newfirstrow">
              <img className="ellipse1" src={ellipse1} alt="ellipse" />
              <img className="ellipse2" src={ellipse2} alt="ellipse" />
              <Col md={6} className="navcontrols home1">
                {" "}
                <img className="jaiyeimg" src={jaiye} alt="happy client" />
                <img className="mobilebg" src={mobileimg} alt="happy client" />
              </Col>
              <Col md={5} sm={11} className="hometext">
                <div
                  data-aos="zoom-in-up"
                  data-aos-duration="600"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-once={false}
                >
                  <div>We are like a map but for your career.</div>
                  {/* <div>Let's connect all the dots...</div> */}
                  <div className="smhometext">
                    Discover your passion and talent. Discover a more meaningful
                    work life.
                  </div>
                  <Link to="/signup">
                    <div className="hstarted">GET STARTED</div>
                  </Link>
                </div>
              </Col>
              <Col md={1} className="socials">
                <img src={downarrow} className="socials1" alt="arrow" />
                <a
                  href="https://free.facebook.com/pages/category/Product-Service/109680753747119/?_rdc=1&_rdr"
                  target="_blank"
                >
                  <img
                    src={facebook}
                    className="socials1 ssmedia"
                    alt="facebook"
                  />
                </a>
                <a href="https://twitter.com/askyudimy?s=08" target="_blank">
                  <img
                    src={twitter}
                    className="socials1 ssmedia"
                    alt="twitter"
                  />
                </a>
                <a href="http://instagram.com/getclarity_" target="_blank">
                  <img
                    src={insta}
                    className="socials1 ssmedia"
                    alt="instagram"
                  />
                </a>
                <a
                  href="https://ng.linkedin.com/company/yudimy"
                  target="_blank"
                >
                  <img
                    src={linkedin}
                    className="socials1 ssmedia"
                    alt="linkedin"
                  />
                </a>
              </Col>
            </Row>
            <Row md={12} className="newsecondrow">
              <div
                className="secondtitle"
                data-aos="fade-zoom-in"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                It's a Vicious{" "}
                <span className="secondtitle1">
                  Circle{" "}
                  <img src={rect} className="secondimg" alt="purple block" />
                </span>
              </div>
              <div className="crazycircle1">
                <img
                  src={circle1}
                  className="lcircle1"
                  data-aos="fade-zoom-in"
                  alt="man sitting"
                />
                <img
                  src={arrow1}
                  className="larrow1"
                  data-aos="fade-zoom-in"
                  alt="dashed connecting arrow"
                />
                <img
                  src={smarrow1}
                  className="smarrow1"
                  data-aos="fade-zoom-in"
                  data-aos-offset="200"
                  data-aos-duration="600"
                  alt="dashed connecting arrow"
                />
                <img
                  src={circle2}
                  className="lcircle2"
                  data-aos="flip-left"
                  data-aos-duration="600"
                  alt="man sitting"
                />
              </div>
              <div className="crazycircle2">
                <img
                  src={arrow2}
                  className="larrow2"
                  data-aos="flip-left"
                  data-aos-duration="600"
                  alt="dashed connnecting arrow"
                />
                <img
                  src={smarrow2}
                  className="smarrow2"
                  data-aos="flip-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="600"
                  alt="dashed connnecting arrow"
                />
                <img
                  src={circle3}
                  className="lcircle3"
                  data-aos="flip-left"
                  data-aos-duration="600"
                  alt="man standing"
                />
                <img src={smcircle1} className="smcircle1" alt="man standing" />
                <img
                  src={arrow3}
                  className="larrow3"
                  data-aos="flip-right"
                  data-aos-duration="600"
                  alt="dashed connnecting arrow"
                />
              </div>
              <div className="crazycircle3" data-aos="flip-left">
                <img
                  src={circle4}
                  className="lcircle4"
                  data-aos="flip-right"
                  data-aos-duration="600"
                  alt="woman sitting"
                />
                <img
                  src={smarrow4}
                  className="smarrow4"
                  data-aos="flip-right"
                  data-aos-duration="600"
                  alt="dashed connnecting arrow"
                />
                <img
                  src={arrow6}
                  className="larrow6"
                  data-aos="flip-right"
                  alt="dashed connnecting arrow"
                />
                <img
                  src={circle5}
                  className="lcircle5"
                  data-aos="flip-right"
                  alt="man walking"
                />
              </div>
              <div className="crazycircle4">
                <img
                  src={arrow4}
                  className="larrow4"
                  data-aos="fade-zoom-in"
                  data-aos-duration="600"
                  alt="dashed connnecting arrow"
                />
                <img
                  src={smarrow5}
                  className="smarrow5"
                  data-aos="flip-right"
                  data-aos-duration="600"
                  alt="dashed connnecting arrow"
                />
                <img
                  src={smcircle2}
                  className="smcircle2"
                  data-aos="flip-right"
                  data-aos-duration="600"
                  alt="woman sitting"
                />
                <img
                  src={circle6}
                  className="lcircle6"
                  data-aos="flip-left"
                  data-aos-duration="600"
                  alt="woman sitting"
                />
                <img
                  src={arrow5}
                  className="larrow5"
                  data-aos="flip-right"
                  data-aos-duration="600"
                  alt="dashed connnecting arrow"
                />
              </div>
            </Row>
            {press === false ? (
              <Row md={12} className="newthirdrow">
                <div className="newthirdrowtext" data-aos="flip-left">
                  Clarity by Yudimy is Lagos' leading career mapping platform
                  that helps you discover and define a clear road map with
                  practical and actionable steps to get to you to your
                  destination of a meaningful and organized work-life.
                </div>
                <div className="newthirdrowbtn" onClick={GetStarted}>
                  GET STARTED
                </div>
              </Row>
            ) : (
              <Row md={12} className="thirdgetstarted">
                <img
                  className="gtclose"
                  src={close}
                  onClick={CloseGetStarted}
                  alt="close"
                />
                <Card
                  className="h-300 shadow-sm bg-white thirdgetstartedcard"
                  data-aos="flip-left"
                >
                  <div className="thirdgthead">Start my personal Journey</div>
                  <div className="thirdgttxt" data-aos="fade-right">
                    Lets give you a perception to what your career should look
                    like
                  </div>
                  <Link to="/signup">
                    <div className="thirdgtbtn1">Sign Up</div>
                  </Link>
                </Card>
                <Card
                  className="h-300 shadow-sm bg-white thirdgetstartedcard"
                  data-aos="flip-down"
                >
                  <div className="thirdgthead" data-aos="fade-right">
                    Gift a Friend
                  </div>
                  <div className="thirdgttxt" data-aos="fade-right">
                    Give a gift of success. Choose one of the three different
                    plans
                  </div>
                  <Link to="/payment">
                    <div className="thirdgtbtn2">Get Started</div>
                  </Link>
                </Card>
                <Card
                  className="h-300 shadow-sm bg-white thirdgetstartedcard"
                  data-aos="flip-right"
                >
                  <div className="thirdgthead">Use Clarity for my Team</div>
                  <div className="thirdgttxt" data-aos="fade-right">
                    Lets get your team to their highest potential and get your
                    ROI to the roof
                  </div>
                  <div className="thirdgtbtn3 unclick">Get Started</div>
                </Card>
              </Row>
            )}
            <Row md={12} className="newfourthrow">
              <div className="secondtitle fourthttl">
                A navigator you can{" "}
                <span className="secondtitle1 trustttl">
                  trust{" "}
                  <img
                    src={rect}
                    className="secondimg fourthimg"
                    alt="purple block"
                  />
                </span>
              </div>
              <div className="fourthline"> </div>
              <div className="fourthtext">
                <div data-aos="fade-right">
                  Are you struggling to figure out your next career move?
                </div>
                <div data-aos="fade-right">Clarity by Yudimy is for you.</div>
              </div>
              <div className="homelaptop">
                <div className="homelaptop1">
                  <img
                    className="laptop"
                    src={laptop}
                    alt="laptop showing clarity dashboard"
                  />
                </div>
              </div>
              <div>
                <div className="fourthsec">
                  <div className="fourthsubsec">
                    <img className="border1" src={border5} alt="border" />
                    <img className="rightborder" src={smborder} alt="border" />
                    <div className="fourthsubsechov">
                      <img
                        src={trust1}
                        className="trustimg"
                        alt="mental assessment"
                      />
                      <div className="fourthsubhead" data-aos="fade-right">
                        Career & Competence Evaluation Assessment
                      </div>
                      <div className="fourthsubtext" data-aos="fade-right">
                        This one of a kind assessment tells if you are on the
                        right career track or not, the competencies you need to
                        develop, the best career-business expressions for your
                        talent and the kind of roles you should work in.
                      </div>
                    </div>
                  </div>
                  <div className="fourthsubsec">
                    <img className="border2" src={border2} alt="border" />
                    <img
                      className="leftborder leftborder1"
                      src={smborder}
                      alt="border"
                    />
                    <div className="fourthsubsechov">
                      <img
                        src={trust2}
                        className="trustimg"
                        alt="communication"
                      />
                      <div className="fourthsubhead" data-aos="fade-right">
                        Talk to a Counselor
                      </div>
                      <div className="fourthsubtext" data-aos="fade-right">
                        Your career trajectory is the sum of all the choices you
                        have made so far. However, an important step when making
                        future decisions is to connect the dots between where
                        your passion and talent lies and which career will
                        enable you to best express them. Speaking with a Clarity
                        counsellor will help you achieve this with specific
                        recommendations on how.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fourthsec">
                  <div className="fourthsubsec hov3">
                    <img className="border3" src={border3} alt="border" />
                    <img
                      className="rightborder rightborder2"
                      src={smborder}
                      alt="border"
                    />
                    <div className="fourthsubsechov">
                      <img src={trust3} className="trustimg" alt="list" />
                      <div className="fourthsubhead">TO DO’s</div>
                      <div
                        className="fourthsubtext frheight"
                        data-aos="fade-right"
                      >
                        Knowing what step to take next is one thing but getting
                        there is another! With Yudimy's Clarity you can
                        immediately convert the recommendations from your
                        counselling session into actionable tasks and set up
                        frequent reminders to keep you accountable and help you
                        achieve them.
                      </div>
                    </div>
                  </div>
                  <div className="fourthsubsec hov4">
                    <img className="border4" src={border4} alt="border" />
                    <img
                      className="leftborder leftborder2"
                      src={smborder}
                      alt="border"
                    />
                    <div className="fourthsubsechov">
                      <img
                        src={trust4}
                        className="trustimg trustimgin"
                        alt="growth"
                      />
                      <div className="fourthsubhead">Growth Challenge</div>
                      <div className="fourthsubtext" data-aos="fade-right">
                        When preparation meets opportunity, the result is
                        success. Clarity's growth challenge feature is supported
                        by our career talent managers who keep you accountable
                        to your career development goals thereby increasing your
                        appeal.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fourthsubsec fourthposit">
                  <img className="border5" src={border5} alt="border" />
                  <div className="fourthsubsechov">
                    <img src={trust5} className="trustimg" alt="position" />
                    <div className="fourthsubhead">
                      Career Positioning & Opportunity Recommendation
                    </div>
                    <div className="fourthsubtext" data-aos="fade-left">
                      As your career-talent managers, we are committed to your success,
                      we work with you to articulate your unique value
                      proposition, profile and brand. Also, because we now
                      understand you, we curate and connect you to the best
                      opportunities.
                    </div>
                  </div>
                </div>
              </div>
            </Row>
            <ClientReview />
            <Think />
            <Footer />
          </Container>
        </>
      )}
    </div>
  );
};

export default RedesignedHome;
