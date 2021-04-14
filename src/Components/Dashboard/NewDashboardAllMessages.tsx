import * as React from "react";
import "./kegennidashboard.css";
import SideBarNewDashboard from "./SideBarNewDashboard";
import DashboardNav from "./DashboardNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userimg from "../../assets/avatar.svg";
import { Link, withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import search from "../../assets/search.png";
import moment from "moment";
import noplan from "../../assets/noplan.png";
import DashboardUsernameheader from "./DashboardUsernameheader";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";
import newmessage from "../../assets/newmessage.png";
import Initial from "./Avatardesign"

const NewDashboardAllMessages = withRouter((props: any) => {
  const [state, setState] = React.useState<any>({
    errorMessage: "",
    user: [],
    userData: [],
    searchKey: "",
    isLoading: false,
    initial: "",
  });
  const { errorMessage, user, userData, searchKey, initial } = state;
  React.useEffect(() => {
    setState({
      ...state,
      initial: localStorage.getItem("initial"),
    })
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        // console.log(response);
        if (response?.data[0]?.ask_counsellor === false) {
            //notify("Update your subscription to access this feature");
            // console.log("Can't access ask a counselor");
            // setTimeout(
            //   (window.location.pathname = "/dashboardsubscriptionplan"),
            //   1000
            // );
          }
          if (response?.data[0]?.ask_counsellor === true){
            getMessages();
          }
      })
      .catch((error) => {
        // console.log(error);
        // console.error("Payment Status Error");
      });
  }, []);
  const getMessages = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/get-chats`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          // console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              userData: [...res.data].reverse(),
              errorMessage: "",
            });
          }
        })
      )
      .catch((error) => {
        // console.log(error.response);
        if (error && error.response && error.response.data) {
          return setState({
            ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const searchMessages = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/search-chat/?q=${searchKey}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    ])
      .then(
        Axios.spread((res) => {
          // console.log(res);
          if (res.status === 200) {
            return setState({
              ...state,
              userData: [...res.data].reverse(),
              errorMessage: "",
            });
          }
        })
      )
      .catch((error) => {
        if (error?.response?.status === 400) {
          setState({
            ...state,
            errorMessage: error.response.data.message,
            userData: [],
          });
        }
        // console.log(error.response);
        if (error && error.response && error.response.data) {
          return setState({
            ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
            userData: [],
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  const startChat = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const user1: any = localStorage.getItem("user");
    const User = JSON.parse(user1);
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/start-chat`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          // console.log(User);
          // console.log(res);
          window.location.assign(
            `/usermessagehistory/${User[0].email}/${res.data.chatId}`
          );
          if (res.status === 200) {
            return setState({
              ...state,
              errorMessage: "",
            });
          }
        })
      )
      .catch((error) => {
        if (error?.response?.status === 400) {
          setState({
            ...state,
            errorMessage: error.response.data.message,
            userData: [],
          });
        }
        // console.log(error.response);
        if (error && error.response && error.response.data) {
          return setState({
            ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
            userData: [],
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  // console.log(userData);
  const formatTime = (date) => {
    return moment(date).fromNow();
  };
  const getInitials = (name) => {
    let nameArray = name?.split(" ");
    let initial = nameArray?.shift()?.charAt(0) + nameArray?.pop()?.charAt(0);
    return initial.toUpperCase();
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <DashboardNav messages={true} />
        <Row>
          <SideBarNewDashboard messages={true} />
          <Col md={10} sm={12} className="prm newprm">
            <DashboardLargeScreenNav messages="Messages" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <div className="flxv1">
                  <DashboardUsernameheader welcomeText="Summary of all Counsellor messages" />
                  <div className="ffrr1">
                    <img src={search} className="searchi" alt="search" />
                    <input
                      placeholder="Search Messages"
                      type="text"
                      onChange={onchange}
                      value={searchKey}
                      name="searchKey"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          searchMessages();
                        }
                      }}
                      id="searchKey"
                      className="searchinput form-control"
                    />
                  </div>
                </div>
                <Row>
                  <Col md={12} className="mssaag sasag">
                    {!errorMessage &&
                      userData?.map((data, i) => (
                        <Link
                          to={`/usermessagehistory/${data?.user}/${data.id}`}
                          key={i}
                        >
                          <div className="useri1222 ui1222 ssgs">
                          <div className="msg1 msg-avi">
                              {/* <img
                                src={userimg}
                                className="userimg imguserrr"
                                alt="userphoto"
                              /> */}
                              <Initial initial={getInitials(data?.message?.author)} />
                            </div>
                            <div className="msg2">
                              <div>
                                <span className="username11">
                                  {data?.message?.author}
                                </span>
                                <span className="useremail11">
                                  {data?.user}
                                </span>
                              </div>
                              <div className="messagedetails nufont">
                                {data?.message?.content}
                              </div>
                            </div>
                            <div className="tymeline msg3 nufont">
                              {formatTime(data?.message?.timestamp)}
                            </div>
                          </div>
                        </Link>
                      ))}
                    {userData.length === 0 && errorMessage && (
                      <div className="norec">
                        <img
                          src={noplan}
                          className="norecommendations"
                          alt="norecommendations"
                        />
                        <div className="udont">{errorMessage}</div>
                        <div
                          className="udont1 ntfnd"
                          onClick={() => startChat()}
                        >
                          Leave a Message
                        </div>
                      </div>
                    )}
                    {/* <div className="dsdcx"> */}
                    <img
                      src={newmessage}
                      onClick={startChat}
                      title="New Message"
                      className="newmessage12"
                      alt="newmessage"
                    />{" "}
                    {/* </div> */}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
});
export default NewDashboardAllMessages;
