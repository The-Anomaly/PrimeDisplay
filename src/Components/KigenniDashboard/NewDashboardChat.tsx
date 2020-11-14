import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import DashboardUsernameheader from "./DashboardUsernameheader";
import DashboardNav from "./DashboardNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";
import WebSocketInstance from "../../websocket";
import moment from "moment";
import { connect } from "react-redux";

class NewDashboardChat extends React.Component {
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
            userInfo: response.data[0].email,
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
      WebSocketInstance.fetchMessages(id);
      console.log(id)
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
      from: this.state.userInfo,
      content: this.state.message,
      chatId: this.props.match.params.chatID,
    };
    WebSocketInstance.newChatMessage(messageObject);
    WebSocketInstance.fetchMessages(this.props.match.params.chatID)
    this.setState({
      message: "",
    });
  };

  render() {
    const { isLoading, user, message }: any = this.state;
    console.log(this.props.messages)
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav chat={true} />
          <Row>
            <SideBarNewDashboard chat={true} />
            <Col md={10} sm={12} className="prm">
              <DashboardLargeScreenNav title="Chat with a counsellor" />
              <Row>
                <Col md={12} className="kisls">
                  <div className="kdashheader npps nprr cchatht">
                    <DashboardUsernameheader
                      welcomeText={
                        " Need some clarification about your Career Insights? leave a message for your counsellor"
                      }
                    />
                    <div>
                      <hr />
                    </div>
                    <Col md={12} className="youwss">
                      {this.props.messages?.map((data, ind) => (
                        <>
                          {data.author === this.props.match.params.email && (
                            <div className="usersentwrap1" key={ind}>
                              <div className="youwrap">
                                <span className="you11">You</span>
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
                            {data.author !== this.props.match.params.email && (
                              <div className="couselorsentwrap2">
                                <div className="youwraprev">
                                  <span className="youdate">
                                    {this.formatTime(data.timestamp)}
                                  </span>
                                  <span className="you11b">
                                    Counsellor {data.counsellor}
                                  </span>
                                </div>
                                <div className="councellors_response1">
                                  {data.content}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      ))}
                      <div className="messagewrp1">
                        <div>
                          <input
                            className="form-control sendtcont chatht"
                            placeholder="Enter text"
                            type="text"
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

export default connect(mapStateToProps)(NewDashboardChat);
