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
import { CirclePie } from "salad-ui.chart";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DashboardUsernameheader from "./DashboardUsernameheader";
import DashboardNav from "./DashboardNavBar";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";

interface State {
  fullname: string;
  client: any;
  successMsg: boolean;
  errorMessage: string;
  isLoading: boolean;
  showWarning: boolean;
  width: number;
  user: string;
}
class NewDashboardSupport extends React.Component {
  state: State = {
    fullname: "",
    client: [],
    errorMessage: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    user: "",
    width: 100,
  };
  submitRetakeAssessment = (e) => {
    e.preventDefault();
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/retakeassessment`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        window.location.assign("/assessmentphaseone");
      })
      .catch((err) => {
        if (err) {
        }
      });
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    this.checkIfUserHasMadePaymentForFullResult(token);
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/chat`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            user: response.data,
            successMsg: true,
            isLoading: false,
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
  checkIfUserHasMadePaymentForFullResult = (token: string) => {};
  CloseWarning = () => {
    this.setState({
      showWarning: false,
    });
  };
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  openWarning = () => {
    this.setState({
      showWarning: true,
    });
  };
  render() {
    const { fullname, client, isLoading, width, user } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav councrec={true} />
          <Row>
            <SideBarNewDashboard councrec={true} />
            <Col md={10} sm={12} className="prm">
              <DashboardLargeScreenNav title="Councellors Recommendation" />
              <Row>
                <Col md={12} className="kisls">
                  <div className="kdashheader npps">
                    <DashboardUsernameheader
                      welcomeText={
                        " Find below summary of all your chats and recomendation with your councellor"
                      }
                    />
                    <div className="">
                      <Button className="retaketest">
                        Speak with a counsellor
                      </Button>
                    </div>
                    <div>
                      <hr />
                    </div>
                    <Col md={12}>
                      <div className="weaa">
                        <div></div>
                      </div>
                    </Col>
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
export default NewDashboardSupport;
