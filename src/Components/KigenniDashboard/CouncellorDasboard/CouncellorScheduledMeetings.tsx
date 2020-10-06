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

const CounsellorScheduledMeetings = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <Col md={10} sm={12} className="prm">
          <Navbar />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  searcharea={true}
                  welcomeText="Summary of all messages to and from members assigned to you"
                />
                  <div className="teammembr teamheading">
                    <div className="tname">
                      <div>Name</div>
                    </div>
                    <div className="tarea">
                      <div>Thematic Area</div>
                    </div>
                    <div className="tteam">
                      <div>Team</div>
                    </div>
                    <div className="tstatus">
                      <div>Assessment Status</div>
                    </div>
                  </div>
                <div className="msgs teammembr">
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
                    <div className="themarea">
                      <div className="lowerr nulower">Thematic Area</div>
                      <div>insert text</div>
                    </div>
                    <div className="team">
                      <div className="lowerr nulower">Team</div>
                      <div>insert text</div>
                    </div>
                    <div className="adminstat">
                      <div className="lowerr nulower sess">
                        Assessment Status
                      </div>
                      <span className="pend">Pending</span>
                    </div>
                    <div className="adminbtn">
                      <div className="sendIV viewit">View Profile</div>
                    </div>
                  </div>
                </div>

                <div className="adminstat">
                  <div className="lowerr nulower sess">Assessment Status</div>
                  <span className="complt">Complete</span>
                </div>

                <div className="adminbtn">
                  <div className={"sendIV viewit disabledview"}>
                    View Profile
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
        <Footer />
      </Container>
    </>
  );
};
export default CounsellorScheduledMeetings;
