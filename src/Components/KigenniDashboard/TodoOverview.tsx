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

const TodoOverview = () => {
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
                            <div className="mmber1">80</div>
                          </div>
                        </div>
                        <div className="firstoffour">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Task Completed</div>
                            <div className="mmber1">80</div>
                          </div>
                        </div>
                        <div className="firstoffour">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Task Pending</div>
                            <div className="mmber1">80</div>
                          </div>
                        </div>
                        <div className="firstoffour">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Tasks Not Started</div>
                            <div className="mmber1">8</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="greenbgcont">
                        <img src={greengood} className="greengood" alt="goodimage"/>
                        It Takes alot of Hero to even start a task, But seems
                        you have super powers. Keep going Champ!!!
                    </div>
                    <div className="wrapc2">
                      <div className="userimg22">
                        {/* <img src={userimg} className="userimg" alt="userimg" /> */}
                      </div>
                      <div className="cname">
                        <div>Jayeola Jones</div>
                        <div className="cemail1">jaye@user.com</div>
                      </div>
                      <div className="cdate">2 weeks</div>
                      <div className="ctime">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus">Completed</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn">View</div>
                      </div>
                    </div>
                    <div className="wrapc2">
                      <div className="userimg22">
                        {/* <img src={userimg} className="userimg" alt="userimg" /> */}
                      </div>
                      <div className="cname">
                        <div>Jayeola Jones</div>
                        <div className="cemail1">jaye@user.com</div>
                      </div>
                      <div className="cdate">2 weeks</div>
                      <div className="ctime">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus pending">Pending</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn">View</div>
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
};
export default TodoOverview;
