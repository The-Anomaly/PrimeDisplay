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
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  token: string;
}

const AssessmentSixthPhase = (props: any) => {
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
      [e.target.name]: e.target.value.toString(),
    });
  };

  //subform
  const submitForm = (e: any) => {
    e.preventDefault();
    const data = {
      q62: question1,
      q63: question2,
      q64: question3,
      q65: question4,
      q66: question5,
      q67: question6,
      q68: question7,
      q69: question8,
    };
    console.log(data);
    axios
      .post(`${API}/workstyle`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        handleSuccess(response);
      })
      .catch((error) => {
        console.log(error.response);
        handleErrors(error);
      });
  };
  const handleSuccess = (response: any) => {
    if (response.status === 200) {
      props.history.push("/assessmentphasesixcomplete");
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
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent">
          <AssessmentFirstSection
            progressBar={70}
            phase="Phase 6"
            nextPhase="Phase 7"
            time={13}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  a. To you getting the job done is more important than
                  excessively talking about it
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question1"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question1"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question1"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question1"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  b. You find it difficult communicating tasks you are working
                  on till it’s complete
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question2"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question2"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question2"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question2"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  c. You are exceptional at generating the ideas but not
                  handling the details.
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question3"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question3"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question3"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question3"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  d. To be honest you can’t help but see the big picture in
                  every situation
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question4"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question4"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question4"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question4"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  e. You can proceed with work based on highlights and figure
                  out the specifics along the way
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question5"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question5"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question5"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question5"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  f. You typically enjoy going with the flow, experimenting and
                  observing how things go
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question6"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question6"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question6"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question6"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question6"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question6"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question6"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  g. You’re the easiest to talk to in your group of friends,
                  people share their issues easily
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question7"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question7"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question7"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question7"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question7"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question7"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question7"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12}>
                <div className="firstquestion">
                  h. You are comfortable with others taking the lead and giving
                  100% support
                </div>
                <div className="rsliderclassPol1">
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={6}
                      name="question8"
                    />
                    <span className="checkmark1">A</span>
                    Very Much
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={5}
                      onChange={onchange}
                      name="question8"
                    />
                    <span className="checkmark1">B</span>
                    Yes
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={4}
                      name="question8"
                    />
                    <span className="checkmark1">C</span>
                    Often not always
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={3}
                      onChange={onchange}
                      name="question8"
                    />
                    <span className="checkmark1">D</span>I don’t even know
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      onChange={onchange}
                      value={2}
                      name="question8"
                    />
                    <span className="checkmark1">E</span>
                    Not exactly
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={1}
                      onChange={onchange}
                      name="question8"
                    />
                    <span className="checkmark1">F</span>
                    Barely
                  </label>
                  <label className="checkcontainer1">
                    <input
                      type="radio"
                      value={0}
                      onChange={onchange}
                      name="question8"
                    />
                    <span className="checkmark1">G</span>
                    Absolutely not
                  </label>
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
        <Footer />
      </Container>
    </div>
  );
};

export default AssessmentSixthPhase;
