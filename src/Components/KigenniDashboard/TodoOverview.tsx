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
import noplan from "../../assets/notasks.png";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const moment = require("moment");

const TodoOverview = withRouter((props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    tasklist: [],
    alltask: [],
    successMsg: false,
    isLoading: false,
    isloading: false,
  });
  const [modalState, setModState] = useState<any>({
    selectedUserId: "",
    task_title: "",
    task_description: "",
    duration: "",
    title: "",
    viewmoreisOpen: false,
    description: "",
    success: false,
    add_note: "",
    isOpen: false,
    id: 1,
    CreateTaskModalisOpen: false,
    frequency: "",
    startDate: "",
  });
  const { errorMessage, tasklist, user, success, alltask, isLoading } = state;
  React.useEffect(() => {
    const availableToken = localStorage.getItem("userToken");
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
              tasklist: [...res1.data.results].reverse(),
              alltask: [...res1.data.results].reverse(),
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
  const notify = (message: string) => toast(message, { containerId: "B" });
  const {
    task_title,
    task_description,
    task_duration,
    duration,
    viewmoreisOpen,
    title,
    description,
    isloading,
    isOpen,
    id,
    CreateTaskModalisOpen,
    frequency,
    startDate,
  } = modalState;
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
  const OpenIscompleteModal = (x: any) => {
    setModState({
      ...modalState,
      isOpen: true,
      id: x,
    });
    getTaskdetails();
  };
  const closeModalCreateTaskModal = () => {
    setModState({
      ...modalState,
      CreateTaskModalisOpen: false,
      success: false,
    });
  };
  const formatTime = (date) => {
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  };
  const onchange = (e: any) => {
    setModState({
      ...modalState,
      [e.target.name]: e.target.value,
    });
  };
  const closeModalForCompleteTask = () => {
    setModState({
      ...modalState,
      isOpen: false,
    });
    window.location.reload();
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
  const createNewTask = () => {
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
        setFormState({
          ...state,
          success: true,
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
        console.log(err.response);
        notify("Failed to send");
      });
  };
  const submitTaskIsCompleteForm = () => {
    setFormState({
      ...state,
      isloading: true,
    });
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
        notify("Successful");
        setModState({
          ...modalState,
          success: true,
        });
        setFormState({
          ...state,
          isloading: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setFormState({
          ...state,
          errorMessage: "Server Error",
          isloading: false,
        });
      });
  };
  console.log(alltask);
  return (
    <>
      <Container fluid={true} className="contann122">
        <DashboardNav todo={true} />
        <Row>
          <SideBarNewDashboard todo={true} />
          <Col md={10} sm={12} className="prm newprm">
            <DashboardLargeScreenNav title="Todo Overview" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardUsernameheader welcomeText=" Welcome to your Todo sections" />
                <Row>
                  <Col md={12}>
                    <div className="wwrap">
                      <div className="fourinfo hidinsmall">
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
                            <div className="mmber1">
                              {user?.completed_tasks}
                            </div>
                          </div>
                        </div>
                        <div className="firstoffour">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Task Pending</div>
                            <div className="mmber1">{user?.pending_tasks}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mobilefour">
                      <Carousel
                        additionalTransfrom={0}
                        arrows={false}
                        autoPlay={true}
                        autoPlaySpeed={7000}
                        centerMode={false}
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite={true}
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderDotsOutside={false}
                        responsive={{
                          desktop: {
                            breakpoint: {
                              max: 3000,
                              min: 1024,
                            },
                            items: 1,
                            paritialVisibilityGutter: 40,
                          },
                          mobile: {
                            breakpoint: {
                              max: 710,
                              min: 0,
                            },
                            items: 1,
                            paritialVisibilityGutter: 30,
                          },
                          tablet: {
                            breakpoint: {
                              max: 1024,
                              min: 710,
                            },
                            items: 2,
                            paritialVisibilityGutter: 30,
                          },
                        }}
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                        className="center-changed"
                      >
                        <div className="firstoffour mobileviewtodo">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Total Tasks </div>
                            <div className="mmber1">{user?.total_tasks}</div>
                          </div>
                        </div>
                        <div className="firstoffour mobileviewtodo">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Task Completed</div>
                            <div className="mmber1">
                              {user?.completed_tasks}
                            </div>
                          </div>
                        </div>
                        <div className="firstoffour mobileviewtodo">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Task Pending</div>
                            <div className="mmber1">{user?.pending_tasks}</div>
                          </div>
                        </div>
                      </Carousel>
                    </div>
                    <div className="greenbgcont newgrnbg">
                      <img
                        src={greengood}
                        className="greengood"
                        alt="goodimage"
                      />
                      It takes a hero to even start a task, but it seems like
                      you have super powers. Keep going Champ!!!
                    </div>
                    <div className="wrapline"></div>
                    {tasklist.length > 0 && (
                      <div className="cww task_table newtt">
                        <div className="cname tdw0 nuname">
                          <div className="cww11 task_title">Task Title</div>
                        </div>
                        <div className="cdate cww11 tdw1 task_duration newdur">
                          Duration
                        </div>
                        <div className="ctime cww11 tdw1 task_time nudate">
                          Date Created
                        </div>
                        <div className="ctime cww11 tdw1 tdw1s task_status">
                          Status
                        </div>
                        <div className="ctime "></div>
                      </div>
                    )}
                    {tasklist.splice(0, 2).map((data, i) => (
                      <div className="wrapc2 tasklist listit newseccards">
                        <div className="cname tdw0 titl newtitl cardsec2">
                          <span className="task_title lowerr todominittl">Task Title</span>
                          <div className="eplimit cname todo_name txtfont">
                            {data?.title}
                          </div>
                        </div>

                        <div className="weeks cardsec3">
                          <span className="task_duration lowerr todominittl">Duration</span>
                          <div className="cdate tdw1 todo_date tododurr txtfont">
                            {data?.duration}
                          </div>
                        </div>

                        <div className="durr cardsec4">
                          <span className="task_time lowerr todominittl tododate">Date Created</span>
                          <div className="ctime tdw1 todo_time tododate1 txtfont">
                            {formatTime(data?.date_created)}
                          </div>
                        </div>

                        <div className="cstatus2 tdw1 stat cardsec1">
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
                          {data.status !== "pending" && (
                            <div
                              className="savebtn todo_button sizedtodobtn"
                              onClick={() => openViewMoreModal(data.id)}
                            >
                              View More
                            </div>
                          )}
                          {data.status !== "completed" && (
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
                    {alltask.length === 0 && (
                      <div className="norec newnorec">
                        <img
                          src={noplan}
                          className="norecommendations"
                          alt="norecommendations"
                        />
                        <div className="udont">
                          You currently do not have any tasks created
                        </div>
                        <div
                          className="noplancreate"
                          onClick={() => {
                            setModState({
                              ...modalState,
                              CreateTaskModalisOpen: true,
                            });
                          }}
                        >
                          Create New Task
                        </div>
                      </div>
                    )}
                    {alltask.length && (
                      <Link to="/todolist">
                        <div className="viewall">View all Task</div>
                      </Link>
                    )}
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
            Task completed
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
          <div className="request_input"></div>
          <div className="mark_complete">
            <div
              className="savebtn todo_button markit"
              onClick={submitTaskIsCompleteForm}
            >
              {isloading ? "Processing" : "Mark as Complete"}
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
                value={getTaskdetails()?.date_created}
                disabled={true}
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
              Create Task
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
});
export default TodoOverview;
