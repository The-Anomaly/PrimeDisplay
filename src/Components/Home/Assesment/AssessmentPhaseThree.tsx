import * as React from "react";
import "../Home/Home.css";
import "./assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../HomeComponents/newfooter";
import Navbar from "../HomeComponents/newnavbar";
import clock from "../../../assets/clock.png";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import axios from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";

// team

const AssessmentThirdPhase = (props: any) => {
  const [value, setValue] = React.useState<number>(0);
  const [state, setCheckboxValue]: any = React.useState({
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
    token,
  } = state;

  //cdm
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/login");
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
      q14: question1,
      q15: question2,
      q16: question3,
      q17: question4,
      q18: question5,
      q19: question6,
      q20: question7,
      q21: question8,
      q22: question9,
      q23: question10,
      q24: question11,
      q25: question12,
      q26: question13,
      q27: question14,
      q28: question15,
      q29: question16,
      q30: question17,
      q31: question18,
      q32: question19,
      q33: question20,
      q34: question21,
      q35: question22,
    };
    axios
      .post(`${API}/naturalcompetence`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          props.history.push("/thirdphasecomplete");
        }
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          notify(error.response.data[0].message);
        }
        if (error && error.response == undefined) {
          notify("Failed to process! try again later");
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
            progressBar={35}
            phase="Phase 3"
            nextPhase="Phase 4"
            time={15}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  a.Paying attention to details is your specialty; you can spot
                  errors from miles away
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
                  b. Planning, organizing and ensuring things are properly done
                  by everyone no matter how annoying the tasks are, is who you
                  are
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
                  c. As a student you are/were likely to look for the missing
                  links in what was being taught in class
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
                  d. You often ask the questions no one likes to ask
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
                  e. Functionality is more important than beauty to you
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
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
                  f. To be honest you are not really exceptional at generating
                  creative ideas, it’s a struggle.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
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
                  g. You are quick to accommodate and help people, without
                  judging
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
                  h. You are known for keeping your friends happy and laughing
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
                  i.One of your weaknesses is difficulty to influence/ inspire
                  people to action.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
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
                  j. You can create the ideas/ initiatives but may find it
                  difficult pulling together the resources needed to implement
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper">
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
                  k. Negotiating with people to achieve a win-win is an
                  exceptional skill you have
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
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
                  l. You can easily network your way to get what you need from
                  who you need it from.
                </div>
                <div className="rsliderclass9">
                  <div className="agree">Agree</div>
                  <div className="checkwrapper flipdirection">
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
                  m. When it comes to work, you have a deep desire to compete
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
                  n. You always approach work with vigor and dexterity
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
                  o. You disintegrate things and fix them back to satisfy your
                  curiosity
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
                  p. You are inquisitive about how things work
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
                  q. You find it difficult communicating your points and
                  opinions clearly
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
                  r. It takes a while for you to understand instructions or
                  information shared
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
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  s. You are super proficient in navigating apps and new technology
                </div>
                <div className="rsliderclass9">
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
                  t. You would prefer using an app to quickly get work done than
                  do it manually first.
                </div>
                <div className="rsliderclass9">
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
                  u. You keep trying new methods till you find an answer.
                </div>
                <div className="rsliderclass9">
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
                  v. You often follow your curiosity about a thing or subject.
                </div>
                <div className="rsliderclass9">
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
        {/* <Footer /> */}
      </Container>
    </div>
  );
};

export default AssessmentThirdPhase;
