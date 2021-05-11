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
import { Link, withRouter } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import logoutImage from "../../assets/logout.png";
import { toast } from "react-toastify";
import { Modal, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import failedNotice from "../../assets/failedNotice.png";

const SideBarNewDashboard = withRouter((props: any) => {
  const [hidemobile, sethidemobile] = React.useState(false);
  const [state, setState] = React.useState({ isloading: false });
  const [upgradeState, setUpgradeState] = React.useState(false);
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
  useEffect(() => {
    const User1 = localStorage.getItem("user");
    const User2 = User1 ? JSON.parse(User1) : "";
    if (User2[0]?.is_counsellor == true) {
      return window.location.assign("/counselloroverview");
    }
  }, []);
  const closeUpgradeModal = () => {
    setUpgradeState(false);
  };
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
        // console.log(response)
        if (response?.data[0]?.view_result === true) {
          return window.location.assign("/thirdpary/fullresult");
        }
        setState({
          ...state,
          isloading: false,
        });
        // return window.location.assign("/dashboardsubscriptionplan");
        return setUpgradeState(true);
      })
      .catch((error) => {
        setState({
          ...state,
          isloading: false,
        });
      });
  };
  const checkIfUserHasAccessToOpportunityRecommender = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        // console.log(response);
        if (response?.data[0]?.job_recommendation === true) {
          return  window.location.assign("/jobopportunities");;
        }
        else {
          return setUpgradeState(true);;
        }
      })
      .catch((error) => {
        // console.log(error);
        // console.error("Payment Status Error");
      });
  };
  const checkIfUserHasAccessToAskACounselor = () => {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        // console.log(response);
        if (response?.data[0]?.ask_counsellor === true) {
          return  window.location.assign("/allusermessages");;
        }
        else {
          return setUpgradeState(true);;
        }
      })
      .catch((error) => {
        // console.log(error);
        // console.error("Payment Status Error");
      });
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
          className={hidemobile ? "navitemnone" : "navitem1 newitemz navitem2 navft side_navv"}
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
            Career Insights
            {state.isloading ? (
              <Spinner variant={"info"} animation="grow" />
            ) : (
              ""
            )}
          </div>
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
                  <Link to="/allbookedsessions">
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
              Recommended Tasks
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
                Career Todo List
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
          <div className={"gbn"} onClick={openLogoutModal}>
            {" "}
            <span>
              <img src={logout} className="sideimage" alt="sideimage" />
              Logout
            </span>
          </div>
        </div>
      </Col>
      <Modal show={upgradeState} centered={true} onHide={closeUpgradeModal}>
        <Modal.Body>
          <div className="text-center">
            {" "}
            <img
              src={failedNotice}
              className="failedNotice"
              alt="failedNotice"
            />{" "}
          </div>
          <div className="onhno no-access-ttl"> Oh No! </div>
          <div className="onhno no-access-txt">
            This package is not available on this plan <br /> Please Upgrade
            your Plan
          </div>
          <div className="text-center planupgrade">
            <div className="retaketest upss1 planupgradebtn">
              <Link to="/dashboardsubscriptionplan">
                View your current plan
              </Link>
            </div>
            {/* <div className="retaketest upss1 planupgradebtn">
                    <Link to="/paymentsummary">Upgrade your plan</Link>
                  </div> */}
          </div>
        </Modal.Body>
      </Modal>
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
            Are you sure you want to <b> LogOut?</b>
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
export default SideBarNewDashboard;
