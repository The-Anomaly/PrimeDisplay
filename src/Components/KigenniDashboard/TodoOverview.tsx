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

const TodoOverview = withRouter((props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    successMsg: false,
    isLoading: false,
  });
  const { errorMessage, successMsg, user, isLoading } = state;
  React.useEffect(() => {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/tasks-summary`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          setFormState({
            ...state,
            user: response.data,
            successMsg: true,
            isLoading: false,
          });
        }
      })
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
  console.log(user);
  return (
    <>
      <Container fluid={true} className="contann122">
        <DashboardNav ov={true} />
        <Row>
          <SideBarNewDashboard ov={true} />
          <Col md={10} sm={12} className="prm">
            <DashboardLargeScreenNav title="Todo Overview" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardUsernameheader welcomeText=" Welcome to your Todo sections" />
                <Row>
                  <Col md={11}>
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
                            <div className="mmber1">{user?.completed_tasks}</div>
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
                      <div className="ctime cww11 tdw1">Status</div>
                      <div className="ctime "></div>
                    </div>
                    <div className="wrapc2">
                      <div className="userimg22">
                        {/* <img src={userimg} className="userimg" alt="userimg" /> */}
                      </div>
                      <div className="cname tdw0">
                        <div>Set Up LinkedIn Profile...</div>
                      </div>
                      <div className="cdate tdw1">2 weeks</div>
                      <div className="ctime tdw1">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2 tdw1">
                        <span className="cstatus">Completed</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn">View More</div>
                      </div>
                    </div>
                    <div className="wrapc2">
                      <div className="userimg22"></div>
                      <div className="cname">
                        <div>Set Up LinkedIn Profile...</div>
                      </div>
                      <div className="cdate">2 weeks</div>
                      <div className="ctime">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus pending">Pending</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn">Complete Task</div>
                      </div>
                    </div>
                    <div className="viewall">View all Task</div>
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
