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

const CounsellorSupport = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard support={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Support" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="Having any issues or complain with our services, please contact our support or leave us a message!" />
                <div className=""></div>
                <div>
                  <hr />
                </div>
                <Col md={12} className="paddn1">
                  <div className="whatdoudo offpad">
                    <div className="worddd">Drop your message </div>
                  </div>
                  <Row>
                    <Col md={6}>
                      <div className="Complain loop11">Issue category </div>
                      <Form.Control
                        as="select"
                        className="fmc jobr subhyt"
                        name="issue"
                        placeholder="Select your issue category"
                      >
                        <option></option>
                        <option value="Payment">Payment</option>
                        <option value="Assessment">Assessment</option>
                        <option value="Speak with a counsellor">
                          Speak with a counsellor{" "}
                        </option>
                        <option value="Profile builder">Profile builder</option>
                        <option value="others">Others</option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="Complain loop11">Complain </div>
                      <textarea
                        name="complain"
                        className="form-control jobr subhyt"
                        placeholder="Describe the issue you are having"
                      />
                    </Col>
                  </Row>
                  <Row className="subsbs">
                    <Col md={12}>
                      <Button className="retaketest">Submit</Button>
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CounsellorSupport;
