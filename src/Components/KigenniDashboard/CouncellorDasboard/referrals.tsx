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
      Axios.get<any, AxiosResponse<any>>(`${API}/counsellor/referral-link`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(
        Axios.spread((res, res1) => {
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
              referalInfo: res1.data.url,
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
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Referrals" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="Find below all the list of successful members referred" />
                <div>
                  <span className="ref_btn" onClick={ModalOpen}>
                    Get referral link{" "}
                  </span>
                </div>
                <Row className="signedfjss">
                  <Col md={12}>
                    <div className="teammembr teamheading counheading mheadd">
                      <div className="mone"> </div>
                      <div className="mtwo">
                        <div>Name</div>
                      </div>
                      <div className="mthree">
                        <div>Personality Type</div>
                      </div>
                      <div className="mfour">
                        <div>Availability</div>
                      </div>
                      <div className="mfive">
                        <div>Status</div>
                      </div>
                      <div className="msix"> </div>
                    </div>
                    {counsellorData &&
                      counsellorData.length > 0 &&
                      counsellorData.map((data, i) => (
                        <div
                          className="msgs teammembr booked bookedover signed"
                          key={i}
                        >
                          <div className="fromerit summary">
                            <div className="mone">
                              <img
                                className="user_image"
                                src={userimg1}
                                alt="user image"
                              />
                            </div>
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
                            <div className="mthree">
                              <div className="lowerr nulower counlowerr mhead">
                                Personality Type
                              </div>
                              <div>{data?.personality_type}</div>
                            </div>

                            <div className="mfour">
                              <div className="lowerr nulower counlowerr mhead">
                                Availability
                              </div>
                              {data.availability == "available" ? (
                                <div className="avail">
                                  {capitalize(data?.availability)}
                                </div>
                              ) : (
                                <div className="notavail">
                                  {capitalize(data?.availability)}
                                </div>
                              )}
                            </div>
                            <div className="mfive">
                              <div className="lowerr nulower sess counstat counlowerr mhead">
                                Status
                              </div>
                              <span
                                className={
                                  !data.status ? "pend pltd" : "complt pltd"
                                }
                              >
                                {!data.status ? "Pending" : "Completed"}
                              </span>
                            </div>
                            {data.status && (
                              <div className="msix">
                                <div className="counview mbtn">View Result</div>
                              </div>
                            )}
                            {!data.status && (
                              <div className="msix">
                                <div className="counview mbtn mbtnblu">
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
                      <div>
                        Displaying <span className="page_num">{count}</span> out
                        of <span className="page_num">{total_pages}</span>
                      </div>
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
                    <input
                      type="text"
                      size={30}
                      value={referalInfo}
                      className=" form-control ref_input"
                    />
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
                    <span className="ref_btn done" onClick={ModalClose}>Done</span>
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
