import * as React from "react";
import demoLogoLight from "../../../assets/newclaritylogo2a.png";
import SideNav from "react-simple-sidenav";
import { Link, withRouter } from "react-router-dom";
import { Row } from "react-bootstrap";
import "../../Home/Home/Home.css";
import "./counsellorlanding.css";

const counsellorNavbar = withRouter((props: any) => {
  const [state, setShowNav] = React.useState({
    showNav: false,
  });
  const { showNav} = state;
  const uniqueKeygen = (): number => {
    return Math.floor(Math.random() * 100);
  };
  React.useEffect(() => {
    const userType = localStorage.getItem("user");
      const getUser = userType
      ? JSON.parse(userType)
      : "";
      // console.log(userType)
      // console.log(getUser)
      // console.log(getUser[0]?.is_counsellor);
    const userTypeToken = localStorage.getItem("userToken");
      const getUserToken = userTypeToken
      ? JSON.parse(userTypeToken)
      : "";
      //console.log(getUserToken);
      if(getUser[0]?.is_counsellor && getUserToken) {
        window.location.assign("/counselloroverview");
      }
  })
  return (
    <>
    {/* Desktop Nav */}
      <Row md={12} className="counsellorNav">
        <div className="nav_titlenew">
          <Link to="/forcounsellors">
            <img src={demoLogoLight} alt="clarity_logo" className="logologo" />
          </Link>
          <div className="logotext">
          <div>Clarity</div>
          <div>For Counsellors</div>
          </div>
        </div>
        <div className="nav_titlenew">
        {/* <div className="title1 shiftlefff newshft">
            <Link to="/forcounsellors">
              <div className={props.home ? "title_t toindividual counsellorhome" : "title_t toindividual"}>Home</div>
            </Link>
          </div> */}
          <div className="title1 shiftlefff newshft">
            <Link to="/">
              <div className="title_t toindividual">For Individuals</div>
            </Link>
          </div>

          <div className="title1 shiftlefff newshft">
            <Link to="/counsellor/signup">
              <button className="title_t signupbtn newlogin">Sign Up</button>
            </Link>
          </div>
        </div>
      </Row>
      {/* Mobile Nav */}
      <div className="lakk">
            <SideNav
              openFromRight={true}
              style={{ background: showNav ? "rgba(0, 0, 0, 0.7)" : "inherit" }}
              navStyle={{ width: "70%", background: "white" }}
              showNav={showNav}
              onHideNav={() => setShowNav({ ...state, showNav: true })}
              titleStyle={{
                backgroundColor: "white",
                color: "#444444",
                paddingLeft: 10,
                paddingBottom: 0,
                paddingTop: 0,
                fontSize: 17,
                textAlign: "left",
                height: 73,
              }}
              itemStyle={{ backgroundColor:"white", paddingLeft: 25 }}
              itemHoverStyle={{ backgroundColor: "inherit" }}
              title={[
                <div
                  key={uniqueKeygen()}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    background:"white",
                    padding: "0px 4px 1px 8px",
                    color:"#9c1258",
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
                  
                    {/* <div className="listwraperMob">
                      <Link to="/forcounsellors" className="smnav">Home</Link>
                    </div> */}
                    <div className="listwraperMob">
                      <Link to="/" className="smnav">For Individuals</Link>
                    </div>
                  
                    <div className="listwraperMob">
                      <Link to="/counsellor/signup" className="navmobbtn smnav">Sign Up</Link>
                    </div>
                  {/* {!userLoggedIn ? (
                    <div className="listwraperMob">
                      <Link to="/signin">
                        <div className="navmobbtn">Login</div>
                      </Link>
                    </div>
                  ) : (
                    <div className="listwraperMob">
                      <div className="navmobbtn inapplogout" onClick={logout}>
                        Logout
                      </div>
                    </div>
                  )} */}
                </div>,
              ]}
            />
            <div className="flexsss newflexsss whitenav mobilenavfixed">
              <Link to="/forcounsellors" className="smlogotxt">
                <img
                  src={demoLogoLight}
                  className="clarity_logo mobilelogo"
                  alt="clarity_logo"
                />
                <div className="logotext">
                <div>Clarity</div>
                <div>For Counsellors</div>
          </div>
              </Link>
              
              <div className="hamburgerwrap">
                <div
                  className="hamburger newhamburger"
                  onClick={() =>
                    setShowNav({ ...state, showNav: !showNav ? true : false })
                  }
                >
                  <div className="line1 newline darkline"></div>
                  <div className="line2 newline darkline"></div>
                  <div className="line2 newline shrtline darkline"></div>
                </div>
              </div>
            </div>
          </div>
        
    </>
  );
});

export default counsellorNavbar;
