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
import { Link } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import clockactive from "../../../assets/clock_active.png";
import clockinactive from "../../../assets/clock_inactive.png";
import referralinactive from "../../../assets/referral_inactive.png";
import starrating from "../../../assets/starrating.png";
import supportactive from "../../../assets/Support_active.png";

const SmallScreenNavbarAffiliates = (props: any) => {
  const [user, setNewState] = React.useState("");
  const [hidemobile, sethidemobile] = React.useState(false);
  const changeHideStatus = () => {
    sethidemobile(hidemobile ? false : true);
  };
  const [showNav, setShowNav]: any = React.useState(false);
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
    window.location.assign("/affiliates/signin");
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
                  className={
                    props.analytics ? "activecomp shifbb" : "gbn shifbb"
                  }
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
                  className={
                    props.messages ? "activecomp shifbb" : "gbn shifbb"
                  }
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
              <div className={"gbn shifbb"} onClick={logOut}>
                {" "}
                <span>
                  <img src={logout} className="sideimage" alt="sideimage" />
                  Logout
                </span>
              </div>
            </div>
          </div>,
        ]}
      />
    </div>
  );
};
export default SmallScreenNavbarAffiliates;
