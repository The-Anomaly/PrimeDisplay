import * as React from "react";
import "./assessmenticebreaker.css";
import Navbar from "../HomeComponents/newnavbar";
import { Container, Row } from "react-bootstrap";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import wana from "../../../assets/chatgirl.png";

const PhaseThreeIceBreaker = () => {
  const nextPhase = () => {
    return window.location.assign("/assessment/phasefour/complete");
  };
  return (
    <>
      <Navbar />
      <Container fluid={true}>
        <Row className="icebreakercontainer">
          <Row className="icebreakerprogress center-it">
            <AssessmentFirstSection
              progressBar={75}
              phase=""
              nextPhase="Phase 4"
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
              <div className="wanatxt">
                <h5>Hats off to you Jaiyeola!</h5>
                <p>
                  You have completed 3 out of the 4 assessment phases. &#128079;
                </p>
                <p>Here's a sneak peek of what we've gathered about you.</p>
              </div>
            </div>
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
              The fourth and final phase of this assessment determines your work style and work function fit. This allows us to
              make recommendations to spike up your productivity.
            </p>

            <div className="phasephase">
              <p>
                This phase contains a total of 22 questions. Would you like to
                continue now or get a reminder later?
              </p>
              <div className="icebreakerbtns">
                <button>Remind Me</button>
                <button onClick={nextPhase}>Continue</button>
              </div>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default PhaseThreeIceBreaker;
