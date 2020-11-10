import React from "react";
import Navbar from "../HomeComponents/newnavbar";
import { Container, Row, Col } from "react-bootstrap";
import "./account_confirmatn.css";

const Acc_confirm_page = () => {
  return (
    <div>
      <Navbar />
      <div className="acctcnfm-section">
        <Container>
          <Row>
            <Col md={12} className="acccnfimdiv">
              <p className="acccnfimheading">Account Confirmation</p>
              <p className="acccnftxt">
                A confirmation email has been sent to [~userEmail], please check
                your mail<br/> to comfirm your account{" "}
              </p>
              <p className="acccnftxt">Didn’t Recieve any mail?</p>
              <span className="acccnf-btn accnf-animated">Re-send Email</span>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Acc_confirm_page;
