import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import clalogo from "../../../assets/clalogon.png";
import "./affiliate_landing.css";
import arrow from "../../../assets/Arrowright.png";
import facebk from "../../../assets/afffacebk.png";
import twitter from "../../../assets/afftwitter.png";
import instagram from "../../../assets/affinsta.png";
import linkedin from "../../../assets/afflinkedin.png";
import { Link } from "react-router-dom";

const Afflanding = () => {
  return (
    <div className="afflndbody">
      <Container>
        <div className="afflndrow">
          <img src={clalogo} className="affclalogo" />
          <Link to="/affiliates/signin">
            <div className="afflndbtn">Sign In</div>
          </Link>
        </div>
        <Row>
          <Col md={6}>
            <div>
              <p className="affbltxt">
                Take your passion for people to the next level.
              </p>
              <h1 className="afflndheading">Become A clarity Affiliate</h1>
              <p className="afflndescr">
                Are you passionate about people and seeing them thrive? Share
                clarity with them and get 15% for every referral who subscribes
                to a paid plan.{" "}
              </p>
              <Link to="/affiliates/signup">
                {" "}
                <span className="afflandgetstrdbtn">Get started</span>
              </Link>
            </div>
            <div>
              <img src={arrow} className="affsocialmedia" />
              <a
                href="https://free.facebook.com/pages/category/Product-Service/109680753747119/?_rdc=1&_rdr"
                target="_blank"
              >
                <img src={facebk} className="affsocialmedia" />
              </a>
              <a href="https://twitter.com/askyudimy?s=08" target="_blank">
                <img src={twitter} className="affsocialmedia" />
              </a>
              <a href="http://instagram.com/getclarity_" target="_blank">
                {" "}
                <img src={instagram} className="affsocialmedia" />
              </a>
              <a href="https://ng.linkedin.com/company/yudimy" target="_blank">
                {" "}
                <img src={linkedin} className="affsocialmedia" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Afflanding;
