import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";
import norecommendations from "../../../assets/no recommendations.png";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";

class CounsellorRecommendation extends React.Component {
  state: any = {
    fullname: "",
    message: "",
    counsellor: "",
    successMsg: false,
    isLoading: false,
    showWarning: false,
    width: 100,
  };
  submitForm = (e) => {
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
    Axios.get<any, AxiosResponse<any>>(
      `${API}/dashboard/counsellorrecommendation`,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((response) => {
        this.setState({
          counsellor: response.data,
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
  handleChatCheck = () => {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        if (response?.data[0]?.direction_plan === true) {
          return window.location.assign("/councellordates");
        }
        if (response?.data[0]?.direction_plan === false) {
          return window.location.assign("/councellorfee");
        }
      })
      .catch((error) => {
      });
  };
  render() {
    const { fullname, message, isLoading, width, counsellor } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <Row>
            <SideBarCounsellorDashboard councrec={true}/>
            <Col md={10} sm={12} className="prm">
              <CounsellorDashboardNav title="Booked Sessions" />
              <Row>
                <Col md={12} className="firstqq">
                  <div className="kdashheader npps"></div>
                  <DashboardCounsellorIntroHeader welcomeText="Find below an overview of all activities with clarity" />
                  <Row>
                    <Col md={11}>
                      <Col md={12} className="youwss">
                        {counsellor &&
                          counsellor?.map((data, i) => (
                            <div className="usersentwrap1" key={i}>
                              <div className="youwrap">
                                <span className="you11b">
                                  {data.counsellor_name}
                                </span>
                              </div>
                              <div className="councellors_response">
                                {data.text}
                              </div>
                              <div className="youwrap textrrr">
                                <span className="youdate">{data.date}</span>
                              </div>
                            </div>
                          ))}
                        {counsellor.length === 0 && (
                          <div className="norec">
                            <img
                              src={norecommendations}
                              className="norecommendations"
                              alt="norecommendations"
                            />
                            <div className="udont1">Opps!!!</div>
                            <div className="udont">
                              You dont have any Recommendation yet, you should
                              speak to a counsellor now
                            </div>
                          </div>
                        )}
                      </Col>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default CounsellorRecommendation;
