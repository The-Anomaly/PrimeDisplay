import * as React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";

const NavBar = (props: any) => {
  const [nav, setNav] = React.useState({
    location: true,
    extendedBuy: false,
  })
  const { location, extendedBuy } = nav;
  React.useEffect(() => {
    if(window.location.pathname !== "/") {
      setNav({
        ...nav,
        location: false,
      })
    }
    if(window.location.pathname !== "/buy/:product") {
      setNav({
        ...nav,
        extendedBuy: true,
      })
    }
  }, [])
  let history = useHistory();
  const contact = () => {
    return history.push("/contact");
  }
  return (
    <>
      <header className={!extendedBuy ? "p-nav" : "p-nav p-nav-bg"}>
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
          </nav>
          <button className={location ? "p-nav-btn" : "p-nav-btn p-btn-outline"} onClick={contact}>Get in Touch</button>
        </div>
        <div className="p-nav-mobile">
          <nav className="navbar navbar-expand-lg p-nav-bg">
            <Link to="/">
              <img className="p-logo navbar-brand" src={logo} alt="logo" />
            </Link>
            <div className="p-nav-mobile-toggle" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line1"></div>
            </div>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                <button className={location ? "p-nav-btn" : "p-nav-btn p-btn-outline"} onClick={contact}>Get in Touch</button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
