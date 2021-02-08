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
import expand from "../../../assets/minimize-2.png";
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
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
const moment = require("moment");

const CounsellorBookedSessionsComponent = (props: any) => {
  const [state, setState] = useState<any>({
    isOpen: false,
    rate1: 0,
    errorMessage: "",
    user: "",
    name: "",
    session_email: "",
    counsellorData: [],
    successMsg: false,
    isLoading: false,
    nextLink: "",
    prevLink: "",
    count: "",
    success: "",
    confirmModal: "",
    total_pages: "",
    completedStatus: false,
    user_issues: "",
    sessionId: "",
    recommendations: [],
    taskTitle: "",
    taskDuration: "",
    taskDescription: "",
    session_completed: false,
    session_notes: "",
    session_about: "",
    completing: false,
  });
  const openModal = (id) => {
    // console.log(counsellorData);
    counsellorData.forEach((data) => {
      // console.log(data);
      if (data.id === id) {
        // console.log(data);
        setState({
          ...state,
          name: data.name,
          isOpen: true,
          session_email: data.email,
          sessionId: data.id,
          completedStatus: data.status,
          user_issues: data.user_vent,
          session_completed: data?.session_completed,
        });
      }
    });
  };

  const closeconfirmModal = () => {
    setState({
      ...state,
      confirmModal: false,
    });
  };
  const openconfirmModal = () => {
    setState({
      ...state,
      confirmModal: true,
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
    completedStatus,
    session_email,
    counsellorData,
    prevLink,
    count,
    total_pages,
    session_completed,
    user_issues,
    completing,
    taskTitle,
    taskDuration,
    recommendations,
    taskDescription,
    session_notes,
    session_about,
    sessionId,
    confirmModal,
    name,
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
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/assigned-member/booked-sessions/?email=${props.email}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    ])
      .then(
        Axios.spread((res) => {
          // console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              counsellorData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
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
          // console.log(res);
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
          // console.log(res);
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
    const dateTime = moment(date).format("Do MMM YYYY");
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
      taskDuration: "",
      taskDescription: "",
      taskTitle: "",
    });
  };
  const complete_session = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    setState({
      ...state,
      completing: true,
    });
    if (taskTitle !== "" || taskDescription !== "" || taskDuration !== "") {
      // console.log("here");
      const recommendation = [
        {
          title: taskTitle,
          description: taskDescription,
          duration: taskDuration,
        },
      ];
      const data = {
        recommendations: [...recommendations, ...recommendation],
        notes: session_notes,
        rating: rate1,
        say_something: session_about,
        id: sessionId,
      };
      // console.log(data);
      Axios.post<any, AxiosResponse<any>>(
        `${API}/counsellor/complete-session`,
        data,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
        .then((res) => {
          
          notify("Successful");
          setTimeout(() => {
            setState({
              ...state,
              completing: false,
              confirmModal:false,
              isOpen:false
            });
            window.location.reload()
          }, 2000);
        })
        .catch((err) => {
          setTimeout(() => {
            setState({
              ...state,
              completing: false,
              confirmModal:false,
              isOpen:false
            });
            window.location.reload()
          }, 2000);
          // console.log(err.response);
        });
    }
    if (taskTitle == "" || taskDescription == "" || taskDuration == "") {
      const data = {
        recommendations,
        notes: session_notes,
        rating: rate1,
        say_something: session_about,
        id: sessionId,
      };
      // console.log(data);
      Axios.post<any, AxiosResponse<any>>(
        `${API}/counsellor/complete-session`,
        data,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
        .then((res) => {
          notify("Successful");
          setTimeout(() => {
            setState({
              ...state,
              completing: false,
              confirmModal:false,
              isOpen:false
            });
            window.location.reload()
          }, 2000);
        })
        .catch((err) => {
          setTimeout(() => {
            setState({
              ...state,
              completing: false,
              confirmModal:false,
              isOpen:false
            });
            window.location.reload()
          }, 2000);
        });
    }
  };
  console.log(completedStatus);
  return (
    <>
      <Row>
        <Col md={12} sm={12} className="prm">
          <Row className="wrapc222">
            <Col md={12} className="firstqq">
              <div className="kdashheader npps"></div>
              <Row className="letss">
                <Col md={12}>
                  {counsellorData.length > 0 && (
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
                      <div className="cfive cfivenew">
                        <div>Member Type</div>
                      </div>
                      <div className="csix">
                        <div>Status</div>
                      </div>
                      <div className="cseven"> </div>
                    </div>
                  )}
                  {isLoading && (
                    <div className="counsellorpreloader2">
                      <img
                        src={preloader}
                        className="counsellorpreloader"
                        alt="preloader"
                      />
                    </div>
                  )}
                  {counsellorData.slice(0, 3).map((data, i) => (
                    <div className="msgs teammembr booked bookedover" key={i}>
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
                          <div className="lowerr nulower counlowerr">Date</div>
                          <div>{formatTime(data.date)}</div>
                        </div>
                        <div className="cfour">
                          <div className="lowerr nulower counlowerr">Time</div>
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
                              !data.session_completed
                                ? "pend pltd"
                                : "complt pltd"
                            }
                          >
                            {!data.session_completed ? "Pending" : "Completed"}
                          </span>
                        </div>

                        <div className="cseven">
                          <div
                            className="counview"
                            onClick={() => openModal(data.id)}
                          >
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
                      <div className="textight">
                        <Link
                          className="viewall viewbook"
                          to="/counsellorbookings"
                        >
                          View all Booked Sessions
                        </Link>
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
      <Modal
        show={state.isOpen}
        size={"lg"}
        className="bookingszmodal"
        centered={true}
        onHide={closeModal}
      >
        <div className="text-right">
          <span onClick={closeModal}>&times;</span>
        </div>
        <Container>
          <h6>{name}</h6>
          <span className="modal-btn">
            <a href={`/counsellor/result/${session_email}`} target="blank">
              View users result <i className="fa fa-arrow-right"></i>
            </a>
          </span>
          <form>
            <label>issues raised by user</label>
            <textarea
              className="issues-textbox-1 form-control textboxnonimg"
              name="user_issues"
              onChange={inputChangeHandler}
              value={user_issues}
              disabled={true}
              placeholder="issues*"
              cols={80}
              rows={3}
            />
          </form>
          <form>
            <label>Take down notes during sessions</label>
            <textarea
              className="issues-textbox-1 form-control"
              placeholder="scribble down anything"
              cols={80}
              rows={3}
              name="session_notes"
              value={session_notes}
              disabled={completedStatus}
              onChange={inputChangeHandler}
            />
          </form>
          {!session_completed && (
            <Accordion defaultActiveKey="" className="councld1">
              <div className="councld11">
                <Accordion.Toggle
                  as={Card.Header}
                  className="hpadd"
                  eventKey="5"
                >
                  <p className="to-do-header councld">
                    {" "}
                    <span>Add Task</span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Toggle as={Card.Header} eventKey="5">
                  <span className="tododw">
                    <img src={expand} className="expand11" alt="expand" />
                  </span>
                </Accordion.Toggle>
              </div>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <form className="to-do-form">
                    <Row className="taskrow">
                      <Col md={6}>
                        <label className="taskcl">Task Title</label>
                        <input
                          type="text"
                          placeholder="enter a title"
                          name="taskTitle"
                          value={taskTitle}
                          onChange={inputChangeHandler}
                          className="form-control todo-input"
                          size={25}
                        />
                      </Col>
                      <Col md={6}>
                        <label className="taskcl">
                          How long should this take?{" "}
                          <span className="dayss">(Days)</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Enter the number of days"
                          className="form-control todo-input"
                          name="taskDuration"
                          value={taskDuration}
                          onChange={inputChangeHandler}
                          size={25}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <label className="taskcl">Task Objective</label>
                        <textarea
                          placeholder="Describe the nature of the task"
                          cols={67}
                          rows={3}
                          className="form-control text-decription"
                          name="taskDescription"
                          value={taskDescription}
                          onChange={inputChangeHandler}
                        />
                      </Col>
                    </Row>
                  </form>
                  <div className="addmore" onClick={add_new_task}>
                    <p className="hjhh">Save &#43;</p>
                  </div>
                  <div className="recommendationlist">
                    {recommendations.map((data, i) => (
                      <div className="cveducation" key={i}>
                        <span>
                          <img className="cvedu" src={book} alt="book icon" />
                        </span>
                        <span className="sch_details">
                          <div className="school">{data.title}</div>
                          <div className="course">
                            {data.duration}{" "}
                            {data.duration == 1 ? "day" : "days"}
                          </div>
                          <div className="location">{data.description}</div>
                        </span>
                        <span
                          className="edit_descripd"
                          onClick={() => deleteEntry(i)}
                        >
                          <span className="dwq12">&times;</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          )}
          {recommendations.map((data, i) => (
            <Accordion defaultActiveKey="" className="councld1">
              <div className="councld11">
                <Accordion.Toggle
                  as={Card.Header}
                  className="hpadd"
                  eventKey="5"
                >
                  <p className="to-do-header councld">
                    {" "}
                    <span>{data.title}</span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Toggle as={Card.Header} eventKey="5">
                  <span className="tododw">
                    <img
                      src={expand}
                      className="expand11 movelft22"
                      alt="expand"
                    />
                  </span>
                  <span className="andtimes" onClick={() => deleteEntry(i)}>
                    &times;
                  </span>
                </Accordion.Toggle>
              </div>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <div className="recommendationlist">
                    <form className="to-do-form">
                      <Row className="taskrow">
                        <Col md={6}>
                          <label className="taskcl">Task Title</label>
                          <input
                            type="text"
                            placeholder="enter a title"
                            name="taskTitle"
                            value={data.title}
                            onChange={inputChangeHandler}
                            className="form-control todo-input"
                            size={25}
                          />
                        </Col>
                        <Col md={6}>
                          <label className="taskcl">
                            How long should this take?{" "}
                            <span className="dayss">(Days)</span>
                          </label>
                          <input
                            type="number"
                            placeholder="Enter the number of days"
                            className="form-control todo-input"
                            name="taskDuration"
                            value={data.duration}
                            onChange={inputChangeHandler}
                            size={25}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <label className="taskcl">Task Objective</label>
                          <textarea
                            placeholder="Describe the nature of the task"
                            cols={67}
                            rows={3}
                            className="form-control text-decription"
                            name="taskDescription"
                            value={data.description}
                            onChange={inputChangeHandler}
                          />
                        </Col>
                      </Row>
                    </form>
                    <p className="hjhh"></p>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          ))}
          <ToastContainer
            enableMultiContainer
            containerId={"B"}
            toastClassName="bg-info text-white"
            hideProgressBar={true}
            position={toast.POSITION.TOP_CENTER}
          />
          <div className="center-btn">
            {" "}
              {!session_completed && (
                <span
                  className="modal-btn"
                  onClick={() =>
                    session_completed
                      ? notify("Session closed")
                      : openconfirmModal()
                  }
                >
                  {session_completed ? "Session Closed" : " Close session"}{" "}
                  <i className="fa fa-arrow-right"></i>
                </span>
              )}
          </div>
        </Container>
      </Modal>
      <Modal
        show={confirmModal}
        className="warning22e"
        centered={true}
        onHide={closeconfirmModal}
      >
        <Modal.Body>
          <div className="areusure1">
            are you sure you want to <b> close this session?</b>
          </div>
          <div className="text-center planupgrade">
            <div
              className="retaketest upss1 planupgradebtn mddd"
              onClick={closeconfirmModal}
            >
              Go Back
            </div>
            <div
              className="retaketest upss1 planupgradebtn mddd2"
              onClick={complete_session}
            >
              {completing ? "Processing" : "Continue"}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CounsellorBookedSessionsComponent;
