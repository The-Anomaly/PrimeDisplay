import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Button from "react-bootstrap/Button";
import { CirclePie } from "salad-ui.chart";
import failedNotice from "../../assets/failedNotice.png";
import Modal from "react-bootstrap/Modal";
import DashboardNav from "./DashboardNavBar";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";
import caution from "../../assets/caution.png";
import secondlogo from "../../assets/image 2.png";
import FreeOverviewCard from "./overviewcardsfree";
import PaidOverviewCard from "./overviewcardspaid";
import { Link } from "react-router-dom";
import HorizontalBar from "./HorizontalBar";
import vector1 from "../../assets/whiteicon1.png";
import vector2 from "../../assets/whiteicon2.png";
import notice from "../../assets/notice.png";
import unlock from "../../assets/Unlock.png";
import blur from "../../assets/weakness_blur.png";
import blur2 from "../../assets/fix_blur.png";
import blur2a from "../../assets/fix_blur2.png";
import unlock2 from "../../assets/unlock_white.png";
import caution1 from "../../assets/caution1.svg";

interface State {
  fullname: string;
  careerbussines: any;
  jobfunctionchartdata: any;
  averagecompetencechartdata: any;
  strongcompetencechartdata: any;
  client: any;
  successMsg: boolean;
  errorMessage: string;
  isLoading: boolean;
  isLoading_1: boolean;
  showWarning: boolean;
  width: number;
  onlyfree: boolean;
  showfullresult: boolean;
  client2: any;
  paid: boolean;
  viewinsight: boolean;
}
class NewDashboard extends React.Component {
  state: State = {
    fullname: "",
    client: [],
    careerbussines: [],
    jobfunctionchartdata: [],
    averagecompetencechartdata: [],
    strongcompetencechartdata: [],
    errorMessage: "",
    successMsg: false,
    isLoading_1: false,
    isLoading: false,
    showWarning: false,
    onlyfree: false,
    width: 100,
    showfullresult: false,
    client2: [],
    paid: false,
    viewinsight: false,
  };
  submitRetakeAssessment = (e) => {
    e.preventDefault();
    this.setState({
      isLoading_1: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/retakeassessment`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        window.location.assign("/assessment/welcome");
        this.setState({
          isLoading_1: false,
        });
      })
      .catch((err) => {
        if (err) {
          this.setState({
            isLoading_1: false,
          });
        }
      });
  };
  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    this.getUserInfo(token);
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/paiddashboard`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/freedashboard`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((response, response2, response3) => {
          // console.log(response);
          // console.log(response2);
          if (response3.status === 200) {
            this.setState({
              paid: response3?.data[0]?.view_result,
            });
          }

          if (response.status === 200 && response2.status === 200) {
            this.setState({
              client: response.data[0],
              careerbussines: response?.data[0]?.career_business_expression[0],
              jobfunctionchartdata: response?.data[0]?.job_function_fit?.graph,
              averagecompetencechartdata:
                response?.data[0]?.average_career_competences?.graph,
              strongcompetencechartdata:
                response?.data[0].strong_career_competences.graph,
              fullname: response2.data[0].full_name,
              successMsg: true,
              isLoading: false,
              client2: response2.data[0],
            });
          }
          this.checkIfUserHasMadePayment();
        })
      )
      .catch((error) => {
        if (error && error?.response && error?.response?.data) {
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
  checkIfUserHasMadePaymentForFullResult = () => {
    const availableToken: string | null = localStorage.getItem("userToken");
    const token: string = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response?.data[0]?.view_result === true) {
          this.setState({
            showfullresult: true,
          });
          return this.OpenInsightModal();
        }
        return this.OpenNotPaidWarning();
      })
      .catch((error) => {});
  };
  checkIfUserHasMadePayment = () => {
    const availableToken: string | null = localStorage.getItem("userToken");
    const token: string = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response?.data[0]?.view_result === true) {
          this.setState({
            showfullresult: true,
          });
        }
      })
      .catch((error) => {});
  };
  checkIfUserHasAccessToAskACounselor = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        // console.log(response);
        if (response?.data[0]?.ask_counsellor === true) {
          return window.location.assign("/allusermessages");
        }
        if (response?.data[0]?.ask_counsellor === false) {
          return setTimeout(
            (window.location.pathname = "/dashboardsubscriptionplan"),
            2000
          );
        }
      })
      .catch((error) => {
        // console.log(error);
        // console.error("Payment Status Error");
      });
  };
  CloseWarning = () => {
    this.setState({
      showWarning: false,
    });
  };
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  openWarning = () => {
    this.setState({
      showWarning: true,
    });
  };
  CloseNotPaidWarning = () => {
    this.setState({
      onlyfree: false,
    });
  };
  OpenNotPaidWarning = () => {
    this.setState({
      onlyfree: true,
    });
  };
  CloseInsightModal = () => {
    this.setState({
      viewinsight: false,
    });
  };
  OpenInsightModal = () => {
    this.setState({
      viewinsight: true,
    });
  };
  getUserInfo = (token: string): any => {
    Axios.get(`${API}/currentuser`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response?.data));
        }
      })
      .catch((error) => {});
  };
  render() {
    const {
      fullname,
      client,
      careerbussines,
      jobfunctionchartdata,
      averagecompetencechartdata,
      strongcompetencechartdata,
      isLoading,
      width,
      isLoading_1,
      showfullresult,
      client2,
      paid,
      viewinsight,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav insight={true} />
          <Row>
            <SideBarNewDashboard insight={true} />
            <Col md={10} sm={12} className="prm newprm">
              <DashboardLargeScreenNav title="Free Result" />
              <Row>
                <Col md={12} className="kisls kisls22">
                  <div className="kdashheader npps">
                    <div className="fjss hd nujs">
                      <div>
                        {" "}
                        <span className="kdashheaderlight idds">
                          Hi{" "}
                          <span className="ksname">
                            {" "}
                            {fullname ? fullname : ""}
                          </span>
                        </span>
                        <div className="smalls">
                          {/* {client?.career_fitness?.heading}{" "}
                          <a href="#seek">
                            <b>see details below</b>{" "}
                          </a> */}
                        </div>
                      </div>
                      <div className="mobprofile">
                        <div className="kprofile psdd">
                          Profile
                          <div className="kprofile2 idds sowws psdd profiletxt">
                            {client.profile}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <Button
                        className="retaketest planupgradebtn"
                        onClick={() =>
                          this.checkIfUserHasAccessToAskACounselor()
                        }
                      >
                        {isLoading_1 ? "Processing" : "Text a coach"}
                      </Button>
                      {showfullresult && (
                        <Button
                          className="retaketest2 planupgradebtn"
                          onClick={this.openWarning}
                        >
                          Retake Assessment
                        </Button>
                      )}
                    </div>
                  </div>
                  {!showfullresult && (
                    <div className="notpaid hh oops-upgrade">
                      <div className="notpaid1">
                        <img src={caution} className="caution" alt="caution" />
                        <div className="notpaidtext">
                          Oops!!! You need to upgrade your plan to get indepth
                          details
                        </div>
                      </div>
                      <div className="retaketest upss planupgradebtn1">
                        <Link to="/paymentsummary">Upgrade your Plan</Link>
                      </div>
                    </div>
                  )}
                  <div className="resultsec2 lswid" id="seek">
                    <div className="csfitscore2">
                      Your Level of Career Clarity
                    </div>
                    <div className="resultsec22">
                      <CirclePie
                        width={190}
                        height={190}
                        strokeWidth={5}
                        labelColor={"#fff"}
                        labelFontSize={"38px"}
                        strokeColor={"#fff"}
                        railColor={"#17375c77"}
                        fillColor={"#001833"}
                        percent={client2?.career_fitness?.score}
                        padding={0}
                      />
                    </div>
                    <div className="csfitscore" id="drivers">
                      <div className="divide"></div>{" "}
                      <div className="csfitscore1">
                        Your Level of Career Clarity
                      </div>
                      <div className="vbnc1">
                        {" "}
                        {client2?.career_fitness?.heading}{" "}
                      </div>
                      <div className="csbody">
                        {client2?.career_fitness?.body}
                      </div>
                    </div>
                  </div>
                  <hr className="lswid divider" />
                  <div className="lswid">
                    <div className="tipswrapper">
                      {paid === true ? (
                        <div>
                          <div className="stbly1">
                            {client?.career_fitness?.quick_fix?.heading}
                          </div>
                          {client?.career_fitness?.quick_fix?.body?.map(
                            (data, index) => (
                              <div key={index} className="csbody liuii">
                                {index + 1}.{"  "}
                                {data}
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="stbly1">
                            {client?.career_fitness?.quick_fix?.heading}
                          </div>
                          {client?.career_fitness?.quick_fix?.body?.map(
                            (data, index) => (
                              <div key={index} className="csbody liuii">
                                {index + 1}.{"  "}
                                {data}
                              </div>
                            )
                          )}
                          {/* <div className="blursec">
                            <img
                              className="blur2"
                              src={blur2}
                              alt="blurred image"
                            />
                            <img
                              className="blur2a"
                              src={blur2a}
                              alt="blurred image"
                            />
                            <img
                              className="unlock unlock2"
                              src={unlock2}
                              alt="unlock"
                              onClick={() => this.setState({ onlyfree: true })}
                            />
                          </div> */}
                        </div>
                      )}
                      <div className="notice">
                        <img src={notice} className="noticee" alt="notice" />
                      </div>
                    </div>
                  </div>
                  <hr className="lswid divider" />
                  <div className="reess" id="personality">
                    <div className="resultsec3">
                      <div className="careerpersonalityheader">
                        Career Personality type
                      </div>
                      <div className="reskwrap newreskwrap">
                        <div className="csfitscore1 reskheader">
                          Your Career Personality type
                        </div>
                        <div className="cptext">
                          {client2?.career_personality_type?.short_description}
                        </div>
                      </div>
                    </div>
                    <div className="resultsec31">
                      <div className="col-md-6">
                        <img
                          src={secondlogo}
                          className="secondlogo pds"
                          alt="secondlogo"
                        />
                      </div>
                      <div className="resultt col-md-6">
                        {client2?.career_personality_type?.graph?.map(
                          (data, index) => {
                            return (
                              <div className="">
                                <div className="ttp newttp">{data.name}</div>
                                <HorizontalBar value={data.value.value1} />
                                <div className="btmwrap newbtmwrap">
                                  {" "}
                                  <div>{data.value.name1}</div>
                                  <div>{data.value.name2}</div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className="resultsec3">
                      <div className="reskwrap newreskwrapa">
                        <div className="career221 insighttxt">
                          {client2?.career_personality_type?.full_body}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="reess">
                    <div className="kz1">
                      <div className="contkflex newcontkflex" id="strength">
                        <div className="kz2">
                          <img src={vector1} className="kl3" alt="vector2" />
                          <div>Your Strengths</div>
                        </div>
                        {paid === true ? (
                          <div className="kz12">
                            <ul className="grapwrap">
                              {client?.strengths?.map((strength, index) => (
                                <li
                                  className="grapssin career221 insighttxt"
                                  key={index}
                                >
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="kz12">
                            <ul className="grapwrap">
                              {client?.strengths?.map((strength, index) => (
                                <li
                                  className="grapssin career221 insighttxt"
                                  key={index}
                                >
                                  {strength}
                                </li>
                              ))}
                            </ul>
                            {/* <div className="blursec">
                              <img
                                className="blur"
                                src={blur}
                                alt="blurred image"
                              />
                              <img
                                className="unlock"
                                src={unlock}
                                alt="unlock"
                                onClick={() =>
                                  this.setState({ onlyfree: true })
                                }
                              />
                            </div> */}
                          </div>
                        )}
                      </div>
                      <div className="contkflex newcontkflex" id="weakness">
                        <div className="kz2a">
                          <img src={vector2} className="kl3" alt="vector2" />
                          <div>Possible Weaknesses</div>
                        </div>
                        {paid === true ? (
                          <div className="kz12">
                            <ul className="grapwrap">
                              {client?.weaknesses?.map((weakness, index) => (
                                <li
                                  className="grapssin career221 insighttxt"
                                  key={index}
                                >
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="kz12">
                            <ul className="grapwrap">
                              {client?.weaknesses?.map((weakness, index) => (
                                <li
                                  className="grapssin career221 insighttxt"
                                  key={index}
                                >
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                            {/* <div className="blursec">
                              <img
                                className="blur"
                                src={blur}
                                alt="blurred image"
                              />
                              <img
                                className="unlock"
                                src={unlock}
                                alt="unlock"
                                onClick={() =>
                                  this.setState({ onlyfree: true })
                                }
                              />
                            </div> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr className="lswid divider" />
                  <div className="reess">
                    <h5 className="dash-compromise">
                      <strong>
                        The Top Two Things You Shouldn't Compromise for a Happy
                        Career
                      </strong>
                    </h5>
                    <br />
                    {client?.career_drivers?.fields?.map((data, index) => (
                      <div>
                        <div className="stbly">
                          <div className="stbly1">{data.heading}</div>
                          <div className="career221 insighttxt">
                            {data.body}
                          </div>
                        </div>
                        {/* <div className="tipswrapper">
                      <div>
                        <div className="noticeee">
                          <img
                            src={notice}
                            className="noticeee1"
                            alt="notice1"
                          />
                        </div>
                        <div className="stbly1">
                          Tips to Harnessing This Motivator:
                          <div className="underlinee"></div>
                        </div>
                        {data?.tips?.map((dataindata, index) => (
                          <div key={index}>
                            {index + 1}.{"  "}
                            {dataindata}
                          </div>
                        ))}
                      </div>
                      <div className="notice">
                        <img src={notice} className="noticee" alt="notice" />
                      </div>
                    </div> */}
                      </div>
                    ))}
                  </div>
                  {!showfullresult && (
                    <FreeOverviewCard
                      OpenModal={() => this.OpenNotPaidWarning}
                    />
                  )}
                  {showfullresult && <PaidOverviewCard />}
                  <div
                    className="insightss col-md-11"
                    onClick={() =>
                      this.checkIfUserHasMadePaymentForFullResult()
                    }
                  >
                    Know what to do next
                  </div>
                </Col>
              </Row>
            </Col>
            <Modal show={this.state.showWarning} onHide={this.CloseWarning}>
              <Modal.Body>
                Please note that retaking the assessment would require you to
                make payment to view the result
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btnws"
                  variant="secondary"
                  onClick={this.CloseWarning}
                >
                  Back
                </Button>
                <Button
                  variant="danger"
                  className="btnws"
                  onClick={this.submitRetakeAssessment}
                >
                  Continue
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={this.state.onlyfree}
              centered={true}
              onHide={this.CloseNotPaidWarning}
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
                  This package is not available on this plan. Please upgrade
                  your plan
                </div>
                <div className="text-center">
                  {/* <div className="retaketest upss1">
                    <Link to="/paymentsummary">Upgrade your Plan</Link>
                  </div> */}
                  <div className="retaketest upss1 planupgradebtn">
                    <Link to="/dashboardsubscriptionplan">
                      View your current plan
                    </Link>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              show={this.state.viewinsight}
              onHide={this.CloseInsightModal}
              centered
            >
              <Modal.Body>
                <div className="text-center">
                  <h6 className="txttxtview">
                    Click the button below to view your complete career insight.
                  </h6>
                </div>
                <div className="retaketest upss1 planupgradebtn">
                  <Link to="/thirdpary/fullresult">View full insight</Link>
                </div>
              </Modal.Body>
            </Modal>
          </Row>
        </Container>
      </>
    );
  }
}
export default NewDashboard;
