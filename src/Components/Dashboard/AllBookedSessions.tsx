import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Button from "react-bootstrap/Button";
import DashboardUsernameheader from "./DashboardUsernameheader";
import norecommendations from "../../assets/no recommendations.png";
import DashboardNav from "./DashboardNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "react-bootstrap";
import close from "../../assets/close.svg";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import moment from "moment";
import failedNotice from "../../assets/failedNotice.png";
import prevpage from "../../assets/prevpage.svg";
import nextpage from "../../assets/nextpage.svg";
import "./CouncellorDasboard/councellor.css";

class AllBookedSessions extends React.Component {
  state: any = {
    fullname: "",
    isLoading: false,
    sessionData: [],
    nextLink: "",
    prevLink: "",
    total_pages: "",
    count: "",
    errorMessage: "",
  };
  props: any;
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/user-session-list`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        axios.spread((res) => {
          console.log(res);
          this.setState({
            isLoading: false,
            sessionData: [...res.data.results].reverse(),
            count: res.data.page,
            nextLink: res.data.next,
            prevLink: res.data.previous,
            total_pages: res.data.total_pages,
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

  bookSession = () => {
    return window.location.assign("/counsellordates");
  };

  loadNewData = () => {
    this.setState({
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : this.props.history.push("/signin");
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${this.state.nextLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          if (res.status === 200) {
            this.setState({
              successMsg: true,
              isLoading: false,
              counsellorData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
            });
          }
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
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  loadPrevData = () => {
    this.setState({
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : this.props.history.push("/signin");
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${this.state.prevLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.setState({
              isLoading: false,
              sessionData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
            });
          }
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
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };

  notify = (message: string) => toast(message, { containerId: "B" });

  formatTime = (date) => {
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  };
  render() {
    // console.log(this.state.ratingInfo);
    const {
      fullname,
      isLoading,
      sessionData,
      nextLink,
      prevLink,
      total_pages,
      count,
      errorMessage,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav chat={true} />
          <Row>
            <SideBarNewDashboard chat={true} />
            <Col md={10} sm={12} className="prm newprm">
              <div className="navdash">
                <div className="overview ovf">Booked Sessions</div>
                <div className="prm111">
                  <span>{fullname ? fullname : ""}</span>
                  <span>
                    <img src={avatar} className="avatar11" alt="avatar" />
                  </span>
                </div>
              </div>
              <Row>
                <Col md={12} className="kisls kisls22">
                  <div className="kdashheader npps">
                    <DashboardUsernameheader
                      welcomeText={
                        " Find below a summary of all the booked sessions with your counsellor"
                      }
                    />
                    <div className="">
                      <Button
                        className="retaketest no-session-book-btn"
                        onClick={this.bookSession}
                      >
                        Book a new session
                      </Button>
                    </div>
                    <div>
                      <hr />
                    </div>
                    <Col md={12} className="youwss">
                      {sessionData.length > 0 && (
                        <div className="session-card-title">
                          <span className="">Date</span>
                          <span className="">Time</span>
                          <span className="">Status</span>
                        </div>
                      )}

                      <div className="usersentwrap1">
                        {sessionData &&
                          sessionData?.map((data, i) => (
                            <>
                              <div className="session-card" key={i}>
                                <span className="">
                                  <div className="session-card-mobile-title">
                                    Date
                                  </div>
                                  {data.date}
                                </span>
                                <span className="">
                                  <div className="session-card-mobile-title">
                                    Time
                                  </div>
                                  {data.time}
                                </span>
                                <span className="">
                                  <div
                                    className={
                                      data.session_completed
                                        ? "session-status session-status-closed"
                                        : "session-status session-status-pending"
                                    }
                                  >
                                    {data.session_completed
                                      ? "Closed"
                                      : "Pending"}
                                  </div>
                                </span>
                              </div>
                            </>
                          ))}
                      </div>
                      {sessionData.length === 0 && (
                        <div className="norec">
                          <img
                            src={norecommendations}
                            className="norecommendations"
                            alt="norecommendations"
                          />
                          <div className="udont1">Oops!!!</div>
                          <div className="udont">
                            You have no booked sessions
                          </div>
                          <button
                            className="retaketest no-session-book-btn"
                            onClick={this.bookSession}
                          >
                            Book a session
                          </button>
                        </div>
                      )}
                      <div className="next_page">
                        {sessionData.length > 0 && (
                          <div>
                            Displaying <span className="page_num">{count}</span>{" "}
                            out of{" "}
                            <span className="page_num">{total_pages}</span>
                          </div>
                        )}
                        <div>
                          {prevLink && (
                            <img
                              onClick={this.loadPrevData}
                              className="page_change"
                              src={prevpage}
                              alt="previous page"
                            />
                          )}

                          {nextLink && (
                            <img
                              onClick={this.loadNewData}
                              className="page_change"
                              src={nextpage}
                              alt="next page"
                            />
                          )}
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
export default AllBookedSessions;
