import * as React from "react";
import Col from "react-bootstrap/Col";
import imgCart from "../../assets/newclaritylogoa.png";
import logout from "../../assets/log-out.png";
import Overview_inactive from "../../assets/Overview_inactive.png";
import chatinactive from "../../assets/Chat with a counsellor_inactive.png";
import chatactive from "../../assets/Chat with a counsellor_active.png";
import inactiveinsight from "../../assets/inactiveinsight.png";
import activeinsight from "../../assets/insights_active.png";
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
import "../Home/Home/Home.css";
import { Link, withRouter } from 'react-router-dom';
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import union from "../../assets/Union.png";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

const SideBarNewDashboard = withRouter((props: any) => {
  const [hidemobile, sethidemobile] = React.useState(false);
  const [state, setState] = React.useState({ isloading: false });
  useEffect(() => {
  }, []);
  const clearStorageAndTakeUserToCounsellorSignUp = () => {
    localStorage.clear();
    props.history.push("/counsellor/signin");
  };
  const changeHideStatus = () => {
    sethidemobile(hidemobile ? false : true);
  };
  const checkIfUserHasMadePaymentForFullResult = () => {
    setState({
      ...state,
      isloading: true,
    });
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
        setState({
          ...state,
          isloading: false,
        });
        return window.location.assign("/dashboardsubsriptionplan");
      })
      .catch((error) => {
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const checkIfUserHasAccessToOpportunityRecommender = () => {
    const stringFeature = localStorage.getItem("accessFeature");
    const featureToCheck = stringFeature ? JSON.parse(stringFeature) : "";

    if (featureToCheck["job_recommendation"] === true) {
      console.log("Job opportunities successful");
      return window.location.assign("/jobopportunities");
    } else {
      notify("Update your subscription to access this feature");
      console.log("Can't access job opportunities");
      return setTimeout(
        (window.location.pathname = "/dashboardsubscriptionplan"),
        2000
      );
    }
  };
  const checkIfUserHasAccessToAskACounselor = () => {
    const stringFeature = localStorage.getItem("accessFeature");
    const featureToCheck = stringFeature ? JSON.parse(stringFeature) : "";
    if (featureToCheck["ask_counsellor"] === true) {
      console.log("Ask a counselor successful");
      window.location.assign("/allusermessages");
    } else {
      notify("Update your subscription to access this feature");
      console.log("Can't access ask a counselor");
      return setTimeout(
        (window.location.pathname = "/dashboardsubscriptionplan"),
        2000
      );
    }
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  const logOut = () => {
    localStorage.clear();
    window.location.assign("/signin");
  };
  return (
    <>
      <Col md={2} className={hidemobile ? "siddle siddlenone" : "siddle"}>
        <div className="dlex">
          <Link to="/overview">
            {" "}
            <img
              src={imgCart}
              className="imgCart33 sidebarlogo"
              alt="imgCart"
            />
          </Link>
        </div>{" "}
        <div
          className={hidemobile ? "navitemnone" : "navitem1 navft side_navv"}
        >
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
            {state.isloading ? (
              <Spinner variant={"info"} animation="grow" />
            ) : (
              ""
            )}
          </div>
          {/* <div className={props.chat ? "activegb" : "gbn"}>
            {" "}
            <Link to="/allusermessages">
              <img
                src={props.chat ? chatactive : chatinactive}
                className="sideimage"
                alt="sideimage"
              />
              Chat with a Counsellor
            </Link>
          </div> */}
          <div className={props.chat ? "activegb" : "gbn"}>
            {" "}
            <Accordion defaultActiveKey="">
              <Accordion.Toggle as={Card.Header} className="hpadd" eventKey="3">
                <img
                  src={props.chat ? chatactive : chatinactive}
                  className="sideimage"
                  alt="sideimage"
                />
                Talk to a Counsellor
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <Link to="/counsellordates" target="_blank">
                    <div className="task112">Book a private session</div>
                  </Link>
                  <div
                    className="task112"
                    onClick={checkIfUserHasAccessToAskACounselor}
                  >
                    Ask a Counselor
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          </div>
          <Link to="/counsellorsrecommendation">
            <div className={props.councrec ? "activegb" : "gbn"}>
              {" "}
              <img
                src={
                  props.councrec ? recommedationactive : recommedationinactive
                }
                className="sideimage"
                alt="sideimage"
              />
              Recommended Task
            </div>
          </Link>
          <div className={props.todo ? "activegb jusas" : "gbn jusas"}>
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
                  <Link to="/todolist">
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
                props.jobrec ? jobrecommedationactive : jobrecommedationinactive
              }
              className="sideimage"
              alt="sideimage"
            />
            Opportunity Recommender
          </div>
          <Link to="/profilebuilder">
            <div className={props.builder ? "activegb" : "gbn"}>
              {" "}
              <img
                src={props.builder ? profilebuilder : profilebuilderinactive}
                className="sideimage"
                alt="sideimage"
              />
              Profile Builder
            </div>
          </Link>
          <div className="divide_thro"></div>
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
          <Link to="/dashboardsubscriptionplan">
            <div className={props.subscription ? "activegb" : "gbn"}>
              {" "}
              <img
                src={
                  props.subscription ? subscriptionactive : subscriptioninactive
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
          <div className={"gbn"} onClick={logOut}>
            {" "}
            <span>
              <img src={logout} className="sideimage" alt="sideimage" />
              Logout
            </span>
          </div>
        </div>
      </Col>
    </>
  );
});
export default SideBarNewDashboard;
