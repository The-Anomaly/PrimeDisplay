import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import nocounmessage from "../../../assets/nocounmessage.svg";
import { useEffect, useState } from "react";
import { API } from "../../../config";
import Axios, { AxiosResponse } from "axios";
import DashboardUsernameheader from "../DashboardUsernameheader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import { connect } from "react-redux";
import moment from "moment";
import WebSocketInstance from "../../../websocket";
import axios from "axios";

class CounsellorMessageOneUser extends React.Component {
  state: any = {
    isLoading: false,
    user: "",
    message: "",
    userInfo: "",
  };
  props: any;
  this: any;
  constructor(props) {
    super(props);
    this.initialiseChat(props.match.params.chatID);
  }
  componentWillMount() {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : this.props.history.push("/counsellor/signin");
    axios
      .get(`${API}/currentuser`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            userInfo: response.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  formatTime = (date) => {
    return moment(date).fromNow();
  };
  initialiseChat(id) {
    this.waitForSocketConnection(() => {
      // WebSocketInstance.fetchMessages(id);
    });
    WebSocketInstance.connect(id);
  }
  waitForSocketConnection = (callback) => {
    const component = this;
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        console.log("conection is made!");
        callback();
        return;
      } else {
        console.log("waiting for connection....");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  };

  submitForm = (e) => {};
  notify = (message: string) => toast(message, { containerId: "B" });
  // componentWillMount() {
  //   WebSocketInstance.connect(this.props.match.params.chatID);
  //   WebSocketInstance.fetchMessages(this.props.match.params.chatID);
  // }
  componentWillUnmount() {
    WebSocketInstance.disconnect();
  }
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      from: this.state.userInfo.email,
      content: this.state.message,
      chatId: this.props.match.params.chatID,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      message: "",
    });
  };

  render() {
    console.log(this.props.messages);
    const { user, message, isLoading }: any = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <CounsellorDashboardMobileNav messages={true} />
          <Row>
            <SideBarCounsellorDashboard messages={true} />
            <Col md={10} sm={12} className="prm">
              <CounsellorDashboardNav title="Messages" />
              <Row>
                <Col md={12} className="firstqq">
                  <div className="kdashheader npps"></div>
                  <DashboardCounsellorIntroHeader
                    searcharea={false}
                    welcomeText="This is a private chat with (Username)"
                  />
                  <Row>
                    <Col md={12} className="kisls kislsoo kil123">
                      <div className="kdashheader npps nprr">
                        <div></div>
                        <Col md={12} className="youwss">
                          {this.props.messages.map((data, i) => (
                            <div key={i}>
                              {data.author !==
                                this.props.match.params.email && (
                                <div className="usersentwrap1">
                                  <div className="youwrap">
                                    <span className="you11">
                                      Counsellor {data.author}
                                    </span>
                                    <span className="youdate">
                                      {this.formatTime(data.timestamp)}
                                    </span>
                                  </div>
                                  <div className="councellors_response">
                                    {data.content}
                                  </div>
                                </div>
                              )}

                              <div className="hihh">
                                {data.author ===
                                  this.props.match.params.email && (
                                  <div className="couselorsentwrap2">
                                    <div className="youwraprev">
                                      <span className="youdate">
                                        {this.formatTime(data.timestamp)}
                                      </span>
                                      <span className="you11b">
                                        {data.author}
                                      </span>
                                    </div>

                                    <div className="councellors_response1">
                                      {data.content}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          {this.props.messages.length === 0 && (
                            <div className="nomesgcoun">
                              <img
                                src={nocounmessage}
                                className="nocounmessage"
                                alt="nocounmessage"
                              />
                            </div>
                          )}
                          <div className="messagewrp1">
                            <div>
                              <textarea
                                className="form-control sendtcont"
                                placeholder="Enter text"
                                name="message"
                                value={message}
                                onChange={this.onchange}
                              />
                            </div>
                            <div className="texsss1">
                              <div
                                className="sendmeess col-md-11"
                                onClick={this.sendMessageHandler}
                              >
                                Send Message
                              </div>
                            </div>
                          </div>
                        </Col>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <ToastContainer
            enableMultiContainer
            containerId={"B"}
            toastClassName="bg-info text-white"
            hideProgressBar={true}
            position={toast.POSITION.TOP_CENTER}
          />
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

export default connect(mapStateToProps)(CounsellorMessageOneUser);
