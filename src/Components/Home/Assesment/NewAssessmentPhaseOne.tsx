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
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

// team

const NewAssessmentPhaseOne = withRouter((props: any) => {
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
    question23: "1",
    question24: "1",
    question25: "1",
    question26: "1",
    question27: "1",
    question28: "1",
    question29: "1",
    question30: "1",
    isloading: false,
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
    question25,
    question26,
    question27,
    question28,
    question29,
    question30,
    isloading,
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
    setCheckboxValue({
      ...state,
      isloading: true,
    });
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
      q25: question25,
      q26: question26,
      q27: question27,
      q28: question28,
      q29: question29,
      q30: question30,
    };
    // console.log(data);
    axios
      .post(`${API}/phase-one`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        // console.log(response);
        setCheckboxValue({
          ...state,
          isloading: false,
        });
        if (response.status === 200) {
          props.history.push("/assessment/phaseone/complete");
        }
      })
      .catch((error) => {
        // console.log(error);
        setCheckboxValue({
          ...state,
          isloading: false,
        });
        if (error && error.response && error.response.data) {
          notify(error.response.data[0].message);
        }
        if (error && error.response == undefined) {
          notify("Failed to process! try again later");
        }
      });
  };

  const notify = (message: string) => toast(message, { containerId: "B" });
  const name1 = "question1";
  const name2 = "question2";
  const name3 = "question3";
  const name4 = "question4";
  const name5 = "question5";
  const name6 = "question6";
  const name7 = "question7";
  const name8 = "question8";
  const name9 = "question9";
  const name10 = "question10";
  const name11 = "question11";
  const name12 = "question12";
  const name13 = "question13";
  const name14 = "question14";
  const name15 = "question15";
  const name16 = "question16";
  const name17 = "question17";
  const name18 = "question18";
  const name19 = "question19";
  const name20 = "question20";
  const name21 = "question21";
  const name22 = "question22";
  const name23 = "question23";
  const name24 = "question24";
  const name25 = "question25";
  const name26 = "question26";
  const name27 = "question27";
  const name28 = "question28";
  const name29 = "question29";
  const name30 = "question30";

  return (
    <>
      <Col md={11}>
        <Row className="firstrowcf2 cftcontent">
          <Col md={12}>
            <div className="firstquestion">
              1. When having conversations with people do you often do most of
              the talking?
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name1}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name1}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name1}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name1}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name1}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name1}
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
              2. When you’re sad do you feel better after hanging out or
              spending time with friends?
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name2}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name2}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name2}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name2}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name2}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name2}
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
              3. When it comes to solving problems do you tend to be more
              realistic than creative?
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name3}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name3}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name3}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name3}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name3}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name3}
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
              4. Do you usually focus on what is happening today than the
              possibilities of the future?
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name4}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name4}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name4}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name4}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name4}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name4}
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
              5. When making decisions do you consider how the circumstances
              make you feel or the facts?
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name5}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name5}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name5}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name5}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name5}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name5}
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
              6. Are you prone to putting others need ahead of yours?
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name6}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name6}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name6}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name6}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name6}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name6}
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
              7. Do you improvise more than you plan?
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name7}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name7}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name7}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name7}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name7}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name7}
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
              8. Would rather enjoy now then complete your assignments ?
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name8}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name8}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name8}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name8}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name8}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name8}
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
              9.Paying attention to details is your specialty; you can spot
              errors from miles away
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input type="radio" value={0} onChange={onchange} name="" />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name9}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name9}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name9}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name9}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name9}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name9}
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
              10. Planning, organizing and ensuring things are properly done by
              everyone no matter how annoying the tasks are, is who you are
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name10}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name10}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name10}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name10}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name10}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name10}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name10}
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
              11. As a student you are/were likely to look for the missing links
              in what was being taught in class
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name11}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name11}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name11}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name11}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name11}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name11}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name11}
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
              12. You often ask the questions no one likes to ask
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name12}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name12}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name12}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name12}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name12}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name12}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name12}
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
              13. Functionality is more important than beauty to you
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name13}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name13}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name13}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name13}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name13}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name13}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name13}
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
              14. To be honest you are not really exceptional at generating
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
                    name={name14}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name14}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name14}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name14}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name14}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name14}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name14}
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
              15. You are quick to accommodate and help people, without judging
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name15}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name15}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name15}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name15}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name15}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name15}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name15}
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
              16. You are known for keeping your friends happy and laughing
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name16}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name16}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name16}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name16}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name16}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name16}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name16}
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
              17. One of your weaknesses is difficulty to influence/ inspire
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
                    name={name17}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name17}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name17}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name17}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name17}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name17}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name17}
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
              18. You can create the ideas/ initiatives but may find it
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
                    name={name18}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name18}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name18}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name18}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name18}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name18}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name18}
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
              19. Negotiating with people to achieve a win-win is an exceptional
              skill you have
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name19}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name19}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name19}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name19}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name19}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name19}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name19}
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
              20. You can easily network your way to get what you need from who
              you need it from.
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name20}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name20}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name20}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name20}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name20}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name20}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name20}
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
              21. When it comes to work, you have a deep desire to compete
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name21}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name21}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name21}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name21}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name21}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name21}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name21}
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
              22. You always approach work with vigor and dexterity
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name22}
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
                    name={name22}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name22}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name22}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name22}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name22}
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
              23. You disintegrate things and fix them back to satisfy your
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
                    name={name23}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name23}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name23}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name23}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name23}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name23}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name23}
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
              24. You are inquisitive about how things work
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name24}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name24}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name24}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name24}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name24}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name24}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name24}
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
              25. You find it difficult communicating your points and opinions
              clearly
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name25}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name25}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name25}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name25}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name25}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name25}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name25}
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
              26. It takes a while for you to understand instructions or
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
                    name={name26}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name26}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name26}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name26}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name26}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name26}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name26}
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
              27. You are super proficient in navigating apps and new technology
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name27}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name27}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name27}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name27}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name27}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name27}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name27}
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
              28. You would prefer using an app to quickly get work done than do
              it manually first.
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name28}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name28}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name28}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name28}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name28}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name28}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name28}
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
              29. You keep trying new methods till you find an answer.
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name29}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name29}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name29}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name29}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name29}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name29}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name29}
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
              30. You often follow your curiosity about a thing or subject.
            </div>
            <div className="rsliderclass9">
              <div className="agree">Agree</div>
              <div className="checkwrapper flipdirection">
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={0}
                    onChange={onchange}
                    name={name30}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={1}
                    onChange={onchange}
                    name={name30}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={2}
                    onChange={onchange}
                    name={name30}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={3}
                    onChange={onchange}
                    name={name30}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={4}
                    onChange={onchange}
                    name={name30}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={5}
                    onChange={onchange}
                    name={name30}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkcontainer">
                  <input
                    type="radio"
                    value={6}
                    onChange={onchange}
                    name={name30}
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
              {isloading && <Spinner animation={"grow"} />}
            </div>
          </Row>
        </Row>
      </Col>
    </>
  );
});

export default NewAssessmentPhaseOne;
