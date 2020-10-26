import * as React from "react";
import Col from "react-bootstrap/Col";
import imgCart from "../../../assets/Claritylogo.png";
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
import clockactive from "../../../assets/clock_active.png"
import clockinactive from "../../../assets/clock_inactive.png"
import referralinactive from "../../../assets/referral_inactive.png"

const SideBarCounsellorDashboard = withRouter((props: any) => {
  const [hidemobile, sethidemobile] = React.useState(false);
  const changeHideStatus = () => {
    sethidemobile(hidemobile ? false : true);
  };
  const logOut = () => {
    localStorage.clear();
    window.location.assign("/");
  };
  return (
    <>
      <Col md={2} className={hidemobile ? "siddle siddlenone" : "siddle"}>
        <div className="dlex">
          <Link to="/counselloroverview">
            <img src={imgCart} className="imgCart imgCart33" alt="imgCart" />
          </Link>
        </div>{" "}
        <div className={hidemobile ? "navitemnone" : "navitem1"}>
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
            className={props.bookedsession ? "activegb" : "gbn"}
          >
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
                  props.counreferral
                    ? referralinactive
                    : referralinactive
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
            <span onClick={logOut}>
              <img src={logout} className="sideimage" alt="sideimage" />
              Logout
            </span>
          </div>
        </div>
      </Col>
    </>
  );
});
export default SideBarCounsellorDashboard;
