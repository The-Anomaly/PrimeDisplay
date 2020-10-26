import * as React from "react";
import "../kegennidashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg1 from "../../../assets/userimg1.png";
import "./councellor.css";
import prevpage from "../../../assets/prevpage.svg";
import nextpage from "../../../assets/nextpage.svg";
import Navbar from "./../../Home/HomeComponents/navbar";
import Footer from "./../../Home/HomeComponents/footer";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import Axios, { AxiosResponse } from "axios";
import noData from "../../../assets/no recommendations.png";
import { API } from "../../../config";

const CounsellorScheduledMeetings = (props: any) => {
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
        <CounsellorDashboardMobileNav counmeeting={true} />
        <Row>
          <SideBarCounsellorDashboard counmeeting={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Scheduled Meetings" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps sched">Scheduled Meetings</div>
                <div className="teammembr teamheading meethead">
                  <div className="imagesec"> </div>
                  <div className="memberdet">
                    <div>Name</div>
                  </div>
                  <div className="themarea">
                    <div>Date</div>
                  </div>
                  <div className="team">
                    <div>Time</div>
                  </div>
                  <div className="adminstat">
                    <div>Status</div>
                  </div>
                </div>
                {counsellorData &&
                  counsellorData.length > 0 &&
                  counsellorData.map((data, i) => (
                    <div className="msgs teammembr schbod">
                      <div className="fromerit summary">
                        <div className="userr imagesec">
                          <img
                            className="user_image"
                            src={userimg1}
                            alt="user image"
                          />
                        </div>
                        <div className="memberdet">
                          <div>
                            <div className="lowerr nulower">Name</div>
                            <div className="userrdet1 det1">JaiyeOla jones</div>
                            <div className="userrdet2 memb">jj@gmail.com</div>
                          </div>
                        </div>
                        <div className="themarea schdate">
                          <div className="lowerr nulower">Date</div>
                          <div>July 20</div>
                        </div>
                        <div className="team schtime">
                          <div className="lowerr nulower">Time</div>
                          <div>09:30AM - 10:00AM</div>
                        </div>
                        <div className="adminstat schstat">
                          <span className="pend pltd">Pending</span>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="next_page">
                  <div>
                    Displaying <span className="page_num">1</span> out of{" "}
                    <span className="page_num">6</span>
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
        </Row>
        {/* <Footer /> */}
      </Container>
    </>
  );
};
export default CounsellorScheduledMeetings;
