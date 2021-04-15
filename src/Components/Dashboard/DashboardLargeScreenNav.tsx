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
import { Link } from "react-router-dom";
import Initial from "./Avatardesign";
import available from "../../assets/available.png";
import notavailable from "../../assets/notavailable.png";

class DashboardLargeScreenNav extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      last_name: "",
      first_name: "",
      errorMessage: "",
      email: "",
      address: "",
      image: "",
      phone: "",
      isLoading: false,
      width: 100,
      initial: "",
      profile_builder: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
      initial: localStorage.getItem("initial"),
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
      Axios.all([
        Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profile`, {
        headers: { Authorization: `Token ${token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
        headers: { Authorization: `Token ${token}` },
      }),
    ])
      .then(Axios.spread((response, response2) => {
        if (response.status === 200) {
          this.setState({
            ...response.data,
            profile_builder: response2?.data[0]?.profile_builder_submitted,
          });
        }
      }))
      .catch((error) => {
        if (error && error?.response && error?.response?.data) {
          this.setState({
            errorMessage: error?.response?.data[0]?.message,
            isLoading: false,
          });
        }
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  }
  notify = (message: string) => toast(message, { containerId: "B" });
  render() {
    const { first_name, last_name, image, initial, profile_builder } = this.state;
    console.log(profile_builder);
    return (
      <>
        <div className="navdash">
          <div className="overview ovf">{this.props.title}</div>
          <div className="prm111 nav_prof">
            <Link to="/profilebuilder"><img className="nav_profile_icon" src={profile_builder ? available : notavailable} alt="" /></Link>
            <span className="nav_profile">Profile</span>
            <span>{first_name ? first_name + " " + last_name : ""}</span>
            <span>
              <Link to="/dashboardsettings">
                {image ? (
                  <img src={image} className="avatar11" alt="avatar" />
                ) : (
                  <div className="avatar11">
                    <Initial initial={initial} />
                  </div>
                )}
              </Link>
            </span>
          </div>
        </div>
      </>
    );
  }
}
export default DashboardLargeScreenNav;
