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
import { Link, withRouter } from "react-router-dom";
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
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  question10: string;
  question11: string;
  question12: string;
  question13: string;
  question14: string;
  question15: string;
  question16: string;
  question17: string;
  question18: string;
  question19: string;
  question20: string;
  question21: string;
  question22: string;
  question23: string;
  question24: string;
  token: string;
}

const AssessmentSeventhPhase = withRouter((props: any) => {
  const [value, setValue] = React.useState<number>(0);
  const [state, setCheckboxValue]: any = React.useState<State>({
    question1: "1",
    question2: "1",
    question3: "1",
    question4: "1",
    question5: "1",
    question6: "1",
    question7: "1",
    question8: "1",
    question9: "1",
    question10: "1",
    question11: "1",
    question12: "1",
    question13: "1",
    question14: "1",
    question15: "1",
    question16: "1",
    question17: "1",
    question18: "1",
    question19: "1",
    question20: "1",
    question21: "1",
    question22: "1",
    question23: "1",
    question24: "1",
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
    question19,
    question20,
    question21,
    question22,
    question23,
    question24,
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
      q19: question19,
      q20: question20,
      q21: question21,
      q22: question22,
      q23: question23,
      q24: question24,
    };
    axios
      .post(`${API}/phase-four`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        const User1 = localStorage.getItem("user");
        const User2 = User1 ? JSON.parse(User1) : "";
        const urlParams = new URLSearchParams(window.location.search);
        let urlkey = urlParams.get("counsellor");
        if (urlkey == "true") {
          return props.history.push("/counsellorresultpage");
        }
        if (User2[0]?.is_counsellor == true) {
          return props.history.push("/counsellorresultpage");
        }
        if (response.status === 200) {
          props.history.push("/assessmentcompleted");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error && error.response && error.response.data) {
          notify(error?.response?.data[0]?.message);
        }
        if (error) {
          notify("failed to send please try again later");
        }
      });
  };

  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent assesspadd">
          <AssessmentFirstSection
            progressBar={100}
            phase="Phase 4"
            nextPhase="Finish"
            time={13}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  1. To you getting the job done is more important than
                  excessively talking about it
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
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
                  2. You find it difficult communicating tasks you are working
                  on till it’s complete
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
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
                  3. You are exceptional at generating the ideas but not
                  handling the details.
                </div>
                <div className="rsliderclass9">
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
                  4. To be honest you can’t help but see the big picture in
                  every situation
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
                  5. You can only start working when you have clearly defined
                  objectives
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
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
                  6. Rather than going with the flow, you like to know what is
                  expected.
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
                  7. You’re the easiest to talk to in your group of friends,
                  people share their issues easily
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
                  8 . You are comfortable with others taking the lead and giving
                  100% support
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
            {/* End of old phase six */}
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  9. I find it easy leading project team or managing businesses
                </div>
                <div className="rsliderclass9 ">
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
                  10. I very much want to be involved in all aspects of a
                  business
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
                  11. It’s not easy for me to get people’s buy-in on an idea/
                  concept
                </div>
                <div className="rsliderclass9 ">
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
                  12. I wouldn’t really do everything in my power in getting
                  someone to see my point of view
                </div>
                <div className="rsliderclass9 ">
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
                  13. Working on different projects from time to time gives me
                  zest instead of routine
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
                  14. I love a job that gives me the opportunity to disrupt
                  things
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
                  15. Work would suck if I’m to manage a day to day routine
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
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
                  16. Managing teams can be such headaches I’d rather not be at
                  the centre
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
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
                  17. Promoting a collaborative culture in the workplace is more
                  of what you’re about.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
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
                  18. You find interest in actively developing the potential of
                  a colleague or employees to improve their work and life
                  productivity.
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
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
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  19. You prefer solving business issues by "running the
                  numbers."
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question19"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question19"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question19"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question19"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question19"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question19"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question19"
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
                  20. Your approach to interpreting the growth trajectory of an
                  organization is based on a financial analysis.
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question20"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question20"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question20"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question20"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question20"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question20"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question20"
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
                  21. You prefer to be involved in research and strategic
                  thinking in an organization
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question21"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question21"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question21"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question21"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question21"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question21"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question21"
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
                  22. You are fascinated by studying industry trends and making
                  projections
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question22"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question22"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question22"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question22"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question22"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question22"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question22"
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
                  23. You enjoy ensuring customers’ needs are satisfied
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question23"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question23"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question23"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question23"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question23"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question23"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question23"
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
                  24. Providing information about products and services, take
                  orders, respond to customer complaints, and processing return
                  never wears you out.
                </div>
                <div className="rsliderclass9 ">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={0}
                        onChange={onchange}
                        name="question24"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={1}
                        onChange={onchange}
                        name="question24"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={2}
                        onChange={onchange}
                        name="question24"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={3}
                        onChange={onchange}
                        name="question24"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={4}
                        onChange={onchange}
                        name="question24"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={5}
                        onChange={onchange}
                        name="question24"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="checkcontainer">
                      <input
                        type="radio"
                        value={6}
                        onChange={onchange}
                        name="question24"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="disagree">Disagree</div>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent jcenter">
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
            </Row>
          </Col>
        </Row>
        {/* <Footer /> */}
      </Container>
    </div>
  );
});

export default AssessmentSeventhPhase;
