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

const NewFooter: React.FC = (props) => {
  return (
    <div>
      {/* footer starts here */}
      <Row className="home_footer">
          <div className="footer_stay">STAY CONNECTED</div>
          <div className="footer_signup">signup to get news and tips from ur experts</div>
          <div className="footer_maill">
            <input className="footer_mail" type="email" placeholder="Email Address" />
            <div className="footer_btn">SIGN UP</div>
          </div>
          <div className="footer_socials">
            <img className="footer_social_1" src={facebook} alt="facebook" />
            <img className="footer_social_2" src={twitter} alt="twitter" />
            <img className="footer_social_3" src={instagram} alt="instagram" />
            <img className="footer_social_4" src={linkedin} alt="linkedin" />
          </div>
          <div className="ftrnav">
              <span>HOME</span>
              <span>ABOUT US</span>
              <span>CONTACT US</span>
              <span>PAYMENT</span>
          </div>
          <div className="ftrpolicy">
              <span className="ftrterms">Terms of Service</span>
              <span>Privacy Policy</span>
          </div>
          <hr className="ftrline" />
          <div className="ftrcpy">Copyright 2020 Clarity by Yudimy. All rights reserved</div>
      </Row>
      {/* footer starts here */}
    </div>
  );
};

export default NewFooter;
