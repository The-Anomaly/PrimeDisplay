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

class NewDashboardSubsriptionPlan extends React.Component {
  state: any = {
    fullname: "",
    message: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    plan: "",
    width: 100,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
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
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const { fullname, message, isLoading, width, plan } = this.state;
    console.log(plan);
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
                          <div className="activeplac">Active plan</div>
                          <div className="subtert">
                            You are currently subscribed to{" "}
                            <b>
                              {plan === "insight_plan"
                                ? "Insight Plan"
                                : plan === "direction_plan"
                                ? "Direction Plan"
                                : "Growth Plan"}
                            </b>
                            , This subscription will expire in 23 days
                          </div>
                        </div>
                        <Col md={12} className="youwss">
                          {true && (
                            <Row className="kli6 bcbv">
                              <Col md={10}>
                                <Row className="centerr">
                                  {plan === "insight_plan" && (
                                    <Col xs={10} md={4} className="centerr1">
                                      <div className="planinsight">
                                        Insight Plan
                                      </div>
                                      <div className="oneoff">
                                        (One-off Plan)
                                      </div>
                                      <div className="percentoff">
                                        Now <b>&nbsp; 65%&nbsp;</b> OFF!
                                      </div>{" "}
                                      <div className="duration"></div>
                                      <div className="prems">
                                        {" "}
                                        An all-round competence audit report on
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        The Most suitable career and business
                                        industry match
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        The best job roles to work in
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Strong career competencies{" "}
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Average Career competencies
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Weak Career competencies
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Work style
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Top Career drivers’ & how to harness it
                                      </div>
                                      <div className="lmi1">
                                        <div className="amut">&#8358;3,500</div>
                                        <div className="amut1">
                                          one time payment
                                        </div>
                                      </div>
                                      <div>
                                        {/* <span className="amurt">&#8358;10,000</span>{" "} */}
                                      </div>
                                    </Col>
                                  )}
                                  {plan === "growth_plan" && (
                                    <Col
                                      xs={10}
                                      md={4}
                                      className="centerpurple"
                                    >
                                      <div className="planinsight">
                                        Growth Plan
                                      </div>
                                      <div className="oneoff">(Quaterly)</div>
                                      <div className="percentoffpurple">
                                        Now <b>&nbsp; 50%&nbsp;</b> OFF!
                                      </div>{" "}
                                      <div className="duration"></div>
                                      <div className="prems">
                                        {" "}
                                        A comprehensive personality and
                                        competence audit report and 4 personal
                                        career readiness sessions with a career
                                        counsellor to better understand to your
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        The Most suitable career and business
                                        industry match
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        The best job roles to work in
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Strong career competencies{" "}
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Average Career competencies
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Weak Career competencies
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Work style
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Top Career drivers’ & how to harness it
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        <div className="seadc">
                                          40 minutes personal session with a
                                          career counsellor to define clear
                                          career road map, job search or
                                          business strategy
                                        </div>
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Unlimited access to Counselling support
                                        to ask career related questions and get
                                        expert advice on demand (from CV to
                                        interview preparation, LinkedIn
                                        positioning, etc for your
                                        career-industry track.
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Get curated job recommendations and
                                        opportunities most suitable for you
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Top Career drivers’ & how to harness it
                                      </div>
                                      <div className="lmi1">
                                        <div className="amut">
                                          &#8358;50,000
                                        </div>
                                        <div className="amut1">
                                          Quaterly Payment
                                        </div>
                                      </div>
                                      <div>
                                        {/* <span className="amurt">&#8358;10,000</span>{" "} */}
                                      </div>
                                    </Col>
                                  )}
                                  {plan == "direction_plan" && (
                                    <Col xs={10} md={4} className="centerblue">
                                      <div className="planinsight">
                                        Direction Plan
                                      </div>
                                      <div className="oneoff">
                                        (One-off Plan)
                                      </div>
                                      <div className="percentoffblue">
                                        Now <b>&nbsp; 60%&nbsp;</b> OFF!
                                      </div>{" "}
                                      <div className="duration"></div>
                                      <div className="prems">
                                        {" "}
                                        An all-round personality and competence
                                        audit report
                                        <div>+ </div>
                                        40 minutes private counselling session.
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        The Most suitable career and business
                                        industry match
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        The best job roles to work in
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Strong career competencies{" "}
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Average Career competencies
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Weak Career competencies
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Work style
                                      </div>
                                      <div className="comps2">
                                        <span>
                                          <img
                                            src={checkcircle}
                                            className="checkcircle"
                                            alt="checkcircle"
                                          />
                                        </span>{" "}
                                        Top Career drivers’ & how to harness it
                                      </div>
                                      <div className="lmi1">
                                        <div className="amut">
                                          &#8358;10,500
                                        </div>
                                        <div className="amut1">
                                          one time payment
                                        </div>
                                      </div>
                                      <div>
                                        {/* <span className="amurt">&#8358;10,000</span>{" "} */}
                                      </div>
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                            </Row>
                          )}
                        </Col>
                      </>
                    )}
                    {plan == undefined && (
                      <div className="norec">
                        <img
                          src={noplan}
                          className="norecommendations"
                          alt="norecommendations"
                        />
                        <div className="udont1">Opps!!!</div>
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
