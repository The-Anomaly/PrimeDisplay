import * as React from "react";
import Navbar from "../HomeComponents/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Footer from "../HomeComponents/footer";
import Col from "react-bootstrap/Col";
import search from "../../../assets/search.png";
import "./onboardingchat.css";
import pin from "../../../assets/attachpin.png";
import attachimage from "../../../assets/attachimage.png";
import sendButton from "../../../assets/sendbutton.png";
import ActiveUsers from "./chatcomponents/activeuser";
import { useState } from "react";
import CenteredHeader from "./chatcomponents/centeredTitle";
import ChatBot from "./chatcomponents/chatBot";
import UserSentChat from "./chatcomponents/userSentChat";
import UserChatScreenTitle from "./chatcomponents/userChatScreenTitle";
import SendMessageToolbar from "./chatcomponents/sendMessageTool";
import Axios from "axios";
import { API } from "../../../config";
import Form from "react-bootstrap/Form";
import ChatBotShortAssessment from "./chatcomponents/ChatBotShortAssesment";
import UserSentAssessment from "./chatcomponents/userSentAssesment";
import "../Assesment/assessment.css";

class OnboardingChatPhase2 extends React.Component {
  state: any = {
    offline: false,
    userMessage: [],
    wanaResponse: [],
    msg: "",
    question1: " ",
    question2: " ",
  };
  offlineColor = "#3cb238";
  onlineColor = "#7f8fa4b9";
  onlineTxt = "#9c1258";
  offlineTxt = "#fff";
  firstOnchange = (e: any) => {
    this.setState({
      question2: e.target.value,
    });
  };
  onchange = (e: any) => {
    this.setState({
      question1: e.target.value,
    });
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  sendFormData = (e) => {
    const self: any = this;
    e.preventDefault();
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {
      profession: this.state.question1,
    };
    Axios.post(`${API}/profile`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        self.props.history.push("/assessmentphaseone");
      })
      .catch((err) => {
      });
  };
  componentDidMount() {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
  }
  render() {
    const { offline, userMessage, msg, wanaResponse } = this.state;
    return (
      <>
        <Navbar />
        <Container fluid={true} className="">
          <Row className="chatouter">
            <Col md={12} className="chatwrapper">
              <Row>
                <Col md={3} className="bg-white pdleft">
                  <input
                    type="text"
                    className="searcharea"
                    placeholder="Dashboard Chat"
                    disabled
                  />
                </Col>
                <Col md={8} className="x100 ">
                  <div className="hiddenItem">.</div>
                  <CenteredHeader
                    name="Wana Yudimy"
                    bgColor={offline ? this.onlineColor : this.offlineColor}
                  />
                  <div>
                    <div className="three-dot"></div>
                  </div>
                </Col>
                <Col md={3} className="bg-white pdleft1">
                  <ActiveUsers
                    color={offline ? this.offlineTxt : this.offlineTxt}
                    offline
                    bgColor={offline ? this.offlineTxt : this.onlineTxt}
                  />{" "}
                  {/* we are passing three props to check the state of the app and update the color */}
                </Col>
                <Col md={8} className="chatwrap">
                  <ChatBot name="Wana Yudimy" />
                  {/* First Message from Api */}
                  {/* Chat bot assessment */}
                  <Row className="firstrowcf2 cftcontent">
                    <Col md={12} className="nopadd2">
                      <div className="chatbotText sentbg">
                        Which of these best describes you ?
                      </div>
                      <div className="rsliderclaskl">
                        <label className="checkcontainer1 klsll">
                          <input
                            type="radio"
                            onChange={this.onchange}
                            value="Entrepreneur (Startup phase)"
                            name="question1"
                          />
                          <span className="checkmark1">A</span>Entrepreneur
                          (Startup phase)
                        </label>
                        <label className="checkcontainer1 klsll">
                          <input
                            type="radio"
                            value="Entrepreneur(Growing business)"
                            onChange={this.onchange}
                            name="question1"
                          />
                          <span className="checkmark1">B</span>Entrepreneur
                          (Growing business)
                        </label>
                        <label className="checkcontainer1 klsll">
                          <input
                            type="radio"
                            onChange={this.onchange}
                            value="Entrepreneur (Established)"
                            name="question1"
                          />
                          <span className="checkmark1">C</span>Entrepreneur
                          (Established)
                        </label>
                        <label className="checkcontainer1 klsll">
                          <input
                            type="radio"
                            value="Working Professional (Entry level)"
                            onChange={this.onchange}
                            name="question1"
                          />
                          <span className="checkmark1">D</span>Working
                          Professional (Entry level)
                        </label>
                        <label className="checkcontainer1 klsll">
                          <input
                            type="radio"
                            onChange={this.onchange}
                            value="Working Professional (Mid-level)"
                            name="question1"
                          />
                          <span className="checkmark1">E</span>Working
                          Professional (Mid-level)
                        </label>
                        <label className="checkcontainer1 klsll">
                          <input
                            type="radio"
                            value="Working Professional (Senior Level)"
                            onChange={this.onchange}
                            name="question1"
                          />
                          <span className="checkmark1">F</span>Working
                          Professional (Senior Level)
                        </label>
                        <label className="checkcontainer1 klsll">
                          <input
                            type="radio"
                            value="Student (Postgraduate)"
                            onChange={this.onchange}
                            name="question1"
                          />
                          <span className="checkmark1">G</span>Student
                          (Postgraduate)
                        </label>
                        <label className="checkcontainer1 klsll">
                          <input
                            type="radio"
                            value="Student (Undergraduate)"
                            onChange={this.onchange}
                            name="question1"
                          />
                          <span className="checkmark1">H</span>Student
                          (Undergraduate)
                        </label>
                      </div>
                    </Col>
                  </Row>
                  {/* chat bot assessment */}
                  <div className="user_response_wrapper">
                    <UserChatScreenTitle name="You" />
                    <div className="rsliderclas122">
                      <label className="checkcontainer1 klsll1">
                        <input
                          type="radio"
                          value={"Yes, please proceed"}
                          name="question2"
                          onClick={this.sendFormData}
                        />
                        Yes, please proceed
                      </label>
                      <label className="checkcontainer1 klsll2">
                        <input
                          type="radio"
                          value={"No, some other time"}
                          name="question2"
                          onClick={() => {
                            window.location.assign("/");
                          }}
                        />
                        No, some other time
                      </label>
                    </div>
                  </div>
                  {/* User Message Reply */}
                </Col>
              </Row>
            </Col>
            <Col md={4} className="pdleft3"></Col>
            <Col md={8} className="chatwrappp">
              <div className="bottomChatArea">
                <div className="fle111">
                  <div className="p32">
                    <Form onSubmit={this.sendFormData}>
                      <input
                        type="text"
                        className="typeMessagehere"
                        value={msg}
                        name="msg"
                        onChange={this.changeHandler}
                        placeholder="Type a message"
                      />
                    </Form>
                  </div>
                  <div>
                    <input className="hidden" type="submit" />
                    <img
                      src={sendButton}
                      className="sendButton"
                      alt="sendButton"
                      onClick={this.sendFormData}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Footer />
        </Container>
      </>
    );
  }
}

export default OnboardingChatPhase2;
