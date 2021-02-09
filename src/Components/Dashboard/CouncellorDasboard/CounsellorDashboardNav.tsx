import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../kegennidashboard.css";
import avatar from "../../../assets/avatar.svg";
import SideBarNewDashboard from "../SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardNav from "../DashboardNavBar";
import { Link } from "react-router-dom";

class CounsellorDashboardNav extends React.Component<any, any> {
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
    };
  }

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
            errorMessage: error?.response?.data[0]?.message,
            isLoading: false,
          });
        }
        if(error?.response?.status==401){
          localStorage.clear()
         return window.location.assign("/counsellor/signin")
        }
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  }

  notify = (message: string) => toast(message, { containerId: "B" });
  render() {
    const { first_name, last_name, image } = this.state;
    return (
      <>
        <div className="navdash">
          <div className="overview ovf">{this.props.title}</div>
          <div className="prm111">
            <span>{first_name ? first_name + " " + last_name : ""}</span>
            <span>
              <Link to="/counsellorsettings">
                <img
                  src={image ? image : avatar}
                  className="avatar11"
                  alt="avatar"
                />
              </Link>
            </span>
          </div>
        </div>
      </>
    );
  }
}
export default CounsellorDashboardNav;
