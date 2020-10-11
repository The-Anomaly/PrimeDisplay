import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg1 from "../../../assets/userimg1.png";
import "./councellor.css";
import { Link } from "react-router-dom";

const CounsellorOverview = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard ov={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Overview" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  rating={true}
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

                    <div className="msgs teammembr booked bookedover">
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
                            <div className="userrdet1 det1">JaiyeOla jones</div>
                            <div className="userrdet2 memb">jj@gmail.com</div>
                          </div>
                        </div>

                        <div className="cthree">
                          <div className="lowerr nulower counlowerr">Date</div>
                          <div>July 20</div>
                        </div>

                        <div className="cfour">
                          <div className="lowerr nulower counlowerr">Time</div>
                          <div className="">09:30 AM - 10:00 AM</div>
                        </div>

                        <div className="cfive">
                          <div className="lowerr nulower counlowerr">
                            Member Type
                          </div>
                          <div className="clarity12b">clarity</div>
                        </div>

                        <div className="csix">
                          <div className="lowerr nulower sess counstat counlowerr">
                            Status
                          </div>
                          <span className="complt pltd">Completed</span>
                        </div>

                        <div className="cseven">
                          <div className="counview">View</div>
                        </div>
                      </div>
                    </div>

                    <div className="msgs teammembr booked bookedover">
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
                            <div className="userrdet1 det1">JaiyeOla jones</div>
                            <div className="userrdet2 memb">jj@gmail.com</div>
                          </div>
                        </div>

                        <div className="cthree">
                          <div className="lowerr nulower counlowerr">Date</div>
                          <div>July 20</div>
                        </div>

                        <div className="cfour">
                          <div className="lowerr nulower counlowerr">Time</div>
                          <div className="">09:30 AM - 10:00 AM</div>
                        </div>

                        <div className="cfive">
                          <div className="lowerr nulower counlowerr">
                            Member Type
                          </div>
                          <div className="clarity12b">clarity</div>
                        </div>

                        <div className="csix">
                          <div className="lowerr nulower sess counstat counlowerr">
                            Status
                          </div>
                          <span className="pend pltd">Pending</span>
                        </div>

                        <div className="cseven">
                          <div className="counview">View</div>
                        </div>
                      </div>
                    </div>
                    <Link className="viewall viewbook" to="/counsellorbookings">View all Booked Sessions</Link>
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
