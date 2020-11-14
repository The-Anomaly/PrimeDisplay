import * as React from "react";
import Navbar from "../HomeComponents/newnavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Footer from "../HomeComponents/newfooter";
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
import ChatBotShortAssessment from "./chatcomponents/ChatBotSentMessages";
import UserSentChat from "./chatcomponents/userSentChat";
import UserChatScreenTitle from "./chatcomponents/userChatScreenTitle";
import SendMessageToolbar from "./chatcomponents/sendMessageTool";
import Axios from "axios";
import { API } from "../../../config";
import Form from "react-bootstrap/Form";

class OnboardingChat extends React.Component {
  state: any = {
    offline: false,
    userMessage: [],
    wanaResponse: [],
    msg: "",
  };
  offlineColor = "#3cb238";
  onlineColor = "#7f8fa4b9";
  onlineTxt = "#9c1258";
  offlineTxt = "#fff";
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  sendFormData = (e) => {
    e.preventDefault();
    const self: any = this.props;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : self.history.push("/signin");
    const data = {
      text: this.state.msg,
    };
    Axios.post(`${API}/chat`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        setTimeout(() => {
          if (res?.data?.next) {
            self.history.push("/clientchat2");
          }
        }, 2000);
        this.setState((state: any) => {
          return {
            userMessage: [...state.userMessage],
            msg: "",
            wanaResponse: [state.wanaResponse],
          };
        });
        this.componentDidMount();
      })
      .catch((err) => {
      });
  };
  componentDidMount() {
    const self: any = this.props;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : self.history.push("/signin");
    Axios.get(`${API}/chat`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        if (res?.data?.next) {
          self.history.push("/clientchat2");
        }
        this.setState({
          wanaResponse: res?.data?.response,
        });
      })
      .catch((err) => {
      });
  }
  render() {
    const { offline, userMessage, msg, wanaResponse } = this.state;
    return (
      <>
        <Navbar />
        <Container fluid={true} className="nopadd">
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
                  {wanaResponse?.map((data, index) => (
                    <>
                      <ChatBotShortAssessment
                        key={index}
                        message={data.server}
                      />
                      <div className="user_response_wrapper">
                        <UserChatScreenTitle name="You" />
                        <UserSentChat message={data.user} />
                      </div>
                    </>
                  ))}
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

export default OnboardingChat;
