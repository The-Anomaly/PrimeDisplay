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
    setReminderModal: false,
    showWarning: false,
    width: 100,
  };
  closeModal = () => {
    this.setState({
      setReminderModal: false,
    });
  };
  openModal = (id) => {
    console.log(id);
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
        window.location.assign("/assessmentphaseone");
      })
      .catch((err) => {
        if (err) {
        }
      });
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
    Axios.get<any, AxiosResponse<any>>(
      `${API}/dashboard/counsellorrecommendation`,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((response) => {
        this.setState({
          counsellor: response.data,
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
  makeRecommendationToDo = () => {
    console.log(this.state.id);
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
      })
      .catch((error) => {
        this.notify("Failed to process");
        setTimeout(() => {}, 2000);
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
  handleChatCheck = () => {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response?.data[0]?.direction_plan === true) {
          return window.location.assign("/counsellordates");
        }
        if (response?.data[0]?.direction_plan === false) {
          return window.location.assign("/counsellorfee");
        }
      })
      .catch((error) => {});
  };
  notify = (message: string) => toast(message, { containerId: "B" });
  render() {
    const {
      fullname,
      startDate,
      success,
      frequency,
      setReminderModal,
      width,
      counsellor,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav councrec={true} />
          <Row>
            <SideBarNewDashboard councrec={true} />
            <Col md={10} sm={12} className="prm">
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
                      <Button
                        className="retaketest"
                        onClick={this.handleChatCheck}
                      >
                        Speak with a counsellor
                      </Button>
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
                                    onClick={() => this.openModal(data.id)}
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
                                    onClick={() => this.openModal(data.id)}
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
                <div className="titlee">Reminder Frequency</div>
                <input
                  className="note_det create_det "
                  type="number"
                  placeholder="Enter Duration "
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
                  Save
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </Container>
      </>
    );
  }
}
export default CounsellorsRecommendation;
