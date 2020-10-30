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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import write from "../../assets/write.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
        this.notify("Failed to Send");
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
              Schedule a meeting
            </Col>
            <Col md={6} className="calwrapper">
              <Calendar
                onChange={this.onChange}
                value={this.state.date}
                allowPartialRange={true}
                minDate={new Date(startDate)}
                maxDate={new Date(endDate)}
              />
            </Col>
            <Col md={2} className="availabledatewrapper">
              <div>
                {calenderTime &&
                  calenderTime.map((data,i) => (
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
                        disabled={data.status === "available" ? false : true}
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
                    className="booksession"
                    onClick={this.sendMessageToCounselor}
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
        </Container>
        <Footer />
      </>
    );
  }
}

export default CouncellorDates;
