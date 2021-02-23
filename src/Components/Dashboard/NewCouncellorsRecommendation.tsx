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
import { CirclePie } from "salad-ui.chart";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import DashboardUsernameheader from "./DashboardUsernameheader";
import norecommendations from "../../assets/no recommendations.png";
import DashboardNav from "./DashboardNavBar";
import alertTriangle from "../../assets/alert-triangle.png";
import alertTrianglegray from "../../assets/alertTrianglegray.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "react-bootstrap";
import close from "../../assets/close.svg";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import moment from "moment";
import failedNotice from "../../assets/failedNotice.png";

class CounsellorsRecommendation extends React.Component {
  state: any = {
    fullname: "",
    message: "",
    counsellor: "",
    id: "",
    successMsg: false,
    startDate: null,
    endDate: null,
    frequency: 1,
    success: "",
    isLoading: false,
    isloading: false,
    ratingInfo: {},
    setReminderModal: false,
    setRatingModal: true,
    last_session_id: "",
    showWarning: false,
    width: 100,
    rate: "",
    upgradeState: false,
    canrate: false,
    reason: "",
  };
  props: any;
  closeModal = () => {
    this.setState({
      setReminderModal: false,
    });
  };
  openModal = (id) => {
    this.setState({
      setReminderModal: true,
      id,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/retakeassessment`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        window.location.assign("/assessment/welcome");
      })
      .catch((err) => {
        if (err) {
          this.notify("Error occured failed to send");
        }
      });
  };
  closeUpgradeModal = () => {
    this.setState({
      upgradeState: false,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(
        `${API}/dashboard/counsellorrecommendation`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
      Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/check-rating/`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        axios.spread((response, response1) => {
          this.setState({
            counsellor: response.data,
            ratingInfo: response1.data,
            canrate: response1.data.unrated,
            last_session_id: response1?.data?.sessionId,
            isLoading: false,
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
  makeRecommendationToDo = () => {
    // console.log(this.state.id);
    this.setState({ isLoading: true });
    const { startDate, frequency } = this.state;
    if (startDate === "" || frequency === "" || startDate === "") {
      return this.notify("Please fill all");
    }
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {
      id: this.state.id,
      start_date: this.state.startDate,
      reminder_frequency: this.state.frequency,
    };
    Axios.post<any, AxiosResponse<any>>(`${API}/dashboard/make-todo`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response?.data) {
          this.notify("Successfull created task");
          setTimeout(() => {
            this.componentDidMount();
            this.closeModal();
          }, 3000);
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        this.notify("Failed to process");
        setTimeout(() => {}, 2000);
        this.setState({
          isLoading: false,
        });
      });
  };
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  handleChatCheck = (id) => {
    // this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        // console.log(response);
        if (response?.data[0]?.convert_to_todo === false) {
          return this.setState({
            upgradeState: true,
            isLoading: false,
          });
        }
        this.openModal(id);
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
      });
  };
  notify = (message: string) => toast(message, { containerId: "B" });
  onStarClick = (nextValue, prevValue, name) => {
    this.setState({
      [name]: nextValue.toString(),
    });
  };
  handleSubmitChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  closeRateSession = () => {
    this.setState({
      setRatingModal: false,
    });
  };
  openRateSession = () => {
    this.setState({
      setRatingModal: true,
    });
  };
  submitRating = () => {
    this.setState({
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : this.props.history.push("/signin");
    const data = {
      rating: this.state.rate,
      text: this.state.reason,
    };
    Axios.post(
      `${API}/dashboard/submit-rating/${this.state.last_session_id}`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((response) => {
        // console.log(response);
        this.setState({
          isloading: false,
        });
        this.notify("Thank you for the rating");
        setTimeout(() => {
          this.closeRateSession();
        }, 3000);
      })
      .catch((err) => {
        this.setState({
          isloading: false,
        });
        this.notify("An error occured please try again");
        // console.log(err);
        setTimeout(() => {
          this.closeRateSession();
        }, 3000);
      });
  };
  formatTime = (date) => {
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  };
  render() {
    // console.log(this.state.ratingInfo);
    const {
      fullname,
      startDate,
      success,
      frequency,
      setReminderModal,
      setRatingModal,
      rate,
      canrate,
      reason,
      isLoading,
      counsellor,
      isloading,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav councrec={true} />
          <Row>
            <SideBarNewDashboard councrec={true} />
            <Col md={10} sm={12} className="prm newprm">
              <div className="navdash">
                <div className="overview ovf">Counsellors Recommendation</div>
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
                        " Find below summary of all your chats and recomendation with your counsellor"
                      }
                    />
                    <div className="">
                      <Link to="/counsellordates">
                        <Button className="retaketest">
                          Book a private session
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <hr />
                    </div>
                    <Col md={12} className="youwss">
                      {counsellor &&
                        counsellor?.map((data, i) => (
                          <>
                            <div className="usersentwrap1" key={i}>
                              <div className="youwrap">
                                <span className="you11b">
                                  {data.counsellor_name}
                                </span>{" "}
                                <span className="youdate">{data.date}</span>
                              </div>
                              <div className="councellors_response">
                                {data.text}
                              </div>
                            </div>
                            {data.todo && (
                              <Col md={12} className="zeropad">
                                <div className="notpaid notppd graybgds notpaidfix">
                                  <div className="notpaid1">
                                    <img
                                      src={alertTrianglegray}
                                      className="caution caurtn"
                                      alt="caution"
                                    />
                                    <div className="notpaidtext1 notpaidtext">
                                      Convert this recommendation to a task
                                    </div>
                                  </div>
                                  <div
                                    className="upss smtd smtdis"
                                    // onClick={() => this.openModal(data.id)}
                                  >
                                    <a>Set Reminder </a>
                                  </div>
                                </div>
                              </Col>
                            )}
                            {data.todo === false && (
                              <Col md={12} className="zeropad">
                                <div className="notpaid notppd notpaidfix">
                                  <div className="notpaid1">
                                    <img
                                      src={alertTriangle}
                                      className="caution caurtn"
                                      alt="caution"
                                    />
                                    <div className="notpaidtext1 notpaidtext">
                                      Convert this recommendation to a task
                                    </div>
                                  </div>
                                  <div
                                    className="retaketest upss smtd"
                                    onClick={() =>
                                      this.handleChatCheck(data.id)
                                    }
                                  >
                                    <div>Set Reminder </div>
                                  </div>
                                </div>
                              </Col>
                            )}
                          </>
                        ))}
                      {counsellor.length === 0 && (
                        <div className="norec">
                          <img
                            src={norecommendations}
                            className="norecommendations"
                            alt="norecommendations"
                          />
                          <div className="udont1">Opps!!!</div>
                          <div className="udont">
                            You dont have any Recommendation yet, you should
                            speak to a counsellor now
                          </div>
                        </div>
                      )}
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
          <Modal
            show={setReminderModal}
            centered={true}
            onHide={this.closeModal}
            className="modcomplete1 fixmodal"
          >
            <Modal.Title className="modal_title create_title">
              Set Reminder
            </Modal.Title>
            {success && (
              <Alert variant={"info"} className="text-center">
                Successfull
              </Alert>
            )}
            <a className="close_view" onClick={this.closeModal}>
              <img className="closeview" src={close} alt="close" />
            </a>
            <Modal.Body className="create_body">
              <div className="modal_det">
                <div className="titlee">Start Date</div>
                <input
                  className="note_det create_det "
                  type="date"
                  placeholder="Select a preferred start date for your task"
                  value={startDate}
                  name={"startDate"}
                  onChange={this.onchange}
                />
              </div>
              <div className="modal_det">
                <div className="titlee">Reminder Frequency (days)</div>
                <input
                  className="note_det create_det "
                  type="number"
                  placeholder="Select how frequent you want to be reminded"
                  value={frequency}
                  name={"frequency"}
                  onChange={this.onchange}
                />
              </div>
              <div className="mark_complete">
                <div
                  className="savebtn todo_button markit createit"
                  onClick={() => this.makeRecommendationToDo()}
                >
                  {isLoading ? "Processing" : "Save"}
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {canrate && (
            <Modal
              show={setRatingModal}
              className="modcomplete4 fixmodal"
              centered={true}
              onHide={this.closeRateSession}
            >
              <Modal.Title className="modal_title">
                <div className="pleaseRate">
                  Please rate your last session with{" "}
                  <div>
                    {this.state.ratingInfo?.counsellor_name} on{" "}
                    {this.formatTime(this.state.ratingInfo?.session_date)}
                  </div>
                </div>
              </Modal.Title>
              <a className="close_view" onClick={this.closeRateSession}>
                <img className="closeview" src={close} alt="close" />
              </a>
              <Modal.Body>
                {" "}
                <div className="ratingcont">
                  <StarRatingComponent
                    name="rate"
                    starCount={5}
                    value={rate}
                    onStarClick={this.onStarClick}
                    emptyStarColor={"#444"}
                  />
                </div>
                <div className="modal_det">
                  <textarea
                    className="task_det"
                    placeholder="Why your rating"
                    value={reason}
                    name="reason"
                    onChange={this.handleSubmitChange}
                  ></textarea>
                </div>
                <div className="btnhandle">
                  <div>
                    <span className="notnow" onClick={this.closeRateSession}>
                      Not now
                    </span>
                    <span className="rightnow" onClick={this.submitRating}>
                      {!isloading ? "Submit" : "Submitting"}
                    </span>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}
          <Modal
            show={this.state.upgradeState}
            centered={true}
            onHide={this.closeUpgradeModal}
          >
            <span className="times42" onClick={this.closeUpgradeModal}>
              &times;
            </span>
            <Modal.Body>
              <div className="text-center">
                {" "}
                <img
                  src={failedNotice}
                  className="failedNotice"
                  alt="failedNotice"
                />{" "}
              </div>
              {
                <>
                  <div className="onhno"> Oh No! </div>
                  <div className="onhno">
                    This package is not available on this plan <br /> Please
                    Upgrade your Plan
                  </div>
                  <div className="text-center planupgrade">
                    <div className="retaketest upss1 planupgradebtn">
                      <Link to="/dashboardsubscriptionplan">
                        View your current plan
                      </Link>
                    </div>
                  </div>
                </>
              }
            </Modal.Body>
          </Modal>
        </Container>
      </>
    );
  }
}
export default CounsellorsRecommendation;
