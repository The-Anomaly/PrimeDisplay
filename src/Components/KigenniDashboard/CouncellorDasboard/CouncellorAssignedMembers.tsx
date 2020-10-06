import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";
import rightimg from "../../../assets/rightarrow.png";
import leftimg from "../../../assets/leftarrow1.png";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";

const CounsellorAssignedMembers = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard bookedsession={true}/>
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Assigned Members List" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="Summary of all the booked sessions" />
                <Row>
                  <Col md={11}>
                    <div className="yudd1">
                      Your next session is due tomorrow
                    </div>
                    {/* <div className="wrapc1">
                      <div className="cname1">Name</div>
                      <div className="cdate1">Date</div>
                      <div className="ctime1">Time</div>
                      <div className="ctime1">Member type</div>
                      <div className="cstatus1">Status</div>
                    </div> */}
                    <div className="wrapc2">
                      <div className="cname hhius">
                        <div className="userimg22">
                          <img
                            src={userimg}
                            className="userimg"
                            alt="userimg"
                          />
                        </div>
                        <div className="ssds1">
                          <div>Jayeola Jones</div>
                          <div className="cemail1">jaye@user.com</div>
                        </div>
                      </div>
                      <div className="cdate">July 20</div>
                      <div className="ctime">09:30 AM - 10:00 AM</div>
                      <div className="cdate">
                        <div className="clarity12b">Clarity</div>
                      </div>
                      <div className="cstatus2">
                        <span className="cstatus">Completed</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn ssoso">View</div>
                      </div>
                    </div>
                    <div className="wrapc2">
                      <div className="cname hhius">
                        <div className="userimg22">
                          <img
                            src={userimg}
                            className="userimg"
                            alt="userimg"
                          />
                        </div>
                        <div className="ssds1">
                          <div>Jayeola Jones</div>
                          <div className="cemail1">jaye@user.com</div>
                        </div>
                      </div>
                      <div className="cdate">July 20</div>
                      <div className="ctime">09:30 AM - 10:00 AM</div>
                      <div className="cdate">
                        <div className="clarity12b">Clarity</div>
                      </div>
                      <div className="cstatus2">
                        <span className="cstatus pending">Pending</span>
                      </div>
                      <div className="ctime">
                        <div className="savebtn ssoso">View</div>
                      </div>
                    </div>
                    <div className="dspl">
                      <span>Dispalying 6 out of 100</span>
                      <div>
                        <img src={leftimg} className="leftimg" alt="leftimg" />
                        <img
                          src={rightimg}
                          className="rightimg"
                          alt="leftimg"
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
export default CounsellorAssignedMembers;
