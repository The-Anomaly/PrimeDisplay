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
import take from "../../assets/takeassessment.svg";
import "../Home/Assesment/assessmenticebreaker.css";
import { Link } from "react-router-dom";
import Initials from "./Avatardesign";
import available from "../../assets/available.png";
import notavailable from "../../assets/notavailable.png";

interface State {
  fullname: string;
  firstname: string;
  email: string;
  phone: string;
  country: string;
  user_profile: string;
  usertasks: any;
  usermessages: any;
  usersession: any;
  view_result: any;
  progress: any;
  incomplete_assessment: boolean;
  isLoading: boolean;
  profile_builder: boolean;
}
class Dashboard2021 extends React.Component<any, any> {
  state: State = {
    fullname: "",
    firstname: "",
    email: "",
    phone: "",
    country: "",
    user_profile: "",
    usertasks: [],
    usermessages: [],
    usersession: [],
    view_result: [],
    progress: [],
    incomplete_assessment: false,
    isLoading: true,
    profile_builder: false,
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
      Axios.get<any, AxiosResponse<any>>(`${API}/progress`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/get-chats/`, {
          headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res1, res2, res3, res4, res5, res6, res7) => {
          console.log(res1, res2, res3, res4, res5, res6, res7);
          if (
            res1.status === 200 &&
            res2.status === 200 &&
            res3.status === 200 &&
            res4.status === 200 &&
            res5.status === 200
          ) {
            this.setState({
              fullname: res1?.data?.first_name + " " + res1?.data?.last_name,
              firstname: res1?.data?.first_name,
              email: res1?.data?.email,
              phone: res1?.data?.phone,
              country: res3?.data?.country,
              user_profile: res2?.data[0]?.profile,
              usertasks: [...res3?.data?.results].reverse().splice(0, 2),
              usersession: [...res4?.data?.results],
              view_result: res5?.data[0]?.view_result,
              profile_builder: res5?.data[0]?.profile_builder_submitted,
              progress: res6?.data[0],
              incomplete_assessment:
                !res6?.data[0].phase_two_building ||
                !res6?.data[0].phase_two_business ||
                !res6?.data[0].phase_two_creative ||
                !res6?.data[0].phase_two_health ||
                !res6?.data[0].phase_two_humanitarian ||
                !res6?.data[0].phase_two_nature ||
                !res6?.data[0].phase_two_sports ||
                !res6?.data[0].phase_two_stem ||
                !res6?.data[0].phase_three ||
                !res6?.data[0].phase_four,
              usermessages: [...res7.data].reverse().splice(0, 4),
              isLoading: false,
            });
          }
        })
      )
      .catch((error) => {
        // console.log(error.response);
        this.setState({
          isLoading: false,
        });
      });
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
  viewProfile= () => {
    if (this.state.phone === "" || this.state.country === "") {
      return this.props.history.push("/dashboardsettings");
    } else {
      return this.props.history.push("/profilebuilder");
    }
  };
  bookSession = () => {
    if (this.state.usersession.length > 0) {
      return this.props.history.push("/allusermessages");
    } else {
      return this.props.history.push("/allbookedsessions");
    }
  };
  goToAllTasks = () => {
    return this.props.history.push("/todolist");
  };
  goToAllMessages = () => {
    return this.props.history.push("/allusermessages");
  };
  viewResult = () => {
    if (
      this.state.progress.phase_four &&
      this.state.view_result &&
      !this.state.incomplete_assessment
    ) {
      return this.props.history.push("/fullinsight");
    } else if (!this.state.progress.phase_one) {
      return this.props.history.push("/assessment/welcome");
    } else if (
      !this.state.progress.phase_two_nature ||
      !this.state.progress.phase_two_health ||
      !this.state.progress.phase_two_building ||
      !this.state.progress.phase_two_creative
    ) {
      return this.props.history.push(`/assessment/phaseone/complete`);
    } else if (
      !this.state.progress.phase_two_sports ||
      !this.state.progress.phase_two_business ||
      !this.state.progress.phase_two_stem ||
      !this.state.progress.phase_two_humanitarian
    ) {
      return this.props.history.push(`/assessmentphasetwo1`);
    } else if (!this.state.progress.phase_three) {
      return this.props.history.push(`/assessment/phasetwo/complete`);
    } else if (!this.state.progress.phase_four) {
      return this.props.history.push(`/assessment/phasethree/complete`);
    }
  };
  getInitials = (name) => {
    const details = localStorage.getItem("user");
    const user_name = details
      ? JSON.parse(details)
      : "";
    let user_initial = user_name[0]?.first_name?.charAt(0) + user_name[0]?.last_name?.charAt(0);
    localStorage.setItem("initial", user_initial.toUpperCase());

    let nameArray = name?.split(" ");
    let initial = nameArray?.shift()?.charAt(0) + nameArray?.pop()?.charAt(0);
    return initial.toUpperCase();
  };
  goToTask: any = (x) => {
    if(x.status === "pending") {
      return this.props.history.push({
        pathname: `/todolist`,
        state: {
          id: x,
          status: "pending",
        }
      })
    } else {
      return this.props.history.push({
        pathname: `/todolist`,
        state: {
          id: x,
          status: "complete",
        }
      })
    }
  }
  render() {
    const {
      fullname,
      firstname,
      email,
      phone,
      country,
      user_profile,
      usertasks,
      usermessages,
      usersession,
      view_result,
      progress,
      incomplete_assessment,
      isLoading,
      profile_builder,
    } = this.state;
    console.log(progress)
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav overview={true} />
          <Row>
            <SideBarNewDashboard overview={true} />
            <Col md={10} sm={12} className="prm newprm">
              <DashboardLargeScreenNav title="Overview" />
              <Row>
                {isLoading && (
                  <div className="icebreakerpreloader center-it">
                    <div className="icebreakerspinner"></div>
                  </div>
                )}
                {!isLoading && (
                  <Col md={12} className="kisls kisls22 ov-bg">
                    <div className="ov-sec">
                      <div className="ov-sec-1 ov-elements">
                        <div>
                          <h1>
                            {this.state.progress.phase_one
                              ? "Welcome back, "
                              : "Welcome, "}
                            <strong>{firstname}!</strong>
                          </h1>
                          <p>
                            {!this.state.progress.phase_one
                              ? "It is time to figure out exciting things that can influence your career decisions posiyively."
                              : incomplete_assessment
                              ? "You are a few steps away from getting insights that will aid your career decisions. How about you take them now?"
                              : view_result && !incomplete_assessment
                              ? "You can be anything you dream about, all it takes is that extra step when you feel weary. Are you going to do that now?"
                              : ""}
                          </p>
                          <button onClick={this.viewResult}>
                            {!this.state.progress.phase_one
                              ? "Take Assessment"
                              : incomplete_assessment
                              ? "Continue Assessment"
                              : view_result && !incomplete_assessment
                              ? "View Insight"
                              : "Take Assessment"}
                          </button>
                        </div>
                        <img
                          className={
                            !this.state.progress.phase_one
                              ? "takeassessimg"
                              : ""
                          }
                          src={!this.state.progress.phase_one ? take : target}
                          alt=""
                        />
                      </div>
                      <div className="ov-sec-2 ov-elements">
                        <div className="ov-profile-builder-icon">
                          <Link to="/profilebuilder"><img src={profile_builder ? available : notavailable} alt="" /></Link>
                        </div>
                        <div className="ov-avatar">
                          {fullname && (<Initials initial={this.getInitials(fullname)} />)}
                        </div>
                        <p className="ov-profile-name">{fullname}</p>
                        <p className="ov-profile-descrip">
                          {user_profile ? user_profile : "--"}
                        </p>
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
                        <button onClick={this.viewProfile}>
                          {this.state.phone === "" || this.state.country === ""
                            ? "Complete your profile"
                            : "View your profile"}
                        </button>
                      </div>
                      <div className="ov-sec-3 ov-elements">
                        <h2 className="ov-todo-ttl">Todo Tasks</h2>
                        {usertasks.length > 0 &&
                          usertasks.map((x, i) => (
                            <div 
                            onClick={() => this.goToTask(x.id)} 
                            className="ov-todo">
                              <p
                                className={
                                  x.status === "pending"
                                    ? "ov-todo-stat"
                                    : "ov-todo-stat ov-todo-stat-green"
                                }
                              >
                                {x.status === "pending"
                                  ? "Pending"
                                  : "Completed"}
                              </p>
                              <div className="ov-task">
                                <p className="ov-todo-sub-ttl">Task Title</p>
                                <p className="ov-todo-sub-txt">{x.title}</p>
                              </div>
                              <div className="ov-duration">
                                <p className="ov-todo-sub-ttl">Duration</p>
                                <p className="ov-todo-sub-txt">
                                  {x.duration} Days
                                </p>
                              </div>
                              <div className="ov-date">
                                <p className="ov-todo-sub-ttl">Date Created</p>
                                <p className="ov-todo-sub-txt">
                                  {x.date_created}
                                </p>
                              </div>
                            </div>
                          ))}
                        {usertasks.length === 0 && (
                          <>
                            <div className="ov-notasks">
                              <img src={notasks} alt="no tasks" />
                            </div>
                            <p className="ov-notext">
                              You do not have any pending task
                            </p>
                          </>
                        )}
                        <button onClick={this.goToAllTasks} className="ov-todo-btn">
                          View all your tasks
                        </button>
                      </div>
                      <div className="ov-sec-4 ov-elements">
                        <h2 className="ov-todo-ttl">Messages</h2>
                        {usermessages.length > 0 &&
                          usermessages.map((x, i) => (
                            <Link
                              to={`/usermessagehistory/${x?.user}/${x?.id}`}
                              key={i}
                            >
                              <div className="ov-msg" key={i}>
                                <div className="avatar-body">
                                  <Initials
                                    initial={this.getInitials(
                                      x?.message?.author
                                    )}
                                  />
                                </div>
                                <div className="ov-msg-div">
                                  <p className="ov-msg-ttl">
                                    {x?.message?.author}
                                  </p>
                                  <p className="ov-msg-txt">
                                    {x?.message?.content}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        {usermessages.length === 0 && (
                          <>
                            <div className="ov-nomsgs">
                              <img src={nomsgs} alt="no messages" />
                            </div>
                            <p className="ov-notext">
                              You do not have any messages{" "}
                            </p>
                          </>
                        )}
                        <button onClick={this.goToAllMessages} className="ov-todo-btn">
                          View all messages
                        </button>
                      </div>
                      <div className="ov-sec-5 ov-elements">
                        <h2>Talk to a Counsellor</h2>
                        <div>
                          {usersession.length > 0 && (
                            <>
                              <p className="ov-book-ttl">
                                You booked a session for
                              </p>
                              <p className="ov-book-txt ov-book-date">
                                {usersession[0].date}
                              </p>
                              <p className="ov-book-txt ov-book-time">
                                {usersession[0].time}
                              </p>
                            </>
                          )}
                          {usersession.length === 0 && (
                            <p className="ov-nosession">
                              You do not have any booked sessions
                            </p>
                          )}
                        </div>
                        <button
                          onClick={this.bookSession}
                          className="ov-todo-btn"
                        >
                          {usersession.length > 0
                            ? "Ask a Counselor"
                            : "Book a session"}
                        </button>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Dashboard2021;
