import * as React from "react";
import "../kegennidashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg1 from "../../../assets/userimg1.png";
import "./councellor.css";
import prevpage from "../../../assets/prevpage.svg";
import nextpage from "../../../assets/nextpage.svg";
import Navbar from "./../../Home/HomeComponents/navbar";
import Footer from "./../../Home/HomeComponents/footer";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";

const CounsellorScheduledMeetings = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard counmeeting={true} />
          <Col md={10} sm={12} className="prm">
          <CounsellorDashboardNav title="Scheduled Meetings" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps sched">Scheduled Meetings</div>
                
                  <div className="teammembr teamheading meethead">
                    <div className="imagesec">{" "}</div>
                    <div className="memberdet">
                      <div>Name</div>
                    </div>
                    <div className="themarea">
                      <div>Date</div>
                    </div>
                    <div className="team">
                      <div>Time</div>
                    </div>
                    <div className="adminstat">
                      <div>Status</div>
                    </div>
                  </div>
                <div className="msgs teammembr schbod">
                  <div className="fromerit summary">
                    <div className="userr imagesec">
                      <img
                        className="user_image"
                        src={userimg1}
                        alt="user image"
                      />
                    </div>
                    <div className="memberdet">
                      <div>
                        <div className="lowerr nulower">Name</div>
                        <div className="userrdet1 det1">JaiyeOla jones</div>
                        <div className="userrdet2 memb">jj@gmail.com</div>
                      </div>
                    </div>
                    <div className="themarea schdate">
                      <div className="lowerr nulower">Date</div>
                      <div>July 20</div>
                    </div>
                    <div className="team schtime">
                      <div className="lowerr nulower">Time</div>
                      <div>09:30AM - 10:00AM</div>
                    </div>
                    <div className="adminstat schstat">
                      <span className="pend pltd">Pending</span>
                    </div>
                  </div>
                </div>
                <div className="msgs teammembr schbod">
                  <div className="fromerit summary">
                    <div className="userr imagesec">
                      <img
                        className="user_image"
                        src={userimg1}
                        alt="user image"
                      />
                    </div>
                    <div className="memberdet">
                      <div>
                        <div className="lowerr nulower">Name</div>
                        <div className="userrdet1 det1">JaiyeOla jones</div>
                        <div className="userrdet2 memb">jj@gmail.com</div>
                      </div>
                    </div>
                    <div className="themarea schdate">
                      <div className="lowerr nulower">Date</div>
                      <div>July 20</div>
                    </div>
                    <div className="team schtime">
                      <div className="lowerr nulower">Time</div>
                      <div>09:30AM - 10:00AM</div>
                    </div>
                    <div className="adminstat schstat">
                  <span className="complt pltd">Completed</span>
                </div>
                  </div>
                </div>
                

                <div className="next_page">
                    <div>
                      Displaying <span className="page_num">1</span>{" "}
                      out of <span className="page_num">6</span>
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
        {/* <Footer /> */}
      </Container>
    </>
  );
};
export default CounsellorScheduledMeetings;
