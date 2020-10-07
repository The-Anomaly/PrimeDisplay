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
import overview from "../../../assets/overview.png";
import "../../Home/Home/Home.css";
import { Link, withRouter } from 'react-router-dom';
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import "./councellor.css";

const SideBarCounsellorDashboard =withRouter((props: any) => {
  const [hidemobile, sethidemobile] = React.useState(false);
  const changeHideStatus = () => {
    sethidemobile(hidemobile ? false : true);
  };
  const checkIfUserHasMadePaymentForFullResult = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (
          response?.data[0]?.direction_plan ||
          response?.data[0]?.growth_plan ||
          response?.data[0]?.insight_plan === true
        ) {
          return window.location.assign("/thirdpary/fullresult");
        }
        if (
          response?.data[0]?.direction_plan &&
          response?.data[0]?.growth_plan &&
          response?.data[0]?.insight_plan === false
        ) {
          return window.location.assign("/paymentsummary");
        }
      })
      .catch((error) => {
      });
  };
  const logOut = () => {
    localStorage.clear();
    window.location.assign("/");
  };
  return (
    <>
      <Col md={2} className={hidemobile ? "siddle siddlenone" : "siddle"}>
        <div className="dlex">
          <img src={imgCart} className="imgCart imgCart33" alt="imgCart" />
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
            onClick={checkIfUserHasMadePaymentForFullResult}
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
            <Link to="/counsellorbookings">
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
            <Link to="/counsellorsrecommendation">
              <img
                src={
                  props.councrec ? recommedationactive : recommedationinactive
                }
                className="sideimage"
                alt="sideimage"
              />
              Your Recommendations
            </Link>
          </div>
          <div className={props.jobrec ? "activegb" : "gbn"}>
            {" "}
            <Link to="/jobopportunities">
              <img
                src={
                  props.jobrec
                    ? jobrecommedationactive
                    : jobrecommedationinactive
                }
                className="sideimage"
                alt="sideimage"
              />
              Assigned Members
            </Link>
          </div>
          <div className="divide_thro"></div>
          <div className={props.settings ? "activegb" : "gbn"}>
            {" "}
            <Link to="/dashboardsettings">
              <img
                src={props.settings ? settingsactive : settingsinactive}
                className="sideimage"
                alt="sideimage"
              />
              Settings
            </Link>
          </div>
          <div className={props.subscription ? "activegb" : "gbn"}>
            {" "}
            <Link to="/dashboardsubsriptionplan">
              <img
                src={
                  props.subscription ? subscriptionactive : subscriptioninactive
                }
                className="sideimage"
                alt="sideimage"
              />
              Support
            </Link>
          </div>
          <div className={props.support ? "activegb" : "gbn"}>
            {" "}
            <Link to="dashboardsupport">
              <img
                src={props.support ? starrating : starrating}
                className="sideimage"
                alt="sideimage"
              />
              Ratings
            </Link>
          </div>
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
