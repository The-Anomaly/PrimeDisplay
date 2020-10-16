import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import avatar from "../../../assets/avatar.svg";
import CounsellorDashboardMobileNav from "./CounsellorsDashboardNavBar";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";

class CounsellorSettings extends React.Component {
  state: any = {
    fullname: "",
    errorMessage: "",
    email: "",
    address: "",
    phone: "",
    job_description: "",
    website_link: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    image: "",
    width: 100,
    fillStatus: true,
  };
  validateForm = (e) => {
    const { fullname, email, address, phone } = this.state;
    if (email === "" || address === "" || phone === "" || fullname === "") {
      this.setState({
        fillStatus: false,
      });
      return this.notify("Please fill the required fields");
    } else {
      this.submitForm(e);
      this.setState({
        fillStatus: true,
      });
    }
  };
  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    const { fullname, email, address, phone, image } = this.state;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = new FormData();
    data.append("image", image);
    data.append("email", email);
    data.append("address", address);
    data.append("phone", phone);
    Axios.post<any, AxiosResponse<any>>(
      `${API}/counsellors/create-settings`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        //this.notify("Successful");
        setTimeout(() => {
          this.notify("Successful");
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        this.notify("failed");
        if (err) {
        }
      });
  };
  notify = (message: string) => toast(message, { containerId: "B" });
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  fileInput: HTMLInputElement | null | undefined;
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profile`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            ...response.data,
          });
        }
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          this.setState({
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  }
  render() {
    const { fullname, email, image, address, phone } = this.state;

    return (
      <>
        <Container fluid={true} className="contann122">
          <CounsellorDashboardMobileNav settings={true} />
          <Row>
            <SideBarCounsellorDashboard settings={true} />
            <Col md={10} sm={12} className="prm">
              <CounsellorDashboardNav title="Settings" />
              <Row className="wrapc222">
                <Col md={12} className="firstqq">
                  <div className="kdashheader npps"></div>
                  <div className=""></div>
                  <div>
                    <div className="kdashheader uidd11">
                      <div className="floo">
                        <div className="smll">
                          {" "}
                          <div className="smalls">
                            <img
                              src={image !== "" ? image : avatar}
                              className="avatar avar"
                              alt="avatar"
                            />
                          </div>
                          <div>
                            <input
                              type="file"
                              onChange={this.handleImageChange}
                              style={{ display: "none" }}
                              ref={(fileInput) => (this.fileInput = fileInput)}
                            />
                            <div
                              className="filechan"
                              onClick={() => this.fileInput?.click()}
                            >
                              Upload Image
                            </div>
                            <span className="infoforimage">
                              Image should be 80 &times; 80 pixels
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <hr />
                  </div>
                  <Row className="rowla csetting">
                    <Col md={6}>
                      <div className="whatdoudo">Name</div>
                      <textarea
                        name="fullname"
                        className="form-control jobr subhyt"
                        placeholder="Your Full Name"
                        value={fullname}
                        onChange={this.handleChange}
                      ></textarea>
                    </Col>
                    <Col md={6}>
                      <div className="whatdoudo">Address</div>
                      <textarea
                        name="address"
                        className="form-control jobr subhyt"
                        value={address}
                        onChange={this.handleChange}
                        placeholder="Your House Address"
                      ></textarea>
                    </Col>
                  </Row>
                  <Row className="rowla csetting">
                    <Col md={6}>
                      <div className="whatdoudo">Email</div>
                      <textarea
                        name="email"
                        value={email}
                        className="form-control jobr subhyt"
                        onChange={this.handleChange}
                        placeholder="Your Email Address"
                      ></textarea>
                    </Col>
                    <Col md={6}>
                      <div className="whatdoudo">Phone Number</div>
                      <textarea
                        name="phone"
                        value={phone}
                        onChange={this.handleChange}
                        className="form-control jobr subhyt"
                        placeholder="Your House Address"
                      ></textarea>
                    </Col>
                  </Row>
                  <div className="text-left">
                    <div
                      className="kskthin col-md-11 retaketest subsupport"
                      onClick={this.validateForm}
                    >
                      Save Profile
                    </div>
                  </div>
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
  }
}
export default CounsellorSettings;
