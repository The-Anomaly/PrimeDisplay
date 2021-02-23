import * as React from "react";
import "./assessmenticebreaker.css";
import Navbar from "../HomeComponents/newnavbar";
import { Container, Row } from "react-bootstrap";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import wana from "../../../assets/chatgirl.png";

// team
type User = string | null;

const PhaseFourIceBreaker = () => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : [{ first_name: "" }];
    setName(currentUser[0].first_name);
  }, []);
  const assessmentComplete = () => {
    return window.location.assign("/free/dashboard");
  };
  return (
    <>
      <Navbar />
      <Container fluid={true}>
        <Row className="icebreakercontainer">
          <Row className="icebreakerprogress center-it">
            <AssessmentFirstSection
              progressBar={100}
              phase=""
              nextPhase="Get results"
              time={0}
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
                <h5>Hooray! Hooray!</h5>
                <p>
                  You have completed the 4 assessment phases. &#128079; &#128079;
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
          <Row className="spacespace spacespace1">
            {/* <p className="phasedescrip">
              The next phase assesses your career strengths and weaknesses. It
              also helps us to know how well you function in your work
              environment.
            </p> */}

            <div className="phasephase">
              <p>
                Time to view your full results. Would you like to
                continue now or get a reminder later?
              </p>
              <div className="icebreakerbtns">
                <button>Remind Me</button>
                <button onClick={assessmentComplete}>Get Results</button>
              </div>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default PhaseFourIceBreaker;
