import * as React from "react";
import demoLogo from "../../../assets/clarity.png";
import SideNav from "react-simple-sidenav";
import { Link, Redirect, withRouter } from "react-router-dom";
import "../Home/animate.css";
import { NavIsLoggedOut } from "./isloggedout";
import { NavIsLoggedIn } from "./isloggedIn";
import { useEffect } from "react";
import Axios from "axios";
import { API } from "../../../config";

const newNavbar = () => {
  return (
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
          <Link to="/">Home</Link>
        </span>
        <span className="title">
          <Link to="/about">About Us</Link>
        </span>
        <span className="title">
          <Link to="/about">Payments</Link>
        </span>
        <span className="title">
          <Link to="/about">Contact Us</Link>
        </span>
        <span className="title">
          <Link to="/about">FAQ</Link>
        </span>
        <span className="title">
              <Link to="/clarityforteams">SERVICES</Link>
            </span> */}
        {!userLoggedIn ? (
              <NavIsLoggedOut />
            ) : (
              <NavIsLoggedIn Logout={logout} />
            )}
      </div>
    </div>
  );
};

export default newNavbar;
