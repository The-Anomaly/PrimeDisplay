import * as React from "react";
import SideNav from "react-simple-sidenav";
import Row from "react-bootstrap/Row";
import imgCart from "../../../assets/newclaritylogo2a.png";
import Col from "react-bootstrap/Col";
import activeinsight from "../../../assets/insights_active.png";
import Overview_inactive from "../../../assets/Overview_inactive.png";
import chatinactive from "../../../assets/Chat with a counsellor_inactive.png";
import chatactive from "../../../assets/Chat with a counsellor_active.png";
import inactiveinsight from "../../../assets/inactiveinsight.png";
import recommedationactive from "../../../assets/Counsellors recommendation_active.png";
import recommedationinactive from "../../../assets/Counsellors recommendation_inactive.png";
import jobrecommedationactive from "../../../assets/Job recommendation_active.png";
import jobrecommedationinactive from "../../../assets/Job recommendation_inactive.png";
import settingsactive from "../../../assets/settings.png";
import settingsinactive from "../../../assets/Settings_inactive.png";
import subscriptionactive from "../../../assets/Subcription_active.png";
import subscriptioninactive from "../../../assets/Subscription_inactive.png";
import profilebuilder from "../../../assets/Profile builder_active.png";
import profilebuilderinactive from "../../../assets/Profile builder_inactive.png";
import support from "../../../assets/Support_active.png";
import supportinactive from "../../../assets/Support_inactive.png";
import overview from "../../../assets/overview.png";
import logout from "../../../assets/log-out.png";
import "../../Home/Home/Home.css";
import { Link, withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import starrating from "../../../assets/starrating.png";
import clockactive from "../../../assets/clock_active.png";
import clockinactive from "../../../assets/clock_inactive.png";
import referralinactive from "../../../assets/referral_inactive.png";
import logoutImage from "../../../assets/logout.png";
import { Modal, Spinner } from "react-bootstrap";
import supportactive from "../../../assets/Support_active.png";

const CounsellorsDashboardMobileNav = withRouter((props: any) => {
  const [user, setNewState] = React.useState("");
  const [showNav, setShowNav]: any = React.useState(false);
  const [logoutState, setLogoutState] = React.useState({
    logoutModal: false,
    assessmentModal: false,
    isloading: false,
  });
  const closeLogoutModal = () => {
    setLogoutState({
      ...logoutState,
      logoutModal: false,
    });
  };
  const openLogoutModal = () => {
    setLogoutState({
      ...logoutState,
      logoutModal: true,
    });
  };
  const openAssesmentModal = () => {
    setLogoutState({
      ...logoutState,
      assessmentModal: true,
    });
  };
  const closeAssesmentModal = () => {
    setLogoutState({
      ...logoutState,
      assessmentModal: false,
    });
  };
  const { logoutModal, assessmentModal, isloading } = logoutState;

  const logOutMobile = (e) => {
    e.preventDefault();
    const details: any = localStorage.getItem("userDetails");
    const info = JSON.parse(details);
    let token = info.token;
    Axios.get(`${API}/api/v1/none`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        window.location.pathname = "/";
        localStorage.clear();
      })
      .catch((err) => {});
  };
  // React.useEffect(() => {
  //   localStorage.clear();
  //   window.location.assign("/counsellor/signin");
  // })
  const logOut = () => {
    localStorage.clear();
    window.location.assign("/counsellor/signin");
  };
  const getCurrentAssessmentPosition = (): void => {
    setLogoutState({
      ...logoutState,
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token: string = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get(`${API}/progress`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        setLogoutState({
          ...logoutState,
          isloading: false,
        });
        if (
          (response.status === 200 &&
            response.data[0].next === "phase_two_creative") ||
          response.data[0].next === "phase_two_health" ||
          response.data[0].next === "phase_two_building" ||
          response.data[0].next === "phase_two_creative"
        ) {
          return props.history.push(`/assessmentphasetwo/?counsellor=true`);
        }
        if (
          (response.status === 200 &&
            response.data[0].next === "phase_two_sports") ||
          response.data[0].next === "phase_two_business" ||
          response.data[0].next === "phase_two_stem" ||
          response.data[0].next === "phase_two_humanitarian"
        ) {
          return props.history.push(`/assessmentphasetwo1/?counsellor=true`);
        }
        if (response.status === 200 && response.data[0].next === "phase_one") {
          closeAssesmentModal();
          return window.open(`/assessmentphaseone/?counsellor=true`);
        }
        if (response.status === 200 && response.data[0].next === "phase_two") {
          closeAssesmentModal();
          return window.open(`/assessmentphasetwo/?counsellor=true`);
        }
        if (
          response.status === 200 &&
          response.data[0].next === "phase_three"
        ) {
          closeAssesmentModal();
          return window.open(`/assessmentphasethree/?counsellor=true`);
        }
        if (response.status === 200 && response.data[0].next === "phase_five") {
          closeAssesmentModal();
          return window.open(`/assessmentphasefive/?counsellor=true`);
        }
        if (response.status === 200 && response.data[0].next === "phase_six") {
          closeAssesmentModal();
          return window.open(`/assessmentphasesix/?counsellor=true`);
        }
        if (
          response.status === 200 &&
          response.data[0].next === "phase_seven"
        ) {
          closeAssesmentModal();
          return window.open(`/assessmentphaseseven/?counsellor=true`);
        }
        if (response.status === 200 && response.data[0].next === "home") {
          closeAssesmentModal();
          return window.open(`/counsellorresultpage`);
        }
      })
      .catch((error) => {
        // console.log(error);
        setLogoutState({
          ...logoutState,
          isloading: false,
        });
      });
  };
  return (
    <div>
      <Row>
        <div className="hnav">
          <img src={imgCart} className="imgCart" alt="imgCart" />
          <div className="hamburger hamdash" onClick={() => setShowNav(true)}>
            <div className="line2a"></div>
            <div className="line2a"></div>
            <div className="line2a newlinedash"></div>
          </div>
        </div>
      </Row>
      <SideNav
        showNav={showNav}
        style={{ background: showNav ? "rgba(0, 0, 0, 0.7)" : "none" }}
        navStyle={{
          width: "70%",
          background: "#001833",
          padding: 0,
          margin: "0px",
        }}
        onHideNav={() => setShowNav(false)}
        openFromRight={true}
        titleStyle={{
          backgroundColor: "#fff",
          color: "#444444",
          paddingLeft: 0,
          paddingBottom: 0,
          paddingTop: 0,
          fontSize: 17,
          textAlign: "left",
        }}
        title={[,]}
        itemStyle={{
          backgroundColor: "#fff",
          padding: 0,
          margin: "0px",
          textAlign: "left",
        }}
        items={[
          <div className={"siddlemobile"}>
            <div className={"navitem1"}>
              <div className={props.ov ? "activegb" : "gbn"}>
                <Link to="/counselloroverview">
                  <img
                    src={props.ov ? overview : Overview_inactive}
                    className="sideimage"
                    alt="sideimage"
                  />{" "}
                  Overview
                </Link>
              </div>
              <div
                className={props.assessment ? "activegb" : "gbn"}
                onClick={openAssesmentModal}
              >
                {" "}
                <img
                  src={props.support ? starrating : starrating}
                  className="sideimage"
                  alt="sideimage"
                />
                Clarity Assessment
              </div>
              <div className={props.bookedsession ? "activegb" : "gbn"}>
                <Link to="/counsellorbookings">
                  <img
                    src={props.bookedsession ? activeinsight : inactiveinsight}
                    className="sideimage"
                    alt="sideimage"
                  />
                  Booked Sessions
                </Link>
              </div>
              <div className={props.builder ? "activegb" : "gbn"}>
                {" "}
                <Link to="/counsellorprofilebuilder">
                  <img
                    src={
                      props.builder
                        ? recommedationactive
                        : recommedationinactive
                    }
                    className="sideimage"
                    alt="sideimage"
                  />
                  Profile Builder
                </Link>
              </div>
              <div className={props.messages ? "activegb" : "gbn"}>
                {" "}
                <Link to="/counsellormessages">
                  <img
                    src={props.messages ? chatactive : chatinactive}
                    className="sideimage"
                    alt="sideimage"
                  />
                  Messages
                </Link>
              </div>
              <div className={props.councrec ? "activegb" : "gbn"}>
                {" "}
                <Link to="/counsellorrecommendations1">
                  <img
                    src={
                      props.councrec
                        ? recommedationactive
                        : recommedationinactive
                    }
                    className="sideimage"
                    alt="sideimage"
                  />
                  Recommended Task
                </Link>
              </div>
              <div className={props.assignedmemb ? "activegb" : "gbn"}>
                {" "}
                <Link to="/counsellorassignedmembers">
                  <img
                    src={
                      props.assignedmemb
                        ? jobrecommedationactive
                        : jobrecommedationinactive
                    }
                    className="sideimage"
                    alt="sideimage"
                  />
                  Assigned Members
                </Link>
              </div>
              {/* <div className={props.counmeeting ? "activegb" : "gbn"}>
            {" "}
            <Link to="/counsellormeetings">
              <img
                src={
                  props.counmeeting
                    ? clockactive
                    : clockinactive
                }
                className="sideimage"
                alt="sideimage"
              />
              Scheduled Meetings
            </Link>
          </div> */}
              <div className={props.counreferral ? "activegb" : "gbn"}>
                {" "}
                <Link to="/referrals">
                  <img
                    src={
                      props.counreferral ? referralinactive : referralinactive
                    }
                    className="sideimage"
                    alt="sideimage"
                  />
                  Referrals
                </Link>
              </div>
              <div className="divide_thro"></div>
              <div className={props.settings ? "activegb" : "gbn"}>
                {" "}
                <Link to="/counsellorsettings">
                  <img
                    src={props.settings ? settingsactive : settingsinactive}
                    className="sideimage"
                    alt="sideimage"
                  />
                  Settings
                </Link>
              </div>
              <div className={props.counselorsupport ? "activegb" : "gbn"}>
                {" "}
                <Link to="/counsellorsupport">
                  <img
                    src={
                      props.counselorsupport ? supportactive : supportinactive
                    }
                    className="sideimage"
                    alt="sideimage"
                  />
                  Support
                </Link>
              </div>

              {/* <div className={props.support ? "activegb" : "gbn"}>
            {" "}
            <Link to="/ratings">
              <img
                src={props.support ? starrating : starrating}
                className="sideimage"
                alt="sideimage"
              />
              Ratings
            </Link>
          </div> */}
              <div className={"gbn"}>
                {" "}
                <span onClick={openLogoutModal}>
                  <img src={logout} className="sideimage" alt="sideimage" />
                  Logout
                </span>
              </div>
            </div>
          </div>,
        ]}
      />
      <Modal
        show={logoutModal}
        className="warning22e"
        centered={true}
        onHide={closeLogoutModal}
      >
        <Modal.Body>
          <div className="text-center">
            {" "}
            <img src={logoutImage} className="popUUp" alt="failedNotice" />{" "}
          </div>
          <div className="areusure1">
            are you sure you want to <b> LogOut?</b>
          </div>
          <div className="text-center planupgrade">
            <div
              className="retaketest upss1 planupgradebtn mddd"
              onClick={closeLogoutModal}
            >
              Go Back
            </div>
            <div
              className="retaketest upss1 planupgradebtn mddd2"
              onClick={logOut}
            >
              Log out
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={assessmentModal}
        className="warning22e"
        centered={true}
        onHide={closeLogoutModal}
      >
        <Modal.Body>
          <div className="text-center"> </div>
          <div className="areusure1">
            Are you sure you want to <b> take the assessment?</b>
          </div>
          <div className="text-center">
            {isloading && <Spinner animation="grow" />}
          </div>
          <div className="text-center planupgrade">
            <div
              className="retaketest upss1 planupgradebtn mddd"
              onClick={closeAssesmentModal}
            >
              Go Back
            </div>
            <div
              className="retaketest upss1 planupgradebtn mddd2"
              onClick={getCurrentAssessmentPosition}
            >
              Take assessment
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
});
export default CounsellorsDashboardMobileNav;
