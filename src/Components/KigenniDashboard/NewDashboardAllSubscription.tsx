import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import noplan from "../../assets/noplan.png";
import Button from "react-bootstrap/Button";
import { CirclePie } from "salad-ui.chart";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import checkcircle from "../../assets/checkcircle.png";
import DashboardUsernameheader from "./DashboardUsernameheader";
import norecommendations from "../../assets/no recommendations.png";
import DashboardNav from "./DashboardNavBar";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";
import { Link } from "react-router-dom";
import PaymentSummary from "./paymentsummary";

class NewDashboardAllSubsriptionPlans extends React.Component {
  state: any = {
    fullname: "",
    message: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    plan: "",
    width: 100,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/subscription`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        this.setState({
          plan: response.data.plan,
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
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const { fullname, message, isLoading, width, plan } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav subscription={true} />
          <Row>
            <SideBarNewDashboard subscription={true} />
            <Col md={10} sm={12} className="prm">
              <DashboardLargeScreenNav title={"Subscription"} />
              <Row>
                <Col md={12} className="kisls">
                  <div className="kdashheade npps">
                    <DashboardUsernameheader
                      welcomeText={"A review of your current subcription plans"}
                    />
                    <div className="">
                      <Button className="retaketest">
                        <Link to="/paymentsummary">
                          Review your current plan
                        </Link>
                      </Button>
                    </div>
                    <div>
                      <hr />
                    </div>
                    <>
                      <Col md={12} className="youwss">
                        {true && (
                          <Row className="kli6 bcbv">
                            <Col md={12}>
                              <Row className="centerr">
                                <PaymentSummary />
                              </Row>
                            </Col>
                          </Row>
                        )}
                      </Col>
                    </>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default NewDashboardAllSubsriptionPlans;
