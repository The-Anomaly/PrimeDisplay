import * as React from "react";
import demoLogo from "../../../assets/claritydemo.png";
import SideNav from "react-simple-sidenav";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../Home/animate.css";
import { NavIsLoggedOut } from "./isloggedout";
import { NavIsLoggedIn } from "./isloggedIn";
import { useEffect } from "react";
import Axios from "axios";
import { API } from "../../../config";
import { Row } from "react-bootstrap";
import demoLogoLight from "../../../assets/demologolight.png";

const newNavbar = withRouter((props: any) => {
  const [navbar, setNavbar] = React.useState(false);
  const [state, setShowNav] = React.useState({
    showNav: false,
    userLoggedIn: false,
    redirect: false,
  });
  const { showNav, userLoggedIn, redirect } = state;
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    if(window.location.pathname==="/counsellordates"){
      return
    }
    if (token) {
      setShowNav({ ...state, userLoggedIn: true });
    } else {
      setShowNav({ ...state, userLoggedIn: false });
    }
      Axios.get(`${API}/progress`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((response) => {
          if (response.status === 200 && response.data[0].next === "home") {
            return props.history.push(`/free/dashboard`);
          }
        })
        .catch((error) => {
         console.log(error) 
        });
  }, []);
  const setRedirect = () => {
    setShowNav({
      ...state,
      redirect: true,
    });
  };
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const logout = () => {
    localStorage.clear();
    setRedirect();
  };

  const handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY > 750) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  const getCurrentAssessmentPosition = (): void => {
    const availableToken = localStorage.getItem("userToken");
    const token: string = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get(`${API}/progress`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
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
          return props.history.push(`/assessmentphasefour1`);
        }
        if (response.status === 200 && response.data[0].next === "phase_one") {
          return props.history.push(`/assessmentphaseone`);
        }
        if (response.status === 200 && response.data[0].next === "phase_two") {
          return props.history.push(`/assessmentphasetwo`);
        }
        if (
          response.status === 200 &&
          response.data[0].next === "phase_three"
        ) {
          return props.history.push(`/assessmentphasethree`);
        }
        if (response.status === 200 && response.data[0].next === "phase_five") {
          return props.history.push(`/assessmentphasefive`);
        }
        if (response.status === 200 && response.data[0].next === "phase_six") {
          return props.history.push(`/assessmentphasesix`);
        }
        if (
          response.status === 200 &&
          response.data[0].next === "phase_seven"
        ) {
          return props.history.push(`/assessmentphaseseven`);
        }
        if (response.status === 200 && response.data[0].next === "home") {
          return props.history.push(`/free/dashboard`);
        }
      })
      .catch((error) => {});
  };
  const uniqueKeygen = (): number => {
    return Math.floor(Math.random() * 100);
  };
  return (
    <div>
      {renderRedirect()}
      {/* mobile ends */}
      <div className="Navsection ">
        <div className="">
          {/* mobile */}
          <div className="lakk">
            <SideNav
              style={{ background: showNav ? "rgba(0, 0, 0, 0.7)" : "inherit" }}
              navStyle={{ width: "70%", background: "#131313" }}
              showNav={showNav}
              onHideNav={() => setShowNav({ ...state, showNav: true })}
              titleStyle={{
                backgroundColor: "#9c1258",
                color: "#444444",
                paddingLeft: 10,
                paddingBottom: 0,
                paddingTop: 0,
                fontSize: 17,
                textAlign: "left",
              }}
              itemStyle={{ backgroundColor: "#131313", paddingLeft: 25 }}
              itemHoverStyle={{ backgroundColor: "inherit" }}
              title={[
                <div
                  key={uniqueKeygen()}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    background: "#9c1258",
                    padding: "0px 4px 1px 8px",
                    color: "white",
                    fontSize: "4rem",
                  }}
                >
                  <span
                    className={
                      showNav ? "tymes animated lightSpeedIn" : "tymes"
                    }
                    onClick={() =>
                      setShowNav({ ...state, showNav: !showNav ? true : false })
                    }
                  >
                    &times;
                  </span>
                </div>,
              ]}
              items={[
                <div
                  className={
                    showNav ? "listwraper animated fadeInLeft" : "listwraper"
                  }
                >
                  <div className="listwraperMob">
                    <Link to="/">Home</Link>
                  </div>
                  <div className="listwraperMob">
                    <Link to="/about">About</Link>
                  </div>
                  <div className="listwraperMob">
                    <Link to="/clarityforteams">Services</Link>
                  </div>
                  <div className="listwraperMob">
                    <Link to="/faq">Faq</Link>
                  </div>
                  <div className="listwraperMob">Privacy Policy</div>
                  {/* {!userLoggedIn && (
                    <>
                      <div className="listwraperMob">
                        <Link to="/signin">
                          <div className="navmobbtn">Login</div>
                        </Link>
                      </div>
                      <div className="listwraperMob">
                        <Link to="/signup">
                          <div className="navmobbtn">Sign Up</div>
                        </Link>
                      </div>
                    </>
                  )} */}
                  {/* {userLoggedIn && (
                    <>
                      <div className="listwraperMob">
                        <div className="navmobbtn" onClick={logout}>
                          Logout
                        </div>
                      </div>
                      <div className="listwraperMob">
                        <div
                          className="navmobbtn"
                          onClick={getCurrentAssessmentPosition}
                        >
                          Dashboard
                        </div>
                      </div>
                    </>
                  )} */}
                </div>,
              ]}
            />
            <div className="flexsss">
              <Link to="/">
                <img
                  src={demoLogo}
                  className="clarity_logo"
                  alt="clarity_logo"
                />
              </Link>
              <div className="hamburgerwrap">
                <div
                  className="hamburger"
                  onClick={() =>
                    setShowNav({ ...state, showNav: !showNav ? true : false })
                  }
                >
                  <div className="line1"></div>
                  <div className="line2"></div>
                  <div className="line2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row md={12} className={
              navbar ? "nav-wrapper redoNav nav_margin privacynav" : "nav-wrapper redoNav nav_margin"
            }>
            <div className="nav_titlenew">
              <div className="logo_clarity logo_clarity_new">
                <Link to="/">
                  <img
                    src={navbar ? demoLogoLight : demoLogo}
                    alt="clarity_logo"
                  />
                </Link>
              </div>
            </div>
            <div className="nav_titlenew">
              <span className={props.home ? "title hhome" : "title"}>
                <Link to="/redesign">Home</Link>
              </span>
              <span className={props.about ? "title hhome" : "title"}>
                <Link to="/aboutus">About Us</Link>
              </span>
              <span className={props.payments ? "title hhome" : "title"}>
                <Link to="/payment">Payments</Link>
              </span>
              <span className={props.contact ? "title hhome" : "title"}>
                <Link to="/contact">Contact Us</Link>
              </span>
              <span className={props.ask ? "title hhome" : "title"}>
                <Link to="/about">FAQ</Link>
              </span>
              {/* <span className="title">
              <Link to="/clarityforteams">SERVICES</Link>
            </span> */}
              {/* {!userLoggedIn ? (
                <NavIsLoggedOut />
              ) : (
                <NavIsLoggedIn Logout={logout} />
              )} */}
              <div className="title1 shiftlefff">
                <Link to="/signin">
                  <button className="title_t signupbtn newlogin">Login</button>
                </Link>
              </div>
            </div>
        </Row>
      </div>
    </div>
  );
});
export default newNavbar;
