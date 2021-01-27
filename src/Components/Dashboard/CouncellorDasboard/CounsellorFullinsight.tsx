import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../kegennidashboard.css";
import avatar from "../../../assets/avatar.svg";
import SideBarNewDashboard from "../SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import DashboardUsernameheader from "../DashboardUsernameheader";
import DashboardNav from "../DashboardNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLargeScreenNav from "../DashboardLargeScreenNav";
import FullResultForCounsellors from "../FullResultForCounsellors";
import SideBarCounsellorDashboard from './SideBarCounsellorDashboard';
import CounsellorDashboardNav from './CounsellorDashboardNav';
import CounsellorsDashboardMobileNav from './CounsellorsDashboardNavBar';

class CounsellorsFullresult extends React.Component {
  state: any = {
    fullname: "",
    message: "",
    user: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    width: 100,
  };
  props: any;
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
 
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const { fullname, message, isLoading, width, user } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <CounsellorsDashboardMobileNav insight={true} />
          <Row>
            <SideBarCounsellorDashboard insight={true} />
            <Col md={10} sm={12} className="prm newprm">
              <CounsellorDashboardNav title={"Full Insight"} />
              <Row>
                <Col md={12} className="kislsree">
                  <Row>
                    <FullResultForCounsellors
                      email={this?.props?.match?.params?.email}
                    />
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
export default CounsellorsFullresult;
