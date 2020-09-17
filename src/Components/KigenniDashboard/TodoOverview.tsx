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
import { Link } from "react-router-dom";
const moment = require("moment");

const TodoOverview = withRouter((props: any) => {
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
  console.log(tasklist);
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
                            <div className="mmber1">{user?.pending_tasks}</div>
                          </div>
                        </div>
                        <div className="firstoffour">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Task Pending</div>
                            <div className="mmber1">
                              {user?.completed_tasks}
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
                    <div className="cww">
                      <div className="cname tdw0">
                        <div className="cww11">Task Title</div>
                      </div>
                      <div className="cdate cww11 tdw1">Duration</div>
                      <div className="ctime cww11 tdw1">Time Created</div>
                      <div className="ctime cww11 tdw1 tdw1s ">Status</div>
                      <div className="ctime "></div>
                    </div>
                    {tasklist.splice(0,2).map((data, i) => (
                      <div className="wrapc2">
                        <div className="userimg22">
                          {/* <img src={userimg} className="userimg" alt="userimg" /> */}
                        </div>
                        <div className="cname tdw0">
                          <div className="eplimit">{data?.title}</div>
                        </div>
                        <div className="cdate tdw1">{data?.duration}</div>
                        <div className="ctime tdw1">
                          {formatTime(data?.date_created)}
                        </div>
                        <div className="cstatus2 tdw1">
                          <span
                            className={
                              data.status === "pending"
                                ? "cstatus pending"
                                : "cstatus"
                            }
                          >
                            {capitalizeFirstLetter(data.status)}
                          </span>
                        </div>
                        <div className="ctime">
                          <div className="savebtn">View More</div>
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
    </>
  );
});
export default TodoOverview;
