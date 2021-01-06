import * as React from "react";
import Col from "react-bootstrap/Col";
import imgCart from "../../../assets/newclaritylogoa.png";
import logout from "../../../assets/log-out.png";
import Overview_inactive from "../../../assets/dashboard.png";
import chatinactive from "../../../assets/user_voice.png";
import chatactive from "../../../assets/user_voice.png";
import inactiveinsight from "../../../assets/bar_chart.png";
import activeinsight from "../../../assets/bar_chart.png";
import recommedationactive from "../../../assets/Counsellors recommendation_active.png";
import recommedationinactive from "../../../assets/Counsellors recommendation_inactive.png";
import jobrecommedationactive from "../../../assets/Job recommendation_active.png";
import jobrecommedationinactive from "../../../assets/Job recommendation_inactive.png";
import settingsactive from "../../../assets/settings.png";
import settingsinactive from "../../../assets/Settings_inactive.png";
import supportinactive from "../../../assets/Support_inactive.png";
import supportactive from "../../../assets/Support_active.png";
import overview from "../../../assets/dashboard.png";
import "../../Home/Home/Home.css";
import { Link, withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import "../CouncellorDasboard/councellor.css";
import "./affiliate.css";
import logoutImage from "../../../assets/logout.png";
import { Modal } from "react-bootstrap";

const SideBarAffilliateDashboard = withRouter((props: any) => {
  const [hidemobile, sethidemobile] = React.useState(false);
  const changeHideStatus = () => {
    sethidemobile(hidemobile ? false : true);
  };
  const [logoutState, setLogoutState] = React.useState({ logoutModal: false });
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
  const { logoutModal } = logoutState;

  const logOut = () => {
    localStorage.clear();
    window.location.assign("/affiliates/signin");
  };
  return (
    <>
      <Col md={2} className={hidemobile ? "siddle siddlenone" : "siddle"}>
        <div className="dlex">
          <Link to="/">
            <img
              src={imgCart}
              className="imgCart33 sidebarlogo"
              alt="imgCart"
            />
          </Link>
        </div>{" "}
        <div className={hidemobile ? "navitemnone" : "navitem1 newitem"}>
          <Link to="/affiliates">
            <div className={props.ov ? "activecomp shifbb" : "gbn shifbb"}>
              <img
                src={props.ov ? overview : Overview_inactive}
                className="sideimage"
                alt="sideimage"
              />{" "}
              Dashboard
            </div>
          </Link>
          <Link to="/affiliates/analytics">
            <div
              className={props.analytics ? "activecomp shifbb" : "gbn shifbb"}
            >
              <img
                src={props.bookedsession ? activeinsight : inactiveinsight}
                className="sideimage"
                alt="sideimage"
              />
              Behavioural Analytics
            </div>
          </Link>
          <Link to="/counsellor/signup">
            <div
              className={props.messages ? "activecomp shifbb" : "gbn shifbb"}
            >
              {" "}
              <img
                src={props.messages ? chatactive : chatinactive}
                className="sideimage"
                alt="sideimage"
              />
              Become a Counsellor
            </div>
          </Link>

          <div className="divide_thro shifbb"></div>
          <div className={"gbn shifbb"} onClick={openLogoutModal}>
            {" "}
            <span>
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
    </>
  );
});
export default SideBarAffilliateDashboard;
