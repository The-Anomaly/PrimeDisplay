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
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import notasks from "../../assets/notasks_overview.svg";
import nomsgs from "../../assets/nomessages_overview.svg";

interface State {
  fullname: string;
  email: string;
  phone: string;
  country: string;
  user_profile: string;
  usertasks: any;
  usermessages: any;
  usersession: any;
}
class Dashboard2021 extends React.Component {
    state: State = {
        fullname: "",
        email: "",
        phone: "",
        country: "",
        user_profile: "",
        usertasks: [],
        usermessages: [],
        usersession: [],
      };
      componentDidMount() { 
        const availableToken = localStorage.getItem("userToken");
        const token = availableToken
        ? JSON.parse(availableToken)
        : window.location.assign("/signin");
        this.getUserInfo(token);
        Axios.all([
            Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profile`, {
              headers: { Authorization: `Token ${token}` },
            }),
            Axios.get<any, AxiosResponse<any>>(`${API}/freedashboard`, {
                headers: { Authorization: `Token ${token}` },
            }),
            Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/todo`, {
              headers: { Authorization: `Token ${token}` },
            }),
            Axios.get<any, AxiosResponse<any>>(`${API}/user-session-list`, {
              headers: { Authorization: `Token ${token}` },
            }),
            Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
                headers: { Authorization: `Token ${token}` },
              }),
            // Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/get-chats`, {
            //     headers: { Authorization: `Token ${token}` },
            // }),
          ])
          .then(Axios.spread((res1, res2, res3, res4, res5) => {
            console.log(res1, res2, res3, res4, res5)
            if(res1.status === 200 && res2.status === 200 && res3.status === 200 && res4.status === 200 && res5.status === 200) {
                this.setState({
                    fullname: res1?.data?.first_name + " " + res1?.data?.last_name,
                    email: res1?.data?.email,
                    phone: res1?.data?.phone,
                    // country: res3?.data?.country,
                    user_profile: res2?.data[0]?.profile,
                    usertasks: [...res3.data.results].reverse().splice(0, 2),
                    usersession: [...res4.data.results]
                    // usermessages: [...res6.data.results].reverse().splice(0, 2),
                })
            }
          }))
          .catch(() => {})
      }
      getUserInfo = (token: string): any => {
        Axios.get(`${API}/currentuser`, {
          headers: { Authorization: `Token ${token}` },
        })
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem("user", JSON.stringify(response?.data));
            }
          })
          .catch((error) => {});
      };
      viewProfile = () => {
          if(this.state.phone === "" || this.state.country === "") {
            return window.location.assign("/dashboardsettings");
          }
          else { return window.location.assign("/profilebuilder")}
      }
      bookSession = () => {
          if(this.state.usersession.length > 0) {
            return window.location.assign("/allusermessages");
          }
          else {
            return window.location.assign("/allbookedsessions");
          }
      }
  render() {
    const {
        fullname,
        email,
        phone,
        country,
        user_profile,
        usertasks,
        usermessages,
        usersession,
      } = this.state;
      console.log(usersession)
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
                                    You can be anything you dream about, 
                                    all it takes is that extra step when you feel weary.
                                    Are you going to do that now?
                                </p>
                                <button>View Insight</button>
                            </div>
                            <img src={target} alt="" />
                        </div>
                        <div className="ov-sec-2 ov-elements">
                            <div className="ov-avatar">
                                <img src={avatar} />
                            </div>
                            <p className="ov-profile-name">{fullname}</p>
                            <p className="ov-profile-descrip">{user_profile ? user_profile : "--"}</p>
                            <div className="ov-profile-deets">
                                <p>Email</p>
                                <p>{email ? email : "--"}</p>
                            </div>
                            <div className="ov-profile-deets">
                                <p>Phone</p>
                                <p>{phone ? phone : "--"}</p>
                            </div>
                            <div className="ov-profile-deets">
                                <p>Country</p>
                                <p>{country ? country : "--"}</p>
                            </div>
                            <button onClick={this.viewProfile}>{(this.state.phone === "" || this.state.country === "") ? "Complete your profile" : "View your profile"}</button>
                        </div>
                        <div className="ov-sec-3 ov-elements">
                            <h2 className="ov-todo-ttl">Todo Tasks</h2>
                            {usertasks.length > 0 && usertasks.map((x, i) => (
                            <div className="ov-todo">
                                <p className={x.status === "pending" ? "ov-todo-stat" : "ov-todo-stat ov-todo-stat-green"}>{x.status === "pending" ? "Pending" : "Completed"}</p>
                                <div className="ov-task">
                                    <p className="ov-todo-sub-ttl">Task Title</p>
                                    <p className="ov-todo-sub-txt">{x.title}</p>
                                </div>
                                <div className="ov-duration">
                                <p className="ov-todo-sub-ttl">Duration</p>
                                    <p className="ov-todo-sub-txt">{x.duration} Days</p>
                                </div>
                                <div className="ov-date">
                                <p className="ov-todo-sub-ttl">Date Created</p>
                                    <p className="ov-todo-sub-txt">{x.date_created}</p>
                                </div>
                            </div>))}
                            {usertasks.length === 0 && (
                            <>
                            <div className="ov-notasks"><img src={notasks} alt="no tasks" /></div>
                            <p className="ov-notext">You do not have any pending task</p>
                            </>
                            )}
                            <button className="ov-todo-btn">View all your tasks</button>
                        </div>
                        <div className="ov-sec-4 ov-elements">
                        <h2 className="ov-todo-ttl">Messages</h2>
                        {/* <div className="ov-msg">
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
                        </div> */}
                        <div className="ov-nomsgs"><img src={nomsgs} alt="no messages" /></div>
                        <p className="ov-notext">You do not have any messages </p>
                        <button className="ov-todo-btn">View all messages</button>
                        </div>
                        <div className="ov-sec-5 ov-elements">
                            <h2>Talk to a Counsellor</h2>
                            <div>
                                {usersession.length > 0 && (
                                <>
                                <p className="ov-book-ttl">You booked a session for</p>
                                <p className="ov-book-txt">{usersession[0].date}</p>
                                <p className="ov-book-txt">{usersession[0].time}</p>
                                </>
                                )}
                                {usersession.length === 0 && (<p className="ov-nosession">You do not have any booked sessions</p>)}
                            </div>
                            <button onClick={this.bookSession} className="ov-todo-btn">{usersession.length > 0 ?  "Ask a Counselor" : "Book a session"}</button>
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
