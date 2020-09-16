import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import firstlogo from "../../assets/image 1.png";
import Button from "react-bootstrap/Button";
import { CirclePie } from "salad-ui.chart";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import DashboardUsernameheader from "./DashboardUsernameheader";
import norecommendations from "../../assets/no recommendations.png";
import DashboardNav from "./DashboardNavBar";
import alertTriangle from "../../assets/alert-triangle.png";
import alertTrianglegray from "../../assets/alertTrianglegray.png";

class CounsellorsRecommendation extends React.Component {
  state: any = {
    fullname: "",
    message: "",
    counsellor: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    width: 100,
  };
  submitForm = (e) => {
    e.preventDefault();
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/retakeassessment`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log(res.data);
        window.location.assign("/assessmentphaseone");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
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
        console.log(response);
        this.setState({
          counsellor: response.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
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
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response?.data[0]?.direction_plan === true) {
          return window.location.assign("/councellordates");
        }
        if (response?.data[0]?.direction_plan === false) {
          return window.location.assign("/councellorfee");
        }
      })
      .catch((error) => {
        console.log(error);
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
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response?.data[0]?.direction_plan === true) {
          return window.location.assign("/councellordates");
        }
        if (response?.data[0]?.direction_plan === false) {
          return window.location.assign("/councellorfee");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { fullname, message, isLoading, width, counsellor } = this.state;
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
                <Col md={12} className="kisls">
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
                            {data.todo  === false && (
                              <Col md={12} className="zeropad">
                                <div className="notpaid notppd graybgds">
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
                                  <div className="retaketest upss smtd smtdis">
                                    <Link to="/paymentsummary">
                                      Covert to ToDo{" "}
                                    </Link>
                                  </div>
                                </div>
                              </Col>
                            )}
                            {data.todo && (
                              <Col md={12} className="zeropad">
                                <div className="notpaid notppd">
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
                                  <div className="retaketest upss smtd">
                                    <Link to="/paymentsummary">
                                      Covert to ToDo{" "}
                                    </Link>
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
        </Container>
      </>
    );
  }
}
export default CounsellorsRecommendation;
