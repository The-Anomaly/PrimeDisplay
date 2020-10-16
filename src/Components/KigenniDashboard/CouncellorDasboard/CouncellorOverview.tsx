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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import preloader from "../../../assets/preloader2.gif";
import StarRatingComponent from "react-star-rating-component";
import { Modal } from "react-bootstrap";
import book from "../../../assets/book.svg";
const moment = require("moment");

const CounsellorOverview = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    counsellorData: [],
    successMsg: false,
    isLoading: false,
    count: "",
    isOpen: false,
    success: "",
    user_issues: "",
    sessionId: "",
    recommendations: [],
    taskTitle: "",
    taskDuration: "",
    taskDescription: "",
    session_notes: "",
    session_about: "",
    rate1: 0,
  });
  const {
    user,
    rate1,
    counsellorData,
    user_issues,
    taskTitle,
    taskDuration,
    recommendations,
    taskDescription,
    session_notes,
    session_about,
    name,
    sessionId,
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
              user: [...res1.data.results].reverse(),
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
  const openModal = (id) => {
    console.log(user);
    user.forEach((data) => {
      console.log(data);
      if (data.id === id) {
        setFormState({
          ...state,
          name: data.name,
          isOpen: true,
          sessionId: data.id,
          user_issues: data.user_vent,
        });
      }
    });
  };
  const closeModal = () => {
    setFormState({
      ...state,
      isOpen: false,
    });
  };
  const onStarClick = (nextValue, prevValue, name) => {
    setFormState({
      ...state,
      [name]: nextValue.toString(),
    });
  };
  const formatTime = (date) => {
    const dateTime = moment(date).format("MMM YYYY");
    return dateTime;
  };
  const inputChangeHandler = (e) => {
    setFormState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const deleteEntry = (id) => {
    const recommendation = recommendations;
    recommendation.splice(id, 1);
    setFormState({
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
    setFormState({
      ...state,
      recommendations: [...recommendations, ...recommendation],
      taskTitle: "",
      taskDuration: "",
      taskDescription: "",
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
    if (taskTitle == "" || taskDescription == "" || taskDuration == "") {
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
  const notify = (message: string) => toast(message, { containerId: "B" });
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
                    {counsellorData.splice(0, 2).map((data, i) => (
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
                    {counsellorData.length! > 0 && !isLoading && (
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
                  {/* <div className="box-1"></div>
                  <div className="box-2"></div> */}
                </section>
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
          <Link to="counsellorbookings">
            <span className="modal-btn">
              <a href="/counsellor/userinsight" target="blank">
                View users result <i className="fa fa-arrow-right"></i>
              </a>
            </span>
          </Link>

          <form>
            <label>issues raised by user</label>
            <textarea
              className="issues-textbox-1 form-control"
              name="user_issues"
              onChange={inputChangeHandler}
              value={user_issues}
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
                  value={taskTitle}
                  onChange={inputChangeHandler}
                  className="form-control todo-input"
                  size={25}
                />
              </Col>
              <Col md={6}>
                <label>
                  Task Duration <span className="dayss">(Days)</span>
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
                <label>Task Description</label>
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
                  <div className="course">
                    {data.duration == 1 ? "day" : "days"}
                  </div>
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
              value={session_notes}
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
              value={session_about}
              name="session_about"
              onChange={inputChangeHandler}
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
            <span className="modal-btn" onClick={complete_session}>
              Close session <i className="fa fa-arrow-right"></i>
            </span>
          </div>
        </Container>
      </Modal>
    </>
  );
};
export default CounsellorOverview;
