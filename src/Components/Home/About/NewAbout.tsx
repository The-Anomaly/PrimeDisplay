import * as React from "react";
import "../Home/Home.css";
import "./About.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../HomeComponents/newnavbar";
import Footer from "../HomeComponents/newfooter";
import ClientReview from "../HomeComponents/HearFromClients";
import { useEffect } from "react";
import tick from "../../../assets/tick.png";
import prof1 from "../../../assets/professional1.svg";
import prof2 from "../../../assets/professional2.svg";
import prof3 from "../../../assets/professional3.svg";
import prof4 from "../../../assets/professional4.svg";
import sec1 from "../../../assets/fistup.svg";
import sec2 from "../../../assets/people.svg";
import box from "../../../assets/forindividuals.png";
import box1 from "../../../assets/forteams.png";
import greentick from "../../../assets/greentick.png";

export const NewAbout = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  });
  return (
    <div>
      <Navbar about={true} />
      <Container className="homecontainer mobilepaddingredo" fluid={true}>
        <Row className="aboutfirstsec">
          <div className="aboutfirsthead">ABOUT CLARITY</div>
          <div className="aboutfirsttxt">
            Clarity by Yudimy is a career mapping platform that helps you
            discover and define a clear road map with practical and actionable
            steps to get to your destination of meaningful and organized
            work-life.
            <br />
            We are making the world a better place by fitting square pegs into
            square holes
          </div>
        </Row>
        <Row className="abtwithclarityrow">
          <div className="abtwithclarity">
            With Clarity all year long
            <br />
            Professionals can
          </div>
          <Col className="withclaritytxt" md={5} sm={12}>
            <div className="abttick">
              <img className="tickdash1" src={tick} alt="tick" />
              <div className="tickdash">{""}</div>
              <img className="tickdash1" src={tick} alt="tick" />
              <div className="tickdash">{""}</div>
              <img className="tickdash1" src={tick} alt="tick" />
              <div className="tickdash">{""}</div>
              <img className="tickdash1" src={tick} alt="tick" />
              <div className="tickdash">{""}</div>
              <img className="tickdash1" src={tick} alt="tick" />
              <div className="tickdash">{""}</div>
              <img className="tickdash1" src={tick} alt="tick" />
            </div>
            <div className="abtticktxt">
              <div className="yearlong1">
                Evaluate and get constructive feedback on their present career
                trajectory
              </div>
              <div className="yearlong2">
                See recommendations on career tracks they're likely to succeed
                at and steps to take to improve their career prospects
              </div>
              <div className="yearlong3">
                Monitor their career-health by seeing work and leadership
                competencies they need to develop on the roll
              </div>
              <div className="yearlong3">
                Articulate career or life goals they want to achieve monthly and
                get a road map of actionable steps to get there
              </div>
              <div className="yearlong3">
                Build willpower by having access to counsellors and coaches that
                keep them accountable to achieving those goals{" "}
              </div>
              <div className="yearlong3">
                Personalized follow-up of opportunities and learning resources
                to help them stay on top of their game
              </div>
            </div>
          </Col>
          <Col className="withclarityimg" md={7}>
            <div className="profimg1">
              <img className="profimg1a" src={prof1} alt="professional" />
              <img className="profimg1b" src={prof2} alt="professional" />
            </div>
            <div className="profimg2">
              <img className="profimg2a" src={prof3} alt="professional" />
              <img className="profimg2b" src={prof4} alt="professional" />
            </div>
          </Col>
        </Row>
        <Row className="abthapprod">
          <div className="abtprod">
            Happily productive people and organisations are high performers and
            more innovative.
          </div>
          <div className="abtprodsec">
            <div className="prodsec1">
              <img className="greenimg1" src={sec1} />
            </div>
            <div className="prodsec2">
              <div className="for1">
                For{" "}
                <span className="prodindi">
                  {" "}
                  Individuals <img className="indibox" src={box} />
                </span>
              </div>
              <div>
                <div className="indilist"><img className="prodgreentick" src={greentick} /><span>Clear life direction</span></div>
                <div className="indilist"><img className="prodgreentick" src={greentick} /><span>Organized work-life</span></div>
                <div className="indilist"><img className="prodgreentick" src={greentick} /><span>Better productivity</span></div>
                <div className="indilist"><img className="prodgreentick" src={greentick} /><span>Progressive growth</span></div>
                <div className="indilist"><img className="prodgreentick" src={greentick} /><span>Valuable you </span></div>
                <div className="indilist"><img className="prodgreentick" src={greentick} /><span>Less anxiety</span></div>
              </div>
            </div>
            <div className="prodsec2 prodsec3">
              <div className="for1">
                For <span className="prodindi prodteam">Teams<img className="indibox indibox1" src={box1} /></span>
              </div>
              <div>
                <div className="indilist"><img className="prodgreentick grntick" src={greentick} /><span>High performing teams </span></div>
                <div className="indilist"><img className="prodgreentick grntick" src={greentick} /><span>
                  Intelligence on teams' strengths and weaknesses for managers to
                  drive performance and effectiveness.</span>
                </div>
                <div className="indilist"><img className="prodgreentick grntick" src={greentick} /><span>Less time micromanaging</span></div>
                <div className="indilist"><img className="prodgreentick grntick" src={greentick} /><span>Better employee engagement & Retention</span></div>
                <div className="indilist"><img className="prodgreentick grntick" src={greentick} /><span>Minimize workplace conflicts and problems</span></div>
                <div className="indilist"><img className="prodgreentick grntick" src={greentick} /><span>Workplace planning </span></div>
                <div className="indilist"><img className="prodgreentick grntick" src={greentick} /><span>Effective performance management</span></div>
                <div className="indilist"><img className="prodgreentick grntick" src={greentick} /><span>Foster a better collaborative spirit</span></div>
              </div>
            </div>
            <div className="prodsec4">
              <img className="sec4img" src={sec2} />
            </div>
          </div>
        </Row>
      </Container>
      <ClientReview />
      <Footer />
    </div>
  );
};
