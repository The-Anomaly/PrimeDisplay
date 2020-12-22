import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./affiliate.css";
import SideBarAffilliateDashboard from "./SideBarAffiliateDashboard";
import searchImage from "../../../assets/search11.png";
import avatar from "../../../assets/avatar.svg";
import caret from "../../../assets/caret_down.png";
import eye from "../../../assets/eye.png";
import balance from "../../../assets/balance.svg";

const BehaviouralAnalytics = () => {
  const [viewProfile, SetViewProfile] = React.useState(false);

  const viewProfileButton = () => {
    if (viewProfile === false) {
      SetViewProfile(true);
    } else {
      SetViewProfile(false);
    }
  };
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarAffilliateDashboard analytics={true} />
          <Col md={10} sm={12} className="prm newprm1">
            <Row className="BArow1">
              <Col>
                <Row className="BAfirstsec">
                  <form className="dxxa BAform">
                    <span className="sassa">
                      <img
                        src={searchImage}
                        alt="search"
                        className="searchImage"
                      />
                    </span>
                    <input
                      type="search"
                      placeholder="Search"
                      className="dshbdsearchbar form-control BAsearchbar"
                    />
                  </form>
                  <div className="BAprofile">
                    <img className="BAavatar" src={avatar} alt="user avatar" />
                    <img
                      className={viewProfile ? "BAcaret BAcaret-up" : "BAcaret"}
                      src={caret}
                      alt="dropdown"
                      onClick={viewProfileButton}
                    />
                    {viewProfile ? (
                      <div className="BAviewprofile">
                        <img className="BAvpeye" src={eye} alt="show" />
                        View Profile
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Row>
                <Row className="BArow2">
                  <div className="BArow2txt1">Behavioural Analytics</div>
                </Row>

                {/*Please note! Analytics without subscription section*/}
                {/* <Row>
                  <img className="BAbalance" src={balance} />
                  <div className="BAsubtxt">
                    Volutpat purus orci ipsum quis faucibus sed elit elit
                    gravida. Sodales facilisis sed nulla lobortis in convallis
                    pellentesque urna faucibus.
                  </div>
                  <button className="BAsubbtn">Upgrade Subscription</button>
                </Row> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BehaviouralAnalytics;
