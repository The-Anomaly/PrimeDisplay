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
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import Axios, { AxiosResponse } from "axios";
import noData from "../../../assets/no recommendations.png";
import { API } from "../../../config";
import { Link } from "react-router-dom";

const CounsellorAssignedMembers = (props: any) => {
  const [state, setState] = useState<any>({
    user: [],
    counsellorData: [],
    errorMessage: "",
    nextLink: "",
    prevLink: "",
    count: "",
    success: "",
    total_pages: "",
    isLoading: false,
  });
  React.useEffect(() => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/assigned-members`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              user: [...res.data.results],
              counsellorData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
              isLoading: false,
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "failed to load",
          isLoading: false,
        });
      });
  }, []);
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const loadNewData = () => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${nextLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          if (res.status === 200) {
            setState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              counsellorData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error.response.data[0].message,
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
  const loadPrevData = () => {
    setState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/counsellor/signin");
    Axios.all([
      Axios.get<any, AxiosResponse<any>>(`${prevLink}`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              user: res.data,
              successMsg: true,
              isLoading: false,
              counsellorData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
            });
          }
        })
      )
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setState({
            ...state,
            errorMessage: error.response.data[0].message,
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
          console.log(User);
          console.log(res);
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
          });
        }
        console.log(error.response);
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
  const {
    nextLink,
    isLoading,
    counsellorData,
    prevLink,
    count,
    total_pages,
  } = state;
  console.log(counsellorData);
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav assignedmemb={true} />
        <Row>
          <SideBarCounsellorDashboard assignedmemb={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Assigned Members List" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="List of all the members assigned to you" />
                <Row className="signedfjss">
                  <Col md={12}>
                    {counsellorData.length > 0 && (
                      <div className="teammembr teamheading counheading mheadd">
                        <div className="mone"> </div>
                        <div className="mtwo">
                          <div>Name</div>
                        </div>
                        <div className="mthree">
                          <div className="mmbr"> Member Type</div>
                        </div>
                        <div className="msix"> </div>
                      </div>
                    )}
                    {counsellorData &&
                      counsellorData.length > 0 &&
                      counsellorData.map((data, i) => (
                        <div
                          className="msgs teammembr booked bookedover signed"
                          key={i}
                        >
                          <div className="fromerit summary">
                            <Link to={`/counsellorassignedmembers/${data?.id}`}>
                              <div className="mone">
                                <img
                                  className="user_image"
                                  src={userimg1}
                                  alt="user image"
                                />
                              </div>
                            </Link>
                            <Link to={`/counsellorassignedmembers/${data?.id}`}>
                              <div className="mtwo">
                                <div>
                                  <div className="lowerr nulower counlowerr mhead">
                                    Name
                                  </div>
                                  <div className="userrdet1 det1">
                                    {data?.name}
                                  </div>
                                  <div className="userrdet2 memb">
                                    {data?.email}
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="mthree">
                              <div className="lowerr nulower counlowerr mhead">
                                Member type
                              </div>
                              <div className="clarity12b">Clarity</div>
                            </div>
                            {data.status && (
                              <div className="msix">
                                <div className="counview mbtn">View More</div>
                              </div>
                            )}
                            {!data.status && (
                              <div className="msix">
                                <div
                                  onClick={startChat}
                                  className="counview mbtn mbtnblu wd120"
                                >
                                  Send Message
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    {counsellorData.length === 0 && !isLoading && (
                      <>
                        <div className="text-center">
                          <img src={noData} className="noData" alt="noData" />
                        </div>
                        <div className="empt">
                          You do not have any assigned members
                        </div>
                      </>
                    )}
                    <div className="next_page">
                      {counsellorData.length > 0 && (
                        <div>
                          Displaying <span className="page_num">{count}</span>{" "}
                          out of <span className="page_num">{total_pages}</span>
                        </div>
                      )}
                      <div>
                        {prevLink && (
                          <img
                            onClick={loadPrevData}
                            className="page_change"
                            src={prevpage}
                            alt="previous page"
                          />
                        )}

                        {nextLink && (
                          <img
                            onClick={loadNewData}
                            className="page_change"
                            src={nextpage}
                            alt="next page"
                          />
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CounsellorAssignedMembers;
