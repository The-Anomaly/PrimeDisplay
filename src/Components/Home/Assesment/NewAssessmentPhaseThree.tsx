import * as React from "react";
import "../Home/Home.css";
import "./assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../HomeComponents/newfooter";
import Navbar from "../HomeComponents/newnavbar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import { Link } from "react-router-dom";
import "../Forms/recruitmentform.css";
import axios from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";

// team
const NewAssessmentPhaseThree = (props: any) => {
  const [value, setValue] = React.useState<number>(0);
  const [state, setCheckboxValue]: any = React.useState({
    question1: "0",
    question2: "0",
    question3: "0",
    question4: "0",
    question5: "0",
    question6: "0",
    question7: "0",
    question8: "0",
    question9: "0",
    question10: "0",
    question11: "0",
    question12: "0",
    question13: "0",
    question14: "0",
    question15: "0",
    question16: "0",
    question17: "0",
    question18: "0",
    token: "",
  });
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
    question12,
    question13,
    question14,
    question15,
    question16,
    question17,
    question18,
    token,
  } = state;

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
      [e.target.name]: e.target.value.toString(),
    });
  };

  //subform
  const submitForm = (e: any) => {
    e.preventDefault();
    if (
      question1 !== "" &&
      question2 !== "" &&
      question3 !== "" &&
      question4 !== "" &&
      question5 !== "" &&
      question6 !== "" &&
      question7 !== "" &&
      question8 !== "" &&
      question9 !== "" &&
      question10 !== "" &&
      question11 !== "" &&
      question12 !== "" &&
      question13 !== "" &&
      question14 !== "" &&
      question15 !== "" &&
      question16 !== "" &&
      question17 !== "" &&
      question18
    ) {
      const data = {
        q1: question1,
        q2: question2,
        q3: question3,
        q4: question4,
        q5: question5,
        q6: question6,
        q7: question7,
        q8: question8,
        q9: question9,
        q10: question10,
        q11: question11,
        q12: question12,
        q13: question13,
        q14: question14,
        q15: question15,
        q16: question16,
        q17: question17,
        q18: question18,
      };
      axios
        .post(`${API}/phase-three`, data, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          handleSuccess(response);
        })
        .catch((error) => {
          handleErrors(error);
        });
    } else {
      notify("Please answer all questions");
    }
  };
  const handleSuccess = (response: any) => {
    if (response.status === 200) {
      props.history.push("/assessment/phasethree/complete");
    }
  };
  const handleErrors = (error: any) => {
    if (error && error.response && error.response.data) {
      notify(error.response.data[0].message);
    }
    if (error && error.response == undefined) {
      notify("Failed to process! try again later");
    }
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <div>
      <Navbar />
      <Container fluid={true} >
        <Row className="firstrowcf cftcontent assesspadd">
          <AssessmentFirstSection
            progressBar={50}
            phase="Phase 3"
            nextPhase="Phase 4"
            time={10}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  1. You would rather have someone else make all the strategic
                  decisions and tell you what to do.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question1"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question1"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question1"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question1"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question1"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question1"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question1"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  2. You’ve realized over time that you achieve more results
                  when accountable to someone than alone.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question2"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question2"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question2"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question2"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question2"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question2"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question2"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  3. To you being part of a team is more important than working
                  alone.
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question3"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question3"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question3"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question3"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question3"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question3"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question3"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  4. A work environment with cooperative colleagues can keep you
                  at a job longer.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question4"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question4"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question4"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question4"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question4"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question4"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question4"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  5. You would take a job with lower pay if it gave you the
                  opportunity to fulfill purpose, because life is more than a
                  pay check.
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper  flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question5"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question5"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question5"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question5"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question5"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question5"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question5"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  6. You always seek opportunities to meet needs in your
                  society, because if one of us can make it all of us can make
                  it.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question6"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question6"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question6"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question6"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question6"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question6"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question6"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  7. You are energized when you have real control
                  over people and resources; other than that, working is a waste
                  of time.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question7"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question7"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question7"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question7"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question7"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question7"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question7"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  8. You find yourself pushing your point of view subtly or
                  forcefully till the person accepts it.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question8"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question8"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question8"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question8"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question8"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question8"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question8"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  9. Pursuing a vision or ambition on an empty bank account is
                  too risky, a steady job is better for you.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question9"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question9"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question9"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question9"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question9"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question9"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question9"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  10. You would choose a job with secure working conditions and
                  income than a growing a business with little initial income.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question10"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question10"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question10"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question10"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question10"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question10"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question10"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  11. Respect and prestige isn’t very important to you in life.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question11"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question11"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question11"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question11"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question11"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question11"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question11"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  12. You shy away from public recognition.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question12"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question12"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question12"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question12"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question12"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question12"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question12"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  13. If your employer recognizes the value of your work you will
                  stand by them.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question13"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question13"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question13"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question13"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question13"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question13"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question13"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  14. Positive feedback energizes you.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question14"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question14"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question14"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question14"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question14"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question14"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question14"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  15. You are keen on being referred to as a thought leader in
                  your career.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question15"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question15"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question15"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question15"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question15"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question15"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question15"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  16. Being a master of one trade is better than being a master of many.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question16"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question16"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question16"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question16"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question16"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question16"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question16"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  17. In making money, if you have just enough to meet your
                  essential needs you are satisfied.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question17"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question17"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question17"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question17"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question17"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question17"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question17"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  18. Success on a project isn’t necessarily tied to how
                  much financial returns you make.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question18"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question18"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question18"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question18"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question18"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question18"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question18"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <ToastContainer
              enableMultiContainer
              containerId={"B"}
              toastClassName="bg-danger text-white"
              hideProgressBar={true}
              position={toast.POSITION.TOP_CENTER}
            />
            <div className="nxtbtnarea">
              <button className="nxtbtn" onClick={submitForm}>
                Next
              </button>
            </div>
          </Col>
        </Row>
        {/* <Footer /> */}
      </Container>
    </div>
  );
};
export default NewAssessmentPhaseThree;
