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
import Modal from "react-bootstrap/Modal";
import "./todomodal.css";
import Alert from "react-bootstrap/Alert";
import close from "../../assets/close.svg";
import { useState } from "react";
import ViewMoreModal from "./ViewMoreModal";
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
    duration: "",
    title: "",
    description: "",
    add_note: "",
    isOpen: false,
    id: 1,
    viewmoreisOpen: false,
    CreateTaskModalisOpen: false,
  });
  const { errorMessage, tasklist, nextLink, prevLink, user, success } = state;
  const {
    task_title,
    task_description,
    viewmoreisOpen,
    duration,
    title,
    description,
    add_note,
    isOpen,
    id,
    CreateTaskModalisOpen,
  } = modalState;
  const closeModalForCompleteTask = () => {
    setModState({
      ...modalState,
      isOpen: false,
    });
  };
  const closeModalCreateTaskModal = () => {
    setModState({
      ...modalState,
      CreateTaskModalisOpen: false,
      success: false,
    });
  };
  const closeViewMoreModal = () => {
    setModState({
      ...modalState,
      viewmoreisOpen: false,
      success: false,
    });
  };
  const openViewMoreModal = (x: any) => {
    setModState({
      ...modalState,
      viewmoreisOpen: true,
      id: x,
    });
    getTaskdetails();
  };

  const onchange = (e: any) => {
    setModState({
      ...modalState,
      [e.target.name]: e.target.value,
    });
  };
  const OpenIscompleteModal = (x: any) => {
    setModState({
      ...modalState,
      isOpen: true,
      id: x,
    });
    getTaskdetails();
  };
  const submitTaskIsCompleteForm = () => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {
      id: parseInt(id),
    };
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/complete-task`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        setModState({
          ...modalState,
          success: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setFormState({
          ...state,
          errorMessage: "Server Error",
        });
      });
  };
  const createNewTask = () => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {
      title,
      description,
      duration,
    };
    Axios.post<any, AxiosResponse<any>>(`${API}/dashboard/todo`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        setFormState({
          ...state,
          success: true,
        });
        // setTimeout(closeModalForCompleteTask, 2000);
      })
      .catch((err) => {
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
        setFormState({
          ...state,
          tasklist: [...res.data.results],
          count: res.data.count,
          nextLink: res.data.next,
          prevLink: res.data.previous,
        });
      })
      .catch((err) => {
        if (err?.status === 401) {
          props.history.push("/signin");
        }
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
        setFormState({
          ...state,
          tasklist: [...res.data.results],
          count: res.data.count,
          nextLink: res.data.next,
          prevLink: res.data.previous,
        });
      })
      .catch((err) => {
        if (err?.status === 401) {
          props.history.push("/signin");
        }
      });
  };

  const formatTime = (date: any) => {
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  };
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getTaskdetails: any = () => {
    let result: any = {};
    tasklist.forEach((task, i) => {
      if (task.id == id) {
        result = task;
      }
    });
    return result;
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
                  <span
                    className="create_task"
                    onClick={() => {
                      setModState({
                        ...modalState,
                        CreateTaskModalisOpen: true,
                      });
                    }}
                  >
                    Create New Task
                    <img
                      className="create"
                      src={whiteplus}
                      alt="create new task"
                    />
                  </span>
                </div>
                <Row>
                  <Col md={12}>
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
                      <span className="task_time">Date Created</span>
                      <span className="task_status">Status</span>
                    </div>
                    {tasklist.length !== 0 && tasklist.map((data, i) => (
                      <div className="wrapc2 tasklist" key={i}>
                        <div className="titl">
                          <span className="task_title lowerr">Task Title</span>
                          <div className="cname todo_name">{data?.title}</div>
                        </div>

                        <div className="weeks">
                          <span className="task_duration lowerr">Duration</span>
                          <div className="cdate todo_date">
                            {data?.duration}
                            {(data.duration = 1 ? "week" : "weeks")}
                          </div>
                        </div>

                        <div className="durr">
                          <span className="task_time lowerr">Date Created</span>
                          <div className="ctime todo_time">
                            {formatTime(data?.date_created)}
                          </div>
                        </div>

                        <div className="cstatus2 stat">
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
                        <div className="ctime todoo">
                          {data.status !== "pending" ? (
                            <div
                              className="savebtn todo_button"
                              onClick={() => OpenIscompleteModal(data.id)}
                            >
                              View More
                            </div>
                          ) : (
                            <div
                              className="savebtn todo_button"
                              onClick={() => OpenIscompleteModal(data.id)}
                            >
                              Complete Task
                            </div>
                          )}
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
        onHide={closeModalForCompleteTask}
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
            <textarea
              className="task_det"
              name="title"
              disabled={true}
              value={getTaskdetails()?.title}
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Task Description</div>
            <textarea
              className="task_det"
              name="task_description"
              disabled={true}
              value={getTaskdetails()?.description}
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Note</div>
            <textarea
              className="note_det"
              placeholder="Extra Notes"
              name="add_note"
              disabled={true}
              value={getTaskdetails()?.notes}
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
      <Modal
        show={CreateTaskModalisOpen}
        centered={true}
        onHide={closeModalCreateTaskModal}
        className="modcomplete"
      >
        <Modal.Title className="modal_title create_title">
          Create Task
        </Modal.Title>
        {success && (
          <Alert variant={"info"} className="text-center">
            Created Task
          </Alert>
        )}
        <a className="close_view" onClick={closeModalCreateTaskModal}>
          <img className="closeview" src={close} alt="close" />
        </a>
        <Modal.Body className="create_body">
          <div className="modal_det">
            <div className="titlee">Task Title</div>
            <textarea
              className="note_det create_det"
              placeholder="Enter a Task Title"
              value={title}
              name={"title"}
              onChange={onchange}
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Description</div>
            <textarea
              className="note_det"
              placeholder="Enter a Task Description"
              value={description}
              name={"description"}
              onChange={onchange}
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Task Duration(Days)</div>
            <input
              className="note_det create_det "
              type="number"
              placeholder="Enter Duration "
              value={duration}
              name={"duration"}
              onChange={onchange}
            />
          </div>
          <div className="mark_complete">
            <div
              className="savebtn todo_button markit createit"
              onClick={createNewTask}
            >
              Create Task
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={viewmoreisOpen}
        className="modcomplete"
        centered={true}
        onHide={closeViewMoreModal}
      >
        <Modal.Title className="modal_title">Task Details</Modal.Title>
        <a className="close_view" onClick={closeViewMoreModal}>
          <img className="closeview" src={close} alt="close" />
        </a>
        <Modal.Body>
          <div className="modal_det">
            <div className="titlee">Task Title</div>
            <textarea
              className="task_det"
              disabled={true}
              value={getTaskdetails()?.title}
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Task Description</div>
            <textarea
              className="task_det"
              disabled={true}
              value={getTaskdetails()?.description}
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Notes</div>
            <textarea
              className="task_det"
              disabled={true}
              value={getTaskdetails()?.notes}
            />
          </div>
          <div className="date_det modal_det">
            <div className="date_section">
              <div className="titlee">Date Created</div>
              <input
                className="date_info"
                type="date"
                disabled={true}
                value={getTaskdetails()?.date_created}
                name="date created"
              />
            </div>
            <div className="date_section sec1">
              <div className="titlee">Date Completed</div>
              <input
                className="date_info"
                type="date"
                disabled={true}
                value={getTaskdetails()?.date_completed}
                name="date completed"
              />
            </div>
          </div>
          <div className="modal_det">
            <div className="titlee">Counselor's Input</div>
            <textarea className="task_det" disabled={true}></textarea>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TodoList;
