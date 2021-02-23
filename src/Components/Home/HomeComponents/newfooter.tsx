import * as React from "react";
//bstp
import "./footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// footer statics
import facebook from "../../../assets/socials1.png";
import twitter from "../../../assets/socials2.png";
import instagram from "../../../assets/socials3.png";
import linkedin from "../../../assets/socials4.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../../../config";

const NewFooter: React.FC = (props) => {
  const [state, setState] = React.useState({
    usermail: "",
  });

  const { usermail } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      usermail: e.target.value,
    });
  };

  const newsletterSignUp = () => {
    const data = {
      email: usermail,
    };
    Axios.post(`${API}/newsletter/`, data)
      .then((response) => {
        // console.log("Newsletter sign up successful")
        // console.log(response)}
      })
      .catch((error) => {
        console.error("Newsletter signup failed");
      });
  };

  return (
    <div>
      {/* footer starts here */}
      <Row md={12} className="home_footer">
        <div className="footer_stay">STAY CONNECTED</div>
        <div className="footer_signup">
          signup to get news and tips from ur experts
        </div>
        <div className="footer_maill">
          <label htmlFor="newsletter"><p>Enter your email</p></label>
          <input
            id="newsletter"
            className="footer_mail"
            type="email"
            placeholder="Email Address"
            name="email"
            value={usermail}
            onChange={handleChange}
          />
          <div className="footer_btn" onClick={newsletterSignUp}>
            SIGN UP
          </div>
        </div>
        <div className="footer_socials">
          <a
            href="https://free.facebook.com/pages/category/Product-Service/109680753747119/?_rdc=1&_rdr"
            target="_blank"
          >
            <img
              className="footer_social_1 ssmedia"
              src={facebook}
              alt="facebook"
            />
          </a>
          <a href="https://twitter.com/askyudimy?s=08" target="_blank">
            <img
              className="footer_social_2 ssmedia"
              src={twitter}
              alt="twitter"
            />
          </a>
          <a href="http://instagram.com/getclarity_" target="_blank">
            <img
              className="footer_social_3 ssmedia"
              src={instagram}
              alt="instagram"
            />
          </a>
          <a href="https://ng.linkedin.com/company/yudimy" target="_blank">
            <img
              className="footer_social_4 ssmedia"
              src={linkedin}
              alt="linkedin"
            />
          </a>
        </div>
        <div className="ftrnav">
          <Link to="/">
            <span>HOME</span>
          </Link>
          <Link to="/aboutus">
            <span>ABOUT US</span>
          </Link>
          <Link to="/contact">
            <span>CONTACT US</span>
          </Link>
          <Link to="/pricing">
            <span>PRICING</span>
          </Link>
          <Link to="/affiliatehomepage">
            <span>AFFILIATES</span>
          </Link>
        </div>
        <div className="ftrpolicy">
          <Link to="/terms&conditions" target="_blank">
            <span className="ftrterms">Terms of Service</span>
          </Link>
          <Link to="/privacy_policy" target="_blank">
            <span>Privacy Policy</span>
          </Link>
        </div>
        <hr className="ftrline" />
        <div className="ftrcpy">
          Copyright 2020 Clarity by Yudimy.{" "}
          <span className="ftrrights">All rights reserved</span>
        </div>
      </Row>
      {/* footer starts here */}
    </div>
  );
};

export default NewFooter;
