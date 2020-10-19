import * as React from "react";
import "./Home.css";
import Navbar from "../HomeComponents/newnavbar";
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
import circle1 from "../../../assets/circle1.svg"
import circle2 from "../../../assets/circle2.svg"
import arrow1 from "../../../assets/arrow1.svg"
import circle3 from "../../../assets/circle3.svg"
import arrow2 from "../../../assets/arrow2.svg"
import arrow3 from "../../../assets/arrow3.svg"

const RedesignedHome: React.FC = () => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
  }, []);
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="newfirstrow backdrop">
          <Col md={6} className="navcontrols">
            {" "}
          </Col>
          <Col md={5} sm={11} className="hometext">
            <div>We are like a map but for your career.</div>
            <div>Let's connect all the dots...</div>

            <div className="hstarted">GET STARTED</div>
          </Col>
          <Col md={1} className="socials">
            <img src={downarrow} className="socials1" alt="arrow" />
            <img src={facebook} className="socials1" alt="facebook" />
            <img src={twitter} className="socials1" alt="twitter" />
            <img src={insta} className="socials1" alt="instagram" />
            <img src={linkedin} className="socials1" alt="linkedin" />
          </Col>
        </Row>
        <Row className="newsecondrow">
          <div className="secondtitle">
            It's a Crazy{" "}
            <span className="secondtitle1">
              Circle <img src={rect} className="secondimg" />
            </span>
          </div>
          <div className="crazycircle1">
            <img src={circle1} className="lcircle1"/>
            <img src={arrow1} className="larrow1" />
            <img src={circle2} className="lcircle2" />
          </div>
          <div className="crazycircle2">
            <img src={arrow2} className="larrow2" />
            <img src={circle3} className="lcircle3" />
            <img src={arrow3} className="larrow3" />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default RedesignedHome;
