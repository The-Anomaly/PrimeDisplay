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
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const CounsellorBookedSessions = () => {
  const [state, setState] = useState({
    isOpen: true,
    user_issues: "",
    taskTitle: "",
    taskDuration:"",
    taskDescription: "",
    session_notes: "",
    session_about: ""
  });
  const { user_issues } = state; //state destructuring
  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };
  const inputChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    console.log([e.target.name]);
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard bookedsession={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Booked Sessions" />
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
      <Modal
        show={state.isOpen}
        size={"lg"}
        className="bookingszmodal"
        centered={true}
      >
        <Container>
          <h6>Jaiyeola Jones</h6>
          <Link to="counsellorbookings">
            <span className="modal-btn">
              View users result <i className="fa fa-arrow-right"></i>
            </span>
          </Link>

          <form>
            <label>issues raised by user</label>
            <textarea
              className="issues-textbox-1 form-control"
              name="user_issues"
              onChange={inputChangeHandler}
              placeholder="issues*"
              cols={80}
              rows={3}
            />
          </form>
          <p className="to-do-header">Create a Todo Task</p>
          <form className="to-do-form">
            <Row>
              <Col md={6}>
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="enter a title"
                  name="taskTitle"
                  onChange={inputChangeHandler}
                  className="form-control todo-input"
                  size={25}
                />
              </Col>
              <Col md={6}>
                <label>Task Duration</label>
                <input
                  type="text"
                  placeholder="Enter the number of days"
                  className="form-control todo-input"
                  name="taskDuration"
                  onChange={inputChangeHandler}
                  size={25}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <label>Task Description</label>
                <textarea
                  placeholder="Describe the nature of the task"
                  cols={67}
                  rows={3}
                  className="form-control text-decription"
                  name="taskDescription"
                  onChange={inputChangeHandler}
                />
              </Col>
            </Row>
          </form>
          <div className="addmore">
            <p>Add more &#43;</p>
          </div>
          <form>
            <label>Take down notes during sessions</label>
            <textarea
              className="issues-textbox-1 form-control"
              placeholder="scribble down anything"
              cols={80}
              rows={3}
              name="session_notes"
              onChange={inputChangeHandler}
            />
            <Row>
              <Col md={3}>
                <label>Rate this session</label>
              </Col>
              <Col md={5} className="star-container">
                <i className="fa fa-star ratings"></i>
                <span className="fa fa-star ratings"></span>
                <span className="fa fa-star ratings"></span>
                <span className="fa fa-star ratings"></span>
                <span className="fa fa-star ratings"></span>
              </Col>
            </Row>
            <textarea
              className="issues-textbox-1 form-control"
              placeholder="Say something about the session"
              cols={80}
              rows={3}
              name="session_about"
              onChange={inputChangeHandler}
            />
          </form>

          <div className="center-btn">
            {" "}
            <Link to="counsellorbookings">
              <span className="modal-btn">
                Close session <i className="fa fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </Container>
      </Modal>
    </>
  );
};
export default CounsellorBookedSessions;
