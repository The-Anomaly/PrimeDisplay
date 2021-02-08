import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../kegennidashboard.css";
import avatar from "../../../assets/avatar.svg";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../../config";
import Button from "react-bootstrap/Button";
import writeicon from "../../../assets/writeicon.png";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../Components/Home/Home/animate.css";
import { Link } from "react-router-dom";
import editicon from "../../../assets/editicon.svg";
import building from "../../../assets/building.svg";
import plus from "../../../assets/plus.svg";
import book from "../../../assets/book.svg";
import dropdown from "../../../assets/dropdown.svg";
import CounsellorsDashboardMobileNav from "./CounsellorsDashboardNavBar";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import DashboardInfoArea from "../DashboardInfoArea";
import DashboardLargeScreenNav from "../DashboardLargeScreenNav";
const moment = require("moment");

class CounsellorViewUsersCVProfile extends React.Component {
  state: any = {
    fullname: "",
    references: [],
    experiences: [],
    mountedExperience: [],
    certifications: [],
    education: [],
    socials: [],
    strongcompetencechartdata: [],
    expirationStatus: false,
    errorMessage: "",
    certificateName: "",
    industry: "",
    education_valid_from: "",
    education_valid_till: "",
    education_doesnot_expire: "",
    certificateInstitution: "",
    valid_from: "",
    valid_till: "",
    organizationname: "",
    referencename: "",
    referenceid: "",
    referenceemail: "",
    referencephone: "",
    referencerelationship: "",
    referencetitle: "",
    organizationposition: "",
    institutionname: "",
    degreeObtained: "",
    institutionLocation: "",
    jobdescription: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    successMsg: false,
    about: "",
    skill: "",
    user: [],
    skills: [],
    isLoading: false,
    showWarning: false,
    mycurrentwork: false,
    userHasAddedExperience: false,
    startDate: "",
    endDate: "",
    new_user:"",
    width: 100,
  };
  props: any;
  addNewSkill = () => {
    const skillz = [
      {
        skill: this.state.skill,
      },
    ];
    const [{ skill }] = skillz;
    if (skill === "") {
      return this.notify("Please Enter Skills Information");
    }
    this.setState({
      skills: [...this.state.skills, ...skillz].reverse(),
      skill: "",
    });
  };
  addNewEducation = () => {
    const Educationz = [
      {
        institution: this.state.institutionname,
        degree: this.state.degreeObtained,
        location: this.state.institutionLocation,
        start_date: this.state.education_valid_from,
        end_date: this.state.education_valid_till,
        i_currently_study_here: this.state.education_doesnot_expire,
      },
    ];
    const [{ degree, institution, location, start_date }] = Educationz;
    if (
      degree === "" ||
      institution === "" ||
      location === "" ||
      start_date === ""
    ) {
      return this.notify("Please enter all education data");
    }
    this.setState({
      education: [...this.state.education, ...Educationz].reverse(),
    });
    this.setState({
      institutionname: "",
      degreeObtained: "",
      institutionLocation: "",
      education_valid_from: "",
      education_valid_till: "",
    });
  };
  addNewCertification = () => {
    const certificationz = [
      {
        certificate_name: this.state.certificateName,
        institution: this.state.certificateInstitution,
        valid_from: this.state.valid_from,
        valid_till: this.state.valid_till,
        does_not_expire: this.state.expirationStatus,
      },
    ];
    const [{ certificate_name, institution, valid_from }] = certificationz;
    if (certificate_name === "" || institution === "" || valid_from === "") {
      return this.notify("Please enter all certification data");
    }
    this.setState({
      certifications: [
        ...this.state.certifications,
        ...certificationz,
      ].reverse(),
    });

    this.setState({
      certificateName: "",
      valid_from: "",
      valid_till: "",
      expirationStatus: "",
    });
  };
  addNewReferences = () => {
    const References = [
      {
        name: this.state.referencename,
        phone: this.state.referencephone,
        relationship: this.state.referencerelationship,
        title: this.state.referencetitle,
        ref_email: this.state.referenceemail,
      },
    ];
    const [{ name, phone, title, ref_email }] = References;
    if (name === "" || phone === "" || title === "" || ref_email === "") {
      return this.notify("Please enter all reference information");
    }
    this.setState({
      references: [...this.state.references, ...References].reverse(),
      referencename: "",
      referencephone: "",
      referencerelationship: "",
      referencetitle: "",
      referenceemail: "",
    });
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const self: any = this;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(
      `${API}/profilebuilder/${this.props.match.params.email}`,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            user: response.data,
            new_user:response?.data?.new_user,
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
  componentWillMount() {
    this.setState({ isLoading: true });
    const self: any = this;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    Axios.get<any, AxiosResponse<any>>(
      `${API}/profilebuilder/${this.props.match.params.email}`,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((response) => {
        // console.log(response)
        if (response.status === 200) {
          this.setState({
            user: response.data,
          });
        }
        if(response?.data?.new_user){
          this.notify("This professional profile does not have any entry")
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
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
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
  onchangeCurrentWork = () => {
    this.setState({
      mycurrentwork: this.state.mycurrentwork ? false : true,
    });
  };
  onchangeCurrentStudy = () => {
    this.setState({
      education_doesnot_expire: this.state.education_doesnot_expire
        ? false
        : true,
    });
  };
  onchange = () => {
    this.setState({
      mycurrentwork: this.state.mycurrentwork ? false : true,
    });
  };
  onchange1 = () => {
    this.setState({
      expirationStatus: this.state.expirationStatus ? false : true,
    });
  };
  deleteExperience = (id) => {
    const Experiences = this.state.experiences;
    Experiences.splice(id, 1);
    this.setState({
      experiences: Experiences,
    });
  };
  deleteReference = (id) => {
    const References = this.state.references;
    References.splice(id, 1);
    this.setState({
      references: References,
    });
  };
  deleteEducation = (id) => {
    const Education = this.state.education;
    Education.splice(id, 1);
    this.setState({
      education: Education,
    });
  };
  deleteCertification = (id) => {
    const Certifications = this.state.certifications;
    Certifications.splice(id, 1);
    this.setState({
      certifications: Certifications,
    });
  };
  deleteSkill = (id): void => {
    const Skills = this.state.skills;
    Skills.splice(id, 1);
    this.setState({
      skills: Skills,
    });
  };
  notify = (message: string) => toast(message, { containerId: "B" });
  handleChangeB = (e) => {
    this.setState({
      mountedExperience: [{ [e.target.id]: e.target.value }],
    });
  };
  formatTime = (date) => {
    const dateTime = moment(date).format("MMM YYYY");
    return dateTime;
  };
  render() {
    const {
      education,
      certifications,
      experiences,
      about,
      skills,
      references,
      linkedin,
      twitter,
      instagram,
      facebook,
      user,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          {/* <CounsellorsDashboardMobileNav builder={true} /> */}
          <Row>
            {/* <SideBarCounsellorDashboard builder={true} /> */}
            <Col md={12} sm={12} className="prm">
              <CounsellorDashboardNav title="Individual Professional Profile" />
              <div className="userprofilettl">
                Assigned Users Professional Profile
              </div>
              <Row>
                {/* <SideBarCounsellorDashboard builder={true} /> */}
                <Col md={12} sm={12} className="prm">
                  <Row>
                    <Col md={11} className="kisls centrmargin">
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
                            {/* <Link to="/dashboardsettings">
                          <img
                            src={writeicon}
                            className="writeicon"
                            alt="writeicon"
                          />
                          Edit Profile
                        </Link> */}
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <Row>
                        <Col md={12}>
                          {/* <DashboardInfoArea /> */}
                          <hr />
                          <Row className="rowla">
                            <Col md={12}>
                              <div className="whatdoudo">About </div>
                              <div className="edittt">
                                {/* <Link to="/counsellorprofilebuilderedit/#about">
                              <img
                                className="edit_icon"
                                src={editicon}
                                alt="edit icon"
                              />
                            </Link> */}
                              </div>
                              <div className="aboutprv">{about}</div>
                            </Col>
                          </Row>
                          <Row className="rowla">
                            <Col md={12}>
                              <div className="whatdoudo offpad">
                                <div className="what12">
                                  Experience{" "}
                                  {/* <div className="plusnew" title="Add entry">
                                <span className="addone">
                                  <Link to="/counsellorprofilebuilderedit/#experience">
                                    <img
                                      className="add_icon"
                                      src={plus}
                                      alt="add icon"
                                    />
                                  </Link>
                                </span>
                              </div> */}
                                </div>
                              </div>
                              <Row className="cvexperience">
                                {experiences.map((data) => (
                                  <Row className="roww">
                                    <Col md={1} sm={1} className="buildingbg">
                                      <img
                                        className="building"
                                        src={building}
                                        alt="building icon"
                                      />
                                    </Col>
                                    <Col md={9} sm={8} className="cvexp">
                                      <div className="role">
                                        {data.position}
                                      </div>
                                      <div className="company">
                                        {data.organisation}
                                      </div>
                                      <div className="time">
                                        {this.formatTime(data.started_from)} -
                                        {data.current ? " Present" : ""}{" "}
                                        {data?.end_date}
                                      </div>
                                      <hr />
                                    </Col>
                                  </Row>
                                ))}
                              </Row>
                              {false && (
                                <a href="#" className="showmore">
                                  Show More
                                </a>
                              )}
                            </Col>
                          </Row>
                          <hr />
                          <Row className="skill_row">
                            <Col md={12}>
                              <div className="whatdoudo offpad">
                                <div className="what12 lass">
                                  Skills{" "}
                                  {/* <div className="plusnew" title="Add entry">
                                <span className="addone">
                                  <Link to="/counsellorprofilebuilderedit/#skills">
                                    <img
                                      className="add_icon"
                                      src={plus}
                                      alt="add icon"
                                    />
                                  </Link>
                                </span>
                              </div> */}
                                </div>
                              </div>
                            </Col>
                            <Col md={12} className="">
                              <div className="plusnew1 ll122">
                                {skills.map((data, ind) => (
                                  <div className="skills" key={ind}>
                                    {data.skill}{" "}
                                    <span className="dlete">
                                      {/* <img
                                    className="skill_cancel"
                                    src={x}
                                    alt="delete skill"
                                  /> */}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="aboutprv jobr"></div>
                            </Col>
                          </Row>

                          <Row className="rowla skill_row">
                            <Col md={12}>
                              <div className="whatdoudo offpad">
                                <div className="what12">
                                  Education{" "}
                                  {/* <div className="plusnew" title="Add entry">
                                <span className="addone">
                                  <Link to="/counsellorprofilebuilderedit/#education">
                                    <img
                                      className="add_icon"
                                      src={plus}
                                      alt="add icon"
                                    />
                                  </Link>
                                </span>
                              </div> */}
                                </div>
                              </div>
                              <Row>
                                {education.map((data, i) => (
                                  <div className="cveducation" key={i}>
                                    <span>
                                      <img
                                        className="cvedu"
                                        src={book}
                                        alt="book icon"
                                      />
                                    </span>
                                    <span className="sch_details">
                                      <div className="school">
                                        {data.institution}
                                      </div>
                                      <div className="course">
                                        {data.degree}
                                      </div>
                                      <div className="location">
                                        {data.location}
                                      </div>
                                    </span>
                                    {/* <Link
                                  className="edit_descrip"
                                  to="/counsellorprofilebuilderedit/#education"
                                >
                                  Edit Description
                                </Link> */}
                                  </div>
                                ))}
                              </Row>
                            </Col>
                          </Row>
                          <Row className="rowla newrowla">
                            <Col md={12}>
                              <div className="whatdoudo offpadd1">
                                <div className="what12">
                                  Certification{" "}
                                  {/* <div className="plusnew" title="Add entry">
                                <span className="addone">
                                  <Link to="/counsellorprofilebuilderedit/#certification">
                                    <img
                                      className="add_icon"
                                      src={plus}
                                      alt="add icon"
                                    />
                                  </Link>
                                </span>
                              </div> */}
                                </div>
                              </div>
                              <Row className="cvexperience">
                                {certifications.map((data) => (
                                  <Row className="roww">
                                    <Col md={1} sm={1} className="buildingbg">
                                      <img
                                        className="building"
                                        src={building}
                                        alt="building icon"
                                      />
                                    </Col>
                                    <Col md={9} sm={8} className="cvexp">
                                      <div className="role">
                                        {data.certificate_name}
                                      </div>
                                      <div className="company">
                                        {data.institution}
                                      </div>
                                      <div className="time">
                                        Issued{" "}
                                        {this.formatTime(data.valid_from)}
                                        {" - "}
                                        {data.does_not_expire
                                          ? "No Expiration Date"
                                          : ""}{" "}
                                        {this.formatTime(data.valid_from)}
                                      </div>
                                      <hr />
                                    </Col>
                                    <div className="dropit">
                                      <img
                                        className="drop"
                                        src={dropdown}
                                        alt="dropdown"
                                      />
                                    </div>
                                  </Row>
                                ))}
                              </Row>
                              {false && (
                                <a href="#" className="showmore">
                                  Show More
                                </a>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <hr />
                      <Row className="skill_row">
                        <Col md={12}>
                          <div className="whatdoudo unbtm">
                            <div className="what12">
                              Reference{" "}
                              {/* <div className="plusnew" title="Add entry">
                            <span className="addone">
                              <Link to="/counsellorprofilebuilderedit/#reference">
                                <img
                                  className="add_icon"
                                  src={plus}
                                  alt="add icon"
                                />
                              </Link>
                            </span>
                          </div> */}
                            </div>
                          </div>
                          {references.map((data, i) => (
                            <Row key={i}>
                              <div className="cvreference">
                                <span className="ref_details">
                                  <div className="name">{data.name}</div>
                                  <div className="mail">{data.ref_email}</div>
                                  <div className="phone">{data.phone}</div>
                                  <div className="relation">
                                    {data.relationship}
                                  </div>
                                </span>
                              </div>
                            </Row>
                          ))}
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={12}>
                          <div className="whatdoudo offpadd1">
                            <div className="what12">
                              Social Media Link{""}
                              {/* <div className="plusnew" title="Add entry">
                            <span className="addone">
                              <Link to="/counsellorprofilebuilderedit/#socialmedia">
                                <img
                                  className="add_icon"
                                  src={plus}
                                  alt="add icon"
                                />
                              </Link>
                            </span>
                          </div> */}
                            </div>
                          </div>
                          <Row className="cvsocial">
                            {linkedin && <a className="social1">{linkedin}</a>}
                            {facebook && <a className="social1">{facebook}</a>}
                            {instagram && (
                              <a className="social1">{instagram}</a>
                            )}
                            {twitter && <a className="social1">{twitter}</a>}
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="printcv"></Col>
                      </Row>
                    </Col>
                  </Row>
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
            <Modal show={this.state.showWarning} onHide={this.CloseWarning}>
              <Modal.Body>
                Please note that retaking the assessment would require you to
                make payment to view the result
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btnws"
                  variant="secondary"
                  onClick={this.CloseWarning}
                >
                  Back
                </Button>
                <Button variant="danger" className="btnws">
                  Continue
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </Container>
      </>
    );
  }
}
export default CounsellorViewUsersCVProfile;
