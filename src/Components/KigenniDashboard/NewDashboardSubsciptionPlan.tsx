import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import noplan from "../../assets/noplan.png";
import Button from "react-bootstrap/Button";
import { CirclePie } from "salad-ui.chart";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import checkcircle from "../../assets/checkcircle.png";
import DashboardUsernameheader from "./DashboardUsernameheader";
import norecommendations from "../../assets/no recommendations.png";
import DashboardNav from "./DashboardNavBar";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";
import { Link } from "react-router-dom";
import "../Home/Redesigned_Payment_Page/payment.css";
import { Card } from "react-bootstrap";
import mark from "../../assets/mark-icn.png";
import mark_blue from "../../assets/blue-mark.png";
import mark_green from "../../assets/green-mark.png";

class NewDashboardSubsriptionPlan extends React.Component {
  state: any = {
    fullname: "",
    message: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    plan: "",
    width: 100,
    expiration: "",
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/subscription`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.setState({
          plan: response.data.plan,
          expiration: response.data.expires,
        });
      })
      .catch((error) => {
        console.error("Subscription error");
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
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const {
      fullname,
      message,
      isLoading,
      width,
      plan,
      expiration,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav subscription={true} />
          <Row>
            <SideBarNewDashboard subscription={true} />
            <Col md={10} sm={12} className="prm">
              <DashboardLargeScreenNav title={"Subscription"} />
              <Row>
                <Col md={12} className="kisls">
                  <div className="kdashheade npps">
                    <DashboardUsernameheader
                      welcomeText={"A review of your current subcription plans"}
                    />
                    <div className="">
                      <Button className="retaketest">
                        <Link to="/paymentsummary">
                          Review your current plan
                        </Link>
                      </Button>
                    </div>
                    <div>
                      <hr />
                    </div>
                    {plan && (
                      <>
                        <div>
                          <div className="activeplac actplan">Active plan</div>
                          <div className="subtert">
                            You are currently subscribed to the <b>{plan}</b>.{" "}
                            {expiration}
                          </div>
                        </div>
                        <Col md={12} className="youwss">
                          {plan === "One-off Insight Plan" && (
                            <Col
                              md={3}
                              sm={6}
                              className="margined_col subpayment"
                            >
                              <Card className=" shadow-sm bg-white payment-card subpaymentcard">
                                <Card.Header className="payment-header">
                                  <h4>
                                    N3500 <span>/one-off</span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <div className="card-div ">
                                    <h6 className="blue">Insight Plan</h6>
                                    <p>
                                      Get an edge - The insight plan gives you
                                      an edge over your peers. Be the YOU,
                                      you've always wanted.
                                    </p>
                                  </div>
                                  <ul className="card-list">
                                    <li>
                                      <img
                                        src={mark_blue}
                                        className="card-image"
                                      />
                                      Everything under <span>FREE</span>
                                    </li>
                                    <li>
                                      <img
                                        src={mark_blue}
                                        className="card-image"
                                      />
                                      Strength & Weakness Report
                                    </li>
                                    <li>
                                      <img
                                        src={mark_blue}
                                        className="card-image"
                                      />
                                      Competence analysis Report{" "}
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_blue}
                                            className="card-image"
                                          />
                                        </div>
                                        Most suitable career business expression
                                      </div>{" "}
                                    </li>
                                    <li>
                                      <img
                                        src={mark_blue}
                                        className="card-image"
                                      />
                                      Report on best roles to apply for{" "}
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_blue}
                                            className="card-image"
                                          />
                                        </div>
                                        Career drivers and how to leverage them
                                      </div>
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_blue}
                                            className="card-image"
                                          />
                                        </div>
                                        Highlights on areas for career
                                        optimization.
                                      </div>
                                    </li>
                                  </ul>
                                  {/* {withoutlogin ? (
                                  <Link to="/signin">
                                    <span className="card_btn btn-blue">Get Started</span>
                                  </Link>
                                ) : (
                                  <span
                                    className="card_btn btn-blue"
                                    onClick={() =>
                                      requestForPayref("One-off Insight Plan", 3500)
                                    }
                                  >
                                    Upgrade to Insight
                                  </span>
                                )} */}
                                </Card.Body>
                              </Card>
                            </Col>
                          )}
                          {plan === "One-off Direction Plan" && (
                            <Col
                              md={3}
                              sm={6}
                              className="margined_col subpayment"
                            >
                              <Card className="h-300 shadow-sm bg-white payment-card subpaymentcard">
                                <Card.Header className="payment-header">
                                  <h4>
                                    N10000 <span>/one-off</span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <div className="card-div">
                                    <h6 className="green">Direction Plan</h6>
                                    <p>
                                      Hand in Hand Guidance - Get perspective on
                                      your reports. Get assigned to your
                                      personal career coach, It only gets better
                                    </p>
                                  </div>
                                  <ul className="card-list">
                                    <li>
                                      <img
                                        src={mark_green}
                                        className="card-image"
                                      />
                                      Everything under{" "}
                                      <span className="blue">INSIGHT</span>
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_green}
                                            className="card-image"
                                          />
                                        </div>
                                        40 minutes career-planning session with
                                        a clarity counsellor
                                      </div>
                                    </li>
                                  </ul>
                                  {/* {withoutlogin ? (
                                  <Link to="/signin">
                                    <span className="card_btn btn-green card_btn--animated">
                                      Get Started
                                    </span>
                                  </Link>
                                ) : (
                                  <span
                                    className="card_btn btn-green card_btn--animated"
                                    onClick={() =>
                                      requestForPayref("One-off Direction Plan", 10000)
                                    }
                                  >
                                    Upgrade to Direction
                                  </span>
                                )} */}
                                </Card.Body>
                              </Card>
                            </Col>
                          )}
                          {plan === "Progressive Insight Plan" && (
                            <Col
                              md={3}
                              sm={6}
                              className="margined_col subpayment"
                            >
                              <Card className="h-300 shadow-sm bg-white payment-card subpaymentcard">
                                <Card.Header className="payment-header">
                                  <h4>
                                    N3500 <span>/month</span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <div className="card-div">
                                    <h6>Insight Plan</h6>
                                    <p>
                                      Get the first hand Clarity experience for
                                      no charge at all. Take action to your
                                      career bliss
                                    </p>
                                  </div>
                                  <ul className="card-list">
                                    <li>
                                      <img src={mark} className="card-image" />
                                      Career fitness score
                                    </li>
                                    <li>
                                      <img src={mark} className="card-image" />
                                      Career personality type
                                    </li>
                                    <li>
                                      <img src={mark} className="card-image" />
                                      Strenght & Weakness Report
                                    </li>
                                    <li>
                                      <img src={mark} className="card-image" />
                                      Competence analysis Report
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark}
                                            className="card-image"
                                          />
                                        </div>
                                        Most suitable career business expression
                                      </div>
                                    </li>
                                    <li>
                                      <img src={mark} className="card-image" />
                                      Report on best roles to apply for
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark}
                                            className="card-image"
                                          />
                                        </div>
                                        Career drivers and how to leverage them
                                      </div>
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark}
                                            className="card-image"
                                          />
                                        </div>
                                        Highlights on areas for career
                                        optimization
                                      </div>
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark}
                                            className="card-image"
                                          />
                                        </div>
                                        Recommended courses curated weekly to
                                        strenthen your skill
                                      </div>
                                    </li>
                                    <li className="cdlisadjmarg">
                                      <img src={mark} className="card-image" />
                                      Weekly Tailored job alerts
                                    </li>
                                    <li className="cdlisadjmarg">
                                      <img src={mark} className="card-image" />
                                      Unlimited Chat access with coaches &
                                      counsellors and get feedback on your
                                      to-dos goals and issues discussed
                                    </li>
                                  </ul>
                                  {/* {withoutlogin ? (
                                  <Link to="/signin">
                                    <span className="card_btn card_btn--pce1 btn-yellow">
                                      Get Started
                                    </span>
                                  </Link>
                                ) : (
                                  <span
                                    className="card_btn card_btn--pce1 btn-yellow"
                                    onClick={() =>
                                      requestForPayref("Progressive Insight Plan", 3500)
                                    }
                                  >
                                    Subscribe
                                  </span>
                                )} */}
                                </Card.Body>
                              </Card>
                            </Col>
                          )}
                          {plan === "Progressive Direction Plan" && (
                            <Col
                              md={3}
                              sm={6}
                              className="margined_col subpayment"
                            >
                              <Card className=" shadow-sm bg-white payment-card subpaymentcard">
                                <Card.Header className="payment-header">
                                  <h4>
                                    N6000 <span>/month</span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <div className="card-div ">
                                    <h6 className="blue">Direction Plan</h6>
                                    <p>
                                      Get an edge - The insight plan gives you
                                      an edge over your peers. Be the YOU, you
                                      always wanted
                                    </p>
                                  </div>
                                  <ul className="card-list">
                                    <li>
                                      <img
                                        src={mark_blue}
                                        className="card-image"
                                      />
                                      Everything under <span>INSIGHT</span>
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_blue}
                                            className="card-image"
                                          />
                                        </div>
                                        40 minutes career-planning session with
                                        a clarity counselor
                                      </div>
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_blue}
                                            className="card-image"
                                          />
                                        </div>
                                        Weekly Personalized Counsellors
                                        Recommendation on suitable personal &
                                        career activities
                                      </div>
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_blue}
                                            className="card-image"
                                          />
                                        </div>
                                        Weekly Personalized Counse- llors
                                        Recommendation on suitable personal &
                                        career activities
                                      </div>{" "}
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_blue}
                                            className="card-image"
                                          />
                                        </div>
                                        Personal to-dos & reminder setting
                                      </div>{" "}
                                    </li>
                                  </ul>
                                  {/* {withoutlogin ? (
                                  <Link to="/signin">
                                    <span className="card_btn card_btn--pce2 btn-blue">
                                      Get Started
                                    </span>
                                  </Link>
                                ) : (
                                  <span
                                    className="card_btn card_btn--pce2 btn-blue"
                                    onClick={() =>
                                      requestForPayref("Progressive Direction Plan", 6000)
                                    }
                                  >
                                    Upgrade to Direction
                                  </span>
                                )} */}
                                </Card.Body>
                              </Card>
                            </Col>
                          )}
                          {plan === "Progressive Accountability Plan" && (
                            <Col
                              md={3}
                              sm={8}
                              className="margined_col subpayment"
                            >
                              <Card className="h-300 shadow-sm bg-white payment-card subpaymentcard">
                                <Card.Header className="payment-header">
                                  <h4>
                                    N10000 <span>/month</span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <div className="card-div">
                                    <h6 className="green">
                                      Accountability Plan
                                    </h6>
                                    <p>
                                      Hand in Hand Guidance - Get perspective on
                                      your reports. Get assigned to your
                                      personal career coach, It only gets better
                                    </p>
                                  </div>
                                  <ul className="card-list">
                                    <li>
                                      <img
                                        src={mark_green}
                                        className="card-image"
                                      />
                                      Everything under{" "}
                                      <span className="blue">DIRECTION</span>
                                    </li>
                                    <li>
                                      <div className="card-list-box">
                                        <div>
                                          <img
                                            src={mark_green}
                                            className="card-image"
                                          />
                                        </div>
                                        40 minutes career-planning session with
                                        a clarity counselor X2
                                      </div>
                                    </li>
                                  </ul>
                                  {/* {withoutlogin ? (
                                  <Link to="/signin">
                                    <span className="card_btn btn-green card_btn--pce3 card_btn--animated">
                                      Get Started
                                    </span>
                                  </Link>
                                ) : (
                                  <span
                                    className="card_btn btn-green card_btn--pce3 card_btn--animated"
                                    onClick={() =>
                                      requestForPayref(
                                        "Progressive Accountability Plan",
                                        10000
                                      )
                                    }
                                  >
                                    Upgrade to Accountability
                                  </span>
                                )} */}
                                </Card.Body>
                              </Card>
                            </Col>
                          )}
                        </Col>
                      </>
                    )}
                    {plan === undefined && (
                      <div className="norec">
                        <img
                          src={noplan}
                          className="norecommendations"
                          alt="norecommendations"
                        />
                        <div className="udont1">Oops!!!</div>
                        <div className="udont">
                          You are not subscribed to any plan yet
                        </div>
                      </div>
                    )}
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
export default NewDashboardSubsriptionPlan;
