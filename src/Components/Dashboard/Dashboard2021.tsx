import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import SideBarNewDashboard from "./SideBarNewDashboard";
import DashboardNav from "./DashboardNavBar";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";
import "./overview.css";
import target from "../../assets/target.svg";
import avatar from "../../assets/avatar.svg";

class Dashboard2021 extends React.Component {
  render() {
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav overview={true} />
          <Row>
            <SideBarNewDashboard overview={true} />
            <Col md={10} sm={12} className="prm newprm">
              <DashboardLargeScreenNav title="Overview" />
              <Row>
                <Col md={12} className="kisls kisls22 ov-bg">
                    <div className="ov-sec">
                        <div className="ov-sec-1 ov-elements">
                            <div>
                                <h1>Welcome back, <strong>Jaiyeola!</strong></h1>
                                <p>
                                    You can always be everything you dream about
                                    it just take that extra step when you feel weary
                                    are you going to do that now?
                                </p>
                                <button>View Insight</button>
                            </div>
                            <img src={target} alt="" />
                        </div>
                        <div className="ov-sec-2 ov-elements">
                            <div className="ov-avatar">
                                <img src={avatar} />
                            </div>
                            <p className="ov-profile-name">Jaiyeola Jones</p>
                            <p className="ov-profile-descrip">Entrepreneur: Growing Business</p>
                            <div className="ov-profile-deets">
                                <p>Email</p>
                                <p>jayeolajones1234@gmail.com</p>
                            </div>
                            <div className="ov-profile-deets">
                                <p>Phone</p>
                                <p>+234 709 345 6789</p>
                            </div>
                            <div className="ov-profile-deets">
                                <p>Country</p>
                                <p>Nigeria</p>
                            </div>
                            <button>View your profile</button>
                        </div>
                        <div className="ov-sec-3 ov-elements">
                            <h2 className="ov-todo-ttl">Todo Tasks</h2>
                            <div className="ov-todo">
                                <p className="ov-todo-stat">Pending</p>
                                <div className="ov-task">
                                    <p className="ov-todo-sub-ttl">Task Title</p>
                                    <p className="ov-todo-sub-txt">Setup LinkedIn Profile</p>
                                </div>
                                <div className="ov-duration">
                                <p className="ov-todo-sub-ttl">Duration</p>
                                    <p className="ov-todo-sub-txt">10 Days</p>
                                </div>
                                <div className="ov-date">
                                <p className="ov-todo-sub-ttl">Time Created</p>
                                    <p className="ov-todo-sub-txt">July 20</p>
                                </div>
                            </div>
                            <div className="ov-todo">
                                <p className="ov-todo-stat">Pending</p>
                                <div className="ov-task">
                                    <p className="ov-todo-sub-ttl">Task Title</p>
                                    <p className="ov-todo-sub-txt">Setup LinkedIn Profile</p>
                                </div>
                                <div className="ov-duration">
                                <p className="ov-todo-sub-ttl">Duration</p>
                                    <p className="ov-todo-sub-txt">10 Days</p>
                                </div>
                                <div className="ov-date">
                                <p className="ov-todo-sub-ttl">Date Created</p>
                                    <p className="ov-todo-sub-txt">July 20</p>
                                </div>
                            </div>
                            <button className="ov-todo-btn">View all your tasks</button>
                        </div>
                        <div className="ov-sec-4 ov-elements">
                        <h2 className="ov-todo-ttl">Messages</h2>
                        <div className="ov-msg">
                            <img src={avatar} />
                            <div>
                                <p className="ov-msg-ttl">Solange Olatubosun</p>
                                <p className="ov-msg-txt">
                                    Thanks Dear, you have been a wonderful sister to me and 
                                    I really appreciate your help. Please accept this as a 
                                    show of gratitude
                                </p>
                            </div>
                        </div>
                        <div className="ov-msg">
                            <img src={avatar} />
                            <div>
                                <p className="ov-msg-ttl">Solange Olatubosun</p>
                                <p className="ov-msg-txt">
                                    Thanks Dear, you have been a wonderful sister to me and 
                                    I really appreciate your help. Please accept this as a 
                                    show of gratitude
                                </p>
                            </div>
                        </div>
                        <div className="ov-msg">
                            <img src={avatar} />
                            <div>
                                <p className="ov-msg-ttl">Solange Olatubosun</p>
                                <p className="ov-msg-txt">
                                    Thanks Dear, you have been a wonderful sister to me and 
                                    I really appreciate your help. Please accept this as a 
                                    show of gratitude
                                </p>
                            </div>
                        </div>
                        <div className="ov-msg">
                            <img src={avatar} />
                            <div>
                                <p className="ov-msg-ttl">Solange Olatubosun</p>
                                <p className="ov-msg-txt">
                                    Thanks Dear, you have been a wonderful sister to me and 
                                    I really appreciate your help. Please accept this as a 
                                    show of gratitude
                                </p>
                            </div>
                        </div>
                        <button className="ov-todo-btn">View all messages</button>
                        </div>
                        <div className="ov-sec-5 ov-elements">
                            <h2>Talk to a Counsellor</h2>
                            <div>
                                <p className="ov-book-ttl">You booked a session for</p>
                                <p className="ov-book-txt">23rd April 2021</p>
                                <p className="ov-book-txt">09:30 AM WAT</p>
                            </div>
                            <button className="ov-todo-btn">Ask a Counselor</button>
                        </div>
                    </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Dashboard2021;
