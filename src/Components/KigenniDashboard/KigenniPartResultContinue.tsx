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
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Testing from "./Testing";
import HorizontalBar from "./HorizontalBar";

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
  isLoading: boolean;
  width: number;
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
    isLoading: false,
    width: 100,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
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
    const {
      fullname,
      client,
      careerbussines,
      jobfunctionchartdata,
      averagecompetencechartdata,
      weakcompetencechartdata,
      strongcompetencechartdata,
      isLoading,
      width,
    } = this.state;
    console.log(careerbussines);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    console.log(client);
    return (
      <>
        {!isLoading ? (
          <Col md={10} className="">
            <div className="kdashheader">
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
                <div className="vbnc1"> {client?.career_fitness?.heading} </div>
                <div className="csbody">{client?.career_fitness?.body}</div>
              </div>
            </div>
            <hr />
            <div className="resultsec3">
              <div className="reskwrap">
                <div className="csfitscore1 reskheader">
                  Your Career Personality type
                </div>
                <div className="">
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
                {client?.career_personality_type?.graph?.map((data, index) => {
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
                })}
              </div>
            </div>
            <div>
              <div className="kz1">
                <div className="contkflex">
                  <div className="kz2">
                    <img src={vector1} className="kl3" alt="vector2" />
                    <div>Your Strengths</div>
                  </div>
                  <div className="kz12">
                    <ul className="grapwrap">
                      {client?.strengths?.map((strength, index) => (
                        <li className="grapssin" key={index}>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="contkflex">
                  <div className="kz2a">
                    <img src={vector2} className="kl3" alt="vector2" />
                    <div>Your Weaknesses</div>
                  </div>
                  <div className="kz12">
                    <ul className="grapwrap">
                      {client?.weaknesses?.map((weakness, index) => (
                        <li className="grapssin" key={index}>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div className="competence">Your Strong Competences</div>
            </div>
            <div className="row">
              <div className="resultt col-md-6">
                {client?.strong_career_competences?.graph1?.map(
                  (data, index) => {
                    return (
                      <div className="">
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
                      <div className="">
                        <div className="ttp1">{data.name}</div>
                        <Testing value={data.value} />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="otherinfo">
              {client?.strong_career_competences?.fields?.map((data, index) => (
                <div>
                  <span className="ikls">{data.name} </span> {data.value}
                  <br />
                </div>
              ))}
            </div>
            <hr/>
            {/* Average Competence Starts Here */}
            <div>
              {client?.average_career_competences &&
              client?.average_career_competences?.graph1.length > 0 ? (
                <div className="competence">Average Competences</div>
              ) : (
                ""
              )}
            </div>
            <div className="row">
             <div className="resultt col-md-6">
                {client?.average_career_competences?.graph1?.map(
                  (data, index) => {
                    return (
                      <div className="">
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
                      <div className="">
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
                  <div>
                    <span className="ikls">{data.name} </span> {data.value}
                    <br />
                  </div>
                )
              )}
            </div>
            <hr/>
            {/* ?akskks? */}
            {/* Average Competence Starts Here */}
            <div>
              {client?.weak_career_competences
              ? (
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
                      <div className="">
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
                      <div className="">
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
                <div>
                  <span className="ikls">{data.name} </span> {data.value}
                  <br />
                </div>
              ))}
            </div>
            <br />
            <hr />
            <br />
            <div>
              <div className="competence">
                Most Suitable Career-Business Expression
              </div>
              {client?.career_business_expression?.map((doc, index) => (
                <div className="resultsec2" key={index}>
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
                    <div className="csfitscore1">
                      {this.capitalize(doc?.industry)}
                    </div>
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
              <div className="nlodd">
                <div className="resultsec13">
                  <div className="reskwrap13">
                    <div className="csfitscore1 reskheader">
                      Your Top Career Drivers
                    </div>

                    {client?.career_drivers?.highlights?.map((data, index) => (
                      <div className="" key={index}>
                        <div>{data}</div>
                      </div>
                    ))}
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
                    <div>{data.body}</div>
                  </div>
                  <div className="tipswrapper">
                    <div>
                      <div className="stbly1">
                        Tips to Harnessing This Motivator:
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
              <div className="competence">Your Work Style</div>
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
                            <li className="grapssin">{dataindata}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              {/* Your Job Function Fit style barchart */}
              <div className="competence">Your Job Function Fit</div>
              <div className="chartss row">
              <div className="resultt col-md-6">
                {client?.job_function_fit?.graph1?.map(
                  (data, index) => {
                    return (
                      <div className="">
                        <div className="ttp1">{data.name}</div>
                        <Testing value={data.value} />
                      </div>
                    );
                  }
                )}
              </div>
              <div className="resultt col-md-6">
                {client?.job_function_fit?.graph2?.map(
                  (data, index) => {
                    return (
                      <div className="">
                        <div className="ttp1">{data.name}</div>
                        <Testing value={data.value} />
                      </div>
                    );
                  }
                )}
              </div>
              </div>
              <hr />
              <div className="otherinfo">
                {client?.job_function_fit?.field?.map((dataindata, index) => (
                  <div key={index}>
                    <span className="ikls">{dataindata.name} </span>{" "}
                    <div> {dataindata.value}. </div>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </Col>
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
