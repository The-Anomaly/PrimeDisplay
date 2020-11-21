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
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import isopen from "../../../assets/outarrow.png";
import "./councellor.css"
const moment = require("moment");

const CounsellorBookedSessions = (props: any) => {
  const [state, setState] = useState<any>({
    isOpen: false,
    rate1: 0,
    errorMessage: "",
    user: "",
    name: "",
    session_email: "",
    task_type: [],
    nature_of_task: "",
    counsellorData: [],
    successMsg: false,
    isLoading: false,
    nextLink: "",
    prevLink: "",
    count: "",
    success: "",
    total_pages: "",
    completedStatus: false,
    user_issues: "",
    sessionId: "",
    recommendations: [],
    taskTitle: "",
    taskDuration: "",
    taskDescription: "",
    session_notes: "",
    session_about: "",
    accordionisopen: false,
  });
  const openModal = (id) => {
    console.log(counsellorData);
    counsellorData.forEach((data) => {
      console.log(data);
      if (data.id === id) {
        console.log(data);
        setState({
          ...state,
          name: data.name,
          isOpen: true,
          session_email: data.email,
          sessionId: data.id,
          completedStatus: data.status,
          user_issues: data.user_vent,
        });
      }
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
    user_issues,
    taskTitle,
    taskDuration,
    recommendations,
    task_type,
    nature_of_task,
    taskDescription,
    session_notes,
    session_about,
    sessionId,
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
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/booked-sessions`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/recommendation-groups/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    ])
      .then(
        Axios.spread((res, res2) => {
          console.log(res2);
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
              task_type: [...res2.data],
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
    if (taskTitle !== "" || taskDescription !== "" || taskDuration !== "") {
      console.log("here");
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
        group: nature_of_task,
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
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    if (taskTitle === "" || taskDescription === "" || taskDuration === "") {
      const data = {
        recommendations,
        notes: session_notes,
        rating: rate1,
        say_something: session_about,
        id: sessionId,
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
            // window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  const toggleWhenOpen =()=>{
    setState({
      ...state,
      accordionisopen:state.accordionisopen?false:true
    })
  }

  console.log(session_email);
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav bookedsession={true} />
        <Row>
          <SideBarCounsellorDashboard bookedsession={true} />
          <Col md={10} sm={12} className="prm newprm1">
            <CounsellorDashboardNav title="Booked Sessions" />
            <Row className="wrapc222">
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="Summary of all the booked sessions" />
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
                        <div className="cfive">
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
                    {counsellorData.map((data, i) => (
                      <div className="msgs teammembr booked bookedover sessioncard" key={i}>
                        <div className="fromerit summary">
                          <div className="cone sesscard1">
                            <img
                              className="user_image"
                              src={userimg1}
                              alt="user image"
                            />
                          </div>
                          <div className="ctwo sesscard2">
                            <div>
                              <div className="lowerr nulower counlowerr">
                                Name
                              </div>
                              <div className="userrdet1 det1">{data.name}</div>
                              <div className="userrdet2 memb">{data.email}</div>
                            </div>
                          </div>
                          <div className="cthree sesscard3">
                            <div className="lowerr nulower counlowerr">
                              Date
                            </div>
                            <div>{formatTime(data.date)}</div>
                          </div>
                          <div className="cfour sesscard4">
                            <div className="lowerr nulower counlowerr">
                              Time
                            </div>
                            <div className="">{data.time}</div>
                          </div>
                          <div className="cfive sesscard5">
                            <div className="clarity12b sesstype">{data.member_type}</div>
                          </div>

                          <div className="csix sesscard6">
                            
                            <span
                              className={
                                !data.status ? "pend pltd sessstat" : "complt pltd sessstat"
                              }
                            >
                              {!data.status ? "Pending" : "Completed"}
                            </span>
                          </div>

                          <div className="cseven sesscard7">
                            <div
                              className="counview sessbtn"
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
          <h6>{name}</h6>
          <span className="modal-btn">
            <a href={`/counsellor/result/${session_email}`} target="blank">
              View users result <i className="fa fa-arrow-right"></i>
            </a>
          </span>
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
          <form>
            <label>Take down notes during sessions</label>
            <textarea
              className="issues-textbox-1 form-control"
              placeholder="scribble down anything"
              cols={80}
              rows={3}
              name="session_notes"
              value={session_notes}
              disabled={completedStatus ? true : false}
              onChange={inputChangeHandler}
            />
          </form>
          {!completedStatus && (
            <Accordion defaultActiveKey="" className="councld1">
              <div className="councld11">
                <Accordion.Toggle
                  as={Card.Header}
                  className="hpadd"
                  eventKey="5"
                  onClick={toggleWhenOpen}
                >
                  <p className="to-do-header councld councld1as">
                    {" "}
                    <span>Add Task</span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Toggle as={Card.Header} eventKey="5"
                  onClick={toggleWhenOpen}
                >
                  <span className="tododw">
                    {
                      state.accordionisopen ? (
                        <img src={expand}  onClick={toggleWhenOpen} className="expand11" alt="expand" />
                      )
                      :
                      (
                        <img src={isopen}  onClick={toggleWhenOpen} className="expand11" alt="expanded"/>
                      )
                    }
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
                    <Row className="spacevet">
                      <Col md={12}>
                        <div className="taskcl">Nature of Task </div>
                        <Form.Control
                          as="select"
                          className="fmc todo-input text-decription"
                          name="nature_of_task"
                          onChange={inputChangeHandler}
                          placeholder="Select a tag to describe the task type"
                        >
                          {task_type.map((data, i) => (
                            <option
                              className="uii11"
                              value={data.request_name}
                              key={i}
                            >
                              {data.display_name}
                            </option>
                          ))}
                        </Form.Control>
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
                  onClick={toggleWhenOpen}
                  eventKey="5"
                >
                  <p className="to-do-header councld">
                    {" "}
                    <span>{data.title}</span>
                  </p>
                </Accordion.Toggle>
                <Accordion.Toggle as={Card.Header} eventKey="5">
                <span className="tododw">
                    {
                      state.accordionisopen ? (
                        <img src={expand}  onClick={toggleWhenOpen} className="expand11" alt="expand" />
                      )
                      :
                      (
                        <img src={isopen}  onClick={toggleWhenOpen} className="expand11" alt="expanded"/>
                      )
                    }
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
                        <Col md={6}>
                          <div className="whatdoudo">Nature of Task </div>
                          <Form.Control
                            as="select"
                            className="fmc jobr subhyt"
                            name="nature_of_task"
                            onChange={inputChangeHandler}
                            placeholder="Select a tag to describe the task type"
                          >
                            {task_type.map((data, i) => (
                              <option
                                className="uii11"
                                value={data.request_name}
                                key={i}
                              >
                                {data.display_name}
                              </option>
                            ))}
                          </Form.Control>
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
            <Link to="counsellorbookings">
              <span
                className="modal-btn"
                onClick={() =>
                  completedStatus
                    ? notify("Session closed")
                    : complete_session()
                }
              >
                {completedStatus ? "Session Closed" : " Close session"}{" "}
                <i className="fa fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </Container>
      </Modal>
    </>
  );
};
export default CounsellorBookedSessions;
