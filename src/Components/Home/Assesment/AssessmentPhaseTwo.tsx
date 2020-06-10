import * as React from "react";
import "../Home/Home.css";
import "./assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../HomeComponents/footer";
import Navbar from "../HomeComponents/navbar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import { Link } from "react-router-dom";
import "../Forms/recruitmentform.css";
import axios from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";

// team
interface State {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  token: string;
}

const AssessmentSecondPhase = (props: any) => {
  const [value, setValue] = React.useState<number>(0);
  const [state, setCheckboxValue]: any = React.useState<State>({
    question1: "1",
    question2: "1",
    question3: "1",
    question4: "1",
    question5: "1",
    token: "",
  });
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    token,
  } = state;

  //cdm
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    setCheckboxValue({ ...state, token });
  }, []);

  //update form feild
  const onchange = (e: any) => {
    setCheckboxValue({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //subform
  const submitForm = (e: any) => {
    e.preventDefault();
    const data = {
      q9: question1,
      q10: question2,
      q11: question3,
      q12: question4,
      q13: question5,
    };
    console.log(data);
    axios
      .post(`${API}/workpersonality`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          props.history.push("/secondphasecomplete");
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error && error.response && error.response.data)
          notify(error.response.data[0].message);
      });
  };

  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent">
          <AssessmentFirstSection
            progressBar={25}
            phase="Phase 2"
            nextPhase="Phase 3"
            time={13}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  a. In a gathering of people, you are often the:
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={1}
                      name="question1"
                    />
                    <span className="checkmark1">A</span>
                    Mover & Shaker
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">B</span>
                    Person watching others
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">b. Your personal moto is</div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">A</span>
                    Live for the moment
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">B</span>
                    Eventual success no matter how hard
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  C. Work is a lot easier when:
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">A</span>I feel accepted by my
                    co-workers in a friendly environment.
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">B</span>
                    I’m able to create my own rules and work without
                    interference.
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">d. People think of you as:</div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">A</span>
                    Carefree, friendly and sometimes careless
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">B</span>
                    Rigid, friendly and sometimes too uptight
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  e. When your day ends how do you feel?
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">A</span>
                    Satisfied & Happy
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">B</span>
                    Indifference, you followed the routine for your day
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">C</span>
                    Unsure and unclear you’re doing the right thing with your
                    life.
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={4}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">D</span>
                    Like you still have a lot to achieve
                  </label>
                </div>
              </Col>
              <ToastContainer
                enableMultiContainer
                containerId={"B"}
                toastClassName="bg-danger text-white"
                hideProgressBar={true}
                position={toast.POSITION.TOP_CENTER}
              />
              <Row className="jcenter1">
                <div className="nxtbtnarea">
                  <button className="nxtbtn" onClick={submitForm}>
                    Next
                  </button>
                </div>
              </Row>
            </Row>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default AssessmentSecondPhase;
