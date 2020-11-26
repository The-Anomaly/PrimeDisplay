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
  isLoading_1:boolean;
  showWarning: boolean;
  width: number;
  onlyfree: boolean;
  showfullresult: boolean;
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
    isLoading_1:false,
    isLoading: false,
    showWarning: false,
    onlyfree: false,
    width: 100,
    showfullresult: false,
  };
  submitRetakeAssessment = (e) => {
    e.preventDefault();
    this.setState({
      isLoading_1:true
    })
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/retakeassessment`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        window.location.assign("/assessmentphaseone");
        this.setState({
          isLoading_1:false
        })
      })
      .catch((err) => {
        if (err) {
          this.setState({
            isLoading_1:false
          })
        }
      });
  };
  componentDidMount() {
    this.setState({ 
      isLoading: true
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/paiddashboard`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            client: response.data[0],
            careerbussines: response?.data[0]?.career_business_expression[0],
            jobfunctionchartdata: response?.data[0]?.job_function_fit?.graph,
            averagecompetencechartdata:
              response?.data[0]?.average_career_competences?.graph,
            strongcompetencechartdata:
              response?.data[0].strong_career_competences.graph,
            fullname: response.data[0].full_name,
            successMsg: true,
            isLoading: false,
          });
        }
        this.checkIfUserHasMadePayment();
      })
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
        if (
          response?.data[0]?.view_result === true
        ) {
          this.setState({
            showfullresult: true,
          });
          return window.location.assign("/thirdpary/fullresult");
        }
        return window.location.assign("/dashboardsubscriptionplan");
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
        if (
          response?.data[0]?.view_result === true
        ) {
          this.setState({
            showfullresult: true,
          });
        }
      })
      .catch((error) => {
      });
  };
  checkIfUserHasAccessToAskACounselor = () => {
    const stringFeature = localStorage.getItem("accessFeature");
    const featureToCheck = stringFeature
      ? JSON.parse(stringFeature)
      : "";

    if (featureToCheck["ask_counsellor"] === true) {
      console.log("Ask a counselor successful");
      window.location.assign("/allusermessages");
    } else {
      //notify("Update your subscription to access this feature");
      console.log("Can't access ask a counselor");
      return setTimeout((window.location.pathname = "/dashboardsubscriptionplan"), 2000);
    }
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
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav overview={true} />
          <Row>
            <SideBarNewDashboard overview={true} />
            <Col md={10} sm={12} className="prm">
              <DashboardLargeScreenNav title="Overview" />
              <Row>
                <Col md={12} className="kisls kisls22">
                  <div className="kdashheader npps">
                    <div className="fjss hd">
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
                      <div className="">
                        <div className="kprofile psdd">
                          Profile
                          <div className="kprofile2 idds sowws psdd">
                            {client.profile}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                        <Button className="retaketest planupgradebtn"
                        onClick={() =>
                          this.checkIfUserHasAccessToAskACounselor()
                        }>
                         {isLoading_1 ? "Processing":"Ask a counselor"}
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
                    <div className="notpaid hh">
                      <div className="notpaid1">
                        <img src={caution} className="caution" alt="caution" />
                        <div className="notpaidtext">
                          Oops!!! You need to upgrade your plan to get
                          indepth details
                        </div>
                      </div>
                      <div className="retaketest upss planupgradebtn1">
                        <Link to="/paymentsummary">Upgrade your Plan</Link>
                      </div>
                    </div>
                  )}
                  <div className="resultsec2 lswid" id="seek">
                    <div className="csfitscore2">Your Career Fitness Score</div>
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
                        percent={client?.career_fitness?.score}
                        padding={0}
                      />
                    </div>
                    <div className="csfitscore" id="drivers">
                      <div className="divide"></div>{" "}
                      <div className="csfitscore1">
                        Your Career Fitness Score
                      </div>
                      <div className="vbnc1">
                        {" "}
                        {client?.career_fitness?.heading}{" "}
                      </div>
                      <div className="csbody">
                        {client?.career_fitness?.body}
                      </div>
                    </div>
                  </div>
                  <div className="reess" id="personality">
                    <div className="resultsec3">
                      <div className="careerpersonalityheader">
                        Career Personality type
                      </div>
                      <div className="reskwrap">
                        <div className="csfitscore1 reskheader">
                          Your Career Personality type
                        </div>
                        <div className="cptext">
                          {client?.career_personality_type?.short_description}
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
                        {client?.career_personality_type?.graph?.map(
                          (data, index) => {
                            return (
                              <div className="">
                                <div className="ttp">{data.name}</div>
                                <HorizontalBar value={data.value.value1} />
                                <div className="btmwrap">
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
                      <div className="reskwrap">
                        <div className="career221">
                          {client?.career_personality_type?.full_body}
                        </div>
                      </div>
                    </div>
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
                    View Full Insight
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
                  This package is not available on this plan Please Upgrade your
                  Plan
                </div>
                <div className="text-center">
                  {/* <div className="retaketest upss1">
                    <Link to="/paymentsummary">Upgrade your Plan</Link>
                  </div> */}
                  <div className="retaketest upss1 planupgradebtn">
                    <Link to="/dashboardsubscriptionplan">View your current plan</Link>
                  </div>
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
