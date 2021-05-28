import * as React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";

const NavBar = (props: any) => {
  const [nav, setNav] = React.useState({
    location: true,
  })
  const { location } = nav;
  React.useEffect(() => {
    if(window.location.pathname !== "/") {
      setNav({
        ...nav,
        location: false,
      })
    }
  }, [])
  let history = useHistory();
  const contact = () => {
    return history.push("/contact");
  }
  return (
    <>
      <header className={location ? "p-nav p-nav-bg" : "p-nav"}>
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
                About Us
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
                Contact Us
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
                Buy
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
        <div className="p-nav-mobile"></div>
      </header>
    </>
  );
};

export default NavBar;
