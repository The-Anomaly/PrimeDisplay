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
import { CirclePie } from "salad-ui.chart";
import { API } from "../../../config";
import Axios from "axios";
import CompetenceBarChart from "./CompetenceBarChart";

const BehaviouralAnalytics = () => {
  const [state, setState] = React.useState<any>({
    errorMessage: "",
    header1: "",
    header2: "",
    header3: "",
    header4: "",
    percent1: 0,
    percent2: 0,
    percent3: 0,
    percent4: 0,
    percent5: 0,
    percent6: 0,
    percent7: 0,
    percent8: 0,
    percent1txt: "",
    percent2txt: "",
    percent3txt: "",
    percent4txt: "",
    percent5txt: "",
    percent6txt: "",
    percent7txt: "",
    percent8txt: "",
    personalityInfo: "",
    problemSolvingInfo: "",
    interactingWithPeopleInfo: "",
    decisionMakingInfo: "",
    processingInformationInfo: "",
  });
  const { 
    header1,
    header2,
    header3,
    header4,
    percent1,
    percent2,
    percent3,
    percent4,
    percent5,
    percent6,
    percent7,
    percent8,
    percent1txt,
    percent2txt,
    percent3txt,
    percent4txt,
    percent5txt,
    percent6txt,
    percent7txt,
    percent8txt,
    personalityInfo,
    problemSolvingInfo,
    interactingWithPeopleInfo,
    decisionMakingInfo,
    processingInformationInfo,
   }: any = state;
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

  React.useEffect((): any => {
    const availableToken = localStorage.getItem("userToken");
    const token: string = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/affiliates/signin");
    Axios.get(`${API}/affiliate/personality-graph`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((response) => {
      console.log(response)
      if(response.status === 200) {
        setState({
          header1: response?.data?.personality?.data[1]?.heading,
          header2: response?.data?.personality?.data[0]?.heading,
          header3: response?.data?.personality?.data[3]?.heading,
          header4: response?.data?.personality?.data[2]?.heading,
          percent1: response?.data?.personality?.data[1]?.graph[0]?.value,
          percent2: response?.data?.personality?.data[1]?.graph[1]?.value,
          percent3: response?.data?.personality?.data[0]?.graph[0]?.value,
          percent4: response?.data?.personality?.data[0]?.graph[1]?.value,
          percent5: response?.data?.personality?.data[3]?.graph[0]?.value,
          percent6: response?.data?.personality?.data[3]?.graph[1]?.value,
          percent7: response?.data?.personality?.data[2]?.graph[0]?.value,
          percent8: response?.data?.personality?.data[2]?.graph[0]?.value,
          percent1txt: response?.data?.personality?.data[1]?.graph[0]?.name,
          percent2txt: response?.data?.personality?.data[1]?.graph[1]?.name,
          percent3txt: response?.data?.personality?.data[0]?.graph[0]?.name,
          percent4txt: response?.data?.personality?.data[0]?.graph[1]?.name,
          percent5txt: response?.data?.personality?.data[3]?.graph[0]?.name,
          percent6txt: response?.data?.personality?.data[3]?.graph[1]?.name,
          percent7txt: response?.data?.personality?.data[2]?.graph[0]?.name,
          percent8txt: response?.data?.personality?.data[2]?.graph[1]?.name,
          personalityInfo: response?.data?.personality?.info,
          problemSolvingInfo: response?.data?.personality?.data[1]?.info,
          interactingWithPeopleInfo: response?.data?.personality?.data[0]?.info,
          decisionMakingInfo: response?.data?.personality?.data[3]?.info,
          processingInformationInfo: response?.data?.personality?.data[2]?.info,
      })
      }
    })
    .catch((error) => {
      
    })
  }, []);

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
                    <div className="BAAsection">
                      <div className="BAanalyticsttl">
                        <div className="BAAttl1">
                          Personalities
                          <img className="BAinfo" src={info} alt="info" />
                        </div>
                        <button className="BAmorebtn">
                          Request more Insight
                        </button>
                      </div>
                      <div className="BAAboxes">
                        <div className="BAAbox">
                          <div className="BAboxttl">
                            <div className="BAboxtxt">{header1}</div>
                            <div className="BAboxinfo">
                              <img className="BAAboxinfo" alt="info" src={info} />
                            </div>
                          </div>
                          <div className="BAboxcontent">
                            <div className="BApercent">
                              <div className="BAcircle1">
                                <CirclePie
                                  width={100}
                                  height={100}
                                  strokeWidth={12}
                                  labelColor={"#000000"}
                                  labelFontSize={"18px"}
                                  strokeColor={"#EC6666"}
                                  railColor={"#e6e6e6"}
                                  fillColor={"#ffffff"}
                                  percent={percent1}
                                  padding={0}
                                />
                                <div className="BApiettl">{percent1txt}</div>
                              </div>
                              <div className="">
                                <CirclePie
                                  width={100}
                                  height={100}
                                  strokeWidth={12}
                                  labelColor={"#000000"}
                                  labelFontSize={"18px"}
                                  strokeColor={"#EC6666"}
                                  railColor={"#e6e6e6"}
                                  fillColor={"#ffffff"}
                                  percent={percent2}
                                  padding={0}
                                />
                                <div className="BApiettl">{percent2txt}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="BAAbox">
                          <div className="BAboxttl">
                            <div className="BAboxtxt">{header2}</div>
                            <div className="BAboxinfo">
                              <img className="BAAboxinfo" alt="info" src={info} />
                            </div>
                          </div>
                          <div className="BAboxcontent">
                            <div className="BApercent">
                              <div className="BAcircle1">
                                <CirclePie
                                  width={100}
                                  height={100}
                                  strokeWidth={12}
                                  labelColor={"#000000"}
                                  labelFontSize={"18px"}
                                  strokeColor={"#79D2DE"}
                                  railColor={"#e6e6e6"}
                                  fillColor={"#ffffff"}
                                  percent={percent3}
                                  padding={0}
                                />
                                <div className="BApiettl">{percent3txt}</div>
                              </div>
                              <div className="">
                                <CirclePie
                                  width={100}
                                  height={100}
                                  strokeWidth={12}
                                  labelColor={"#000000"}
                                  labelFontSize={"18px"}
                                  strokeColor={"#79D2DE"}
                                  railColor={"#e6e6e6"}
                                  fillColor={"#ffffff"}
                                  percent={percent4}
                                  padding={0}
                                />
                                <div className="BApiettl">{percent4txt}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="BAAbox">
                          <div className="BAboxttl">
                            <div className="BAboxtxt">{header3}</div>
                            <div className="BAboxinfo">
                              <img className="BAAboxinfo" alt="info" src={info} />
                            </div>
                          </div>
                          <div className="BAboxcontent">
                            <div className="BApercent">
                              <div className="BAcircle1">
                                <CirclePie
                                  width={100}
                                  height={100}
                                  strokeWidth={12}
                                  labelColor={"#000000"}
                                  labelFontSize={"18px"}
                                  strokeColor={"#A044D9"}
                                  railColor={"#e6e6e6"}
                                  fillColor={"#ffffff"}
                                  percent={percent5}
                                  padding={0}
                                />
                                <div className="BApiettl">{percent5txt}</div>
                              </div>
                              <div className="">
                                <CirclePie
                                  width={100}
                                  height={100}
                                  strokeWidth={12}
                                  labelColor={"#000000"}
                                  labelFontSize={"18px"}
                                  strokeColor={"#A044D9"}
                                  railColor={"#e6e6e6"}
                                  fillColor={"#ffffff"}
                                  percent={percent6}
                                  padding={0}
                                />
                                <div className="BApiettl">{percent6txt}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="BAAbox">
                          <div className="BAboxttl">
                            <div className="BAboxtxt">{header4}</div>
                            <div className="BAboxinfo">
                              <img className="BAAboxinfo" alt="info" src={info} />
                            </div>
                          </div>
                          <div className="BAboxcontent">
                            <div className="BApercent">
                              <div className="BAcircle1">
                                <CirclePie
                                  width={100}
                                  height={100}
                                  strokeWidth={12}
                                  labelColor={"#000000"}
                                  labelFontSize={"18px"}
                                  strokeColor={"#147AD6"}
                                  railColor={"#e6e6e6"}
                                  fillColor={"#ffffff"}
                                  percent={percent7}
                                  padding={0}
                                />
                                <div className="BApiettl">{percent7txt}</div>
                              </div>
                              <div className="">
                                <CirclePie
                                  width={100}
                                  height={100}
                                  strokeWidth={12}
                                  labelColor={"#000000"}
                                  labelFontSize={"18px"}
                                  strokeColor={"#147AD6"}
                                  railColor={"#e6e6e6"}
                                  fillColor={"#ffffff"}
                                  percent={percent8}
                                  padding={0}
                                />
                                <div className="BApiettl">{percent8txt}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
