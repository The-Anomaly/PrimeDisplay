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
  question9: string;
  question10: string;
  question13: string;
  token: string;
}

const AssessmentSecondPhase = (props: any) => {
  const [value, setValue] = React.useState<number>(0);
  const [state, setCheckboxValue]: any = React.useState<State>({
    question9: "1",
    question10: "1",
    question13: "1",
    token: "",
  });
  const { question9, question10, question13, token } = state;

  //cdm
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("userToken");
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
      q9: question9,
      q10: question10,
      q13: question13,
    };
    axios
      .post(`${API}/workpersonality`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          props.history.push("/secondphasecomplete");
        }
      })
      .catch((error) => {
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
                  a. There are nine qualities listed below, pick only the one
                  that best describes you:
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={1}
                      name="question9"
                    />
                    <span className="checkmark1">A</span>
                    Principled
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">B</span>
                    Supportive
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">C</span>
                    Competitive
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={4}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">D</span>
                    Idealistic
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">E</span>
                    Innovative
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={6}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">F</span>
                    Responsible
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={7}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">G</span>
                    Creative
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={8}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">H</span>
                    Assertive
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={9}
                      onChange={onchange}
                      name="question9"
                    />
                    <span className="checkmark1">I</span>
                    Flexible
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  b.Out of the nine traits mentioned below pick the one that
                  best describes you
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={1}
                      name="question10"
                    />
                    <span className="checkmark1">A</span>I am a perfectionist
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">B</span>I like to please people
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">C</span>I care about what
                    people think of me
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={4}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">D</span>I don’t take nonsense
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">E</span>I am a private person
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={6}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">F</span>I get worried easily
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={7}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">G</span>I live life the way I
                    want
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={8}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">H</span>I can be aggressive
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={9}
                      onChange={onchange}
                      name="question10"
                    />
                    <span className="checkmark1">I</span>I get stressed easily
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  c. When your day ends how do you feel?
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question13"
                    />
                    <span className="checkmark1">A</span>
                    Satisfied & Happy
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={2}
                      onChange={onchange}
                      name="question13"
                    />
                    <span className="checkmark1">B</span>
                    Indifference, you followed the routine for your day
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question13"
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
                      name="question13"
                    />
                    <span className="checkmark1">D</span>
                    Like you still have a lot to achieve
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
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
