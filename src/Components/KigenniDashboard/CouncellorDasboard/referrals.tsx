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
import noData from "../../../assets/noplan.png";
import { API } from "../../../config";
import { Link } from "react-router-dom";

const Referrals = (props: any) => {
  const [state, setState] = useState<any>({
    user: [],
    isOpen: false,
    counsellorData: [],
    errorMessage: "",
    nextLink: "",
    prevLink: "",
    count: "",
    success: "",
    total_pages: "",
    referalInfo: "",
    hascopiedLink: false,
    isLoading: false,
    isloading: false,
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
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/referred-members`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/referral-link`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
          console.log(res);
          console.log(res1);
          if (res1.status === 200) {
            setState({
              ...state,
              referalInfo: res1.data.url,
              isLoading: false,
            });
          }
          if (res.status === 200 && res1.status === 200) {
            setState({
              ...state,
              referalInfo: res1.data.url,
              user: [...res.data.results],
              counsellorData: [...res.data.results].reverse(),
              count: res.data.page,
              nextLink: res.data.next,
              prevLink: res.data.previous,
              total_pages: res.data.total_pages,
              isLoading: false,
            });
            console.log(counsellorData)
          }
        })
      )
      .catch((error) => {
        console.log(error.response);
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
  const changeCopiedState = () => {
    setState({
      ...state,
      hascopiedLink: true,
    });
    setTimeout(() => {
      setState({
        ...state,
        hascopiedLink: false,
      });
    }, 3000);
  };
  const ModalClose = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };
  const ModalOpen = () => {
    setState({
      ...state,
      isOpen: true,
    });
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
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const startChat = (email) => {
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
            `/counsellormessagehistory/${email}/${res.data.chatId}`
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
    counsellorData,
    isLoading,
    prevLink,
    nextLink,
    count,
    total_pages,
    referalInfo,
    clarityLink,
    hascopiedLink,
  } = state;
  console.log(referalInfo);
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav counreferral={true} />
        <Row>
          <SideBarCounsellorDashboard counreferral={true} />
          <Col md={10} sm={12} className="prm newprm">
            <CounsellorDashboardNav title="Referrals" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  welcomeText="Find below all the list of successful members referred"
                  referalAmount={true}
                />
                <div>
                  <span className="ref_btn" onClick={ModalOpen}>
                    Get referral link{" "}
                  </span>
                </div>
                <hr />
                <Row className="signedfjss">
                  <Col md={12}>
                    {counsellorData &&
                      counsellorData.length > 0 &&
                      counsellorData.map((data, i) => (
                        <div
                          className="msgs teammembr booked bookedover signed"
                          key={i}
                        >
                          <div className="fromerit summary">
                            <div className="refmarg">
                              <img
                                className="user_image"
                                src={userimg1}
                                alt="user image"
                              />
                            </div>
                            <div className="refdeet">
                                  <div className="userrdet1 det1 refdeet1 refdeet1a">
                                  {data?.member?.name}
                                  </div>
                                  <div className="userrdet2 memb refdeet1">
                                  {data?.member?.email}
                                  </div>
                              </div>
                          </div>
                        </div>
                      ))}

                    {counsellorData.length === 0 && !isLoading && (
                      <>
                        <div className="text-center">
                          <img src={noData} className="noref" alt="noData" />
                        </div>
                        <div className="norefoops">Oops!!!</div>
                        <div className="empt">
                          You currently do not have any referred users
                        </div>
                        <div className="text-center norefmarg">
                          <span className="ref_btn" onClick={ModalOpen}>
                            Get referral link{" "}
                          </span>
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
              <Modal
                show={state.isOpen}
                size={"lg"}
                centered={true}
                onHide={ModalClose}
                className="referral_modal"
              >
                <Container>
                  <div className="modal_ref_title">
                    <span className="modal_ref_img "></span>
                    <h5>Get Link</h5>
                  </div>
                  <div className="modal_input">
                    <a href={referalInfo} target="blank">
                      <input
                        type="text"
                        size={30}
                        value={referalInfo}
                        className=" form-control ref_input"
                      />
                    </a>
                    <span
                      className="ref-modal-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(referalInfo);
                        changeCopiedState();
                      }}
                    >
                      {!hascopiedLink ? "Copy Link" : "Copied"}
                    </span>
                  </div>
                  <div className="last_ref_modal_btn">
                    <span className="ref_btn done" onClick={ModalClose}>
                      Done
                    </span>
                  </div>
                </Container>
              </Modal>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Referrals;
