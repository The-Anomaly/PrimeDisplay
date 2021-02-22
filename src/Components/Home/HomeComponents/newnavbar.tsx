import * as React from "react";
import demoLogo from "../../../assets/newclaritylogoa.png";
import SideNav from "react-simple-sidenav";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../Home/animate.css";
import { NavIsLoggedOut } from "./isloggedout";
import { NavIsLoggedIn } from "./isloggedIn";
import { useEffect } from "react";
import Axios from "axios";
import { API } from "../../../config";
import { Row } from "react-bootstrap";
import demoLogoLight from "../../../assets/newclaritylogo2a.png";

const newNavbar = withRouter((props: any) => {
  const [navbar, setNavbar] = React.useState(false);
  const [state, setShowNav] = React.useState({
    showNav: false,
    userLoggedIn: false,
    redirect: false,
    userType: false,
  });
  const [darknav, setDarkNav] = React.useState(false);
  const { showNav, userLoggedIn, redirect, userType } = state;
  useEffect(() => {
    window.scrollTo(-0, -0);
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/aboutus" ||
      window.location.pathname === "/pricing" ||
      window.location.pathname === "/contact" ||
      window.location.pathname === "/faq" ||
      window.location.pathname === "/counsellor/signup" ||
      window.location.pathname === "/counsellor/signin" ||
      window.location.pathname === "/signin" ||
      window.location.pathname === "/signup" ||
      window.location.pathname === "/confirm_email" ||
      window.location.pathname === "/account_confirmation" ||
      window.location.pathname === "/password_recovery" ||
      window.location.pathname === "/counsellor/signin/forgotpassword" || 
      window.location.pathname === "/affiliates/signin" || 
      window.location.pathname === "/affiliates/signup"
    ) {
      setDarkNav(true)
    }
    // console.log(darknav)
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    if(window.location.pathname === "/counsellordates") {
      if (token) {
        setShowNav({ ...state, userLoggedIn: true });
      } else {
        setShowNav({ ...state, userLoggedIn: false });
      }
    }
    if (
      window.location.pathname === "/assessmentphasesevencomplete" ||
      window.location.pathname === "/counsellordates" ||
      window.location.pathname === "/thirdparty/pending" ||
      window.location.pathname === "/thirdparty/overpaid"
    ) {
      if (token) {
        setShowNav({ ...state, userLoggedIn: true });
      } else {
        setShowNav({ ...state, userLoggedIn: false });
      }
      return;
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
        // console.log(response);
        if (response.status === 200 && response.data[0].next === "home") {
          //return props.history.push(`/free/dashboard`);
        }
      })
      .catch((error) => {
        // console.log(error);
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
      return <Redirect to="/signin" />;
    }
  };

  const logout = () => {
    localStorage.clear();
    setRedirect();
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
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
            response.data[0].next === "phase_two_nature") ||
          response.data[0].next === "phase_two_health" ||
          response.data[0].next === "phase_two_building" ||
          response.data[0].next === "phase_two_creative"
        ) {
          return props.history.push(`/assessmentphasetwo`);
        }
        if (
          (response.status === 200 &&
            response.data[0].next === "phase_two_sports") ||
          response.data[0].next === "phase_two_business" ||
          response.data[0].next === "phase_two_stem" ||
          response.data[0].next === "phase_two_humanitarian"
        ) {
          return props.history.push(`/assessmentphasetwo1`);
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
  //console.log(darknav)
  return (
    <div>
      {renderRedirect()}
      {/* mobile ends */}
      <div className="Navsection ">
        <div className="">
          {/* mobile */}
          <div className="lakk">
            <SideNav
              openFromRight={true}
              style={{ background: showNav ? "rgba(0, 0, 0, 0.7)" : "inherit" }}
              navStyle={{ width: "70%", background:  navbar ? "white" : darknav ? "#131313" : "white" }}
              showNav={showNav}
              onHideNav={() => setShowNav({ ...state, showNav: true })}
              titleStyle={{
                backgroundColor: navbar ? "white" : darknav ? "#23304c" : "white",
                color: "#444444",
                paddingLeft: 10,
                paddingBottom: 0,
                paddingTop: 0,
                fontSize: 17,
                textAlign: "left",
                height: 73,
              }}
              itemStyle={{ backgroundColor: navbar ? "white" : darknav ? "#131313" : "white", paddingLeft: 25 }}
              itemHoverStyle={{ backgroundColor: "inherit" }}
              title={[
                <div
                  key={uniqueKeygen()}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    background: navbar ? "white" : darknav ? "#23304c" : "white",
                    padding: "0px 4px 1px 8px",
                    color: darknav ? "white" : "#9c1258",
                    fontSize: "4rem",
                  }}
                >
                  <span
                    className={
                      showNav ? "tymes animated lightSpeedIn space" : "tymes"
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
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/" className={navbar ? "lightnavlist" : ""}>Home</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/aboutus" className={navbar ? "lightnavlist" : ""}>About</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/pricing" className={navbar ? "lightnavlist" : ""}>Pricing</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/contact" className={navbar ? "lightnavlist" : ""}>Contact Us</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/forcounsellors" className={navbar ? "lightnavlist" : ""}>For Counsellors</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/faq" className={navbar ? "lightnavlist" : ""}>FAQ</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {/* {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/privacy_policy">Privacy Policy</Link>
                    </div>
                  ) : (
                    " "
                  )} */}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/signin" className={navbar ? "lightnavlist" : ""}>
                        <div className="navmobbtn">Login</div>
                      </Link>
                    </div>
                  ) : (
                    <div className="listwraperMob">
                      <div className={navbar ? "navmobbtn inapplogout" : darknav ? "navmobbtn" : "navmobbtn inapplogout"} onClick={logout}>
                        Logout
                      </div>
                    </div>
                  )}
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
            <div className={navbar ? "flexsss newflexsss whitenav" : darknav ? "flexsss newflexsss" : "flexsss newflexsss whitenav"}>
              <Link to="/">
                <img
                  src={navbar ? demoLogoLight : darknav ? demoLogo : demoLogoLight}
                  className="clarity_logo mobilelogo"
                  alt="clarity_logo"
                />
              </Link>
              <div className="hamburgerwrap">
                <div
                  className="hamburger newhamburger"
                  onClick={() =>
                    setShowNav({ ...state, showNav: !showNav ? true : false })
                  }
                >
                  <div className={navbar ? "line1 newline darkline" : darknav ? "line1 newline" : "line1 newline darkline"}></div>
                  <div className={navbar ? "line2 newline darkline" : darknav ? "line2 newline" : "line2 newline darkline"}></div>
                  <div className={navbar ? "line2 newline shrtline darkline" : darknav ? "line2 newline shrtline" : "line2 newline shrtline darkline"}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row
          md={12}
          className={
            navbar
              ? "nav-wrapper redoNav nav_margin privacynav"
              :  darknav
              ? "nav-wrapper redoNav nav_margin"
              : "nav-wrapper redoNav nav_margin privacynav"
          }
        >
          <div className="nav_titlenew">
            <Link to="/">
              <img
                src={navbar ? demoLogoLight : darknav ? demoLogo : demoLogoLight}
                alt="clarity_logo"
                className="logologo"
              />
            </Link>
          </div>
          <div className="nav_titlenew">
            {!userLoggedIn ? (
              <span className={props.home ? "title hhome" : "title"}>
                <Link to="/">Home</Link>
              </span>
            ) : (
              " "
            )}
            {!userLoggedIn ? (
              <span className={props.about ? "title hhome" : "title"}>
                <Link to="/aboutus">About Us</Link>
              </span>
            ) : (
              " "
            )}
            {!userLoggedIn ? (
              <span className={props.payments ? "title hhome" : "title"}>
                <Link to="/pricing">Pricing</Link>
              </span>
            ) : (
              " "
            )}
            {!userLoggedIn ? (
              <span className={props.contact ? "title hhome" : "title"}>
                <Link to="/contact">Contact Us</Link>
              </span>
            ) : (
              " "
            )}
            {!userLoggedIn ? (
              <span className={props.counselor ? "title hhome" : "title"}>
                <Link to="/forcounsellors">For Counsellors</Link>
              </span>
            ) : (
              ""
            )}
            {!userLoggedIn ? (
              <span className={props.faq ? "title hhome" : "title"}>
                <Link to="/faq">FAQ</Link>
              </span>
            ) : (
              ""
            )}
            {!userLoggedIn ? (
              <NavIsLoggedOut />
            ) : (
              <NavIsLoggedIn Logout={logout} />
            )}
          </div>
        </Row>
      </div>
    </div>
  );
});
export default newNavbar;
