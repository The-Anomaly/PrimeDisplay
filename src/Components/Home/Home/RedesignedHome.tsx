import * as React from "react";
import "./Home.css";
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
import ClientReview from "../HomeComponents/HearFromClients";
import Think from "../HomeComponents/ThinkThisIsYou";
import Footer from "../HomeComponents/newfooter";

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
            <img src={circle1} className="lcircle1" />
            <img src={arrow1} className="larrow1" />
            <img src={circle2} className="lcircle2" />
          </div>
          <div className="crazycircle2">
            <img src={arrow2} className="larrow2" />
            <img src={circle3} className="lcircle3" />
            <img src={arrow3} className="larrow3" />
          </div>
          <div className="crazycircle3">
            <img src={circle4} className="lcircle4" />
            <img src={circle5} className="lcircle5" />
          </div>
          <div className="crazycircle4">
            <img src={arrow4} className="larrow4" />
            <img src={circle6} className="lcircle6" />
            <img src={arrow5} className="larrow5" />
          </div>
        </Row>
        <Row className="newthirdrow">
          <div className="newthirdrowtext">
            Clarity by Yudimy is a career mapping platform that helps you
            discover and define a clear road map with practical and actionable
            steps to get to your destination of meaningful and organized
            work-life.
          </div>
          <div className="newthirdrowbtn">GET STARTED</div>
        </Row>
        <Row className="newfourthrow">
          <div className="secondtitle fourthttl">
            A navigator you can{" "}
            <span className="secondtitle1">
              trust <img src={rect} className="secondimg fourthimg" />
            </span>
          </div>
          <div className="fourthline"> </div>
          <div className="fourthtext">
            <div>Are you struggling to figure out your next career move?</div>
            <div>Clarity by Yudimy is for you.</div>
          </div>
          <div>
            <div className="fourthsec">
              <div className="fourthsubsec">
                <div className="fourthsubhead">
                  Career & Competence Evaluation Assessment
                </div>
                <div className="fourthsubtext">
                  This one of a kind assessment tells if you are on the right
                  career track or not, the competencies you need to develop, the
                  best career-business expressions for your talent and the kind
                  of roles you should work in.
                </div>
              </div>
              <div className="fourthsubsec">
                <div className="fourthsubhead">Talk to a Counselor</div>
                <div className="fourthsubtext">
                  Your career trajectory is a sum total of all the choices you
                  made that got you here. However, an important step for making
                  effective decisions going forward is is connecting the dots,
                  speaking with a clarity counsellor helps you do just this with
                  specific recommendations on how.{" "}
                </div>
              </div>
            </div>
            <div className="fourthsec">
              <div className="fourthsubsec">
                <div className="fourthsubhead">TO DO’s</div>
                <div className="fourthsubtext">
                  Knowing the next step to take is one, getting there is another
                  thing. With Yudimy’s Clarity you can immediately convert the
                  recommendations from your counselling session to actionable
                  task with frequent reminders and acccountability to help you
                  achieve this.
                </div>
              </div>
              <div className="fourthsubsec">
                <div className="fourthsubhead">Growth Challenge</div>
                <div className="fourthsubtext">
                  Beautiful things happen when preparation meets opportunity and
                  our growth challenge feature keeps you accountable to growth,
                  with the assistance of career-talent managers you have access
                  to a career development road map that increase your appeal.
                </div>
              </div>
            </div>
          </div>

        </Row>
        <ClientReview />
        <Think />
        <Footer />
      </Container>
    </div>
  );
};

export default RedesignedHome;
