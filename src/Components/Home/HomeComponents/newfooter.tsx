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
      <Row md={12} className="home_footer">
          <div className="footer_stay">STAY CONNECTED</div>
          <div className="footer_signup">signup to get news and tips from ur experts</div>
          <div className="footer_maill">
            <input className="footer_mail" type="email" placeholder="Email Address" />
            <div className="footer_btn">SIGN UP</div>
          </div>
          <div className="footer_socials">
            <a href="https://free.facebook.com/pages/category/Product-Service/109680753747119/?_rdc=1&_rdr" target="_blank"><img className="footer_social_1 ssmedia" src={facebook} alt="facebook" /></a>
            <a href="" target="_blank"><img className="footer_social_2 ssmedia unclick" src={twitter} alt="twitter" /></a>
            <a href="http://instagram.com/getclarity_" target="_blank"><img className="footer_social_3 ssmedia" src={instagram} alt="instagram" /></a>
            <a href="https://ng.linkedin.com/company/yudimy" target="_blank"><img className="footer_social_4 ssmedia" src={linkedin} alt="linkedin" /></a>
          </div>
          <div className="ftrnav">
              <Link to="/" ><span>HOME</span></Link>
              <Link to="/aboutus"><span>ABOUT US</span></Link>
              <Link to="/contact"><span>CONTACT US</span></Link>
              <Link to="/payment" ><span>PAYMENT</span></Link>
          </div>
          <div className="ftrpolicy">
          <Link to="/" ><span className="ftrterms">Terms of Service</span></Link>
              <Link to="/privacy_policy" ><span>Privacy Policy</span></Link>
          </div>
          <hr className="ftrline" />
          <div className="ftrcpy">Copyright 2020 Clarity by Yudimy. <span className="ftrrights">All rights reserved</span></div>
      </Row>
      {/* footer starts here */}
    </div>
  );
};

export default NewFooter;
