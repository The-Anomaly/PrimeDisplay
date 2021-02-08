import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";
import { Link, withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import search from "../../../assets/search.png";
import moment from "moment";
import noplan from "../../../assets/noplan.png";
import { Spinner, Modal, Form } from "react-bootstrap";
import searchimage from "../../../assets/search.png";
import avatar from "../../../assets/avatar.svg";
import newmessage from "../../../assets/newmessage.png";

const CounsellorAllMessages = withRouter((props: any) => {
  const [state, setState] = React.useState<any>({
    errorMessage: "",
    user: [],
    counsellorData: [],
    chatList: [],
    searchKey: "",
    isLoading: false,
    isloading: false,
    modalState: false,
    search_1: "",
  });
  const {
    errorMessage,
    isloading,
    counsellorData,
    searchKey,
    modalState,
    search_1,
    chatList,
  } = state;
  const closeModal = () => {
    setState({
      ...state,
      modalState: false,
    });
  };
  const openModal = () => {
    setState({
      ...state,
      modalState: true,
    });
  };
  const checkIfIsOdd = (n) => {
    return Math.abs(n % 2) == 1;
  };
  React.useEffect(() => {
    getMessages();
  }, []);
  const getMessages = () => {
    setState({
      ...state,
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/get-chats`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/chat-list/`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res2) => {
          // console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              counsellorData: [...res.data].reverse(),
              errorMessage: "",
              isloading: false,
              chatList: [...res2.data.results],
            });
          }
        })
      )
      .catch((error) => {
        // console.log(error.response);
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
            isloading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  const startChat = (useremail) => {
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
            `/counsellormessagehistory/${useremail}/${res.data.chatId}`
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
              counsellorData: [...res.data].reverse(),
              errorMessage: "",
            });
          }
        })
      )
      .catch((error) => {
        if (error?.response?.status == 400) {
          setState({
            ...state,
            errorMessage: error.response.data.message,
            counsellorData: [],
          });
        }
        // console.log(error.response);
        if (error && error.response && error.response.data) {
          return setState({
            ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
            counsellorData: [],
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  // console.log(counsellorData);
  const formatTime = (date) => {
    return moment(date).fromNow();
  };
  const searchUserlist = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    const data = {};
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(
        `${API}/counsellor/chat-list/?query=${search_1}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      ),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            return setState({
              ...state,
              chatList: [...res.data.results],
              errorMessage: "",
            });
          }
        })
      )
      .catch((error) => {
        if (error?.response?.status == 400) {
          setState({
            ...state,
            errorMessage: error.response.data.message,
            counsellorData: [],
          });
        }
        // console.log(error.response);
        if (error && error.response && error.response.data) {
          return setState({
            ...state,
            errorMessage: error?.response?.data?.message,
            isLoading: false,
            counsellorData: [],
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav messages={true} />
        <Row>
          <SideBarCounsellorDashboard messages={true} />
          <Col md={10} sm={12} className="prm newprm1">
            <CounsellorDashboardNav title="Messages" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <div className="flxv1">
                  <DashboardCounsellorIntroHeader welcomeText="Summary of all messages to and from members assigned to you" />
                  <div className="ffrr1">
                    <img src={search} className="searchi" alt="search" />
                    <input
                      placeholder="Search Messages"
                      type="text"
                      onChange={onchange}
                      value={searchKey}
                      name="searchKey"
                      onKeyPress={(e) => {
                        if (e.key == "Enter") {
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
                    {isloading && (
                      <div className="text-center">
                        <Spinner animation="grow" variant="info" />
                      </div>
                    )}
                    {!errorMessage &&
                      counsellorData?.map((data, i) => (
                        <Link
                          to={`/counsellormessagehistory/${data?.user}/${data.id}`}
                          key={i}
                        >
                          <div className="useri1222 ui1222 ssgs">
                            <div className="msg1">
                              <img
                                src={
                                  data.message.photo
                                    ? data.message.photo
                                    : avatar
                                }
                                className="userimg imguserrr"
                                alt="userphoto"
                              />
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
                    {counsellorData.length === 0 && errorMessage && (
                      <div className="norec">
                        <img
                          src={noplan}
                          className="norecommendations"
                          alt="norecommendations"
                        />
                        <div className="udont">{errorMessage}</div>
                        <div
                          className="udont1 ntfnd"
                          onClick={() => getMessages()}
                        >
                          View messages
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Col>
              <img
                src={newmessage}
                onClick={openModal}
                title="New Message"
                className="newmessage12"
                alt="newmessage"
              />{" "}
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal
        show={modalState}
        className="userlist10"
        centered={true}
        onHide={closeModal}
      >
        {" "}
        <div className="textright22">
          <span className="times42" onClick={closeModal}>
            &times;
          </span>
        </div>
        <Modal.Body>
          <div className="wrrrz">
            <div className="wrrrz1">
              <div className="selezr">Select a User</div>
              <div className="sele2">To send a message</div>
            </div>
            <div className="wrrrz2">
              <span className="searchimage1">
                <img src={searchimage} className="searchimage11" />
              </span>
              <Form.Control
                type="text"
                onChange={onchange}
                required
                value={search_1}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    searchUserlist();
                  }
                }}
                className={"frmcttl1"}
                name="search_1"
                placeholder="Search Client by Name"
              />
            </div>
          </div>
          {chatList.map((data, i) => (
            <div className={checkIfIsOdd(i) ? "rubbg" : "rubbg lightbg"} key={i}>
              <div className="janame2">
                <img
                  src={data.member_photo ? data.member_photo : avatar}
                  className="avatarb"
                  alt="avatar"
                />
              </div>
                <div className="jname1" onClick={()=>startChat(data.email)}>{data.name}</div>
              <div className="jemail1">{data.email}</div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
});
export default CounsellorAllMessages;
