import * as React from "react";
import "./assessmenticebreaker.css";
import Navbar from "../HomeComponents/newnavbar";
import { Container, Row } from "react-bootstrap";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import wana from "../../../assets/chatgirl.png";
import axios from "axios";
import { API } from "../../../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// team
type User = string | null;

const WelcomeIceBreaker = (props: any) => {
  const [name, setName] = React.useState("");

  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : [{ first_name: "" }];
    setName(currentUser[0].first_name);
  }, []);

  const nextPhase = () => {
    return window.location.assign("/assessmentphaseone");
  };

  const remindMe = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {
      next_phase: "1",
    };
    axios
      .post(`${API}/assessment-remind`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        // console.log(response?.data?.message);
        notify(response?.data?.message);
        setTimeout(() => {
          return props.history.push(`/overview`);
        }, 1000);
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
              progressBar={0}
              phase=""
              nextPhase="Phase 1"
              time={15}
            />
          </Row>
          <Row className="chatrow">
            <div className="wanatxtsec">
              <img
                className="wanaimg wanaimg1"
                src={wana}
                alt="wana, your clarity assistant"
              />
              <div className="wanatxt wanatxt1">
                <h5>Hello {name}</h5>
                <p>
                  A fulfilling life, career or business starts with intentional
                  self-awareness, evaluating where you are, to determine the
                  right direction forward. The objective of this assessment is
                  to help you kick-start this process. Be relaxed and honest
                  when answering all the questions, this will help you to gain
                  maximum benefit.
                </p>
              </div>
            </div>
          </Row>
          <Row className="spacespace">
            <p className="phasedescrip phasedescrip1">
              The first phase of this assessment is going to measure your
              personality composition and your natural work competencies.
            </p>
            <div className="phasephase">
              <p className="fufillingz">
                This phase contains a total of 30 questions. Would you like to
                start now or get a reminder later?
              </p>
              <div className="icebreakerbtns">
                <button onClick={remindMe}>Remind Me</button>
                <button onClick={nextPhase}>Start</button>
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

export default WelcomeIceBreaker;