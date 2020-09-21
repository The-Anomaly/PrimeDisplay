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
import { withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Modal from "react-bootstrap/Modal";
import "./todomodal.css";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import close from "../../assets/close.svg";
import { useState } from "react";
const moment = require("moment");

const TodoOverview = withRouter((props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    tasklist: [],
    alltask: [],
    successMsg: false,
    isLoading: false,
  });
  const [modalState, setModState] = useState<any>({
    selectedUserId: "",
    task_title: "",
    task_description: "",
    duration: "",
    title: "",
    description: "",
    success: false,
    add_note: "",
    isOpen: false,
    id: 1,
    CreateTaskModalisOpen: false,
  });
  const { errorMessage, tasklist, user, success, alltask, isLoading } = state;
  React.useEffect(() => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/tasks-summary`, {
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
              alltask: [...res1.data.results],
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
  const {
    task_title,
    task_description,
    task_duration,
    duration,
    title,
    description,
    add_note,
    isOpen,
    id,
    CreateTaskModalisOpen,
  } = modalState;
  const OpenIscompleteModal = (x: any) => {
    setModState({
      ...modalState,
      isOpen: true,
      id: x,
    });
    getTaskdetails();
  };
  const formatTime = (date) => {
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  };
  const closeModalForCompleteTask = () => {
    setModState({
      ...modalState,
      isOpen: false,
    });
    window.location.reload()
  };
  const getTaskdetails: any = () => {
    let result: any = {};
    alltask.forEach((task, i) => {
      if (task.id == id) {
        result = task;
      }
    });
    return result;
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
  return (
    <>
      <Container fluid={true} className="contann122">
        <DashboardNav todo={true} />
        <Row>
          <SideBarNewDashboard todo={true} />
          <Col md={10} sm={12} className="prm">
            <DashboardLargeScreenNav title="Todo Overview" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardUsernameheader welcomeText=" Welcome to your Todo sections" />
                <Row>
                  <Col md={12}>
                    <div className="wwrap">
                      <div className="fourinfo">
                        <div className="firstoffour">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Total Tasks </div>
                            <div className="mmber1">{user?.total_tasks}</div>
                          </div>
                        </div>
                        <div className="firstoffour">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Task Completed</div>
                            <div className="mmber1">{user?.completed_tasks}</div>
                          </div>
                        </div>
                        <div className="firstoffour">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Task Pending</div>
                            <div className="mmber1">
                              {user?.pending_tasks}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="greenbgcont">
                      <img
                        src={greengood}
                        className="greengood"
                        alt="goodimage"
                      />
                      It Takes alot of Hero to even start a task, But seems you
                      have super powers. Keep going Champ!!!
                    </div>
                    <div className="wrapline"></div>
                    <div className="cww task_table newtt">
                      <div className="cname tdw0 nuname">
                        <div className="cww11 task_title">Task Title</div>
                      </div>
                      <div className="cdate cww11 tdw1 task_duration newdur">Duration</div>
                      <div className="ctime cww11 tdw1 task_time nudate">Date Created</div>
                      <div className="ctime cww11 tdw1 tdw1s task_status">Status</div>
                      <div className="ctime "></div>
                    </div>
                    {tasklist.splice(0, 2).map((data, i) => (
                      <div className="wrapc2 tasklist listit">
                        <div className="cname tdw0 titl newtitl">
                        <span className="task_title lowerr">Task Title</span>
                          <div className="eplimit cname todo_name">{data?.title}</div>
                        </div>

                        <div className="weeks">
                        <span className="task_duration lowerr">Duration</span>
                        <div className="cdate tdw1 todo_date">{data?.duration}</div>
                        </div>

                        <div className="durr">
                        <span className="task_time lowerr">Date Created</span>
                        <div className="ctime tdw1 todo_time">
                          {formatTime(data?.date_created)}
                        </div>
                        </div>

                        
                        <div className="cstatus2 tdw1 stat">
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
                    <Link to="/todolist">
                      <div className="viewall">View all Task</div>
                    </Link>
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
    </>
  );
});
export default TodoOverview;
