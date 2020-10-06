import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";
import rightimg from "../../../assets/rightarrow.png";
import leftimg from "../../../assets/leftarrow1.png";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CounsellorSettings = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard bookedsession={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Settings" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="Please update your profile" />
                <div className=""></div>
                <div>
                  <hr />
                </div>
                <Row className="rowla">
                  <Col md={6}>
                    <div className="whatdoudo">Name</div>
                    <textarea
                      name="name"
                      className="form-control jobr subhyt"
                      placeholder="Your Full Name"
                    ></textarea>
                  </Col>
                  <Col md={6}>
                    <div className="whatdoudo">Address</div>
                    <textarea
                      name="address"
                      className="form-control jobr subhyt"
                      placeholder="Your House Address"
                    ></textarea>
                  </Col>
                </Row>
                <Row className="rowla">
                  <Col md={6}>
                    <div className="whatdoudo">Email</div>
                    <textarea
                      name="name"
                      className="form-control jobr subhyt"
                      placeholder="Your Email Address"
                    ></textarea>
                  </Col>
                  <Col md={6}>
                    <div className="whatdoudo">Phone Number</div>
                    <textarea
                      name="address"
                      className="form-control jobr subhyt"
                      placeholder="Your House Address"
                    ></textarea>
                  </Col>
                </Row>
                <div className="text-right">
                  <div className="kskthin col-md-11">Save Profile</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CounsellorSettings;
