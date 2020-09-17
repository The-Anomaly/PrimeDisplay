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
import CompleteTaskModal from "./CompleteTaskModal"
const moment = require("moment");

const TodoList = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    tasklist: [],
    successMsg: false,
    isLoading: false,
  });
  const { errorMessage, tasklist, user, isLoading } = state;
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
          console.log(res1);
          if (res.status === 200) {
            setFormState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              tasklist: [...res1.data.results],
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
    const dateTime = moment(date).format("Do MMM YYYY");
    return dateTime;
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <DashboardNav todo={true} />
        <CompleteTaskModal />
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
                          {(data.duration = 1 ? "week" : "weeks")}
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
                          <div className="savebtn todo_button">
                          <div onClick={CompleteTaskModal}>Complete Task</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="wrapc2 tasklist">
                      <div className="cname todo_name">
                        Start new Javascript Cour...
                      </div>
                      <div className="cdate todo_date">2 weeks</div>
                      <div className="ctime todo_time">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus todo_status pending">
                          Pending
                        </span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn todo_button">
                          <Link to="/completetask">Complete Task</Link>
                          </div>
                      </div>
                    </div>
                    <div className="next_page">
                      <div>
                        Displaying <span className="page_num">6</span> out of{" "}
                        <span className="page_num">100</span>
                      </div>
                      <div>
                        <img
                          className="page_change"
                          src={prevpage}
                          alt="previous page"
                        />
                        <img
                          className="page_change"
                          src={nextpage}
                          alt="next page"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default TodoList;
