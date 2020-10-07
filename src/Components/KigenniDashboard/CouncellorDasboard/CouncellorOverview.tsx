import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";
import "./councellor.css";

const CounsellorOverview = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard ov={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Booked Sessions" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader rating={true} welcomeText="Find below an overview of all activities with clarity" />
                <Row>
                  <Col md={11}>
                    <div className="wwrap">
                      <div className="fourinfo">
                        <div className="firstoffour second221">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Members Assigned</div>
                            <div className="mmber1">80</div>
                          </div>
                        </div>
                        <div className="firstoffour second221">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Sessions Booked</div>
                            <div className="mmber1">80</div>
                          </div>
                        </div>
                        <div className="firstoffour second221">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Completed</div>
                            <div className="mmber1">80</div>
                          </div>
                        </div>
                        <div className="firstoffour second221">
                          <div className="fouri1"></div>
                          <div className="fouri1a">
                            <div className="mmber">Pending</div>
                            <div className="mmber1">8</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="yudd1">
                      Your next session is due tomorrow
                    </div>
                    <div className="wrapc2 wrapc222">
                      <div className="userimg22">
                        <img src={userimg} className="userimg" alt="userimg" />
                      </div>
                      <div className="cname">
                        <div>Jayeola Jones</div>
                        <div className="cemail1">jaye@user.com</div>
                      </div>
                      <div className="cdate">July 20</div>
                      <div className="ctime">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus">Completed</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn">View</div>
                      </div>
                    </div>
                    <div className="wrapc2 wrapc222">
                      <div className="userimg22">
                        <img src={userimg} className="userimg" alt="userimg" />
                      </div>
                      <div className="cname">
                        <div>Jayeola Jones</div>
                        <div className="cemail1">jaye@user.com</div>
                      </div>
                      <div className="cdate">July 20</div>
                      <div className="ctime">09:30 AM - 10:00 AM</div>
                      <div className="cstatus2">
                        <span className="cstatus pending">Pending</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn">View</div>
                      </div>
                    </div>
                    <div className="viewall">View all Booked Session</div>
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
export default CounsellorOverview;
