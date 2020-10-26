import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../kegennidashboard.css";
import avatar from "../../../assets/avatar.svg";
import SideBarNewDashboard from "../SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardNav from "../DashboardNavBar";
import { API } from "../../../config";
import StarRatingComponent from "react-star-rating-component";
import search from "../../../assets/search.png";

class DashboardCounsellorIntroHeader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      last_name: "",
      first_name: "",
      errorMessage: "",
      email: "",
      address: "",
      phone: "",
      isLoading: false,
      width: 100,
      rate: 5,
    };
  }
  onStarClick = (nextValue, prevValue, name) => {
    this.setState({
      [name]: nextValue.toString(),
    });
  };
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

  notify = (message: string) => toast(message, { containerId: "B" });
  render() {
    const { first_name, last_name, rate } = this.state;
    console.log(this.props);
    return (
      <>
        <div className="fjss spis">
          <div>
            {" "}
            <span className="kdashheaderlight idds">
              Hi Counsellor
              <span className="ksname"> {first_name + " " + last_name}</span>
            </span>
            <div className="smalls22">
              <a href="#seek" className="serv11">
                {this.props.welcomeText}{" "}
              </a>
            </div>
          </div>
          {this?.props?.rating && (
            <div className="sss12 ssnopad">
              <div className="nvbv">
                <div className="sss1a"> Your Ratings</div>
                <div className="assessrating assessratingpa">
                  <StarRatingComponent
                    name="rate"
                    starCount={5}
                    editing={false}
                    value={this?.props?.ratingValue}
                    onStarClick={this.onStarClick}
                    emptyStarColor={"#444"}
                  />
                </div>
              </div>
              <div className="swrap23">
                <div className="sss1a"> Your Counsellor ID</div>
                <div className="s34"> {this?.props?.counsellorId}</div>
              </div>
            </div>
          )}
          {this?.props?.searcharea && (
            <div className="ffrr1">
              <img src={search} className="searchi" alt="search" />
              <input
                placeholder="Search Member by Name"
                type="text"
                className="searchinput form-control"
              />
            </div>
          )}
        </div>
      </>
    );
  }
}
export default DashboardCounsellorIntroHeader;
