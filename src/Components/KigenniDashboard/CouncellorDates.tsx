import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./kegennidashboard.css";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Navbar from "../Home/HomeComponents/newnavbar";
import Footer from "../Home/HomeComponents/newfooter";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import write from "../../assets/write.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import close from "../../assets/close.svg";
import checkede from "../../assets/checkede.png";
import moment from "moment";
import { Link } from "react-router-dom";
import "../Home/Home/Home.css";
import failedNotice from "../../assets/failedNotice.png";
import DashboardNav from "./DashboardNavBar";
import SideBarNewDashboard from "./SideBarNewDashboard";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";

class CouncellorDates extends React.Component<React.Props<any>> {
  state: any = {
    fullname: "",
    date: new Date(),
    availabledate: "",
    feedbackText: "",
    calenderTime: "",
    phone: "",
    startDate: "",
    endDate: "",
    time: "",
    isOpen: false,
    Canbooksession: false,
    upgradeState: false,
  };

  componentWillMount() {
    window.scrollTo(-0, -0);
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    axios
      .get<any, AxiosResponse<any>>(`${API}/getcurrentdate`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        this.setState({
          startDate: response.data[0].start,
          endDate: response.data[0].stop,
          calenderTime: response.data[0].message,
        });
      })
      .catch((error) => {
        if (error && error.response && error.response) {
          this.setState({
            errorMessage: error?.response?.data[0]?.message,
            isLoading: false,
          });
        }
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  }
  closeUpgradeModal = () => {
    this.setState({
      upgradeState: false,
    });
  };
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  selectedTimeHandler = (e) => {
    this.setState({
      time: e.target.value,
    });
  };
  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };
  getAvailableTime = (date) => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {
      date,
    };
    axios
      .post<any, AxiosResponse<any>>(`${API}/gettime`, data)
      .then((response) => {
        this.setState({
          calenderTime: response.data[0].message,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error && error.response && error.response.data) {
          this.setState({
            errorMessage: error?.response?.data[0]?.message,
            isLoading: false,
          });
        }
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  };
  formatTime = (date) => {
    const dateTime = moment(date).format("MMM YYYY");
    return dateTime;
  };
  handleChatCheck = () => {
    console.log("checking payment status");
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    axios
      .get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        console.log(localStorage.getItem("accessFeature"));
        if (response?.data[0]?.book_session === true) {
          console.log("Payment Summary Check");
          return this.sendMessageToCounselor();
        } else {
          // localStorage.setItem("currentLocation", window.location.pathname);
          // const userLocation = localStorage.getItem("currentLocation");
          // const prevLocation = userLocation ? JSON.parse(userLocation) : "";
          console.log("No payment");
          //return window.location.assign("/dashboardsubscriptionplan");
          return this.setState({
            upgradeState: true,
          });
        }
      })
      .catch((error) => {
        console.error("Payment Status Error");
      });
  };
  onChange = (date) => {
    this.getAvailableTime(date.toString());
    this.setState({
      date,
    });
  };
  sendMessageToCounselor = () => {
    const { date, time, phone, feedbackText } = this.state;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {
      date: date.toString(),
      time,
      phone,
      user_vent: feedbackText,
    };
    axios
      .post<any, AxiosResponse<any>>(`${API}/chatwithcounsellor`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isOpen: true,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error && error?.response && error?.response?.data) {
          this.setState({
            errorMessage: error?.response?.data?.message,
            isLoading: false,
          });
          this.notify(`Failed to process  ${error?.response?.data?.message}`);
        }
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  };
  notify = (message: string) => {
    toast(message, { containerId: "B" });
  };

  render() {
    const {
      fullname,
      phone,
      careerbussines,
      isOpen,
      feedbackText,
      startDate,
      endDate,
      calenderTime,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="llln">
          <DashboardNav />
          <Row>
            <SideBarNewDashboard />
            <Col md={10} sm={12} className="prm mobilepadding">
            <DashboardLargeScreenNav title="" />
              <Row className="kli6 bcbv datesedit">
                <Col md={12} className="scheduleheader">
                  Schedule a meeting
                </Col>
                <Col md={6} className="calwrapper">
                  <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    name="date"
                    allowPartialRange={true}
                    minDate={new Date(startDate)}
                    maxDate={new Date(endDate)}
                  />
                </Col>
                <Col md={3} className="availabledatewrapper">
                  <div>
                    {calenderTime &&
                      calenderTime.map((data, i) => (
                        <div
                          className={
                            data.status === "available"
                              ? "activeDate"
                              : "availabledate"
                          }
                          key={i}
                        >
                          <input
                            type="radio"
                            name="availabledate"
                            value={data.time}
                            disabled={
                              data.status === "available" ? false : true
                            }
                            onChange={this.selectedTimeHandler}
                          />
                          {"  "}
                          <div className="datelenght">{data.time}</div>
                        </div>
                      ))}
                  </div>
                </Col>
                <Col md={8} className="fw2">
                  <img src={write} alt="write" className="write" />
                  <textarea
                    className="form-control whatdou"
                    id=""
                    cols={30}
                    name="feedbackText"
                    onChange={this.onchange}
                    value={feedbackText}
                    placeholder="What would you like to speak about"
                    rows={10}
                  ></textarea>
                </Col>
                <Col md={8} className="fw2">
                  <Row className="shex">
                    <Col md={5}>
                      <div className="enter11">Enter your phone number</div>
                      <img src={write} alt="write" className="write" />
                      <input
                        className="form-control whatdou"
                        id=""
                        name="phone"
                        onChange={this.onchange}
                        value={phone}
                        placeholder="Phone number"
                      />
                    </Col>
                    <Col md={7} className="text-right skd11">
                      <div
                        className="booksession planupgradebtn1"
                        onClick={this.handleChatCheck}
                      >
                        Book Session <span className="text-white">&#8594;</span>
                      </div>
                    </Col>
                    <ToastContainer
                      enableMultiContainer
                      containerId={"B"}
                      toastClassName="bg-info text-white"
                      hideProgressBar={true}
                      position={toast.POSITION.TOP_CENTER}
                    />
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Modal
          show={isOpen}
          className="modcomplete modsuccess"
          centered={true}
          onHide={this.closeModal}
        >
          <span className="close_view" onClick={this.closeModal}>
            <img
              className="closeview slsbtn"
              src={close}
              onClick={this.closeModal}
              alt="close"
            />
          </span>
          <Modal.Body>
            <div className="modal_det"></div>
            <div className="text-center">
              <img src={checkede} className="checkedes" alt="success" />
            </div>
            <div className="successfullybooked">
              You successfully booked a session with a counselllor on{" "}
              <b>{this.formatTime(this.state.date)}</b> by{" "}
              <b>{this.state.time}</b>
            </div>
            <div className="btncenter">
              <button className="btncenter12">
                {" "}
                <Link to="/overview">Continue</Link>
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.upgradeState}
          centered={true}
          onHide={this.closeUpgradeModal}
        >
          <Modal.Body>
            <div className="text-center">
              {" "}
              <img
                src={failedNotice}
                className="failedNotice"
                alt="failedNotice"
              />{" "}
            </div>
            <div className="onhno"> Oh No! </div>
            <div className="onhno">
              This package is not available on this plan <br /> Please Upgrade
              your Plan
            </div>
            <div className="text-center planupgrade">
              <div className="retaketest upss1 planupgradebtn">
                <Link to="/dashboardsubscriptionplan">
                  View your current plan
                </Link>
              </div>
              {/* <div className="retaketest upss1 planupgradebtn">
                    <Link to="/paymentsummary">Upgrade your plan</Link>
                  </div> */}
            </div>
          </Modal.Body>
        </Modal>
        {/* <Footer /> */}
      </>
    );
  }
}

export default CouncellorDates;
