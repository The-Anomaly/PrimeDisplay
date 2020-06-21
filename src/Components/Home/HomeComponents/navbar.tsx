import * as React from "react";
import demoLogo from "../../../assets/clarity.png";
import SideNav from "react-simple-sidenav";
import { Link,Redirect } from "react-router-dom";
import "../Home/animate.css";
import { NavIsLoggedOut } from "./isloggedout";
import { NavIsLoggedIn } from "./isloggedIn";
import { useEffect } from "react";

const Navbar: React.FC = (props: any) => {
  const [state, setShowNav] = React.useState({
    showNav: false,
    userLoggedIn: false,
    redirect: false,
  });
  const { showNav, userLoggedIn,redirect } = state;
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    if (token) {
      setShowNav({ ...state, userLoggedIn: true });
    } else {
      setShowNav({ ...state, userLoggedIn: false });
    }
  }, []);
  const setRedirect = () => {
    setShowNav({
      ...state,
      redirect: true,
    });
  };
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  const logout = () => {
    sessionStorage.clear();
    setRedirect()
  };
  const uniqueKeygen = (): number => {
    return Math.floor(Math.random() * 100);
  };
  return (
    <div>
      {renderRedirect()}
      {/* mobile ends */}
      <div className="Navsection ">
        <div className="top-layer">
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
        <div className="nav-wrapper">
          <div className="nav_title">
            <div className="logo_clarity">
              <Link to="/">
                <img src={demoLogo} alt="clarity_logo" />
              </Link>
            </div>
          </div>
          <div className="nav_title">
            <span className="title">
              <Link to="/">HOME</Link>
            </span>
            <span className="title">
              <Link to="/about">ABOUT</Link>
            </span>
            <span className="title">
              <Link to="/clarityforteams">SERVICES</Link>
            </span>
            {!userLoggedIn ? (
              <NavIsLoggedOut />
            ) : (
              <NavIsLoggedIn Logout={logout} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
