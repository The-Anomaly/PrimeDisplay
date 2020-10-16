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

class CounsellorMessageOneUser extends React.Component {
  state = {
    isLoading: false,
    user: "",
    message: "",
  };
  submitForm = (e) => {
  };
  notify = (message: string) => toast(message, { containerId: "B" });
  componentWillMount() {
    this.setState({
      isLoading: true,
    });
    const self: any = this;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/counsellor/signin");
    const email = self.props.match.params.email;
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/get-chats/?email=${email}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((response) => {
          console.log(response);
          this.setState({
            user: response.data,
            message: "",
          });
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          this.setState({
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  }
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
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
                      <div className="kdashheader npps">
                        <div></div>
                        <Col md={12} className="youwss">
                          {user &&
                            user.map((data, ind) => (
                              <>
                                <div className="usersentwrap1" key={ind}>
                                  <div className="youwrap">
                                    <span className="you11">You</span>
                                    <span className="youdate">
                                      {data.message_date}
                                    </span>
                                  </div>
                                  <div className="councellors_response">
                                    {data.message}
                                  </div>
                                </div>
                                <div className="hihh">
                                  {data.response && (
                                    <div className="couselorsentwrap2">
                                      <div className="youwraprev">
                                        <span className="youdate">
                                          {data.response_date}
                                        </span>
                                        <span className="you11b">
                                          Counsellor {data.counsellor}
                                        </span>
                                      </div>

                                      <div className="councellors_response1">
                                        {data.response}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            ))}
                          {
                            <div className="nomesgcoun">
                              <img
                                src={nocounmessage}
                                className="nocounmessage"
                                alt="nocounmessage"
                              />
                            </div>
                          }
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
                              onClick={this.submitForm}
                            >
                              Send Message
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
export default CounsellorMessageOneUser;
