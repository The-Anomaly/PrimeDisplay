import * as React from "react";
import SideNav from "react-simple-sidenav";
import Row from "react-bootstrap/Row";
import imgCart from "../../../assets/Claritylogo.png";
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
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import union from "../../assets/Union.png";


const CounsellorsDashboardMobileNav = (props: any) => {
  const [user, setNewState] = React.useState("");
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
      .catch((err) => {
      });
  };
  const logOut = () => {
    localStorage.clear();
    window.location.assign("/");
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
          // response?.data[0]?.free_plan ||
          response?.data[0]?.insight_plan === true
        ) {
          return window.location.assign("/thirdpary/fullresult");
        }
          return window.location.assign("/paymentsummary")
      })
      .catch((error) => {
      });
  };
  return (
    <div>
      <Row>
        <div className="hnav">
          <img src={imgCart} className="imgCart" alt="imgCart" />
          <div className="hamburger" onClick={() => setShowNav(true)}>
            <div className="line2a"></div>
            <div className="line2a"></div>
            <div className="line2a"></div>
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
              <div className={props.overview ? "activegb" : "gbn"}>
                <Link to="/overview">
                  <img
                    src={props.overview ? overview : Overview_inactive}
                    className="sideimage"
                    alt="sideimage"
                  />{" "}
                  Overview
                </Link>
              </div>
              <div
                onClick={checkIfUserHasMadePaymentForFullResult}
                className={props.insight ? "activegb" : "gbn"}
              >
                {" "}
                <img
                  src={props.insight ? activeinsight : inactiveinsight}
                  className="sideimage"
                  alt="sideimage"
                />
                Career Insight
              </div>
              <div className={props.chat ? "activegb" : "gbn"}>
            {" "}
            <Link to="/counsellorchat">
              <img
                src={props.chat ? chatactive : chatinactive}
                className="sideimage"
                alt="sideimage"
              />
              Chat with a Counsellor
            </Link>
          </div>
          <div className={props.todo ? "activegb" : "gbn"}>
            {" "}
            <Accordion defaultActiveKey="">
              <Accordion.Toggle as={Card.Header} className="hpadd" eventKey="5">
                <img
                  src={props.todo ? profilebuilder : profilebuilderinactive}
                  className="sideimage"
                  alt="sideimage"
                />
                Task Todo
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <Link to="/todooverview">
                    <div className="task112">Task Overview</div>
                  </Link>
                  <Link to="/todoList">
                  <div className="task112">All Task</div>
                  </Link>
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
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
              Counsellors Recommendation
            </Link>
          </div>
          <div className={props.jobrec ? "activegb" : "gbn"}>
            {" "}
            <Link to="/jobopportunities">
              <img
                src={props.jobrec ? jobrecommedationactive : jobrecommedationinactive}
                className="sideimage"
                alt="sideimage"
              />
              Job Recommendation
            </Link>
          </div>
          <div className={props.builder ? "activegb" : "gbn"}>
            {" "}
            <Link to="/profilebuilder">
              <img
                src={props.builder ? profilebuilder : profilebuilderinactive}
                className="sideimage"
                alt="sideimage"
              />
              Profile Builder
            </Link>
          </div>
              <div className="divide_thro"></div>
              {/* <div className={props.councrec ? "activegb" : "gbn"}>
                {" "}
                <Link to="/counsellorsrecommendation">
                  <img
                    src={
                      props.councrec
                        ? recommedationactive
                        : recommedationinactive
                    }
                    className="sideimage"
                    alt="sideimage"
                  />
                  Counsellors Recommendation
                </Link>
              </div> */}
              <div className={props.subscription ? "activegb" : "gbn"}>
                {" "}
                <Link to="/dashboardsubsriptionplan">
                  <img
                    src={
                      props.subscription
                        ? subscriptionactive
                        : subscriptioninactive
                    }
                    className="sideimage"
                    alt="sideimage"
                  />
                  Subscription
                </Link>
              </div>
              <div className={props.support ? "activegb" : "gbn"}>
                {" "}
                <Link to="/dashboardsupport">
                  <img
                    src={props.support ? support : supportinactive}
                    className="sideimage"
                    alt="sideimage"
                  />
                  Support
                </Link>
              </div>
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
              <div className={"gbn"}>
                {" "}
                <span onClick={logOut}>
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
export default CounsellorsDashboardMobileNav;
