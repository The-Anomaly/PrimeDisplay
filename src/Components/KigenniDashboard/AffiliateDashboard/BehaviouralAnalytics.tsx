import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./affiliate.css";
import SideBarAffilliateDashboard from "./SideBarAffiliateDashboard";
import searchImage from "../../../assets/search11.png";
import avatar from "../../../assets/avatar.svg";
import caret from "../../../assets/caret_down.png";
import eye from "../../../assets/eye.png";
import balance from "../../../assets/balance.svg";
import info from "../../../assets/info_circle.png";
import CompetenceBarChart from "./CompetenceBarChart";

const BehaviouralAnalytics = () => {
  const [viewProfile, SetViewProfile] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(1);
  const viewProfileButton = () => {
    if (viewProfile === false) {
      SetViewProfile(true);
    } else {
      SetViewProfile(false);
    }
  };

  const viewPersonaties = () => {
    setAnalytics(1);
  };
  const viewCompetencies = () => {
    setAnalytics(2);
  };
  const viewWorkStyle = () => {
    setAnalytics(3);
  };
  const viewWorkMotivators = () => {
    setAnalytics(4);
  };
  const viewWorkFunctions = () => {
    setAnalytics(5);
  };
  const viewCareerFitness = () => {
    setAnalytics(6);
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarAffilliateDashboard analytics={true} />
          <Col md={10} sm={12} className="prm newprm1">
            <Row className="BArow1">
              <Col>
                <Row className="BAfirstsec">
                  <form className="dxxa BAform">
                    <span className="sassa">
                      <img
                        src={searchImage}
                        alt="search"
                        className="searchImage"
                      />
                    </span>
                    <input
                      type="search"
                      placeholder="Search"
                      className="dshbdsearchbar form-control BAsearchbar"
                    />
                  </form>
                  <div className="BAprofile">
                    <img className="BAavatar" src={avatar} alt="user avatar" />
                    <img
                      className={viewProfile ? "BAcaret BAcaret-up" : "BAcaret"}
                      src={caret}
                      alt="dropdown"
                      onClick={viewProfileButton}
                    />
                    {viewProfile ? (
                      <div className="BAviewprofile">
                        <img className="BAvpeye" src={eye} alt="show" />
                        View Profile
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Row>
                <Row className="BArow2">
                  <div className="BArow2txt1">Behavioural Analytics</div>
                </Row>
                {/* Subscribed view begins*/}
                <Row>
                  <div className="BAsections">
                    <div
                      onClick={viewPersonaties}
                      className={
                        analytics === 1 ? "BAselect activeselect" : "BAselect"
                      }
                    >
                      Personalities
                    </div>
                    <div
                      onClick={viewCompetencies}
                      className={
                        analytics === 2 ? "BAselect activeselect" : "BAselect"
                      }
                    >
                      Competencies
                    </div>
                    <div
                      onClick={viewWorkStyle}
                      className={
                        analytics === 3 ? "BAselect activeselect" : "BAselect"
                      }
                    >
                      Work Style
                    </div>
                    <div
                      onClick={viewWorkMotivators}
                      className={
                        analytics === 4 ? "BAselect activeselect" : "BAselect"
                      }
                    >
                      Work Motivators
                    </div>
                    <div
                      onClick={viewWorkFunctions}
                      className={
                        analytics === 5 ? "BAselect activeselect" : "BAselect"
                      }
                    >
                      Work Functions
                    </div>
                    <div
                      onClick={viewCareerFitness}
                      className={
                        analytics === 6 ? "BAselect activeselect" : "BAselect"
                      }
                    >
                      Career Fitness
                    </div>
                  </div>
                </Row>
                <Row className="BArow3 bg-white">
                  {analytics === 1 ? (
                    <div className="BAanalyticsttl">
                      <div className="BAAttl1">
                        Personalities
                        <img className="BAinfo" src={info} alt="info" />
                      </div>
                      <button className="BAmorebtn">
                        Request more Insight
                      </button>
                    </div>
                  ) : analytics === 2 ? (
                    <>
                      <div className="BAanalyticsttl">
                        <div className="BAAttl1">
                          Competencies
                          <img className="BAinfo" src={info} alt="info" />
                        </div>
                        <button className="BAmorebtn">
                          Request more Insight
                        </button>
                      </div>
                      <div className="container space122a">
                        <CompetenceBarChart
                          endpoint={"/affiliate/competences-graph"}
                        />
                      </div>
                    </>
                  ) : analytics === 3 ? (
                    <div className="BAanalyticsttl">
                      <div className="BAAttl1">
                        Work Style
                        <img className="BAinfo" src={info} alt="info" />
                      </div>
                      <button className="BAmorebtn">
                        Request more Insight
                      </button>
                    </div>
                  ) : analytics === 4 ? (
                    <>
                      <div className="BAanalyticsttl">
                        <div className="BAAttl1">
                          Work Motivators
                          <img className="BAinfo" src={info} alt="info" />
                        </div>
                        <button className="BAmorebtn">
                          Request more Insight
                        </button>
                      </div>
                      <div className="container space122a">
                        <CompetenceBarChart
                          endpoint={"/affiliate/competences-graph"}
                        />
                      </div>
                    </>
                  ) : analytics === 5 ? (
                    <>
                      <div className="BAanalyticsttl">
                        <div className="BAAttl1">
                          Work Functions
                          <img className="BAinfo" src={info} alt="info" />
                        </div>
                        <button className="BAmorebtn">
                          Request more Insight
                        </button>
                      </div>
                      <div className="container space122a">
                        <CompetenceBarChart
                          endpoint={"/affiliate/competences-graph"}
                        />
                      </div>
                    </>
                  ) : analytics === 6 ? (
                    <div className="BAanalyticsttl">
                      <div className="BAAttl1">
                        Career Fitness
                        <img className="BAinfo" src={info} alt="info" />
                      </div>
                      <button className="BAmorebtn">
                        Request more Insight
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </Row>
                {/* Subscribed view ends*/}

                {/* Analytics without subscription begins*/}
                {/* <Row>
                  <img className="BAbalance" src={balance} />
                  <div className="BAsubtxt">
                    Volutpat purus orci ipsum quis faucibus sed elit elit
                    gravida. Sodales facilisis sed nulla lobortis in convallis
                    pellentesque urna faucibus.
                  </div>
                  <button className="BAsubbtn">Upgrade Subscription</button>
                </Row> */}
                {/* Analytics without subscription ends*/}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BehaviouralAnalytics;
