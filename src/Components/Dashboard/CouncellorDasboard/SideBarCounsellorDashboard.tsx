import * as React from "react";
import Col from "react-bootstrap/Col";
import imgCart from "../../../assets/newclaritylogoa.png";
import logout from "../../../assets/log-out.png";
import Overview_inactive from "../../../assets/Overview_inactive.png";
import chatinactive from "../../../assets/Chat with a counsellor_inactive.png";
import chatactive from "../../../assets/Chat with a counsellor_active.png";
import inactiveinsight from "../../../assets/inactiveinsight.png";
import activeinsight from "../../../assets/insights_active.png";
import recommedationactive from "../../../assets/Counsellors recommendation_active.png";
import recommedationinactive from "../../../assets/Counsellors recommendation_inactive.png";
import jobrecommedationactive from "../../../assets/Job recommendation_active.png";
import jobrecommedationinactive from "../../../assets/Job recommendation_inactive.png";
import settingsactive from "../../../assets/settings.png";
import settingsinactive from "../../../assets/Settings_inactive.png";
import subscriptionactive from "../../../assets/Subcription_active.png";
import subscriptioninactive from "../../../assets/Subscription_inactive.png";
import starrating from "../../../assets/starrating.png";
import supportinactive from "../../../assets/Support_inactive.png";
import supportactive from "../../../assets/Support_active.png";
import overview from "../../../assets/overview.png";
import "../../Home/Home/Home.css";
import { Link, withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import "./councellor.css";
import clockactive from "../../../assets/clock_active.png";
import clockinactive from "../../../assets/clock_inactive.png";
import referralinactive from "../../../assets/referral_inactive.png";
import logoutImage from "../../../assets/logout.png";
import { Modal, Spinner } from "react-bootstrap";

const SideBarCounsellorDashboard = withRouter((props: any) => {
  const [hidemobile, sethidemobile] = React.useState(false);
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

  const changeHideStatus = () => {
    sethidemobile(hidemobile ? false : true);
  };
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
            response.data[0].next === "phase_four_nature") ||
          response.data[0].next === "phase_four_health" ||
          response.data[0].next === "phase_four_building" ||
          response.data[0].next === "phase_four_creative"
        ) {
          return props.history.push(`/assessmentphasefour`);
        }
        if (
          (response.status === 200 &&
            response.data[0].next === "phase_four_sports") ||
          response.data[0].next === "phase_four_business" ||
          response.data[0].next === "phase_four_stem" ||
          response.data[0].next === "phase_four_humanitarian"
        ) {
          closeAssesmentModal();
          return window.open(`/assessmentphasefour1`);
        }
        if (response.status === 200 && response.data[0].next === "phase_one") {
          closeAssesmentModal();
          return window.open(`/assessmentphaseone`);
        }
        if (response.status === 200 && response.data[0].next === "phase_two") {
          closeAssesmentModal();
          return window.open(`/assessmentphasetwo`);
        }
        if (
          response.status === 200 &&
          response.data[0].next === "phase_three"
        ) {
          closeAssesmentModal();
          return window.open(`/assessmentphasethree`);
        }
        if (response.status === 200 && response.data[0].next === "phase_five") {
          closeAssesmentModal();
          return window.open(`/assessmentphasefive`);
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
        setLogoutState({
          ...logoutState,
          isloading: false,
        });
      });
  };
  return (
    <>
      <Col md={2} className={hidemobile ? "siddle siddlenone" : "siddle"}>
        <div className="dlex">
          <Link to="/counselloroverview">
            <img
              src={imgCart}
              className="imgCart33 sidebarlogo"
              alt="imgCart"
            />
          </Link>
        </div>{" "}
        <div className={hidemobile ? "navitemnone" : "navitem1 newitem"}>
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
              src={props.assessment ? starrating : starrating}
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
                  props.councrec ? recommedationactive : recommedationinactive
                }
                className="sideimage"
                alt="sideimage"
              />
              Recommended Task
            </Link>
          </div>
          <div className={props.builder ? "activegb" : "gbn"}>
            {" "}
            <Link to="/counsellorprofilebuilder">
              <img
                src={
                  props.builder ? recommedationactive : recommedationinactive
                }
                className="sideimage"
                alt="sideimage"
              />
              Profile Builder
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
                src={props.counreferral ? referralinactive : referralinactive}
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
                src={props.counselorsupport ? supportactive : supportinactive}
                className="sideimage"
                alt="sideimage"
              />
              Support
            </Link>
          </div>
          <div className={"gbn"}>
            {" "}
            <span onClick={openLogoutModal}>
              <img src={logout} className="sideimage" alt="sideimage" />
              Logout
            </span>
          </div>
        </div>
      </Col>
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
    </>
  );
});
export default SideBarCounsellorDashboard;
