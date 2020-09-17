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
import DashboardNav from './DashboardNavBar';
import whiteplus from "../../assets/whiteplus.svg";
import yellowthumb from "../../assets/yellowthumb.svg";
import prevpage from "../../assets/prevpage.svg";
import nextpage from "../../assets/nextpage.svg";

const TodoList = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
      <DashboardNav ov={true} />
        <Row>
          <SideBarNewDashboard ov={true} />
          <Col md={10} sm={12} className="prm">
            <DashboardLargeScreenNav title="All Tasks" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <div className="begin">
                <DashboardUsernameheader welcomeText="View list of all available tasks"/>
                <span className="create_task">
                  Create New Task
                  <img className="create" src={whiteplus} alt="create new task" />
                </span>
                </div>
                <Row>
                  <Col md={11}>
                    <div className="yellowbg">
                        <img src={yellowthumb} className="yellowgood" alt="goodimage"/>
                        It takes alot of heroes to even start a task, but it seems like
                        you have super powers. Keep going Champ!!!
                    </div>
                    <div className="task_table">
                        <span className="task_title">Task Title</span>
                        <span className="task_duration">Duration</span>
                        <span className="task_time">Time Created</span>
                        <span className="task_status">Status</span>
                      </div>
                    <div className="wrapc2 tasklist">
                      <div className="cname todo_name">Set Up LinkedIn Profile...</div>
                      <div className="cdate todo_date">2 weeks</div>
                      <div className="ctime todo_time">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus todo_status">Completed</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn todo_button">View More</div>
                      </div>
                    </div>
                    <div className="wrapc2 tasklist">
                      <div className="cname todo_name">Finish udemy tutorial on...</div>
                      <div className="cdate todo_date">2 weeks</div>
                      <div className="ctime todo_time">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus todo_status pending">Pending</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn todo_button">Complete Task</div>
                      </div>
                    </div>
                    <div className="wrapc2 tasklist">
                      <div className="cname todo_name">Start new Javascript Cour...</div>
                      <div className="cdate todo_date">2 weeks</div>
                      <div className="ctime todo_time">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus todo_status pending">Pending</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn todo_button">Complete Task</div>
                      </div>
                    </div>
                    <div className="wrapc2 tasklist">
                      <div className="cname todo_name">Start new Javascript Cour....</div>
                      <div className="cdate todo_date">2 weeks</div>
                      <div className="ctime todo_time">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus todo_status pending">Pending</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn todo_button">Complete Task</div>
                      </div>
                    </div>
                    <div className="wrapc2 tasklist">
                      <div className="cname todo_name">Start new Javascript Cour...</div>
                      <div className="cdate todo_date">2 weeks</div>
                      <div className="ctime todo_time">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus todo_status pending">Pending</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn todo_button">Complete Task</div>
                      </div>
                    </div>
                    <div className="next_page">
                      <div>Displaying <span className="page_num">6</span> out of <span className="page_num">100</span></div>
                      <div>
                        <img className="page_change" src={prevpage} alt="previous page"/>
                        <img className="page_change" src={nextpage} alt="next page"/>
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
