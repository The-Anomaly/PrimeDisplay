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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewMoreModal from "./ViewMoreModal";
import noplan from "../../assets/noplan.png";
import { Spinner } from "react-bootstrap";
import logoutImage from "../../assets/logout.png";
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
    showratemodal: true,
    count: "",
    success: "",
    isloading: false,
    iscreating: false,
    total_pages: "",
  });
  const [modalState, setModState] = useState<any>({
    selectedUserId: "",
    task_title: "",
    task_description: "",
    duration: "",
    title: "",
    description: "",
    add_note: "",
    frequency: "",
    startDate: "",
    isOpen: false,
    id: 1,
    viewmoreisOpen: false,
    CreateTaskModalisOpen: false,
  });
  const [ConfirmationState, setConfirmationState] = React.useState({
    confirmationModal: false,
  });

  const closeConfirmationModal = () => {
    setConfirmationState({
      ...ConfirmationState,
      confirmationModal: false,
    });
  };
  const openConfirmationModal = () => {
    setConfirmationState({
      ...ConfirmationState,
      confirmationModal: true,
    });
  };
  const { confirmationModal } = ConfirmationState;

  const {
    errorMessage,
    tasklist,
    nextLink,
    prevLink,
    iscreating,
    reason,
    isloading,
    success,
  } = state;
  const {
    task_title,
    task_description,
    viewmoreisOpen,
    startDate,
    frequency,
    duration,
    title,
    description,
    add_note,
    rate,
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
    const availableToken = localStorage.getItem("userToken");
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
        notify("Successful");
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
    setFormState({
      ...state,
      iscreating: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {
      title,
      description,
      duration: Number(duration),
      start_date: startDate,
      reminder_frequency: frequency,
    };
    Axios.post<any, AxiosResponse<any>>(`${API}/dashboard/todo`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        window.scrollTo(-0, -0);
        setFormState({
          ...state,
          success: true,
          iscreating: false,
        });
        setTimeout(() => {
          setFormState({
            ...state,
            CreateTaskModalisOpen: false,
          });
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        // console.log(err.response);
        notify("Failed to send");
        setFormState({
          ...state,
          iscreating: false,
        });
      });
  };
  const notify = (message: string) => toast(message, { containerId: "i" });
  React.useEffect(() => {
    const availableToken = localStorage.getItem("userToken");
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
          // console.log(res);
          if (res.status === 200) {
            setFormState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              tasklist: [...res1.data.results].reverse(),
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
  const LoadOldData = () => {
    setFormState({
      ...state,
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
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
          count: res.data.page,
          nextLink: res.data.next,
          prevLink: res.data.previous,
          isloading: false,
        });
      })
      .catch((err) => {
        setFormState({
          ...state,
          isloading: false,
        });
        if (err?.status === 401) {
          props.history.push("/signin");
        }
      });
  };
  const LoadNewData = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    setFormState({
      ...state,
      isloading: true,
    });
    Axios.get<any, AxiosResponse<any>>(`${nextLink}`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        setFormState({
          ...state,
          tasklist: [...res.data.results],
          count: res.data.page,
          nextLink: res.data.next,
          prevLink: res.data.previous,
          isloading: false,
        });
      })
      .catch((err) => {
        setFormState({
          ...state,
          isloading: false,
        });
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
          <Col md={10} sm={12} className="prm newprm">
            <DashboardLargeScreenNav title="All Tasks" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <div className="begin task-name">
                  <DashboardUsernameheader welcomeText="" />
                  <span
                    className="create_task task-create"
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
                <div className="task-welcome">
                  Dreams are great but what is greater is an action plan that
                  gets you started. <br /> Define a road map for your career
                  growth, create tasks that lead you to the ultimate
                  destination.
                </div>

                <Row>
                  <Col md={12}>
                    {tasklist.length > 0 && (
                      <div className="yellowbg">
                        <img
                          src={yellowthumb}
                          className="yellowgood newgrnbg"
                          alt="goodimage"
                        />
                        It takes a hero to even start a task, but it seems like
                        you have super powers. Keep going Champ!!!
                      </div>
                    )}
                    {tasklist.length > 0 && (
                      <div className="task_table">
                        <span className="task_title">Task Title</span>
                        <span className="task_duration">Duration</span>
                        <span className="task_time">Date Created</span>
                        <span className="task_status">Status</span>
                      </div>
                    )}
                    {tasklist.length !== 0 &&
                      tasklist.map((data, i) => (
                        <div className="wrapc2 tasklist newseccards" key={i}>
                          <div className="titl cardsec2">
                            <span className="task_title lowerr todominittl">
                              Task Title
                            </span>
                            <div className="cname todo_name txtfont">
                              {data?.title}
                            </div>
                          </div>

                          <div className="weeks cardsec3">
                            <span className="task_duration lowerr todominittl">
                              Duration
                            </span>
                            <div className="cdate todo_date tododurr txtfont">
                              {data?.duration}
                              {data.duration === 1 ? " day" : " days"}
                            </div>
                          </div>

                          <div className="durr cardsec4">
                            <span className="task_time lowerr todominittl tododate">
                              Date Created
                            </span>
                            <div className="ctime todo_time txtfont">
                              {formatTime(data?.date_created)}
                            </div>
                          </div>
                          <div className="cstatus2 stat cardsec1">
                            <span
                              className={
                                data.status === "pending"
                                  ? "cstatus todo_status pending cardsec1txt"
                                  : "cstatus todo_status cardsec1txt"
                              }
                            >
                              {capitalizeFirstLetter(data.status)}
                            </span>
                          </div>
                          <div className="ctime todoo cardsec5">
                            {data.status !== "pending" ? (
                              <div
                                className="savebtn todo_button sizedtodobtn"
                                onClick={() => openViewMoreModal(data.id)}
                              >
                                View More
                              </div>
                            ) : (
                              <div
                                className="savebtn todo_button sizedtodobtn"
                                onClick={() => OpenIscompleteModal(data.id)}
                              >
                                Complete Task
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    {tasklist.length === 0 && (
                      <div className="norec">
                        <img
                          src={noplan}
                          className="norecommendations norecommendations1"
                          alt="norecommendations"
                        />
                        <div className="udont1">Opps!!!</div>
                        <div className="udont">
                          You have not created any todos
                        </div>
                      </div>
                    )}
                    <div className="next_page">
                      {tasklist.length > 0 && (
                        <div>
                          Displaying{" "}
                          <span className="page_num">{state.count}</span> out of{" "}
                          <span className="page_num">{state.total_pages}</span>
                        </div>
                      )}
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
                        {isloading && (
                          <Spinner variant={"info"} animation="grow" />
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
        className="modcomplete fixmodal"
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
              placeholder="Enter a Task title"
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Description</div>
            <textarea
              className="task_det"
              name="task_description"
              disabled={true}
              placeholder="Enter a Task Description"
              value={getTaskdetails()?.description}
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Task Duration (days)</div>
            <textarea
              className="note_det"
              placeholder="Enter number of days"
              name="add_note"
              disabled={true}
              value={getTaskdetails()?.duration}
            />
          </div>

          <div className="request_input"></div>
          <div className="mark_complete">
            <div
              className="savebtn todo_button markit"
              onClick={openConfirmationModal}
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
        className="modcomplete fixmodal"
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
          <div className="modal_det">
            <div className="titlee">Start Date</div>
            <input
              className="note_det create_det "
              type="date"
              placeholder="Enter start date"
              value={startDate}
              name={"startDate"}
              onChange={onchange}
            />
          </div>
          <div className="modal_det">
            <div className="titlee">Reminder Frequency(days)</div>
            <input
              type={"number"}
              className="note_det create_det "
              name="frequency"
              onChange={onchange}
              placeholder="Select how frequent you want to be reminded"
              value={getTaskdetails()?.frequency}
            />
          </div>
          <div className="mark_complete">
            <div
              className="savebtn todo_button markit createit"
              onClick={createNewTask}
            >
              {!iscreating ? "Create Task" : "Creating..."}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={viewmoreisOpen}
        className="modcomplete fixmodal"
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
                className="date_info date_infoq"
                type="date"
                disabled={true}
                value={getTaskdetails()?.date_created}
                name="date created"
              />
            </div>
            <div className="date_section sec1">
              <div className="titlee">Date Completed</div>
              <input
                className="date_info date_infoq"
                type="date"
                disabled={true}
                value={getTaskdetails()?.date_completed}
                name="date completed"
              />
            </div>
          </div>
          {/* <div className="modal_det">
            <div className="titlee">Counselor's Input</div>
            <textarea className="task_det" disabled={true}></textarea>
          </div> */}
        </Modal.Body>
      </Modal>
      <Modal
        show={confirmationModal}
        className="warning22e"
        centered={true}
        onHide={closeConfirmationModal}
      >
        <Modal.Body>
          {/* <div className="text-center">
            {" "}
            <img src={logoutImage} className="popUUp" alt="failedNotice" />{" "}
          </div> */}
          <div className="areusure1">
            are you sure you want to <b> do this?</b>
          </div>
          <div className="text-center planupgrade">
            <div
              className="retaketest upss1 planupgradebtn mddd"
              onClick={closeConfirmationModal}
            >
              Go Back
            </div>
            <div
              className="retaketest upss1 planupgradebtn mddd2"
              onClick={submitTaskIsCompleteForm}
            >
              Continue
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer
        enableMultiContainer
        containerId={"i"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};
export default TodoList;
