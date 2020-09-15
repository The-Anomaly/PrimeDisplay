import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./kegennidashboard.css";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import firstlogo from "../../assets/image 1.png";
import secondlogo from "../../assets/image 2.png";
import thdlogo from "../../assets/gift.png";
import vector1 from "../../assets/whiteicon1.png";
import vector2 from "../../assets/whiteicon2.png";
import notice from "../../assets/notice.png";
import { CirclePie } from "salad-ui.chart";
import StarRatingComponent from "react-star-rating-component";
import Spinner from "react-bootstrap/Spinner";
import Testing from "./Testing";
import HorizontalBar from "./HorizontalBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import write from "../../assets/write.png";
import additionalinformation from "../../assets/additionalinformation.png";
import Form from "react-bootstrap/Form";
import Review from "../../assets/review.png";
import Axios from "axios";
import { Link } from "react-router-dom";

interface State {
  fullname: string;
  careerbussines: any;
  jobfunctionchartdata: any;
  averagecompetencechartdata: any;
  strongcompetencechartdata: any;
  weakcompetencechartdata: any;
  client: any;
  successMsg: boolean;
  errorMessage: string;
  success: boolean;
  isLoading: boolean;
  isLoading1: boolean;
  feedbacktext: string;
  width: number;
  show: boolean;
  clarityLink: string;
  hascopiedLink: boolean;
  rate1: string;
  feebackselect: string;
  showWarning: boolean;
}
class KigenniRemainingResult extends React.Component<React.Props<any>> {
  state: State = {
    fullname: "",
    client: [],
    careerbussines: [],
    jobfunctionchartdata: [],
    weakcompetencechartdata: [],
    averagecompetencechartdata: [],
    strongcompetencechartdata: [],
    errorMessage: "",
    successMsg: false,
    success: false,
    isLoading: false,
    isLoading1: false,
    show: false,
    rate1: "",
    feebackselect: "",
    feedbacktext: "",
    clarityLink: "https://clarity.yudimy.com",
    width: 100,
    hascopiedLink: false,
    showWarning: false,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    this.checkIfUserHasMadePaymentForFullResult(token);
    axios
      .get<any, AxiosResponse<any>>(`${API}/paiddashboard`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            client: response.data[0],
            careerbussines: response?.data[0]?.career_business_expression[0],
            jobfunctionchartdata: response?.data[0]?.job_function_fit?.graph,
            averagecompetencechartdata:
              response?.data[0]?.average_career_competences?.graph,
            weakcompetencechartdata:
              response?.data[0]?.weak_career_competences?.graph,
            strongcompetencechartdata:
              response?.data[0].strong_career_competences.graph,
            fullname: response.data[0].full_name,
            successMsg: true,
            isLoading: false,
          });
        }
      })
      .then((resp) => {
        //remove the # on the prefix of the url string and move the page to that postion on the page
        let resultareawithtitle: string = window.location.hash;
        resultareawithtitle = resultareawithtitle.substring(1);
        this.moveTo(resultareawithtitle);
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
  CloseWarning = () => {
    this.setState({
      showWarning: false,
    });
  };
  openWarning = () => {
    this.setState({
      showWarning: true,
    });
  };
  submitRetakeAssessment = (e) => {
    e.preventDefault();
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {};
    axios
      .get<any, AxiosResponse<any>>(`${API}/retakeassessment`, {
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
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  handleClose = () =>
    this.setState({
      show: false,
    });
  handleSelectChange = (e) => {
    this.setState({
      feebackselect: e.target.value,
    });
  };
  changeCopiedState = () => {
    this.setState({
      hascopiedLink: true,
    });
    setTimeout(() => {
      this.setState({
        hascopiedLink: false,
      });
    }, 3000);
  };
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onStarClick = (nextValue, prevValue, name) => {
    this.setState({
      [name]: nextValue.toString(),
    });
  };
  submitFeedback = (e) => {
    e.preventDefault();
    this.setState({ isLoading1: true });
    const { rate1, feebackselect, feedbacktext } = this.state;
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {
      star: rate1,
      feedback: feedbacktext,
      does_it_help_you: feebackselect,
    };
    Axios.post(`${API}/feedback`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading1: false,
          success: true,
        });
        setTimeout(() => {
          this.setState({
            success: false,
            show: false,
          });
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading1: false,
          show: false,
        });
      });
  };
  checkIfUserHasMadePaymentForFullResult = (token: string) => {
    axios
      .get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        if (
          !response?.data[0]?.direction_plan &&
          !response?.data[0]?.growth_plan &&
          !response?.data[0]?.insight_plan
        ) {
          return window.location.assign("/thirdpary/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleChatCheck = () => {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    axios
      .get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
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
  moveTo = (str) => {
    const offsetTop: any = document?.getElementById(str)?.offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };
  render() {
    const {
      fullname,
      client,
      careerbussines,
      jobfunctionchartdata,
      averagecompetencechartdata,
      weakcompetencechartdata,
      strongcompetencechartdata,
      isLoading,
      isLoading1,
      showWarning,
      width,
      success,
      show,
    } = this.state;
    console.log(careerbussines);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    console.log(client);
    return (
      <>
        {!isLoading ? (
          <>
            <Modal
              size={"sm"}
              show={show}
              centered
              onHide={this.handleClose}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {" "}
                  <div className="feedbackheader">
                    Kindly give us a few minutes of your time
                  </div>
                  {success && <Alert variant={"success"}>Message Sent</Alert>}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="feedbackques">
                  1. How useful is the clarity report to you?{" "}
                </div>
                <div className="assessrating">
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.state.rate1}
                    onStarClick={this.onStarClick}
                    emptyStarColor={"#444"}
                  />
                </div>
                <div className="feedbackques">
                  2. Give a written review or feedback{" "}
                </div>
                <textarea
                  className="form-control losj"
                  id=""
                  cols={30}
                  name="feedbacktext"
                  onChange={this.onchange}
                  value={this.state.feedbacktext}
                  placeholder="Review"
                  rows={10}
                ></textarea>
                <div className="feedbackques">
                  3. Does this help you figure out your next career step?{" "}
                </div>
                <Form.Group className="selectprof">
                  <Form.Control
                    as="select"
                    className="selecss col-md-6 form-control"
                    name="helpfulornot"
                    onChange={this.handleSelectChange}
                  >
                    <option className="selectopt">Select Profile</option>
                    <option className="selectopt" value="yes">
                      Yes
                    </option>
                    <option className="selectopt" value="no">
                      No
                    </option>
                  </Form.Control>
                </Form.Group>
                <div className="feedbackheader bvcc">
                  <div className="inlki">
                    <img src={Review} alt="getlink" className="getlink" />
                  </div>
                  <div>
                    <div>Get link</div>
                    <div className="feedbackques1">
                      Share clarity assessment with a friend.
                    </div>
                  </div>
                </div>
                <div className="flexsa">
                  <input
                    type="text"
                    className="col-md-9 form-control oius"
                    value="https://clarity.yudimy.com"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(this.state.clarityLink);
                      this.changeCopiedState();
                    }}
                    className="copylink"
                  >
                    {this.state.hascopiedLink ? "Copied" : "Copy Link"}
                  </button>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  className="hgjs"
                  onClick={this.submitFeedback}
                >
                  {isLoading1 ? "Submitting" : "Submit"} Feedback{" "}
                  <span className="text-white">&#8594;</span>
                </Button>
              </Modal.Footer>
            </Modal>
            <Col md={11} className="">
              <div className="kdashheader">
                <div className="bcash">
                  <Link to="/overview">&#x2190;Back</Link>
                </div>
                {fullname ? fullname : ""}{" "}
                <span className="kdashheaderlight"> Clarity Report</span>
              </div>
              <div className="kdash1">
                <span className="kdash1light">
                  <a href="#seek"> see details below</a>
                </span>
              </div>
              <div className="kdasharea">
                <div>
                  <img src={firstlogo} className="kfirstlogo" alt="firstlogo" />
                </div>
                <div className="kprofilewrap">
                  <div className="kprofile">Profile</div>
                  <div className="kprofile2">{client.profile}</div>
                  {/* <div className="kprofile3">Growing Business</div> */}
                </div>
              </div>
              <hr />
              <div className="resultsec2" id="seek">
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
                  {/* <img src={firstChart} className="firstChart" alt="firstChart" /> */}
                </div>
                <div className="csfitscore">
                  <div className="csfitscore1">Your Career Fitness Score</div>
                  <div className="vbnc1">
                    {" "}
                    {client?.career_fitness?.heading}{" "}
                  </div>
                  <div className="csbody">{client?.career_fitness?.body}</div>
                </div>
              </div>
              <hr />
              <div>
                <div className="tipswrapper">
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
                  <div className="notice">
                    <img src={notice} className="noticee" alt="notice" />
                  </div>
                </div>
              </div>
              <hr />
              <div className="resultsec3" id="personality">
                <div className="reskwrap">
                  <div className="csfitscore1 juki  reskheader">
                    Career Personality type
                  </div>
                  <div className="career221">
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
                            <div>{data.value.name1}</div>
                            <div>{data.value.name2}</div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="resultsec3">
                  <div className="reskwrap">
                    <div className="career221">
                      {client?.career_personality_type?.full_body}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="kz1" id="strength">
                  <div className="contkflex">
                    <div className="kz2">
                      <img src={vector1} className="kl3" alt="vector2" />
                      <div>Your Strengths</div>
                    </div>
                    <div className="kz12">
                      <ul className="grapwrap">
                        {client?.strengths?.map((strength, index) => (
                          <li className="grapssin career221" key={index}>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="contkflex">
                    <div className="kz2a">
                      <img src={vector2} className="kl3" alt="vector2" />
                      <div id="weakness">Your Weaknesses</div>
                    </div>
                    <div className="kz12">
                      <ul className="grapwrap">
                        {client?.weaknesses?.map((weakness, index) => (
                          <li className="grapssin career221" key={index}>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {client?.strong_career_competences && (
                <div id="stongcomp">
                  <div className="competence">Your Strong Competences</div>
                </div>
              )}
              <div className="row">
                <div className="resultt col-md-6">
                  {client?.strong_career_competences?.graph1?.map(
                    (data, index) => {
                      return (
                        <div className="tttpt" key={index}>
                          <div className="ttp1">{data.name}</div>
                          <Testing value={data.value} />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="resultt col-md-6">
                  {client?.strong_career_competences?.graph2?.map(
                    (data, index) => {
                      return (
                        <div className="" key={index}>
                          <div className="ttp1">{data.name}</div>
                          <Testing value={data.value} />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="otherinfo">
                {client?.strong_career_competences?.fields?.map(
                  (data, index) => (
                    <div key={index}>
                      <span className="ikls">{data.name} </span>
                      <span className="career221">{data.value}</span>
                      <br />
                    </div>
                  )
                )}
              </div>
              <hr />
              {/* Average Competence Starts Here */}
              <div id="avgcomp">
                {client?.average_career_competences && (
                  <div className="competence">Average Competences</div>
                )}
              </div>
              <div className="row">
                <div className="resultt col-md-6">
                  {client?.average_career_competences?.graph1?.map(
                    (data, index) => {
                      return (
                        <div className="" key={index}>
                          <div className="ttp1">{data.name}</div>
                          <Testing value={data.value} />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="resultt col-md-6">
                  {client?.average_career_competences?.graph2?.map(
                    (data, index) => {
                      return (
                        <div className="" key={index}>
                          <div className="ttp1">{data.name}</div>
                          <Testing value={data.value} />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="otherinfo">
                {client?.average_career_competences?.fields?.map(
                  (data, index) => (
                    <div key={index}>
                      <span className="ikls">{data.name} </span>
                      <div className="career221">{data.value}</div>
                      <br />
                    </div>
                  )
                )}
              </div>
              <hr />
              {/* ?akskks? */}
              {/* Average Competence Starts Here */}
              <div id="weak">
                {client?.weak_career_competences ? (
                  <div className="competence">Weak Career Competence</div>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="resultt col-md-6">
                  {client?.weak_career_competences?.graph1?.map(
                    (data, index) => {
                      return (
                        <div className="" key={index}>
                          <div className="ttp1">{data.name}</div>
                          <Testing value={data.value} />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="resultt col-md-6">
                  {client?.weak_career_competences?.graph2?.map(
                    (data, index) => {
                      return (
                        <div className="" key={index}>
                          <div className="ttp1">{data.name}</div>
                          <Testing value={data.value} />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="otherinfo">
                {client?.weak_career_competences?.fields?.map((data, index) => (
                  <div key={index}>
                    <span className="ikls">{data.name} </span>
                    <div className="career221">{data.value}</div>
                    <br />
                  </div>
                ))}
              </div>
              <br />
              <hr />
              <br />
              <div>
                <div className="competence" id="expression">
                  Most Suitable Career-Business Expression
                </div>
                {client?.career_business_expression?.map((doc, index) => (
                  <div className="resultsec2" key={index}>
                    <div className="csfitscore2">
                      {this.capitalize(doc?.industry)}
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
                        percent={doc?.score}
                        padding={0}
                      />
                    </div>
                    <div className="csfitscore">
                      <Row>
                        <div className="csfitscore1">
                          {this.capitalize(doc?.industry)}
                        </div>
                      </Row>
                      {doc?.fields?.map((item, index) => (
                        <div className="csbody" key={index}>
                          <span className="competence1">
                            {this.capitalize(item.name)}
                          </span>
                          :{this.capitalize(item.value)} <br />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="nlodd" id="careerdrivers">
                  <div className="resultsec13">
                    <div className="reskwrap13">
                      <div className="csfitscore1 reskheader">
                        Your Top Career Drivers
                      </div>
                      <div className="csfitscore1 juki  reskheader">
                        Your Top Career Drivers
                      </div>
                      {client?.career_drivers?.highlights?.map(
                        (data, index) => (
                          <div className="" key={index}>
                            <div>{data}</div>
                          </div>
                        )
                      )}
                    </div>
                    <div>
                      <img
                        src={thdlogo}
                        className="secondlogo img-fluid"
                        alt="secondlogo"
                      />
                    </div>
                  </div>
                </div>
                {/* white background section */}
                {client?.career_drivers?.fields?.map((data, index) => (
                  <div>
                    <div className="stbly">
                      <div className="stbly1">{data.heading}</div>
                      <div className="career221">{data.body}</div>
                    </div>
                    <div className="tipswrapper">
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
                    </div>
                  </div>
                ))}
                {/* dark blue background section */}
                {/* Your work style */}
                <div className="competence" id="style">
                  Your Work Style
                </div>
                <div>
                  <div className="kz1">
                    {client?.work_style?.map((data, index) => (
                      <div className="contkflex" key={index}>
                        <div className="kz2">
                          <img src={vector1} className="kl3" alt="vector2" />
                          <div>{data.name}</div>
                        </div>
                        <div className="kz12">
                          <ul className="grapwrap">
                            {data.value.map((dataindata, index) => (
                              <li className="grapssin career221">
                                {dataindata}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
                {/* Your Job Function Fit style barchart */}
                <div className="competence" id="jobfunction">
                  Your Job Function Fit
                </div>
                <div className="chartss row">
                  <div className="resultt col-md-6">
                    {client?.job_function_fit?.graph1?.map((data, index) => {
                      return (
                        <div className="">
                          <div className="ttp1">{data.name}</div>
                          <Testing value={data.value} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="resultt col-md-6">
                    {client?.job_function_fit?.graph2?.map((data, index) => {
                      return (
                        <div className="">
                          <div className="ttp1">{data.name}</div>
                          <Testing value={data.value} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr />
                <div className="otherinfo">
                  {client?.job_function_fit?.field?.map((dataindata, index) => (
                    <div key={index}>
                      <span className="ikls">{dataindata.name} </span>{" "}
                      <div className="career221"> {dataindata.value}. </div>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col md={10} className="leavereveiw">
              <div
                onClick={() => {
                  this.setState({ show: true });
                }}
              >
                Please give your feedback &#129321; &#128524;
              </div>
            </Col>
            <Col md={10} className="fw2">
              <img src={write} alt="write" className="write" />
              <textarea
                className="form-control whatdou fba"
                id=""
                cols={30}
                name="feedbackText"
                onChange={this.onchange}
                value={""}
                placeholder="Counsellors recommendations"
                rows={10}
              ></textarea>
            </Col>
            <Col md={12} className="jcenter1">
              <div className="coonfused">Still Confused ???</div>
              <div className="pool">
                Let our pool of experienced counsellors guide you to better
                maximise your results{" "}
              </div>
              <div className="additional">
                {" "}
                <img src={additionalinformation} alt="additionalinformation" />
              </div>
              <div className="check11">
                <Button className="retaketest" onClick={this.handleChatCheck}>
                  Speak with a counsellor
                </Button>
                <Button className="retaketest2" onClick={this.openWarning}>
                  Retake Assessment
                </Button>
              </div>
            </Col>
            <Modal show={showWarning} onHide={this.CloseWarning}>
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
          </>
        ) : (
          <div>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </>
    );
  }
}

export default KigenniRemainingResult;
