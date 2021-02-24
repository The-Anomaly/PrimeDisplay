import * as React from "react";
import "./assessmenticebreaker.css";
import Navbar from "../HomeComponents/newnavbar";
import { Container, Row } from "react-bootstrap";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import wana from "../../../assets/chatgirl.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../../../config";

// team
type User = string | null;

const PhaseOneIceBreaker = (props: any) => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : [{ first_name: "" }];
    setName(currentUser[0].first_name);
  }, []);
  const nextPhase = () => {
    return window.location.assign("/assessmentphasetwo")
  }
  const remindMe = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {
      next_phase: "2",
    };
    axios
      .post(`${API}/assessment-remind`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        // console.log(response?.data?.message);
        notify(response?.data?.message);
      })
      .catch((error) => {
        // console.log(error?.response?.message);
        notify(error?.response?.message);
      });
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
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
              time={12}
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
                <h5>Way to go {name}!</h5>
                <p>
                  You have completed 1 out of the 4 assessment phases. &#128079;
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
              The next phase evaluates your career interests and matches it against your natural competencies to find the best fit for you.
            </p>

            <div className="phasephase">
              <p>
                This phase contains a total of 7 categories. Would you like to
                continue now or get a reminder later?
              </p>
              <div className="icebreakerbtns">
                <button onClick={remindMe}>Remind Me</button>
                <button onClick={nextPhase}>Continue</button>
              </div>
            </div>
          </Row>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};

export default PhaseOneIceBreaker;
