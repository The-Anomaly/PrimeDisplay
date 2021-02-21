import * as React from "react";
import "./assessmenticebreaker.css";
import Navbar from "../HomeComponents/newnavbar";
import { Container, Row } from "react-bootstrap";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import wana from "../../../assets/chatgirl.png";

const IceBreaker = () => {
  return (
    <>
      <Navbar />
      <Container fluid={true}>
        <Row className="icebreakercontainer">
          <Row className="icebreakerprogress center-it">
            <AssessmentFirstSection
              progressBar={25}
              phase=""
              nextPhase="Phase 2"
              time={10}
            />
          </Row>
          <Row className="chatrow">
            <div className="wanatxtsec">
              <img
                className="wanaimg"
                src={wana}
                alt="wana, your clarity assistant"
              />
              <div className="wanatxt wanatxt1">
                <h5>Way to go Jaiyeola!</h5>
                <p>
                  You have completed 1 out of the 4 assessment phases. &#128079;
                </p>
                <p>Here's a sneak peek of what we've gathered about you.</p>
              </div>
            </div>
            {/* <div className="wanatxtsec wanachat">
              <img
                className="wanaimg"
                src={wana}
                alt="wana, your clarity assistant"
              />
              <div className="wanatxt wanatxt2">
                <p>Here's a sneak peek of what we've gathered about you.</p>
              </div>
            </div> */}
          </Row>
          <Row className="spacespace">
            <div className="snippetcard">
              <h5>Result Snippet</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </Row>
          <Row className="spacespace">
            <p className="phasedescrip">
              The next phase assesses your career strengths and weaknesses. It
              also helps us to know how well you function in your work
              environment.
            </p>

            <div className="phasephase">
              <p>
                This phase contains a total of 24 questions. Would you like to
                continue now or get a reminder later?
              </p>
              <div className="icebreakerbtns">
                <button>Remind Me</button>
                <button>Continue</button>
              </div>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default IceBreaker;
