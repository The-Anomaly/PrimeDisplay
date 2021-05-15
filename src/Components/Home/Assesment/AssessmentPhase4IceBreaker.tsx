import * as React from "react";
import "./assessmenticebreaker.css";
import Navbar from "../HomeComponents/newnavbar";
import { Container, Row } from "react-bootstrap";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import wana from "../../../assets/chatgirl.png";
import "react-toastify/dist/ReactToastify.css";

// team
type User = string | null;

const PhaseFourIceBreaker = (props: any) => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : [{ first_name: "" }];
    setName(currentUser[0].first_name);
  }, []);
  const assessmentComplete = () => {
    return props.history.push("/freeresult");
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
                  Yup, you are done.
                </p>
                <p>You have completed the 4 assessment phases. &#128079; &#128079;</p>
              </div>
            </div>
          </Row>
          <Row className="spacespace spacespace1">
            <div className="phasephase">
              <p>
                Time to completely discover what we've learnt about you.
              </p>
              <div className="icebreakerbtns center-it getresult">
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
