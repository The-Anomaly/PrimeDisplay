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
import { connect } from "react-redux";
import WebSocketInstance from "../../../wanaWebsocket";

class OnboardingChat extends React.Component {
  state: any = {
    offline: false,
    userMessage: [],
    wanaResponse: [],
    question1: "",
    disableInput: false,
    msg: "",
    chatid: "",
  };
  props: any;
  messagesEnd: any;
  constructor(props: any) {
    super(props);
  }
  initialiseChat(id) {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(id);
    });
    WebSocketInstance.connect(id);
  }
  waitForSocketConnection = (callback) => {
    const component = this;
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        // console.log("conection is made!");
        callback();
        return;
      } else {
        // console.log("waiting for connection....");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  };
  componentWillUnmount() {
    WebSocketInstance.disconnect();
  }
  componentDidUpdate(newProps) {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    // console.log(this.messagesEnd);
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      text: this.state.msg,
      chatId: this.state.chatid,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      disableInput: false,
      message: "",
      msg: "",
    });
    this.scrollToBottom();
  };

  onchange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
      disableInput: false,
    });
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
            chat_id: this.state.chatid,
            wanaResponse: [state.wanaResponse],
            disableInput: false,
          };
        });
        this.componentDidMount();
      })
      .catch((err) => {
        this.setState({
          disableInput: false,
        });
      });
  };
  componentDidMount() {
    const self: any = this.props;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : self.history.push("/signin");
    Axios.get(`${API}/onboarding-chat-id`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log(res.data);
        this.initialiseChat(res.data.chat);
        setTimeout(() => {
          this.scrollToBottom();
        }, 1000);
        this.setState({
          chatid: res.data.chat,
        });
      })
      .catch((err) => {});
  }
  isArray(arr) {
    return arr.constructor.toString().indexOf("Array") > -1;
  }
  render() {
    let a = "abcdefghijklmnopqrstuvwxyz".split("");
    console.log(this.props.messages);
    const {
      offline,
      userMessage,
      question1,
      msg,
      wanaResponse,
      disableInput,
    } = this.state;
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
                  {this.props.messages?.map((data, index) => (
                    <>
                      {this.isArray(data?.content) === false
                        ? data?.author == "wana" && (
                            <ChatBotShortAssessment
                              key={index}
                              message={data?.content}
                            />
                          )
                        : ""}
                      {this.isArray(data?.content)
                        ? data.content.map((data, i) =>
                            data == "Proceed" ? (
                              <div className="rsliderclas122">
                                <label className="checkcontainer1 klsll1">
                                  <input
                                    type="radio"
                                    value={"Yes, please proceed"}
                                    name="question2"
                                    onClick={() =>
                                      window.location.assign(
                                        "/assessment/welcome"
                                      )
                                    }
                                  />
                                  Yes, please proceed
                                </label>
                                <label className="checkcontainer1 klsll2">
                                  <input
                                    type="radio"
                                    value={"No, some other time"}
                                    name="question2"
                                    onClick={() => {
                                      localStorage.clear()
                                      window.location.assign("/");
                                    }}
                                  />
                                  No, some other time
                                </label>
                              </div>
                            ) : (
                              <>
                                {() =>
                                  this.setState({
                                    disableInput: true,
                                  })
                                }
                                <Col md={12} className="nopadd2" key={i}>
                                  <div className="rsliderclaskl">
                                    <label className="checkcontainer1 klsll">
                                      <input
                                        type="radio"
                                        onChange={this.onchange}
                                        value={data}
                                        name="msg"
                                      />
                                      <span className="checkmark1">{a[i]}</span>
                                      {data}
                                    </label>
                                  </div>
                                </Col>
                              </>
                            )
                          )
                        : ""}
                      {data?.author == "user" && (
                        <div className="user_response_wrapper">
                          <UserChatScreenTitle name="You" />
                          <UserSentChat message={data?.content} />
                        </div>
                      )}
                    </>
                  ))}
                  <div
                    style={{ float: "left", clear: "both" }}
                    ref={(el) => {
                      this.messagesEnd = el;
                    }}
                  ></div>
                  {/* User Message Reply */}
                </Col>
              </Row>
            </Col>
            <Col md={4} className="pdleft3"></Col>
            <Col md={8} className="chatwrappp">
              <div className="bottomChatArea">
                <div className="fle111">
                  <div className="p32">
                    <Form onSubmit={this.sendMessageHandler}>
                      <input
                        type="text"
                        className="typeMessagehere"
                        value={msg}
                        disabled={disableInput ? true : false}
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
                      onClick={this.sendMessageHandler}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* <Footer /> */}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.message.messages,
  };
};

export default connect(mapStateToProps)(OnboardingChat);
