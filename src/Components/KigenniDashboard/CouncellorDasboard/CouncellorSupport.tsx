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
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CounsellorSupport = (props: any) => {
  const [state, setState] = useState<any>({ complain: "", issue_category: "" });
  const { complain, issue_category } = state;
  const submitForm = (e) => {
    e.preventDefault();
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      issue_category,
      complain,
    };
    Axios.post<any, AxiosResponse<any>>(`${API}/dashboard/support`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        notify("Successful");
      })
      .catch((err) => {
        if (err) {
          notify("Failed to send");
        }
      });
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const notify = (message: string) => toast(message, { containerId: "B" });
  return (
    <>
      <Container fluid={true} className="contann122">
        <CounsellorDashboardMobileNav counselorsupport={true} />
        <Row>
          <SideBarCounsellorDashboard counselorsupport={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Support" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader welcomeText="Having any issues or complain with our services, please contact our support or leave us a message!" />
                <div className=""></div>
                <Button className="retaketest subsupport btnmarg">
                  <a href="tel:+234817610060" className="linkphone">
                    Call Support
                  </a>
                </Button>
                <div>
                  <hr />
                </div>
                <Col md={12} className="paddn1">
                  <div className="whatdoudo offpad">
                    <div className="worddd">Drop your message </div>
                  </div>
                  <Row>
                    <Col md={6} sm={10} className="csupport">
                      <div className="Complain loop11">Issue category </div>
                      <Form.Control
                        as="select"
                        className="fmc jobr subhyt"
                        name="issue"
                        placeholder="Select your issue category"
                        onChange={handleChange}
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
                    <Col md={6} sm={10} className="csupport">
                      <div className="Complain loop11">Complain </div>
                      <textarea
                        name="complain"
                        className="form-control jobr subhyt"
                        value={complain}
                        onChange={handleChange}
                        placeholder="Describe the issue you are having"
                      />
                    </Col>
                  </Row>
                  <Row className="subsbs">
                    <Col md={12}>
                      <Button
                        className="retaketest subsupport"
                        onClick={submitForm}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        <ToastContainer
          enableMultiContainer
          containerId={"B"}
          toastClassName="bg-info text-white"
          hideProgressBar={true}
          position={toast.POSITION.TOP_CENTER}
        />
      </Container>
    </>
  );
};
export default CounsellorSupport;
