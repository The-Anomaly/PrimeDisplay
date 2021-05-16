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
          isLoading: false,
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
            <Col md={10} sm={12} className="prm newprm">
              <DashboardLargeScreenNav title={"Subscription"} />
              <Row>
              {isLoading && (
                  <div className="icebreakerpreloader center-it">
                    <div className="icebreakerspinner"></div>
                  </div>
                )}
                {!isLoading && (
                <Col md={12} className="kisls">
                  <div className="kdashheade npps">
                    <DashboardUsernameheader
                      welcomeText={"A review of your current subcription plans"}
                    />
                    <div className="">
                      <Link to="/paymentsummary">
                        <Button className="retaketest planupgradebtn">
                            Upgrade your subscription
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <hr />
                    </div>
                    {plan && (
                      <>
                        <div>
                          <div className="activeplac actplan">Active plan</div>
                          <div className="subtert">
                            You are currently subscribed to the <b>{plan[0]}</b>.{" "}
                            {expiration}
                          </div>
                        </div>
                        <Col md={12} className="youwss flex">
                          {/* Price Slash Cards */}
                          {plan.includes("Seven Days Plan") && (
                            <Col
                            md={4}
                            sm={8}
                            className="margined_col subpayment marg"
                          >
                            <Card className="shadow-sm bg-white payment-card subpaymentcard">
                              <Card.Header className="payment-header">
                                <h4>
                                  N1500.00 <span>/week</span>
                                </h4>
                              </Card.Header>
                              <Card.Body>
                                <div className="card-div">
                                  <h6>Insight</h6>
                                  <p className="slash-txt">
                                    Get a weeks' access to personalized insights on how to use
                                    your characteristics and competencies to your advantage.
                                  </p>
                                </div>
                                <ul className="card-list">
                                  <li>
                                    <img src={mark} className="card-image" />
                                    Career Personality Type
                                  </li>
                                  <li>
                                    <img src={mark} className="card-image" />
                                    Strength & Weakness Report
                                  </li>
                                  <li>
                                    <img src={mark} className="card-image" />
                                    Competence Analysis Report
                                  </li>
                                  <li>
                                    <img src={mark} className="card-image" />
                                    Most Suitable Career Business Expression
                                  </li>
                                  <li>
                                    <img src={mark} className="card-image" />
                                    Report on Roles Best Suited to You
                                  </li>
                                  <li>
                                    <img src={mark} className="card-image" />
                                    Career Drivers and How To Leverage Them
                                  </li>
                                  <li>
                                    <img src={mark} className="card-image" />
                                    Career Todo/Reminder
                                  </li>
                                  <li>
                                    <img src={mark} className="card-image" />
                                    Professional Profile Builder/CV Generator
                                  </li>
                                  <li>
                                    <img src={mark} className="card-image" />
                                    In-app "text a coach"
                                  </li>
                                </ul>
                              </Card.Body>
                            </Card>
                          </Col>            
                          )}
                          {plan.includes("Monthly Plan") && (
                            <Col
                            md={4}
                            sm={8}
                            className="margined_col subpayment marg"
                          >
                            <Card className="shadow-sm bg-white payment-card subpaymentcard">
                              <Card.Header className="payment-header">
                                <h4>
                                  N5000.00 <span>/month</span>
                                </h4>
                              </Card.Header>
                              <Card.Body>
                                <div className="card-div">
                                  <h6 className="blue">Insight +</h6>
                                  <p className="slash-txt">
                                    Get a months' access to personalized insights on how to
                                    use your characteristics and competencies to your
                                    advantage.
                                  </p>
                                </div>
                                <ul className="card-list">
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    Career Personality Type
                                  </li>
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    Strength & Weakness Report
                                  </li>
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    Competence Analysis Report
                                  </li>
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    Most Suitable Career Business Expression
                                  </li>
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    Report on Roles Best Suited to You
                                  </li>
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    Career Drivers and How To Leverage Them
                                  </li>
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    Career Todo/Reminder
                                  </li>
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    Professional Profile Builder/CV Generator
                                  </li>
                                  <li>
                                    <img src={mark_blue} className="card-image" />
                                    In-app "text a coach"
                                  </li>
                                </ul>
                              </Card.Body>
                            </Card>
                          </Col>            
                          )}
                          {plan.includes("Book Session") && (
                            <Col
                            md={4}
                            sm={8}
                            className="margined_col subpayment marg"
                          >
                            <Card className="shadow-sm bg-white payment-card subpaymentcard">
                              <Card.Header className="payment-header">
                                <h4>
                                  N10000.00 <span>/one-off</span>
                                </h4>
                              </Card.Header>
                              <Card.Body>
                                <div className="card-div">
                                  <h6 className="green">Book A Session</h6>
                                  <p className="slash-txt">
                                    Book a live session with a career coach to express your
                                    concerns and get helpful recommendations.
                                  </p>
                                </div>
                                <ul className="card-list">
                                  <li>
                                    <img src={mark_green} className="card-image" />
                                    Get first-hand interpretation of your career assessment
                                    results
                                  </li>
                                  <li>
                                    <img src={mark_green} className="card-image" />
                                    Get a clearer view of how to move your career journey
                                    forward
                                  </li>
                                  <li>
                                    <img src={mark_green} className="card-image" />
                                    Get a live review of your CV
                                  </li>
                                  <li>Your opportunities are endless</li>
                                </ul>
                              </Card.Body>
                            </Card>
                          </Col>            
                          )}
                          {/* Price Slash Cards */}
                          {plan === "One-Off Insight Plan" && (
                            <Col
                              md={3}
                              sm={6}
                              className="margined_col subpayment"
                            >
                              <Card className=" shadow-sm bg-white payment-card subpaymentcard">
                                <Card.Header className="payment-header">
                                  <h4>
                                    N5000 <span>/one-off</span>
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
                                    N12000 <span>/month</span>
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
                                      Your Clarity score
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
                                    N30000 <span>/month</span>
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
                                    N50000 <span>/month</span>
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
                    //   <div>
                    //    <div>
                    //       <div className="activeplac actplan">Active plan</div>
                    //       <div className="subtert">
                    //         You are currently subscribed to the <b>Free Plan</b>.
                    //       </div>
                    //   </div>
                    //   <Col md={3} sm={8} className="margined_col subpayment">
                    //   <Card className="h-300 shadow-sm bg-white payment-card subpaymentcard">
                    //     <Card.Header className="payment-header">
                    //       <h4>
                    //         N0.00 <span>/one-off</span>
                    //       </h4>
                    //     </Card.Header>
                    //     <Card.Body>
                    //       <div className="card-div">
                    //         <h6>Free</h6>
                    //         <p>
                    //           Get the first hand Clarity experience for no
                    //           charge at all. Take action to experience career bliss.
                    //         </p>
                    //       </div>
                    //       <ul className="card-list">
                    //         <li>
                    //           <img src={mark} className="card-image" />
                    //           Clarity score
                    //         </li>
                    //         <li>
                    //           <img src={mark} className="card-image" />
                    //           Career personality types
                    //         </li>
                    //         <li>
                    //           <img src={mark} className="card-image" />
                    //           Cv builder
                    //         </li>
                    //         <li>
                    //           <img src={mark} className="card-image" />
                    //           Strength & Weakness Report
                    //         </li>
                    //       </ul>
                    //     </Card.Body>
                    //   </Card>
                    // </Col>
                    // </div>
                     )}
                  </div>
                </Col>
              )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default NewDashboardSubsriptionPlan;
