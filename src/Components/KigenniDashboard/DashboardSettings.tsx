import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardNav from "./DashboardNavBar";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";

class NewDashboardSettings extends React.Component {
  state: any = {
    last_name: "",
    first_name: "",
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
    const {
      first_name,
      last_name,
      email,
      address,
      phone,
      job_description,
      website_link,
    } = this.state;
    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      address === "" ||
      phone === "" ||
      job_description === ""
    ) {
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
    const {
      first_name,
      last_name,
      email,
      address,
      phone,
      job_description,
      website_link,
      image,
    } = this.state;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = new FormData();
    data.append("image", image);
    data.append("last_name", last_name);
    data.append("first_name", first_name);
    data.append("email", email);
    data.append("address", address);
    data.append("phone", phone);
    data.append("job_description", job_description);
    data.append("website_link", website_link);
    Axios.post<any, AxiosResponse<any>>(`${API}/dashboard/profile`, data, {
      headers: { Authorization: `Token ${token}` },
    })
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
  handleRef = (data) => {};
  notify = (message: string) => toast(message, { containerId: "B" });
  render() {
    const {
      fullname,
      email,
      address,
      image,
      phone,
      first_name,
      last_name,
      job_description,
      website_link,
      fillStatus,
    } = this.state;

    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav settings={true} />
          <Row>
            <SideBarNewDashboard settings={true} />
            <Col md={10} sm={12} className="prm">
              <DashboardLargeScreenNav title="Settings" />
              <Row>
                <Col md={11} className="kisls">
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
                  <Row>
                    <Col md={12}>
                      <hr />
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            First Name
                            {this.state.fillStatus === false && first_name === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="first_name"
                            value={first_name}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">
                            Last Name 
                            {this.state.fillStatus === false && last_name === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="last_name"
                            value={last_name}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            Address 
                            {this.state.fillStatus === false && address === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="address"
                            value={address}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            Email 
                            {this.state.fillStatus === false && email === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          />
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">
                            Phone Number 
                            {this.state.fillStatus === false && phone === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          />
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            Occupation 
                            {this.state.fillStatus === false && job_description === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="job_description"
                            value={job_description}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">Website Link </div>
                          <textarea
                            name="website_link"
                            value={website_link}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <div
                      className="kskthin col-md-11"
                      onClick={this.validateForm}
                    >
                      Submit
                    </div>
                  </div>
                </Col>
                <ToastContainer
                  enableMultiContainer
                  containerId={"B"}
                  toastClassName="bg-info text-white"
                  hideProgressBar={true}
                  position={toast.POSITION.TOP_CENTER}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default NewDashboardSettings;
