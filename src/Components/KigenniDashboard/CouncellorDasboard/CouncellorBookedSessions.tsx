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
import noData from "../../../assets/no recommendations.png";
import rightimg from "../../../assets/rightarrow.png";
import leftimg from "../../../assets/leftarrow1.png";
import book from "../../../assets/book.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import preloader from "../../../assets/preloader2.gif";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
const moment = require("moment");

const CounsellorBookedSessions = (props: any) => {
  const [state, setState] = useState<any>({
    isOpen: true,
    rate1: "0",
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
    user_issues: "",
    recommendations: [],
    taskTitle: "",
    taskDuration: "",
    taskDescription: "",
    session_notes: "",
    session_about: "",
  });
  const openModal = () => {
    setState({
      ...state,
      isOpen: true,
    });
  };
  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  const {
    rate1,
    nextLink,
    isLoading,
    counsellorData,
    prevLink,
    count,
    total_pages,
    user_issues,
    taskTitle,
    taskDuration,
    recommendations,
    taskDescription,
    session_notes,
    session_about,
  } = state;
  const onStarClick = (nextValue, prevValue, name) => {
    setState({
      ...state,
      [name]: nextValue.toString(),
    });
  };
  React.useEffect(() => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/booked-sessions`, {
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
            setState({
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

  const loadNewData = () => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${nextLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${nextLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
          console.log(res);
          if (res.status === 200) {
            setState({
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
  };
  const loadPrevData = () => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${prevLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${prevLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
          console.log(res);
          if (res.status === 200) {
            setState({
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
  };
  const formatTime = (date) => {
    const dateTime = moment(date).format("MMM YYYY");
    return dateTime;
  };
  const inputChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const deleteEntry = (id) => {
    const recommendation = recommendations;
    recommendation.splice(id, 1);
    setState({
      ...state,
      recommendations: recommendation,
    });
  };
  const add_new_task = () => {
    const recommendation = [
      {
        title: taskTitle,
        description: taskDescription,
        duration: taskDuration,
      },
    ];
    if (taskTitle === "" || taskDescription === "" || taskDuration === "") {
      return notify("Please complete the user todo entry");
    }
    setState({
      ...state,
      recommendations: [...recommendations, ...recommendation],
    });
  };
  const complete_session = () => {
    // if (
    //   user_issues === "" ||
    //   session_notes === "" ||
    //   session_about === ""
    // ) {
    //   return notify("Please fill required feilds");
    // }
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {
      recommendations,
      notes: session_notes,
      rating: rate1,
      say_something: session_about,
      id: 12,
    };
    console.log(data);
    Axios.post<any, AxiosResponse<any>>(
      `${API}/counsellor/complete-session`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        console.log(res);
        notify("Successful");
        setTimeout(() => {
          closeModal();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav bookedsession={true} />
        <Row>
          <SideBarCounsellorDashboard bookedsession={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Booked Sessions" />
            <Row className="wrapc222">
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="Summary of all the booked sessions" />
                <Row className="letss">
                  <Col md={12}>
                    <div className="teammembr teamheading counheading">
                      <div className="cone"> </div>
                      <div className="ctwo">
                        <div>Name</div>
                      </div>
                      <div className="cthree">
                        <div>Date</div>
                      </div>
                      <div className="cfour">
                        <div>Time</div>
                      </div>
                      <div className="cfive">
                        <div>Member Type</div>
                      </div>
                      <div className="csix">
                        <div>Status</div>
                      </div>
                      <div className="cseven"> </div>
                    </div>
                    {isLoading && (
                      <div className="counsellorpreloader2">
                        <img
                          src={preloader}
                          className="counsellorpreloader"
                          alt="preloader"
                        />
                      </div>
                    )}
                    {counsellorData.map((data) => (
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
                            <div className="counview" onClick={openModal}>
                              View
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {counsellorData.length === 0 && !isLoading && (
                      <>
                        <div className="text-center">
                          <img src={noData} className="noData" alt="noData" />
                        </div>
                        <div className="empt">
                          You do not have any booked session
                        </div>
                      </>
                    )}
                    <div className="next_page">
                      {counsellorData.length !== 0 && (
                        <div>
                          Displaying <span className="page_num">{count}</span>{" "}
                          out of <span className="page_num">{total_pages}</span>
                        </div>
                      )}
                      <div>
                        {prevLink && (
                          <img
                            onClick={loadPrevData}
                            className="page_change"
                            src={prevpage}
                            alt="previous page"
                          />
                        )}

                        {nextLink && (
                          <img
                            onClick={loadNewData}
                            className="page_change"
                            src={nextpage}
                            alt="next page"
                          />
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal
        show={state.isOpen}
        size={"lg"}
        className="bookingszmodal"
        centered={true}
        onHide={closeModal}
      >
        <Container>
          <h6>Jaiyeola Jones</h6>
          <Link to="counsellorbookings">
            <span className="modal-btn">
              <Link to="/counsellor/userinsight" target="blank">
                View users result <i className="fa fa-arrow-right"></i>
              </Link>
            </span>
          </Link>

          <form>
            <label>issues raised by user</label>
            <textarea
              className="issues-textbox-1 form-control"
              name="user_issues"
              onChange={inputChangeHandler}
              placeholder="issues*"
              cols={80}
              rows={3}
            />
          </form>
          <p className="to-do-header">Create a Todo Task</p>
          <form className="to-do-form">
            <Row>
              <Col md={6}>
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="enter a title"
                  name="taskTitle"
                  onChange={inputChangeHandler}
                  className="form-control todo-input"
                  size={25}
                />
              </Col>
              <Col md={6}>
                <label>Task Duration</label>
                <input
                  type="text"
                  placeholder="Enter the number of days"
                  className="form-control todo-input"
                  name="taskDuration"
                  onChange={inputChangeHandler}
                  size={25}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <label>Task Description</label>
                <textarea
                  placeholder="Describe the nature of the task"
                  cols={67}
                  rows={3}
                  className="form-control text-decription"
                  name="taskDescription"
                  onChange={inputChangeHandler}
                />
              </Col>
            </Row>
          </form>
          <div className="addmore" onClick={add_new_task}>
            <p>Add more &#43;</p>
          </div>
          <div className="recommendationlist">
            {recommendations.map((data, i) => (
              <div className="cveducation" key={i}>
                <span>
                  <img className="cvedu" src={book} alt="book icon" />
                </span>
                <span className="sch_details">
                  <div className="school">{data.title}</div>
                  <div className="course">{data.duration}</div>
                  <div className="location">{data.description}</div>
                </span>
                <span className="edit_descripd" onClick={() => deleteEntry(i)}>
                  <span className="dwq12">&times;</span>
                </span>
              </div>
            ))}
          </div>
          <form>
            <label>Take down notes during sessions</label>
            <textarea
              className="issues-textbox-1 form-control"
              placeholder="scribble down anything"
              cols={80}
              rows={3}
              name="session_notes"
              onChange={inputChangeHandler}
            />
            <Row>
              <Col md={3}>
                <label>Rate this session</label>
              </Col>
              <Col md={5} className="star-container">
                <div className="assessrating">
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rate1}
                    onStarClick={onStarClick}
                    emptyStarColor={"#444"}
                  />
                </div>
              </Col>
            </Row>
            <textarea
              className="issues-textbox-1 form-control"
              placeholder="Say something about the session"
              cols={80}
              rows={3}
            />
          </form>
          <ToastContainer
            enableMultiContainer
            containerId={"B"}
            toastClassName="bg-info text-white"
            hideProgressBar={true}
            position={toast.POSITION.TOP_CENTER}
          />
          <div className="center-btn">
            {" "}
            <Link to="counsellorbookings">
              <span className="modal-btn" onClick={complete_session}>
                Close session <i className="fa fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </Container>
      </Modal>
    </>
  );
};
export default CounsellorBookedSessions;
