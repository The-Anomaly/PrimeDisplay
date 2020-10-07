import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./kegennidashboard.css";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Navbar from "../Home/HomeComponents/navbar";
import Footer from "../Home/HomeComponents/footer";
import rightimg from "../../assets/rightarrow.png";
import leftimg from "../../assets/leftarrow1.png";
import "react-calendar/dist/Calendar.css";
import write from "../../assets/write.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

class CouncellorBookings extends React.Component<React.Props<any>> {
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
  };
  componentWillMount() {
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
  selectedTimeHandler = (e) => {
    this.setState({
      time: e.target.value,
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
          this.notify("Message Sent");
          setTimeout(() => {
            const self: any = this;
            self.props.history.push("/overview");
          }, 3000);
        }
      })
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
  };
  notify = (message: string) => {
    toast(message, { containerId: "B" });
  };
  render() {
    const {
      fullname,
      phone,
      careerbussines,
      availabledate,
      feedbackText,
      startDate,
      endDate,
      calenderTime,
    } = this.state;
    return (
      <>
        <Navbar />
        <Container fluid={true}>
          <Row className="kli6 bcbv">
            <Col md={12} className="scheduleheader">
              Scheduled Meetings
            </Col>
            <Col md={8} className="">
              <div className="wrapc1">
                <div className="cname1">Name</div>
                <div className="cdate1">Date</div>
                <div className="ctime1">Time</div>
                <div className="cstatus1">Status</div>
              </div>
              <div className="wrapc2">
                <div className="cname">
                  <div>Jayeola Jones</div>
                  <div className="cemail1">jaye@user.com</div>
                </div>
                <div className="cdate">July 20</div>
                <div className="ctime">09:30 AM - 10:00 AM</div>
                <div className="cstatus2">
                  <span className="cstatus">Completed</span>
                </div>
              </div>
              <div className="wrapc2">
                <div className="cname">
                  <div>Jayeola Jones</div>
                  <div className="cemail1">jaye@user.com</div>
                </div>
                <div className="cdate">July 20</div>
                <div className="ctime">09:30 AM - 10:00 AM</div>
                <div className="cstatus2">
                  <span className="cstatus pending">Pending</span>
                </div>
              </div>
              <div className="dspl">
                <span>Dispalying 6 out of 100</span>
                <div>
                  <img src={leftimg} className="leftimg" alt="leftimg" />
                  <img src={rightimg} className="rightimg" alt="leftimg" />
                </div>
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
        </Container>
        <Footer />
      </>
    );
  }
}

export default CouncellorBookings;
