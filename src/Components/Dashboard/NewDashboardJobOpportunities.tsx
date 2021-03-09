import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import imgCart from "../../assets/clarity.png";
import Button from "react-bootstrap/Button";
import { CirclePie } from "salad-ui.chart";
import Modal from "react-bootstrap/Modal";
import briefcase from "../../assets/briefcase.png";
import mappin from "../../assets/mappin.png";
import mail from "../../assets/mail.png";
import writeicon from "../../assets/writeicon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import phone from "../../assets/phone.png";
import Form from "react-bootstrap/Form";
import DashboardNav from "./DashboardNavBar";
import DashboardInfoArea from "./DashboardInfoArea";
import { Link } from "react-router-dom";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";

const IndustryList = [
  { name: "Performing Arts" },
  { name: "Animations & Graphics" },
  { name: "Media & Communications" },
  { name: "Hospitality & Tourism " },
  { name: "Beauty" },
  { name: "Fashion" },
  { name: "Furniture & Interior Décor" },
  { name: "Film & Photography" },
  { name: "Property Constructions & Trades" },
  { name: "Land planning & Survey" },
  { name: "Real Estate and Property Management " },
  { name: "Transportation & Logistics" },
  { name: "Wellness & Fitness" },
  { name: "Medical Sciences " },
  { name: "Agriculture" },
  { name: "Conservation" },
  { name: "Environmental Sciences" },
  { name: "Energy" },
  { name: "Education and Training" },
  { name: "NGO’s & Charity " },
  { name: "Government & Defense " },
  { name: "Legal Studies " },
  { name: "Social Care & Works" },
  { name: "Business Management" },
  { name: "Human Resource Management" },
  { name: "Sales & Marketing" },
  { name: "Business Support Services" },
  { name: "Banking, Finance & Accountancy" },
  { name: "Science" },
  { name: "Information Technology" },
  { name: "Engineering" },
  { name: "Mathematics" },
  { name: "Social & Behavioral Sciences" },
  { name: "Sport Journalism" },
  { name: "Gaming" },
  { name: "Recreational Sports" },
  { name: "Health & Fitness" },
  { name: "Professional Athlete" },
  { name: "Sports Innovation & Retail" },
  { name: "Sports Management & Development" },
];
class NewDashboardJobOpportunities extends React.Component {
  state: any = {
    fullname: "",
    errorMessage: "",
    industry: "",
    social_media: "",
    present_job: "",
    work_status: "",
    user: [],
    dob: "",
    present_industry: "",
    industry_interest: [],
    opportunities_open_to: [],
    successMsg: false,
    isLoading: false,
    showWarning: false,
    width: 100,
  };
  validateEntry = (e) => {
    e.preventDefault();
    if (this.state.industry_interest.length === 0){
      return this.notify("Please select the industries you're interested in");
    }
    else if (this.state.opportunities_open_to.length === 0){
      return this.notify("Please select the opportunities you're open to");
    }
    else if (this.state.present_job === ""){
      return this.notify("Please enter details of your present job");
    }
    else if (this.state.present_industry === ""){
      return this.notify("Please enter details of your present industry");
    }
    else if (this.state.work_status === ""){
      return this.notify("Please enter your work status");
    }
    else if (this.state.dob === ""){
      return this.notify("Please enter your date of birth");;
    }
    else {return this.submitForm(e);}
  }
  submitForm = (e) => {
    this.setState({
      isloading: true,
    });
    e.preventDefault();
    const {
      fullname,
      isLoading,
      social_media,
      present_job,
      work_status,
      dob,
      industry_interest,
      opportunities_open_to,
      present_industry,
    } = this.state;
    console.log(industry_interest);
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      social_media,
      present_job,
      work_status,
      dob,
      industry_interest,
      opportunities_open_to,
      present_industry,
    };
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/jobnotification`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        this.setState({
          isloading: false,
        });
        this.notify("Successful");
      })
      .catch((err) => {
        this.setState({
          isloading: false,
        });
        // console.log(err.response)
        this.notify("Failed " + err?.response?.data[0]?.message);
        if (err) {
        }
      });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeCheckBox = (e) => {
    if (this.state.industry_interest.includes(e.target.value) === false) {
      this.setState({
        industry_interest: [...this.state.industry_interest, e.target.value],
      });
    }
    else {
      // console.log("it's in the array")
    }
    // console.log(this.state.industry_interest);
  };
  handleChangeCheckBox2 = (e) => {
    if (this.state.opportunities_open_to.includes(e.target.value) === false) {
      this.setState({
        opportunities_open_to: [...this.state.opportunities_open_to, e.target.value],
      });
    }
    else {
      // console.log("it's in the array")
    }
    console.log(this.state.opportunities_open_to);
  };
  
  removeInterest = (interest) => {
    let interest_index = this.state.industry_interest.indexOf(interest);
    if(interest_index >= 0){
    this.state.industry_interest.splice(interest_index, 1);
    this.setState({
      industry_interest: [...this.state.industry_interest],
    });
    // console.log(this.state.industry_interest);
    }
  };
  removeOpportunity = (opportunity) => {
    let opportunity_index = this.state.opportunities_open_to.indexOf(opportunity);
    if(opportunity_index >= 0){
    this.state.opportunities_open_to.splice(opportunity_index, 1);
    this.setState({
      opportunities_open_to: [...this.state.opportunities_open_to],
    });
    console.log(this.state.opportunities_open_to);
    }
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    this.checkIfUserHasMadePaymentForFullResult(token);
    const data = {};
    Axios.all([Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/jobnotification`, {
      headers: { Authorization: `Token ${token}` },
    }),
    Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
      headers: { Authorization: `Token ${token}` },
    })])
      .then(Axios.spread((response, response2) => {
        if (response.status === 200 && response2.status === 200) {
          if (response2?.data[0]?.job_recommendation === false) {
            return setTimeout(() => {
              window.location.pathname = "/dashboardsubscriptionplan";
            }, 2000);
          }
          else {
          this.setState({
            industry_interest: response?.data?.industry_interest,
            opportunities_open_to: response?.data?.opportunities_open_to,
            present_job: response?.data?.present_job,
            present_industry: response?.data?.present_industry,
            work_status: response?.data?.work_status,
            dob: response?.data?.dob,
          })
        }}
      }))
      .catch((error) => {
        if (error && error.response && error.response.data) {
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
  checkIfUserHasMadePaymentForFullResult = (token: string) => {};
  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  componentWillMount() {
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
            user: response.data,
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
        // console.log(error)
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  }
  notify = (message: string) => toast(message, { containerId: "B" });
  render() {
    const {
      fullname,
      isLoading,
      isloading,
      present_job,
      work_status,
      dob,
      industry_interest,
      opportunities_open_to,
      present_industry,
      user,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav jobrec={true} />
          <Row>
            <SideBarNewDashboard jobrec={true} />
            <Col md={10} sm={12} className="prm newprm">
              <DashboardLargeScreenNav title="Job Notifications" />
              <Row>
                <Col md={11} className="kisls">
                  <div className="kdashheader uidd11">
                    <div className="fjss">
                      <div>
                        {" "}
                        <div className="smalls">
                          <img
                            src={user && user.image ? user.image : avatar}
                            className="avatar avar"
                            alt="avatar"
                          />
                        </div>
                        <span className="kdashheaderlight idds">
                          <span className="ch112 ksname">
                            {" "}
                            {user && user.first_name && user.first_name
                              ? user.first_name + " " + user.last_name
                              : ""}
                          </span>
                        </span>
                      </div>
                      <div className="ch11">
                        <Link to="/dashboardsettings">
                          <img
                            src={writeicon}
                            className="writeicon"
                            alt="writeicon"
                          />
                          Edit Profile
                        </Link>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <Row>
                    <Col md={12}>
                      <DashboardInfoArea />
                      <hr />
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            What do you presently do? <span className="notfilled"> *</span>
                          </div>
                          <textarea
                            name="present_job"
                            value={present_job}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder="Provide a description of what defines you and your process"
                          ></textarea>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">
                            What industry do you presently work in? <span className="notfilled"> *</span>
                          </div>
                          <Form.Control
                            as="select"
                            className="fmc jobr subhyt"
                            name="present_industry"
                            value={present_industry}
                            onChange={this.handleChange}
                            placeholder="Select Industry"
                          >
                            <option></option>
                            {IndustryList.map((data, i) => (
                              <option
                                className="uii11"
                                value={data.name}
                                key={i}
                              >
                                {data.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            What industries are you presently interested in? <span className="notfilled"> *</span>
                          </div>

                          <Form.Control
                            as="select"
                            className="fmc jobr subhyt job-oopt-select-multiple"
                            name="industry_interest"
                            value={industry_interest}
                            onChange={this.handleChangeCheckBox}
                            placeholder="Select Industry"
                            multiple={true}
                          >
                            <option className="hide-on-desktop"></option>
                            {IndustryList.map((data, i) => (
                              <option
                                className="uii11"
                                value={data.name}
                                key={i}
                              >
                                {data.name}
                              </option>
                            ))}
                          </Form.Control>
                          <div className="industry-selection" >
                          {industry_interest.map((data, i) => (
                            <div key={i}>
                              {data}<span onClick={() => this.removeInterest(data)}>&#10005;</span>
                            </div>))}
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">Present Work Status<span className="notfilled"> *</span> </div>
                          <Form.Control
                            as="select"
                            className="fmc jobr subhyt"
                            value={work_status}
                            name="work_status"
                            onChange={this.handleChange}
                          >
                            <option></option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Employed" key={""} id="">
                              Employed
                            </option>
                            <option value="Student" key={""} id="">
                              Student
                            </option>
                            <option value="Job Searching" key={""} id="">
                              Job Searching
                            </option>
                            <option
                              value="Employed-Multiple Jobs"
                              key={""}
                              id=""
                            >
                              Employed-Multiple Jobs
                            </option>
                          </Form.Control>
                        </Col>
                        {/* <Col md={6}>
                          <div className="whatdoudo">Social Media Handle </div>
                          <textarea
                            name="social_media"
                            value={social_media}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                          />
                        </Col> */}
                      </Row>
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            Opportunities Open to{" "}<span className="notfilled"> *</span>
                          </div>
                          <Form.Control
                            as="select"
                            className="fmc jobr subhyt job-oopt-select-multiple"
                            name="opportunities_open_to"
                            value={opportunities_open_to}
                            onChange={this.handleChangeCheckBox2}
                            placeholder="Select the type of opportunity you are open for"
                            multiple
                          >
                            <option className="hide-on-desktop"></option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Courses/ trainings">
                              Courses/ trainings
                            </option>
                            <option value="Scholarships">Scholarships</option>
                            <option value="Business resources">
                              Business resources
                            </option>
                          </Form.Control>
                          <div className="industry-selection" >
                          {opportunities_open_to.map((data, i) => (
                            <div key={i}>
                              {data}<span onClick={() => this.removeOpportunity(data)}>&#10005;</span>
                            </div>))}
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">Date of Birth<span className="notfilled"> *</span> </div>
                          <Form.Control
                            type="date"
                            value={dob}
                            name="dob"
                            className="fmc jobr subhyt"
                            onChange={this.handleChange}
                          ></Form.Control>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12} className="sddx12">
                      <div className="texsss1">
                        <button
                          className="job-oppt-submit"
                          onClick={this.validateEntry}
                        >
                          {isloading ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <ToastContainer
          enableMultiContainer
          containerId={"B"}
          toastClassName="bg-info text-white"
          hideProgressBar={true}
          position={toast.POSITION.TOP_CENTER}
        />
      </>
    );
  }
}
export default NewDashboardJobOpportunities;
