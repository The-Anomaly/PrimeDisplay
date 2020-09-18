import * as React from "react";
import "./kegennidashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userimg from "../../assets/userimg.png";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";
import SideBarNewDashboard from "./SideBarNewDashboard";
import DashboardUsernameheader from "./DashboardUsernameheader";
import greengood from "../../assets/greengood.png";
import DashboardNav from "./DashboardNavBar";
import whiteplus from "../../assets/whiteplus.svg";
import yellowthumb from "../../assets/yellowthumb.svg";
import prevpage from "../../assets/prevpage.svg";
import nextpage from "../../assets/nextpage.svg";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./todomodal.css";
import Alert from "react-bootstrap/Alert";
import close from "../../assets/close.svg";
import { useState } from "react";
const moment = require("moment");

const TodoList = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    tasklist: [],
    successMsg: false,
    isLoading: false,
    nextLink: "",
    prevLink: "",
    count: "",
    success: "",
  });
  const [modalState, setModState] = useState<any>({
    selectedUserId: "",
    task_title: "",
    task_description: "",
    add_note: "",
    isOpen: false,
  });
  const { errorMessage, tasklist, nextLink, prevLink, user, success } = state;
  const { task_title, task_description, add_note, isOpen } = modalState;
  const closeModalForCompleteTask = () => {
    setModState({
      ...modalState,
      isOpen: false,
    });
  };
  const OpenIscompleteModal = (x) => {
    setModState({
      ...modalState,
      isOpen: true,
    });
    getTaskdetails(x);
  };
  const submitTaskIsCompleteForm = (id) => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {
      id,
    };
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/todo`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          success: true,
        });
        // setTimeout(closeModalForCompleteTask, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/todo`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/todo`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
          console.log(res1);
          console.log(res);
          if (res.status === 200) {
            setFormState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              tasklist: [...res1.data.results],
              count: res1.data.count,
              nextLink: res1.data.next,
              prevLink: res1.data.previous,
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
  const LoadOldData = () => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    Axios.get<any, AxiosResponse<any>>(`${prevLink}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          tasklist: res.data,
          count: res.data.count,
          nextLink: res.data.next,
          prevLink: res.data.previous,
        });
      })
      .catch((err) => {
        if (err?.status === 401) {
          props.history.push("/signin");
        }
        console.log(err);
      });
  };
  const LoadNewData = () => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    Axios.get<any, AxiosResponse<any>>(`${nextLink}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log(res);
        setFormState({
          ...state,
          tasklist: res.data,
          count: res.data.count,
          nextLink: res.data.next,
          prevLink: res.data.previous,
        });
      })
      .catch((err) => {
        if (err?.status === 401) {
          props.history.push("/signin");
        }
        console.log(err);
      });
  };

  const formatTime = (date) => {
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getTaskdetails = async (id: any | void) => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    console.log(id);
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/complete-task/${id}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(async (res) => {
        console.log(res);
        await setModState({
          ...modalState,
          isOpen: true,
          ...res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <DashboardNav todo={true} />
        <Row>
          <SideBarNewDashboard todo={true} />
          <Col md={10} sm={12} className="prm">
            <DashboardLargeScreenNav title="All Tasks" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <div className="begin">
                  <DashboardUsernameheader welcomeText="View list of all available tasks" />
                  <span className="create_task">
                    Create New Task
                    <img
                      className="create"
                      src={whiteplus}
                      alt="create new task"
                    />
                  </span>
                </div>
                <Row>
                  <Col md={11}>
                    <div className="yellowbg">
                      <img
                        src={yellowthumb}
                        className="yellowgood"
                        alt="goodimage"
                      />
                      It takes alot of heroes to even start a task, but it seems
                      like you have super powers. Keep going Champ!!!
                    </div>
                    <div className="task_table">
                      <span className="task_title">Task Title</span>
                      <span className="task_duration">Duration</span>
                      <span className="task_time">Time Created</span>
                      <span className="task_status">Status</span>
                    </div>
                    {tasklist.map((data, i) => (
                      <div className="wrapc2 tasklist" key={i}>
                        <div className="cname todo_name">{data?.title}</div>
                        <div className="cdate todo_date">
                          {data?.duration}
                          {data.duration == 1 ? " week" : " weeks"}
                        </div>
                        <div className="ctime todo_time">
                          {formatTime(data?.date_created)}
                        </div>
                        <div className="cstatus2">
                          <span
                            className={
                              data.status === "pending"
                                ? "cstatus todo_status pending"
                                : "cstatus todo_status"
                            }
                          >
                            {capitalizeFirstLetter(data.status)}
                          </span>
                        </div>
                        <div className="ctime">
                          <div
                            className="savebtn todo_button"
                            onClick={() => OpenIscompleteModal(data.id)}
                          >
                            Complete Task
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="next_page">
                      <div>
                        Displaying <span className="page_num">1</span> out of{" "}
                        <span className="page_num">{state.count}</span>
                      </div>
                      <div>
                        {prevLink && (
                          <img
                            className="page_change"
                            src={prevpage}
                            alt="previous page"
                            onClick={LoadOldData}
                          />
                        )}
                        {nextLink && (
                          <img
                            className="page_change"
                            src={nextpage}
                            onClick={LoadNewData}
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
        show={isOpen}
        className="modcomplete"
        centered={true}
        onEntering={getTaskdetails}
        onHide={closeModalForCompleteTask}
        backdrop="static"
      >
        <Modal.Title className="modal_title">Complete Task</Modal.Title>
        <div className="text-center">{errorMessage}</div>
        {success && (
          <Alert variant={"info"} className="text-center">
            Sent
          </Alert>
        )}
        <span className="close_view">
          <img
            className="closeview"
            onClick={closeModalForCompleteTask}
            src={close}
            alt="close"
          />
        </span>
        <Modal.Body>
          <div className="modal_det">
            <div className="titlee">Task Title</div>
            <textarea className="task_det" name="title">
              {task_title}
            </textarea>
          </div>
          <div className="modal_det">
            <div className="titlee">Task Description</div>
            <textarea className="task_det" name="task_description">
              {task_description}
            </textarea>
          </div>
          <div className="modal_det">
            <div className="titlee">Note</div>
            <textarea
              className="note_det"
              placeholder="Enter Extra Notes"
              name="add_note"
              value={add_note}
            />
          </div>
          <div className="request_input">
            <a className="request" href="#">
              Request Counselors Input
            </a>
          </div>
          <div className="mark_complete">
            <div
              className="savebtn todo_button markit"
              onClick={submitTaskIsCompleteForm}
            >
              Mark as Complete
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TodoList;
