import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import firstlogo from "../../assets/image 1.png";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import DashboardUsernameheader from "./DashboardUsernameheader";
import DashboardNav from "./DashboardNavBar";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";

interface State {
  complain: string;
  issue: string;
  successMsg: boolean;
  errorMessage: string;
  isLoading: boolean;
  showWarning: boolean;
  width: number;
  isloading:boolean;
}
class NewDashboardSupport extends React.Component {
  state: State = {
    complain: "",
    issue: "",
    errorMessage: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    isloading:false,
    width: 100,
  };
  submitForm = (e) => {
    this.setState({
      isloading:true
    })
    e.preventDefault();
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      issue_category: this.state.issue,
      complain: this.state.complain,
    };
    Axios.post<any, AxiosResponse<any>>(`${API}/dashboard/support`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          isloading:false
        })
        this.notify("Successful");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        this.setState({
          isloading:false
        })
        if (err) {
          this.notify("Failed to send");
        }
      });
  };
  notify = (message: string) => toast(message, { containerId: "B" });

  checkIfUserHasMadePaymentForFullResult = (token: string) => {
    // Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
    //   headers: { Authorization: `Token ${token}` },
    // })
    //   .then((response) => {
    //     if (
    //       response?.data[0]?.direction_plan ||
    //       response?.data[0]?.growth_plan ||
    //       response?.data[0]?.insight_plan === true
    //     ) {
    //       return window.location.assign("/thirdpary/fullresult");
    //     }
    //   })
    //   .catch((error) => {
    //   });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { complain, issue, isLoading, isloading } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav support={true}/>
          <Row>
            <SideBarNewDashboard support={true} />
            <Col md={10} sm={12} className="prm">
              <DashboardLargeScreenNav title={"Support"} />
              <Row>
                <Col md={12} className="kisls">
                  <div className="kdashheader npps">
                    <DashboardUsernameheader
                      welcomeText={
                        " Having any issues or complain with our services, please contact our support or leave us a message!"
                      }
                    />
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
                            value={issue}
                            onChange={this.handleChange}
                            placeholder="Select Industry"
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
                            value={complain}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          />
                        </Col>
                      </Row>
                      <Row className="subsbs">
                        <Col md={12}>
                          <Button
                            className="retaketest"
                            onClick={this.submitForm}
                          >
                             {isloading?"Submitting":"Submit"}
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Col>
              </Row>
            </Col>
            <ToastContainer
              enableMultiContainer
              containerId={"B"}
              toastClassName="bg-info text-white"
              hideProgressBar={true}
              position={toast.POSITION.TOP_CENTER}
            />
          </Row>
        </Container>
      </>
    );
  }
}
export default NewDashboardSupport;
