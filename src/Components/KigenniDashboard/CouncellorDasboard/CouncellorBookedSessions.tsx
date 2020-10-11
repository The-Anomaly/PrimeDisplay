import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg1 from "../../../assets/userimg1.png";
import prevpage from "../../../assets/prevpage.svg";
import nextpage from "../../../assets/nextpage.svg";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";

const CounsellorBookedSessions = () => {
  const [state, setState] = useState({
    isOpen: false,
  });
  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard bookedsession={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Booked Sessions" />
            <Row className="wrapc222">
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="Summary of all the booked sessions" />
                <Row className="letss">
                  <Col md={12}>
                    <div className="teammembr teamheading counheading">
                      <div className="cone"> </div>
                      <div className="ctwo">
                        <div>Name</div>
                      </div>
                      <div className="cthree">
                        <div>Date</div>
                      </div>
                      <div className="cfour">
                        <div>Time</div>
                      </div>
                      <div className="cfive">
                        <div>Member Type</div>
                      </div>
                      <div className="csix">
                        <div>Status</div>
                      </div>
                      <div className="cseven"> </div>
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

                    <div className="next_page">
                      <div>
                        Displaying <span className="page_num">1</span> out of{" "}
                        <span className="page_num">6</span>
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
      <Modal show={state.isOpen} centered={true}>
        Insert text
      </Modal>
    </>
  );
};
export default CounsellorBookedSessions;
