import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg1 from "../../../assets/userimg1.png";
import userimg from "../../../assets/userimg.png";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import "./councellor.css";
import { Link } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import noData from "../../../assets/no recommendations.png";
const moment = require("moment");

const CounsellorOverview = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    counsellorData: [],
    successMsg: false,
    isLoading: false,
    nextLink: "",
    prevLink: "",
    count: "",
    success: "",
    total_pages: "",
  });
  const {
    user,
    counsellorData,
    successMsg,
    nextLink,
    prevLink,
    errorMessage,
    count,
    total_pages,
    isLoading,
  } = state;
  React.useEffect(() => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/overview`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/booked-sessions`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
          console.log(res);
          if (res.status === 200) {
            setFormState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              counsellorData: [...res1.data.results].reverse(),
              count: res1.data.page,
              nextLink: res1.data.next,
              prevLink: res1.data.previous,
              total_pages: res1.data.total_pages,
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setFormState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setFormState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  }, []);
  const formatTime = (date) => {
    const dateTime = moment(date).format("MMM YYYY");
    return dateTime;
  };
  const formatHours = (date) => {
    const dateTime = moment(date).format("h:mm:ss a");
    return dateTime;
  };
  console.log(user);
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav ov={true} />
        <Row>
          <SideBarCounsellorDashboard ov={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Overview" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  rating={true}
                  ratingValue={user.rating}
                  counsellorId={user.counsellor_id}
                  welcomeText="Find below an overview of all activities with clarity"
                />
                <Row>
                  <Col md={12}>
                    <div className="wwrap">
                      <div className="fourinfo">
                        <div className="firstoffour second221">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Members Assigned</div>
                            <div className="mmber1">
                              {user.members_assigned}
                            </div>
                          </div>
                        </div>
                        <div className="firstoffour second221">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Sessions Booked</div>
                            <div className="mmber1">{user.sessions_booked}</div>
                          </div>
                        </div>
                        <div className="firstoffour second221">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Completed</div>
                            <div className="mmber1">{user?.completed}</div>
                          </div>
                        </div>
                        <div className="firstoffour second221">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Pending</div>
                            <div className="mmber1">{user?.pending}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="yudd1">
                      Your next session is due tomorrow
                    </div>
                    {counsellorData.splice(0, 2).map((data) => (
                      <div className="msgs teammembr booked bookedover">
                        <div className="fromerit summary">
                          <div className="cone">
                            <img
                              className="user_image"
                              src={userimg1}
                              alt="user image"
                            />
                          </div>
                          <div className="ctwo">
                            <div>
                              <div className="lowerr nulower counlowerr">
                                Name
                              </div>
                              <div className="userrdet1 det1">{data.name}</div>
                              <div className="userrdet2 memb">{data.email}</div>
                            </div>
                          </div>

                          <div className="cthree">
                            <div className="lowerr nulower counlowerr">
                              Date
                            </div>
                            <div>{formatTime(data.date)}</div>
                          </div>
                          <div className="cfour">
                            <div className="lowerr nulower counlowerr">
                              Time
                            </div>
                            <div className="">{data.time}</div>
                          </div>

                          <div className="cfive">
                            <div className="lowerr nulower counlowerr">
                              Member Type
                            </div>
                            <div className="clarity12b">{data.member_type}</div>
                          </div>

                          <div className="csix">
                            <div className="lowerr nulower sess counstat counlowerr">
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

                          <div className="cseven">
                            <div className="counview">View</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {counsellorData.length !> 0 && !isLoading && (
                      <>
                        <div className="text-center">
                          <img src={noData} className="noData" alt="noData" />
                        </div>
                        <div className="empt">
                          You do not have any booked session
                        </div>
                      </>
                    )}
                    <Link className="viewall viewbook" to="/counsellorbookings">
                      View all Booked Sessions
                    </Link>
                  </Col>
                </Row>
                <section className="view-box">
                  <div className="box-1"></div>
                  <div className="box-2"></div>
                </section>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CounsellorOverview;
