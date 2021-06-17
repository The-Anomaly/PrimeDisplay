import * as React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import SideNav from "react-simple-sidenav";
import { useDebouncedCallback } from "use-debounce";

const NavBar = (props: any) => {
  const [nav, setNav] = React.useState({
    location: true,
    scrollNav: false,
    showNav: false,
  });
  const { location, scrollNav, showNav } = nav;
  React.useEffect(() => {
    if (window.location.pathname !== "/") {
      setNav({
        ...nav,
        location: false,
      });
    }
  }, []);
  let history = useHistory();
  const contact = () => {
    return history.push("/contact");
  };
  const handleScroll = useDebouncedCallback(() => {
    if (window.scrollY > 75) {
      setNav({
        ...nav,
        scrollNav: true,
      });
    } else {
      setNav({
        ...nav,
        scrollNav: false,
      });
    }
  });
  window.addEventListener("scroll", handleScroll);
  const uniqueKeygen = (): number => {
    return Math.floor(Math.random() * 100);
  };
  return (
    <>
      <header className={scrollNav ? "p-nav p-nav-bg p-nav-fix" : "p-nav"}>
        <div className="p-nav-desktop">
          <Link to="/">
            <img className="p-logo" src={logo} alt="logo" />
          </Link>
          <nav className="p-nav-list">
            <Link className="p-nav-list-items" to="/">
              <span
                className={
                  props.home
                    ? "p-nav-list-items p-nav-list-items-active"
                    : "p-nav-list-items"
                }
              >
                Home
              </span>
            </Link>
            <Link className="p-nav-list-items" to="/about">
              <span
                className={
                  props.about
                    ? "p-nav-list-items p-nav-list-items-active"
                    : "p-nav-list-items"
                }
              >
                About
              </span>
            </Link>
            <Link className="p-nav-list-items" to="/buy">
              <span
                className={
                  props.buy
                    ? "p-nav-list-items p-nav-list-items-active"
                    : "p-nav-list-items"
                }
              >
                Product
              </span>
            </Link>
            <Link className="p-nav-list-items" to="/services">
              <span
                className={
                  props.services
                    ? "p-nav-list-items p-nav-list-items-active"
                    : "p-nav-list-items"
                }
              >
                Services
              </span>
            </Link>
            <Link className="p-nav-list-items" to="/contact">
              <span
                className={
                  props.contact
                    ? "p-nav-list-items p-nav-list-items-active"
                    : "p-nav-list-items"
                }
              >
                Contact
              </span>
            </Link>
          </nav>
          <button
            className={location ? "p-nav-btn" : "p-nav-btn p-btn-outline"}
            onClick={contact}
          >
            Get in Touch
          </button>
        </div>
        <div className="p-nav-mobile">
          <SideNav
            openFromRight={true}
            style={{ background: showNav ? "transparent" : "inherit" }}
            navStyle={{ width: "70%", background: "#fbf9ef" }}
            showNav={showNav}
            onHideNav={() => setNav({ ...nav, showNav: false })}
            titleStyle={{
              backgroundColor: "#fbf9ef",
              color: "#444444",
              paddingLeft: 10,
              paddingBottom: 0,
              paddingTop: 0,
              fontSize: 17,
              textAlign: "left",
              height: 73,
            }}
            itemStyle={{ backgroundColor: "#fbf9ef", paddingLeft: 25 }}
            itemHoverStyle={{ backgroundColor: "inherit" }}
            title={[
              <div
                key={uniqueKeygen()}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  background: "#fbf9ef",
                  padding: "0px 4px 1px 8px",
                  color: "#99cc33",
                  fontSize: "4rem",
                }}
              >
                <span
                  className=""
                  onClick={() =>
                    setNav({ ...nav, showNav: !showNav ? true : false })
                  }
                >
                  &times;
                </span>
              </div>,
            ]}
            items={[
              <div>
                <div className="navbar-nav mr-auto p-navlist-mobile">
                  <Link className="p-nav-list-items" to="/">
                    <span
                      className={
                        props.home
                          ? "p-nav-list-items p-nav-list-items-active"
                          : "p-nav-list-items"
                      }
                    >
                      Home
                    </span>
                  </Link>
                  <Link className="p-nav-list-items" to="/about">
                    <span
                      className={
                        props.about
                          ? "p-nav-list-items p-nav-list-items-active"
                          : "p-nav-list-items"
                      }
                    >
                      About
                    </span>
                  </Link>
                  <Link className="p-nav-list-items" to="/buy">
                    <span
                      className={
                        props.buy
                          ? "p-nav-list-items p-nav-list-items-active"
                          : "p-nav-list-items"
                      }
                    >
                      Product
                    </span>
                  </Link>
                  <Link className="p-nav-list-items" to="/services">
                    <span
                      className={
                        props.services
                          ? "p-nav-list-items p-nav-list-items-active"
                          : "p-nav-list-items"
                      }
                    >
                      Services
                    </span>
                  </Link>
                  <Link className="p-nav-list-items" to="/contact">
                    <span
                      className={
                        props.contact
                          ? "p-nav-list-items p-nav-list-items-active"
                          : "p-nav-list-items"
                      }
                    >
                      Contact
                    </span>
                  </Link>
                  <button
                    className={
                      location ? "p-nav-btn" : "p-nav-btn p-btn-outline"
                    }
                    onClick={contact}
                  >
                    Get in Touch
                  </button>
                </div>
              </div>,
            ]}
          />
          <nav className="p-nav-ctrl">
            <Link to="/">
              <img className="p-logo navbar-brand" src={logo} alt="logo" />
            </Link>
            <div
              className="p-nav-mobile-toggle"
              onClick={() =>
                setNav({ ...nav, showNav: !showNav ? true : false })
              }
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line1"></div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
