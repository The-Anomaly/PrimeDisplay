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
import writeicon from "../../assets/writeicon.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DashboardNav from "./DashboardNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Components/Home/Home/animate.css";
import DashboardInfoArea from "./DashboardInfoArea";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";
import { Link } from "react-router-dom";
import editicon from "../../assets/editicon.svg";
import building from "../../assets/building.svg";
import plus from "../../assets/plus.svg";
import x from "../../assets/x.svg";
import book from "../../assets/book.svg";
import dropdown from "../../assets/dropdown.svg";

class CVProfileBuilder extends React.Component {
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
    width: 100,
  };

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
    const [
      {
        certificate_name,
        institution,
        valid_from,
        valid_till,
        does_not_expire,
      },
    ] = certificationz;
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
    const [{ name, phone, relationship, title, ref_email }] = References;
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
  addExperience = () => {
    const Experiencez = [
      {
        organisation: this.state.organizationname,
        position: this.state.organizationposition,
        job_description: this.state.jobdescription,
        current: this.state.mycurrentwork,
        started_from: this.state.startDate,
        to: this.state.endDate,
      },
    ];
    const [
      { organisation, position, job_description, current, started_from, to },
    ] = Experiencez;
    if (
      organisation === "" ||
      position === "" ||
      job_description === "" ||
      started_from === ""
    ) {
      return this.notify("Please enter new work experience details");
    }
    this.setState({
      experiences: [...this.state.experiences, ...Experiencez].reverse(),
    });
    this.setState({
      organizationname: "",
      organizationposition: "",
      jobdescription: "",
      mycurrentwork: "",
      startDate: "",
      endDate: "",
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    const {
      certifications,
      about,
      skills,
      facebook,
      linkedin,
      twitter,
      experiences,
      references,
      education,
      instagram,
      startDate,
      endDate,
      userHasAddedExperience,
    } = this.state;
    console.log({ startDate, endDate });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      about,
      experience: experiences,
      certification: certifications,
      skills,
      education,
      reference: references,
      social_media: { instagram, facebook, linkedin, twitter },
    };
    console.log(data);
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/profilebuilder`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        console.log(res);
        this.notify("Successful");
      })
      .catch((err) => {
        if (err) {
          console.log(err.response);
          this.notify("Failed to send");
        }
      });
  };
  componentDidMount() {
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profilebuilder`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          skills: res.data.skills,
          about: res.data.about,
          experiences: res.data.user_experiences,
          certifications: res.data.certification,
          education: res.data.education,
          references: res.data.user_refernce,
          socials: res.data.user_social,
          facebook: res.data.user_social.facebook,
          linkedin: res.data.user_social.linkedin,
          instagram: res.data.user_social.instagram,
          twitter: res.data.user_social.twitter,
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err.response);
          this.notify("Failed to fetch data");
        }
      });
  }
  componentWillMount() {
    this.setState({ isLoading: true });
    const availableToken = sessionStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profile`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            user: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
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
    console.log(e.target.value);
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
  onchangeCurrentWork = (e: any) => {
    this.setState({
      mycurrentwork: this.state.mycurrentwork ? false : true,
    });
    console.log(this.state.mycurrentwork);
  };
  onchangeCurrentStudy = (e: any) => {
    this.setState({
      education_doesnot_expire: this.state.education_doesnot_expire
        ? false
        : true,
    });
    console.log(this.state.mycurrentwork);
  };
  onchange = (e: any) => {
    this.setState({
      mycurrentwork: this.state.mycurrentwork ? false : true,
    });
    console.log(this.state.mycurrentwork);
  };
  onchange1 = (e: any) => {
    this.setState({
      expirationStatus: this.state.expirationStatus ? false : true,
    });
    console.log(this.state.expirationStatus);
  };
  deleteExperience = (id) => {
    const Experiences = this.state.experiences;
    Experiences.splice(id, 1);
    this.setState({
      experiences: Experiences,
    });
    console.log(Experiences);
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
    console.log(Certifications);
  };
  deleteSkill = (id): void => {
    const Skills = this.state.skills;
    console.log(Skills[id]);
    const foundIndex = Skills.indexOf(Skills[id]);
    console.log(foundIndex);
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
  render() {
    const {
      fullname,
      education,
      isLoading,
      referencename,
      certifications,
      certificateInstitution,
      jobdescription,
      organizationname,
      referencetitle,
      referencephone,
      referenceemail,
      experiences,
      referencerelationship,
      organizationposition,
      certificateName,
      valid_from,
      valid_till,
      about,
      skill,
      skills,
      references,
      mycurrentwork,
      startDate,
      endDate,
      institutionname,
      degreeObtained,
      institutionLocation,
      expirationStatus,
      linkedin,
      twitter,
      instagram,
      facebook,
      education_valid_from,
      education_valid_till,
      education_doesnot_expire,
      width,
      user,
    } = this.state;
    console.log(user);
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav builder={true} />
          <Row>
            <SideBarNewDashboard builder={true} />
            <Col md={10} sm={12} className="prm">
              <DashboardLargeScreenNav title="Profile Builder" />
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
                        <Col md={12}>
                          <div className="whatdoudo">About </div>
                          <div className="edittt"><img className="edit_icon" src={editicon} alt="edit icon"/></div>
                          <textarea
                            className="form-control jobr bout"
                            value={about}
                            onChange={this.handleChange}
                            id="about"
                            placeholder="Provide a description of what defines you and your process"
                          />
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={12}>
                          <div className="whatdoudo offpad">
                            <div className="what12">
                              Experience{" "}
                              <div
                                className="plusnew"
                                onClick={this.addExperience}
                                title="Add entry"
                              >
                                <span className="addone"><img className="add_icon" src={plus} alt="add icon" /></span>
                              </div>
                            </div>
                          </div>
                          <Row className="cvexperience">
                            <Row className="roww">
                              <Col md={1} sm={1} className="buildingbg" >
                                <img className="building" src={building} alt="building icon" />
                              </Col>
                              <Col md={9} sm={8} className="cvexp" >
                                <div className="role">Frontend Developer</div>
                                <div className="company">Netflix</div>
                                <div className="time">July 2019 - Present  6 months</div>
                                <hr/>
                              </Col>
                            </Row>
                            <Row className="roww">
                              <Col md={1} sm={1} className="buildingbg" >
                                <img className="building" src={building} alt="building icon" />
                              </Col>
                              <Col md={9} sm={8} className="cvexp" >
                                <div className="role">Full stack Developer Intern</div>
                                <div className="company">Microsoft</div>
                                <div className="time">July 2018 - July 2020  1 year</div>
                                <hr/>
                              </Col>
                            </Row>
                            <Row className="roww">
                              <Col md={1} sm={1} className="buildingbg" >
                                <img className="building" src={building} alt="building icon" />
                              </Col>
                              <Col md={9} sm={8} className="cvexp" >
                                <div className="role">Backend Developer Intern</div>
                                <div className="company">Amazon</div>
                                <div className="time">July 2017 - July 2018  1 year</div>
                                <hr/>
                              </Col>
                            </Row>
                          </Row>
                          <a href="#" className="showmore">Show More</a>
                        </Col>
                      </Row>
                      <hr />
                      <Row className="skill_row">
                        <Col md={12}>
                          <div className="whatdoudo offpad">
                            <div className="what12 lass">
                              Skills{" "}
                              <div
                                className="plusnew"
                                onClick={this.addNewSkill}
                                title="Add entry"
                              >
                                <span className="addone"><img className="add_icon" src={plus} alt="add icon" /></span>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} className="">
                          <div className="plusnew1 ll122">
                            {skills.map((data, ind) => (
                              <div className="skills" key={ind}>
                                {data.skill}{" "}
                                <span
                                  className="dlete"
                                  onClick={() => this.deleteSkill(ind)}
                                >
                                  <img className="skill_cancel" src={x} alt="delete skill"/>
                                </span>
                              </div>
                            ))}
                          </div>
                          <input
                            type="text"
                            value={skill}
                            id="skill"
                            onKeyPress={(e) => {
                              console.log(e);
                              if (e.key == "Enter") {
                                this.addNewSkill();
                              }
                            }}
                            onChange={this.handleChange}
                            className="form-control jobr"
                          />
                        </Col>
                      </Row>
                      
                      <Row className="rowla skill_row">
                        <Col md={12}>
                          <div className="whatdoudo offpad">
                            <div className="what12">
                              Education{" "}
                              <div
                                className="plusnew"
                                onClick={this.addNewEducation}
                                title="Add entry"
                              >
                                <span className="addone"><img className="add_icon" src={plus} alt="add icon" /></span>
                              </div>
                            </div>
                          </div>
                          <Row>
                            <div className="cveducation">
                              <span>
                              <img className="cvedu" src={book} alt="book icon" />
                              </span>
                              <span className="sch_details">
                                <div className="school">University of Lagos</div>
                                <div className="course">Bachelor of Arts</div>
                                <div className="location">Yaba, Lagos state, Nigeria</div>
                              </span>
                              <a className="edit_descrip">Edit Description</a>
                            </div>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="rowla newrowla">
                        <Col md={12}>
                          <div className="whatdoudo offpadd1">
                            <div className="what12">
                              Certification{" "}
                              <div
                                className="plusnew"
                                onClick={this.addNewCertification}
                                title="Add entry"
                              >
                                <span className="addone"><img className="add_icon" src={plus} alt="add icon" /></span>
                              </div>
                            </div>
                          </div>
                          <Row className="cvexperience">
                            <Row className="roww">
                              <Col md={1} sm={1} className="buildingbg" >
                                <img className="building" src={building} alt="building icon" />
                              </Col>
                              <Col md={9} sm={8} className="cvexp" >
                                <div className="role">Digital Marketing from zero to hero</div>
                                <div className="company">Google Business school</div>
                                <div className="time">Issued June 2020 . No Expiration Date</div>
                                <hr/>
                              </Col>
                              <div className="dropit">
                                <img className="drop" src={dropdown} alt="dropdown" />
                              </div>
                            </Row>
                            <Row className="roww">
                              <Col md={1} sm={1} className="buildingbg" >
                                <img className="building" src={building} alt="building icon" />
                              </Col>
                              <Col md={9} sm={8} className="cvexp" >
                                <div className="role">Frontend Developer Nano Degree</div>
                                <div className="company">Udacity</div>
                                <div className="time">Issued June 2018 . No Expiration Date</div>
                                <hr/>
                              </Col>
                            </Row>
                          </Row>
                          <a href="#" className="showmore">Show More</a>
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
                          <div
                            className="plusnew"
                            onClick={this.addNewReferences}
                            title="Add entry"
                          >
                            <span className="addone"><img className="add_icon" src={plus} alt="add icon" /></span>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <div className="cvreference">
                            <span className="ref_details">
                              <div className="name">Professor Williams Donlop</div>
                              <div className="mail">williams@donlop.com</div>
                              <div className="phone">+234 567 876 3456</div>
                              <div className="relation">Father</div>
                            </span>
                            </div>
                      </Row>
                      <Row>
                        <div className="cvreference">
                            <span className="ref_details">
                              <div className="name">Professor Williams Donlop</div>
                              <div className="mail">williams@donlop.com</div>
                              <div className="phone">+234 567 876 3456</div>
                              <div className="relation">Father</div>
                            </span>
                            </div>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="rowla">
                    <Col md={12}>
                      <div className="whatdoudo offpadd1">
                        <div className="what12">
                          Social Media Link{""}
                        <div
                            className="plusnew"
                            title="Add entry"
                          >
                            <span className="addone"><img className="add_icon" src={plus} alt="add icon" /></span>
                          </div>
                        </div>
                      </div>
                      <Row className="cvsocial">
                        <a className="social1"href="#">https:://twiter.com/jaiyeolajones</a>
                        <a className="social1" href="#">https:://linkedin.com/in/jaiyeolajones</a>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="printcv">
                      <div className="savebtn savecv" onClick={this.submitForm}>
                        Save
                      </div>
                      <div className="print savecv">Generate CV</div>
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
export default CVProfileBuilder;
