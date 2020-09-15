import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import "./kegennidashboard.css";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import emp from "../../assets/empl112.png";
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
import precision from "../../assets/precision.svg";
import HorizontalBar from "./HorizontalBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import write from "../../assets/write.png";
import additionalinformation from "../../assets/additionalinformation.png";
import Form from "react-bootstrap/Form";
import Review from "../../assets/review.png";
import Axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Home/HomeComponents/navbar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import upbtn from "../../assets/upbtn.png";
import upbtnclose from "../../assets/upbtnclose.png";
import Footer from "../Home/HomeComponents/footer";

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
  accordionbtn1isopen: boolean;
  employer: Array<any>;
}
class ThirdPartyEmployersResult extends React.Component<React.Props<any>> {
  state: State = {
    fullname: "",
    client: [],
    careerbussines: [],
    jobfunctionchartdata: [],
    weakcompetencechartdata: [],
    averagecompetencechartdata: [],
    strongcompetencechartdata: [],
    employer: [],
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
    accordionbtn1isopen: false,
  };
  componentWillMount() {
    this.setState({ isLoading: true });
    const getResult = localStorage.getItem("result");
    const Result = getResult
      ? JSON.parse(getResult)
      : window.location.assign("/employersview");
    console.log(Result);
    this.setState({
      employer: Result,
      fullname: Result?.full_name,
      successMsg: true,
      isLoading: false,
      jobfunctionchartdata: Result?.job_function_fit?.graph,
      averagecompetencechartdata: Result?.average_career_competences?.graph,
      weakcompetencechartdata: Result?.weak_career_competences?.graph,
      strongcompetencechartdata: Result?.strong_career_competences?.graph,
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
    const newStr = s.split(" ");

    return (
      newStr[0].charAt(0).toUpperCase() +
      newStr[0].slice(1) +
      " " +
      newStr[1].charAt(0).toUpperCase() +
      newStr[1].slice(1)
    );
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
      accordionbtn1isopen,
      isLoading,
      employer,
    }: any = this.state;
    console.log(employer);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    return (
      <>
        {/* <Navbar /> */}
        <div className="coloredtapping">
          <Row className="kli6 bcbv">
            <Col md={10} className="">
              <div className="prclogo">
                <img src={precision} className="precision" alt="precision" />
              </div>
            </Col>
          </Row>
        </div>
        <Container fluid={true}>
          <Row className="kli6 bcbv">
            {!isLoading ? (
              <>
                <Col md={10} className="">
                  <div className="kdashheader">
                    {fullname ? this.capitalize(fullname) : ""}{" "}
                    <span className="kdashheaderlight"> Report</span>
                  </div>
                  <div className="kdash1"></div>
                  <hr />
                  <div className="resultsec3" id="personality">
                    <div className="rdrap">
                      <div className="csfitscore1  reskheader">
                        Candidates Insights
                      </div>
                    </div>
                  </div>
                  <div id="stongcomp">
                    <div className="competence">Personality</div>
                  </div>
                  <div className="row">
                    <div className="resultt col-md-6">
                      {employer?.career_personality_type?.graph1?.map(
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
                      {employer?.career_personality_type?.graph2?.map(
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
                    <Accordion defaultActiveKey="0" className="red112">
                      <Card className="cllsls">
                        <Card.Header>
                          <Accordion.Toggle
                            as={Card.Header}
                            variant="link"
                            eventKey="0"
                            className="cllsls1"
                            onClick={() => {
                              this.setState({
                                accordionbtn1isopen: accordionbtn1isopen
                                  ? false
                                  : true,
                              });
                            }}
                          >
                            <div className="flessz">
                              <div>Read Description</div>
                              <div className="plus_style">
                                {accordionbtn1isopen}
                                <img
                                  src={accordionbtn1isopen ? upbtnclose : upbtn}
                                  className="upbtn"
                                  alt="upbtn"
                                />
                              </div>
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="detailss1">
                              <h6 className="accas1">
                                {
                                  employer?.career_personality_type
                                    ?.short_description
                                }
                              </h6>
                              <div className="accas2">
                                {employer?.career_personality_type?.body}
                              </div>
                            </div>
                            <div className="detailss1">
                              <h6 className="accas1">Potential strengths</h6>
                              {employer?.strengths?.map((data, ind) => (
                                <div className="accas2" key={ind}>
                                  {data}
                                </div>
                              ))}
                            </div>
                            <div className="detailss1">
                              <h6 className="accas1">Potential weaknesses</h6>
                              {employer?.weaknesses?.map((data, ind) => (
                                <div className="accas2" key={ind}>
                                  {data}
                                </div>
                              ))}
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                  <hr />
                  {/* <div id="weak">
                    {employer?.strong_career_competences ? (
                      <div className="competence">Strong Career Competence</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row">
                    <div className="resultt col-md-6">
                      {employer?.strong_career_competences?.graph1?.map(
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
                      {employer?.strong_career_competences?.graph2?.map(
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
                    <Accordion defaultActiveKey="0" className="red112">
                      <Card className="cllsls">
                        <Card.Header>
                          <Accordion.Toggle
                            as={Card.Header}
                            variant="link"
                            eventKey="0"
                            className="cllsls1"
                            onClick={() => {
                              this.setState({
                                accordionbtn1isopen: accordionbtn1isopen
                                  ? false
                                  : true,
                              });
                            }}
                          >
                            <div className="flessz">
                              <div>Read Description</div>
                              <div className="plus_style">
                                {accordionbtn1isopen}
                                <img
                                  src={accordionbtn1isopen ? upbtnclose : upbtn}
                                  className="upbtn"
                                  alt="upbtn"
                                />
                              </div>
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            {employer?.strong_career_competences?.fields.map(
                              (data, i) => (
                                <div key={i} className="detailss1">
                                  <h6 className="accas1">{data.name}</h6>
                                  <div className="accas2">{data.value}</div>
                                </div>
                              )
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
               
                  <div id="avgcomp">
                    <div className="competence">Average Competences</div>
                  </div>
                  <div className="row">
                    <div className="resultt col-md-6">
                      {employer?.average_career_competences?.graph1?.map(
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
                      {employer?.average_career_competences?.graph2?.map(
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
                    <Accordion defaultActiveKey="0" className="red112">
                      <Card className="cllsls">
                        <Card.Header>
                          <Accordion.Toggle
                            as={Card.Header}
                            variant="link"
                            eventKey="0"
                            className="cllsls1"
                            onClick={() => {
                              this.setState({
                                accordionbtn1isopen: accordionbtn1isopen
                                  ? false
                                  : true,
                              });
                            }}
                          >
                            <div className="flessz">
                              <div>Read Description</div>
                              <div className="plus_style">
                                {accordionbtn1isopen}
                                <img
                                  src={accordionbtn1isopen ? upbtnclose : upbtn}
                                  className="upbtn"
                                  alt="upbtn"
                                />
                              </div>
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            {employer?.average_career_competences?.fields.map(
                              (data, i) => (
                                <div key={i} className="detailss1">
                                  <h6 className="accas1">{data.name}</h6>
                                  <div className="accas2">{data.value}</div>
                                </div>
                              )
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                  <hr />
                  <div id="weak">
                    {employer?.weak_career_competences ? (
                      <div className="competence">Weak Career Competence</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row">
                    <div className="resultt col-md-6">
                      {employer?.weak_career_competences?.graph1?.map(
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
                      {employer?.weak_career_competences?.graph2?.map(
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
                    <Accordion defaultActiveKey="0" className="red112">
                      <Card className="cllsls">
                        <Card.Header>
                          <Accordion.Toggle
                            as={Card.Header}
                            variant="link"
                            eventKey="0"
                            className="cllsls1"
                            onClick={() => {
                              this.setState({
                                accordionbtn1isopen: accordionbtn1isopen
                                  ? false
                                  : true,
                              });
                            }}
                          >
                            <div className="flessz">
                              <div>Read Description</div>
                              <div className="plus_style">
                                {accordionbtn1isopen}
                                <img
                                  src={accordionbtn1isopen ? upbtnclose : upbtn}
                                  className="upbtn"
                                  alt="upbtn"
                                />
                              </div>
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            {employer?.weak_career_competences?.fields.map(
                              (data, i) => (
                                <div key={i} className="detailss1">
                                  <h6 className="accas1">{data.name}</h6>
                                  <div className="accas2">{data.value}</div>
                                </div>
                              )
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                  <div id="weak">
                    {employer?.job_function_fit ? (
                      <div className="competence">Work Functions</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row">
                    <div className="resultt col-md-6">
                      {employer?.job_function_fit?.graph1?.map(
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
                      {employer?.job_function_fit?.graph2?.map(
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
                  </div> */}
                  {/* <div className="otherinfo">
                    <Accordion defaultActiveKey="0" className="red112">
                      <Card className="cllsls">
                        <Card.Header>
                          <Accordion.Toggle
                            as={Card.Header}
                            variant="link"
                            eventKey="0"
                            className="cllsls1"
                            onClick={() => {
                              this.setState({
                                accordionbtn1isopen: accordionbtn1isopen
                                  ? false
                                  : true,
                              });
                            }}
                          >
                            <div className="flessz">
                              <div>Read Description</div>
                              <div className="plus_style">
                                {accordionbtn1isopen}
                                <img
                                  src={accordionbtn1isopen ? upbtnclose : upbtn}
                                  className="upbtn"
                                  alt="upbtn"
                                />
                              </div>
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            {employer?.job_function_fit?.field.map(
                              (data, i) => (
                                <div key={i} className="detailss1">
                                  <h6 className="accas1">{data.name}</h6>
                                  <div className="accas2">{data.value}</div>
                                </div>
                              )
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div> */}

                  {/* WORK STYLE STARTS */}
                  <div id="weak">
                    {employer?.work_style ? (
                      <div className="competence">Primary Work Style</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row">
                    <div className="resultt col-md-6">
                      {employer?.work_style?.graph1?.map((data, index) => {
                        return (
                          <div className="" key={index}>
                            <div className="ttp1">{data.name}</div>
                            <Testing value={data.value} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="resultt col-md-6">
                      {employer?.work_style?.graph2?.map((data, index) => {
                        return (
                          <div className="" key={index}>
                            <div className="ttp1">{data.name}</div>
                            <Testing value={data.value} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="otherinfo">
                    <Accordion defaultActiveKey="0" className="red112">
                      <Card className="cllsls">
                        <Card.Header>
                          <Accordion.Toggle
                            as={Card.Header}
                            variant="link"
                            eventKey="0"
                            className="cllsls1"
                            onClick={() => {
                              this.setState({
                                accordionbtn1isopen: accordionbtn1isopen
                                  ? false
                                  : true,
                              });
                            }}
                          >
                            <div className="flessz">
                              <div>Read Description</div>
                              <div className="plus_style">
                                {accordionbtn1isopen}
                                <img
                                  src={accordionbtn1isopen ? upbtnclose : upbtn}
                                  className="upbtn"
                                  alt="upbtn"
                                />
                              </div>
                            </div>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            {employer?.work_style?.body?.map((data, i) => (
                              <div key={i} className="detailss1">
                                {Array.isArray(data.value) ? (
                                  <h6 className="accas1">{data.name}</h6>
                                ) : null}
                                {Array.isArray(data.value) &&
                                  data.value.map((item, i) => (
                                    <div className="accas2" key={i}>
                                      {item}
                                    </div>
                                  ))}
                              </div>
                            ))}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                  <div className="ssdd112">
                    <div className="emp12">
                      <img src={emp} className="empl112" alt="logo11" />
                    </div>
                    <div className="emp12c">
                      <h6 className="emp121">
                        Hire the best fit for your team
                      </h6>
                      <div className="emp12a">
                        Use Yudimy's Precision tool to objectively select the
                        best candidates to shortlist for interviews. It shows
                        you who is most suitable, average and unfit to hire at
                        over 90% accuracy.
                      </div>
                    </div>
                    <div className="gfts1">
                      <div className="gfts">
                        {" "}
                        <a href="https://precision.yudimy.com">Get Started</a>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ) : (
              <div>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )}
          </Row>
          <Footer />
        </Container>
      </>
    );
  }
}

export default ThirdPartyEmployersResult;
