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
      window.location.pathname === "/payment" ||
      window.location.pathname === "/contact" ||
      window.location.pathname === "/faq" ||
      window.location.pathname === "/counsellor/signup" ||
      window.location.pathname === "/counsellor/signin"
    ) {
      setDarkNav(true)
    }
    console.log(darknav)
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    if (
      window.location.pathname === "/assessmentphasesevencomplete" ||
      window.location.pathname === "/counsellordates" ||
      window.location.pathname === "/thirdparty/pending" ||
      window.location.pathname === "/thirdparty/overpaid"
    ) {
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
        console.log(response);
        if (response.status === 200 && response.data[0].next === "home") {
          //return props.history.push(`/free/dashboard`);
        }
      })
      .catch((error) => {
        console.log(error);
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
  console.log(darknav)
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
              navStyle={{ width: "70%", background: darknav ? "#131313" : "white" }}
              showNav={showNav}
              onHideNav={() => setShowNav({ ...state, showNav: true })}
              titleStyle={{
                backgroundColor: darknav ? "#23304c" : "white",
                color: "#444444",
                paddingLeft: 10,
                paddingBottom: 0,
                paddingTop: 0,
                fontSize: 17,
                textAlign: "left",
                height: 73,
              }}
              itemStyle={{ backgroundColor: darknav ? "#131313" : "white", paddingLeft: 25 }}
              itemHoverStyle={{ backgroundColor: "inherit" }}
              title={[
                <div
                  key={uniqueKeygen()}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    background: darknav ? "#23304c" : "white",
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
                      <Link to="/">Home</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/aboutus">About</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/payment">Payments</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/contact">Contact Us</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/counsellor/signup">For Counsellors</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/faq">FAQ</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/privacy_policy">Privacy Policy</Link>
                    </div>
                  ) : (
                    " "
                  )}
                  {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/signin">
                        <div className="navmobbtn">Login</div>
                      </Link>
                    </div>
                  ) : (
                    <div className="listwraperMob">
                      <div className={darknav ? "navmobbtn" : "navmobbtn inapplogout"} onClick={logout}>
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
            <div className={darknav ? "flexsss newflexsss" : "flexsss newflexsss whitenav"}>
              <Link to="/">
                <img
                  src={darknav ? demoLogo : demoLogoLight}
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
                  <div className={darknav ? "line1 newline" : "line1 newline darkline"}></div>
                  <div className={darknav ? "line2 newline" : "line2 newline darkline"}></div>
                  <div className={darknav ? "line2 newline shrtline" : "line2 newline shrtline darkline"}></div>
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
                <Link to="/payment">Payments</Link>
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
                <Link to="/counsellor/signup">For Counsellors</Link>
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

            {/* {userLoggedIn ? (
              <div className="title1 shiftlefff newshft">
                <button className="title_t signupbtn newlogin" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="title1 shiftlefff newshft">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <Link to={!userType? "/signin" : "/counsellor/signin"}>
                  <button className="title_t signupbtn newlogin">Log In</button>
=======
>>>>>>> remotes/origin/signup_page_alex
                <Link to="/signin">
                  <button className="title_t signupbtn newlogin">Login</button>
>>>>>>> master
                </Link>
              </div>
            )} */}
          </div>
        </Row>
      </div>
    </div>
  );
});
export default newNavbar;
