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
import '../../../Fonts/Brfirma/BRFirma-Regular.ttf';
import '../../../Fonts/Brfirma/BRFirma-Bold.ttf';
import '../../../Fonts/Brfirma/BRFirma-ExtraLight.ttf';
import '../../../Fonts/Brfirma/BRFirma-BoldItalic.ttf';
import downarrow from "../../../assets/Arrow.png";
import facebook from "../../../assets/Vectorfacebook.png";
import insta from "../../../assets/Vectorinsta.png";
import linkedin from "../../../assets/Vectorlinkedin.png";
import twitter from "../../../assets/Vectortwitter.png";
import rect from "../../../assets/Landingrectangle.png";

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
            <img src={downarrow} className="socials1" alt="arrow"/>
            <img src={facebook} className="socials1" alt="facebook"/>
            <img src={twitter} className="socials1" alt="twitter"/>
            <img src={insta} className="socials1" alt="instagram"/>
            <img src={linkedin} className="socials1" alt="linkedin"/>
          </Col>
        </Row>
        <Row className="newsecondrow">
          
          <div className="secondtitle">It's a Crazy <span className="secondtitle1">Circle  <img src={rect} className="secondimg"/></span></div>
         
          
        </Row>
      </Container>
    </div>
  );
};

export default RedesignedHome;
