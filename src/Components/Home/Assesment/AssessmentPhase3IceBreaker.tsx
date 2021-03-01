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

const PhaseThreeIceBreaker = (props: any) => {
  const [name, setName] = React.useState("");
  const [snippet, setSnippet] = React.useState({
    head_1: "",
    head_2: "",
    content: "Hold on while we fetch your result...",
    loading: false,
    loading2: false,
  });
  const { head_1, head_2, content, loading, loading2 } = snippet;
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : [{ first_name: "" }];
    setName(currentUser[0].first_name);
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    axios
      .get(`${API}/icebreaker/phase-three`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        // console.log(response?.data?.message);
        notify(response?.data?.message);
        setSnippet({
          ...snippet,
          loading: true,
          head_1: response?.data?.motivator1,
          head_2: response?.data?.motivator2,
          content: response?.data.support_text,
        });
      })
      .catch((error) => {
        // console.log(error?.response?.message);
        notify(error?.response?.message);
      });
  }, []);
  const nextPhase = () => {
    return window.location.assign("/assessmentphasefour");
  };
  const remindMe = () => {
    setSnippet({
      ...snippet,
      loading2: true,
    })
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {
      next_phase: "4",
    };
    axios
      .post(`${API}/assessment-remind`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        // console.log(response?.data?.message);
        setSnippet({
          ...snippet,
          loading2: false,
        })
        notify(response?.data?.message);
      })
      .catch((error) => {
        // console.log(error?.response?.message);
        setSnippet({
          ...snippet,
          loading2: false,
        })
        notify(error?.response?.message);
      });
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <>
      <Navbar />
      <Container fluid={true}>
        {loading2 === true && (
          <div className="icebreakerpreloader center-it">
            <div className="icebreakerspinner"></div>
          </div>
        )}
        <Row className="icebreakercontainer">
          <Row className="icebreakerprogress center-it">
            <AssessmentFirstSection
              progressBar={75}
              phase=""
              nextPhase="Phase 4"
              time={13}
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
                <h5>Hats off to you {name}!</h5>
                <p>
                  You have completed 3 out of the 4 assessment phases. &#128079;
                </p>
                <p>Here's a sneak peek of what we've gathered about you.</p>
              </div>
            </div>
          </Row>
          <Row className="spacespace">
            <div className="snippetcard">
              {loading === true ? (
                <>
                  <h5>
                    Your top two career non-negotiables are{" "}
                    <span>{head_1}</span> and <span>{head_2}</span>
                  </h5>
                  <p>{content}</p>
                </>
              ) : (
                <h6>
                  <i>Hold on while we fetch your result...</i>
                </h6>
              )}
            </div>
          </Row>
          <Row className="spacespace">
            <p className="phasedescrip">
              The fourth and final phase of this assessment determines your work
              style and work function fit. This allows us to make
              recommendations to spike up your productivity.
            </p>

            <div className="phasephase">
              <p>
                This phase contains a total of 22 questions. Would you like to
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

export default PhaseThreeIceBreaker;
