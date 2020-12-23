import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import DashboardUsernameheader from "./DashboardUsernameheader";
import DashboardNav from "./DashboardNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KigenniRemainingResult from "./KigenniPartResultContinue";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";

class NewDashboardFullInsight extends React.Component {
  state: any = {
    fullname: "",
    message: "",
    user: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    width: 100,
  };
  submitForm = (e) => {
    e.preventDefault();
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      message: this.state.message,
    };
    Axios.post<any, AxiosResponse<any>>(`${API}/dashboard/chat`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          message: "",
        });
        this.componentDidMount();
      })
      .catch((err) => {
        if (err) {
          this.notify(err?.response?.data[0].message);
          this.setState({
            message: "",
          });
        }
      });
  };
  notify = (message: string) => toast(message, { containerId: "B" });
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    this.checkIfUserHasMadePaymentForFullResult(token);
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/chat`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        this.setState({
          user: response.data,
          message: "",
        });
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
  checkIfUserHasMadePaymentForFullResult = (token: string) => {};
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const { fullname, message, isLoading, width, user } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav insight={true} />
          <Row>
            <SideBarNewDashboard insight={true} />
            <Col md={10} sm={12} className="prm newprm">
              <DashboardLargeScreenNav title={"Full Insight"}/>
              <Row>
                <Col md={12} className="kislsree">
                  <Row>
                    <KigenniRemainingResult />
                  </Row>
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
export default NewDashboardFullInsight;
