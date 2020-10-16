import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg1 from "../../../assets/userimg1.png";
import prevpage from "../../../assets/prevpage.svg";
import nextpage from "../../../assets/nextpage.svg";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";

const CounsellorAssignedMembers = (props: any) => {
  const [state, setState] = useState<any>({
    user: [],
    counsellorData: [],
    errorMessage: "",
  });
  React.useEffect(() => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/assigned-members`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              user: [...res.data],
              counsellorData: [...res.data].reverse(),
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  }, []);
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const { counsellorData } = state;
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav assignedmemb={true} />
        <Row>
          <SideBarCounsellorDashboard assignedmemb={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Assigned Members List" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="List of all the members assigned to you" />
                <Row className="signedfjss">
                  <Col md={12}>
                    <div className="teammembr teamheading counheading mheadd">
                      <div className="mone"> </div>
                      <div className="mtwo">
                        <div>Name</div>
                      </div>
                      <div className="mthree">
                        <div>Personality Type</div>
                      </div>
                      <div className="mfour">
                        <div>Availability</div>
                      </div>
                      <div className="mfive">
                        <div>Status</div>
                      </div>
                      <div className="msix"> </div>
                    </div>
                    {counsellorData &&
                      counsellorData.map((data, i) => (
                        <div className="msgs teammembr booked bookedover signed">
                          <div className="fromerit summary">
                            <div className="mone">
                              <img
                                className="user_image"
                                src={userimg1}
                                alt="user image"
                              />
                            </div>
                            <div className="mtwo">
                              <div>
                                <div className="lowerr nulower counlowerr mhead">
                                  Name
                                </div>
                                <div className="userrdet1 det1">
                                  {data?.name}
                                </div>
                                <div className="userrdet2 memb">
                                  {data?.email}
                                </div>
                              </div>
                            </div>

                            <div className="mthree">
                              <div className="lowerr nulower counlowerr mhead">
                                Personality Type
                              </div>
                              <div>{data?.personality_type}</div>
                            </div>

                            <div className="mfour">
                              <div className="lowerr nulower counlowerr mhead">
                                Availability
                              </div>
                              {data.availability == "available" ? (
                                <div className="avail">
                                  {capitalize(data?.availability)}
                                </div>
                              ) : (
                                <div className="notavail">
                                  {capitalize(data?.availability)}
                                </div>
                              )}
                            </div>
                            <div className="mfive">
                              <div className="lowerr nulower sess counstat counlowerr mhead">
                                Status
                              </div>
                              <span
                                className={
                                  !data.status ? "pend pltd" : "complt pltd"
                                }
                              >
                                {!data.status ? "Pending" : "Completed"}
                              </span>
                            </div>

                            <div className="msix">
                              <div className="counview mbtn">View Result</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="msgs teammembr booked bookedover signed">
                      <div className="fromerit summary">
                        <div className="mone">
                          <img
                            className="user_image"
                            src={userimg1}
                            alt="user image"
                          />
                        </div>

                        <div className="mtwo">
                          <div>
                            <div className="lowerr nulower counlowerr mhead">
                              Name
                            </div>
                            <div className="userrdet1 det1">JaiyeOla jones</div>
                            <div className="userrdet2 memb">jj@gmail.com</div>
                          </div>
                        </div>

                        <div className="mthree">
                          <div className="lowerr nulower counlowerr mhead">
                            Personality Type
                          </div>
                          <div>Intellectual Researcher</div>
                        </div>

                        <div className="mfour">
                          <div className="lowerr nulower counlowerr mhead">
                            Availability
                          </div>
                          <div className="avail">Available</div>
                        </div>

                        <div className="mfive">
                          <div className="lowerr nulower sess counstat counlowerr mhead">
                            Status
                          </div>
                          <span className="complt pltd">Completed</span>
                        </div>

                        <div className="msix">
                          <div className="counview mbtn">View Result</div>
                        </div>
                      </div>
                    </div>

                    <div className="msgs teammembr booked bookedover signed">
                      <div className="fromerit summary">
                        <div className="mone">
                          <img
                            className="user_image"
                            src={userimg1}
                            alt="user image"
                          />
                        </div>

                        <div className="mtwo">
                          <div>
                            <div className="lowerr nulower counlowerr mhead">
                              Name
                            </div>
                            <div className="userrdet1 det1">JaiyeOla jones</div>
                            <div className="userrdet2 memb">jj@gmail.com</div>
                          </div>
                        </div>

                        <div className="mthree">
                          <div className="lowerr nulower counlowerr mhead">
                            Personality Type
                          </div>
                          <div>--/--</div>
                        </div>

                        <div className="mfour">
                          <div className="lowerr nulower counlowerr mhead">
                            Availability
                          </div>
                          <div className="">--/--</div>
                        </div>

                        <div className="mfive">
                          <div className="lowerr nulower sess counstat counlowerr mhead">
                            Status
                          </div>
                          <span className="pend pltd">Pending</span>
                        </div>

                        <div className="msix">
                          <div className="counview mbtn mbtnblu">
                            Send Message
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="next_page">
                      <div>
                        Displaying <span className="page_num">1</span> out of{" "}
                        <span className="page_num">6</span>
                      </div>
                      <div>
                        <img
                          className="page_change"
                          src={prevpage}
                          alt="previous page"
                        />
                        <img
                          className="page_change"
                          src={nextpage}
                          alt="next page"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CounsellorAssignedMembers;
