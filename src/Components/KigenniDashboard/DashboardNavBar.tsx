import * as React from "react";
import SideNav from "react-simple-sidenav";
import Row from "react-bootstrap/Row";
import imgCart from "../../assets/Claritylogo.png";
import Col from "react-bootstrap/Col";
import activeinsight from "../../assets/insights_active.png";
import Overview_inactive from "../../assets/Overview_inactive.png";
import chatinactive from "../../assets/Chat with a counsellor_inactive.png";
import chatactive from "../../assets/Chat with a counsellor_active.png";
import inactiveinsight from "../../assets/inactiveinsight.png";
import recommedationactive from "../../assets/Counsellors recommendation_active.png";
import recommedationinactive from "../../assets/Counsellors recommendation_inactive.png";
import jobrecommedationactive from "../../assets/Job recommendation_active.png";
import jobrecommedationinactive from "../../assets/Job recommendation_inactive.png";
import settingsactive from "../../assets/settings.png";
import settingsinactive from "../../assets/Settings_inactive.png";
import subscriptionactive from "../../assets/Subcription_active.png";
import subscriptioninactive from "../../assets/Subscription_inactive.png";
import profilebuilder from "../../assets/Profile builder_active.png";
import profilebuilderinactive from "../../assets/Profile builder_inactive.png";
import support from "../../assets/Support_active.png";
import supportinactive from "../../assets/Support_inactive.png";
import overview from "../../assets/overview.png";
import logout from "../../assets/log-out.png";
import "../Home/Home/Home.css";
import { Link } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import union from "../../assets/Union.png";
import { toast } from "react-toastify";

const DashboardNav = (props: any) => {
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
      .catch((err) => {});
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
        if (response?.data[0]?.view_result === true) {
          return window.location.assign("/thirdpary/fullresult");
        }
        notify("Update your subscription to access this feature");
        return window.location.assign("/dashboardsubsriptionplan");
        // setTimeout(()=>{
        //   window.location.assign("/paymentsummary"),
        // }, 2000);
      })
      .catch((error) => {});
  };
  const checkIfUserHasAccessToOpportunityRecommender = () => {
    const stringFeature = localStorage.getItem("accessFeature");
    const featureToCheck = stringFeature
      ? JSON.parse(stringFeature)
      : "";

    if (featureToCheck["job_recommendation"] === true) {
      console.log("Job opportunities successful");
      window.location.assign("/jobopportunities");
    } else {
      notify("Update your subscription to access this feature");
      console.log("Can't access job opportunities");
      return setInterval((window.location.pathname = "/dashboardsubsriptionplan"), 2000);
    }
  };
  const checkIfUserHasAccessToAskACounselor = () => {
    const stringFeature = localStorage.getItem("accessFeature");
    const featureToCheck = stringFeature
      ? JSON.parse(stringFeature)
      : "";

    if (featureToCheck["ask_counsellor"] === true) {
      console.log("Ask a counselor successful");
      window.location.assign("/allusermessages");
    } else {
      notify("Update your subscription to access this feature");
      console.log("Can't access ask a counselor");
      return setInterval((window.location.pathname = "/dashboardsubsriptionplan"), 2000);
    }
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <div>
      <Row>
        <div className="hnav">
          <Link to="/" className="ddaa">
            {" "}
            <img src={imgCart} className="imgCart" alt="imgCart" />
          </Link>
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
                <Link to="/overview">
              <div className={props.overview ? "activegb" : "gbn"}>
                  <img
                    src={props.overview ? overview : Overview_inactive}
                    className="sideimage"
                    alt="sideimage"
                  />{" "}
                  Overview
              </div>
              </Link>
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
              {/* <div className={props.chat ? "activegb" : "gbn"}>
                {" "}
                <Link to="/allusermessages">
                  <img
                    src={props.chat ? chatactive : chatinactive}
                    className="sideimage"
                    alt="sideimage"
                  />
                  Talk to a Counsellor
                </Link>
              </div> */}
              <div className={props.chat ? "activegb" : "gbn"}>
                {" "}
                <Accordion defaultActiveKey="">
                  <Accordion.Toggle
                    as={Card.Header}
                    className="hpadd"
                    eventKey="3"
                  >
                    <img
                      src={props.chat ? chatactive : chatinactive}
                      className="sideimage"
                      alt="sideimage"
                    />
                    Talk to a Counselor
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <Link to="/counsellordates">
                        <div className="task112">Book a private session</div>
                      </Link>
                        <div className="task112" onClick={checkIfUserHasAccessToAskACounselor}>Ask a Counselor</div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Accordion>
              </div>
                <Link to="/counsellorsrecommendation">
              <div className={props.councrec ? "activegb" : "gbn"}>
                {" "}
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
              </div>
                </Link>
              <div className={props.todo ? "activegb" : "gbn"}>
                {" "}
                <Accordion defaultActiveKey="">
                  <Accordion.Toggle
                    as={Card.Header}
                    className="hpadd"
                    eventKey="5"
                  >
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
              <div
                className={props.jobrec ? "activegb" : "gbn"}
                onClick={checkIfUserHasAccessToOpportunityRecommender}
              >
                {" "}
                <img
                  src={
                    props.jobrec
                      ? jobrecommedationactive
                      : jobrecommedationinactive
                  }
                  className="sideimage"
                  alt="sideimage"
                />
                Opportunity Recommended
              </div>
                <Link to="/profilebuilder">
              <div className={props.builder ? "activegb" : "gbn"}>
                {" "}
                  <img
                    src={
                      props.builder ? profilebuilder : profilebuilderinactive
                    }
                    className="sideimage"
                    alt="sideimage"
                  />
                  Profile Builder
              </div>
                </Link>
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
                <Link to="/dashboardsubsriptionplan">
              <div className={props.subscription ? "activegb" : "gbn"}>
                {" "}
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
              </div>
                </Link>
                <Link to="/dashboardsupport">
              <div className={props.support ? "activegb" : "gbn"}>
                {" "}
                  <img
                    src={props.support ? support : supportinactive}
                    className="sideimage"
                    alt="sideimage"
                  />
                  Support
              </div>
                </Link>
                <Link to="/dashboardsettings">
              <div className={props.settings ? "activegb" : "gbn"}>
                {" "}
                  <img
                    src={props.settings ? settingsactive : settingsinactive}
                    className="sideimage"
                    alt="sideimage"
                  />
                  Settings
              </div>
                </Link>
              <div className={"gbn"} onClick={logOut}>
                {" "}
                <span >
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
export default DashboardNav;
