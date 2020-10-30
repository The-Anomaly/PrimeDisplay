import * as React from "react";
import "./kegennidashboard.css";
import SideBarNewDashboard from "./SideBarNewDashboard";
import DashboardNav from "./DashboardNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userimg from "../../assets/userimg.png";
import { Link, withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import search from "../../assets/search.png";
import moment from "moment";
import noplan from "../../assets/noplan.png";
import DashboardUsernameheader from "./DashboardUsernameheader";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";

const NewDashboardAllMessages = withRouter((props: any) => {
  const [state, setState] = React.useState<any>({
    errorMessage: "",
    user: [],
    userData: [],
    searchKey: "",
    isLoading: false,
  });
  const { errorMessage, user, userData, searchKey } = state;
  React.useEffect(() => {
    getMessages();
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
          console.log(res);
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
        console.log(error.response);
        if (error && error.response && error.response.data) {
          setState({
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
          console.log(res);
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
        console.log(error.response);
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
  console.log(userData);
  const formatTime = (date) => {
    return moment(date).fromNow();
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <DashboardNav messages={true} />
        <Row>
          <SideBarNewDashboard messages={true} />
          <Col md={10} sm={12} className="prm">
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
                            <div className="msg1">
                              <img
                                src={userimg}
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
                          onClick={() => getMessages()}
                        >
                          View messages
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
});
export default NewDashboardAllMessages;
