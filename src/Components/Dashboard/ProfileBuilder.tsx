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

class ProfileBuilder extends React.Component {
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
    education_doesnot_expire: false,
    certificateInstitution: "",
    valid_from: "",
    valid_till: "",
    organizationname: "",
    isloading: false,
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
    experience_id: "",
    education_id: "",
    certification_id: "",
    reference_id: "",
    userHasAddedExperience: false,
    editexperience: false,
    editeducation: false,
    editcertification: false,
    editreference: false,
    startDate: "",
    endDate: "",
    width: 100,
  };
  moveTo = (str) => {
    const offsetTop: any = document?.getElementById(str)?.offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
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
      mycurrentwork: false,
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
    if (degree === "" || institution === "" || location === "") {
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
      education_doesnot_expire: false,
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
    if (certificate_name === "" || institution === "") {
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
      expirationStatus: false,
      certificateInstitution: "",
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
      mycurrentwork: false,
      startDate: "",
      endDate: "",
    });
  };
  submitForm = (e) => {
    this.setState({
      isloading: true,
    });
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
    const availableToken = localStorage.getItem("userToken");
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
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/profilebuilder`,
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
        setTimeout(() => {
          window.location.assign("/profilebuilder");
        });
      })
      .catch((err) => {
        if (err) {
          this.notify("Failed to send");
        }
        this.setState({
          isloading: false,
        });
      });
  };
  componentDidMount() {
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profilebuilder`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        if (res?.data?.new_user) {
          return;
        }
        console.log(res.data);
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
      .then((resp) => {
        // console.log(resp)
        //remove the # on the prefix of the url string and move the page to that postion on the page
        let resultareawithtitle: string = window.location.hash;
        resultareawithtitle = resultareawithtitle.substring(1);
        this.moveTo(resultareawithtitle);
      })
      .catch((err) => {
        if (err) {
          this.notify("Failed to fetch data");
        }
      });
  }
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
        // console.log(response)
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

  CloseEditExperience = () => {
    this.setState({
      editexperience: false,
    });
  };
  CloseEditEducation = () => {
    this.setState({
      editeducation: false,
    });
  };

  CloseEditReference = () => {
    this.setState({
      editreference: false,
    });
  };
  CloseEditCertification = () => {
    this.setState({
      editcertification: false,
    });
  };
  checkforid = (id) => {
    this.state.experiences.forEach((element) => {
      if (element.id == id) {
        console.log(element);
        this.setState({
          organizationname: element.organisation,
          organizationposition: element.position,
          startDate: element.started_from,
          mycurrentwork: element.current,
          endDate: element.to,
          job_description: element.job_description,
          experience_id: id,
          editexperience: true,
        });
      }
    });
  };

  updateExperience = () => {
    this.setState({
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      organisation: this.state.organizationname,
      position: this.state.organizationposition,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      i_currently_study_here: this.state.mycurrentwork,
    };
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/edit-experience/${this.state.experience_id}/`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        this.setState({
          isloading: false,
          editexperience: false,
          organizationname: "",
          organizationposition: "",
          startDate: "",
          mycurrentwork: "",
          endDate: "",
          job_description: "",
          experience_id: "",
        });
        this.notify("Successful");
        this.componentDidMount();
      })
      .catch((err) => {
        if (err) {
          this.notify("Failed to send");
        }
        this.setState({
          isloading: false,
          editexperience: false,
          organizationname: "",
          organizationposition: "",
          startDate: "",
          mycurrentwork: "",
          endDate: "",
          job_description: "",
          experience_id: "",
        });
      });
  };
  updateEducation = () => {
    this.setState({
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      degree: this.state.degreeObtained,
      i_currently_study_here: this.state.education_doesnot_expire,
      institution: this.state.institutionname,
      location: this.state.institutionLocation,
      start_date: this.state.education_valid_from,
      end_date: this.state.education_valid_till,
    };
    console.log(data);
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/edit-education/${this.state.education_id}/`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        this.setState({
          isloading: false,
          editeducation: false,
          degreeObtained: "",
          education_doesnot_expire: "",
          institutionname: "",
          institutionLocation: "",
          education_valid_from: "",
          education_valid_till: "",
        });
        this.notify("Successful");
        this.componentDidMount();
      })
      .catch((err) => {
        if (err) {
          this.notify("Failed to send");
        }
        this.setState({
          isloading: false,
          editeducation: false,
          degreeObtained: "",
          education_doesnot_expire: "",
          institutionname: "",
          institutionLocation: "",
          education_valid_from: "",
          education_valid_till: "",
        });
      });
  };
  checkforidEdu = (id) => {
    this.state.education.forEach((element) => {
      if (element.id == id) {
        console.log(element);
        this.setState({
          degreeObtained: element.degree,
          education_doesnot_expire: element.i_currently_study_here,
          education_id: id,
          institutionname: element.institution,
          institutionLocation: element.location,
          education_valid_from: element.start_date,
          education_valid_till: element.end_date,
          editeducation: true,
        });
      }
    });
  };
  checkforCertId = (id) => {
    this.state.certifications.forEach((element) => {
      if (element.id == id) {
        console.log(element);
        this.setState({
          certificateName: element.certificate_name,
          expirationStatus: element.does_not_expire,
          certification_id: id,
          certificateInstitution: element.institution,
          education_valid_from: element.valid_from,
          education_valid_till: element.valid_till,
          editcertification: true,
        });
      }
    });
  };
  updateCertification = () => {
    this.setState({
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      organisation: this.state.certificateName,
      position: this.state.organizationposition,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      i_currently_study_here: this.state.mycurrentwork,
    };
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/edit-certification/${this.state.certification_id}/`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        this.setState({
          isloading: false,
          certificateName: "",
          expirationStatus: "",
          certificateInstitution: "",
          education_valid_from: "",
          education_valid_till: "",
          editcertification: false,
        });
        this.notify("Successful");
        this.componentDidMount();
      })
      .catch((err) => {
        if (err) {
          this.notify("Failed to send");
        }
        this.setState({
          isloading: false,
          certificateName: "",
          expirationStatus: "",
          certificateInstitution: "",
          education_valid_from: "",
          education_valid_till: "",
          editcertification: false,
        });
      });
  };
  //reference
  checkforReferenceId = (id) => {
    this.state.references.forEach((element) => {
      if (element.id == id) {
        console.log(element);
        this.setState({
          referencetitle: element.title,
          referencename: element.name,
          referencephone: element.phone,
          reference_id: id,
          referenceemail: element.ref_email,
          referencerelationship: element.relationship,
          editreference: true,
        });
      }
    });
  };
  updateReference = () => {
    this.setState({
      isloading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = {
      organisation: this.state.certificateName,
      position: this.state.organizationposition,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      i_currently_study_here: this.state.mycurrentwork,
    };
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/edit-reference/${this.state.reference_id}/`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        this.setState({
          isloading: false,
          certificateName: "",
          expirationStatus: "",
          certificateInstitution: "",
          education_valid_from: "",
          education_valid_till: "",
          editreference: false,
        });
        this.notify("Successful");
        this.componentDidMount();
      })
      .catch((err) => {
        if (err) {
          this.notify("Failed to send");
        }
        this.setState({
          isloading: false,
          certificateName: "",
          expirationStatus: "",
          certificateInstitution: "",
          education_valid_from: "",
          education_valid_till: "",
          editreference: false,
        });
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
  };
  onchangeCurrentStudy = (e: any) => {
    this.setState({
      education_doesnot_expire: this.state.education_doesnot_expire
        ? false
        : true,
    });
  };
  onchange = (e: any) => {
    this.setState({
      mycurrentwork: this.state.mycurrentwork ? false : true,
    });
  };
  onchange1 = (e: any) => {
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
    const foundIndex = Skills.indexOf(Skills[id]);
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
      isloading,
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
      editeducation,
      width,
      user,
    } = this.state;
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav builder={true} />
          <Row>
            <SideBarNewDashboard builder={true} />
            <Col md={10} sm={12} className="prm newprm">
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
                          <div className="whatdoudo" id="about">
                            About{" "}
                          </div>
                          <textarea
                            className="form-control jobr jbdescr"
                            value={about}
                            onChange={this.handleChange}
                            id="about"
                            placeholder="Provide a description of what defines you and your process"
                          ></textarea>
                          {/* <input
                            type="text"
                            className="form-control jobr"
                            value={about}
                            onChange={this.handleChange}
                            id="about"
                            placeholder="Provide a description of what defines you and your process"
                          /> */}
                        </Col>
                      </Row>
                      <hr />
                                        <br/>
                      <Row className="rowla" id="experience">
                        <Col md={12}>
                          <div className="whatdoudo offpad">
                            <div className="what12">
                              Experience{" "}
                              <div
                                className="plusnew"
                                onClick={this.addExperience}
                                title="Add entry"
                              >
                                <span className="addone"> +</span>
                                <span className="infoforsave">
                                  From older to latest experience
                                </span>
                              </div>
                            </div>
                          </div>
                          <Row>
                            <Col md={6}>
                              <div className="plusnew1 ">Organization</div>
                              <input
                                id="organizationname"
                                onChange={this.handleChange}
                                value={organizationname}
                                className="form-control jobr subhyt"
                                placeholder=""
                              />
                            </Col>
                            <Col md={6}>
                              {/* <div className="whatdoudo offpad"></div> */}
                              <div className="plusnew1">Position</div>
                              <textarea
                                id="organizationposition"
                                value={organizationposition}
                                onChange={this.handleChange}
                                className="form-control jobr subhyt"
                                placeholder=""
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="plusnew1">Started From</div>
                              <Form.Control
                                type="date"
                                value={startDate}
                                id="startDate"
                                className="fmc jobr subhyt dateinputt"
                                onChange={this.handleChange}
                              ></Form.Control>
                            </Col>
                            <Col md={6}>
                              <div className="qflex">
                                <label className="checkcontainer">
                                  <input
                                    type="checkbox"
                                    value={mycurrentwork}
                                    onChange={this.onchangeCurrentWork}
                                    name="mycurrentwork"
                                    checked={mycurrentwork === true}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                                <div className="plusnew2">
                                  I currently work here
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="plusnew1">To</div>
                              <Form.Control
                                type="date"
                                value={endDate}
                                id="endDate"
                                className="fmc jobr subhyt dateinputt"
                                onChange={this.handleChange}
                                disabled={mycurrentwork ? true : false}
                              ></Form.Control>
                            </Col>
                          </Row>
                          <Row className="rowla">
                            <Col md={12}>
                              <div className="plusnew1">Job Description</div>
                              <textarea
                                name=""
                                id="jobdescription"
                                onChange={this.handleChange}
                                className="form-control jobr jbdescr"
                                placeholder="Enter a job descrption"
                                value={jobdescription}
                              ></textarea>
                              {/* <input
                                name=""
                                id="jobdescription"
                                value={jobdescription}
                                onChange={this.handleChange}
                                className="form-control jobr"
                                onKeyPress={(e) => {
                                  if (e.key == "Enter") {
                                    this.addExperience();
                                  }
                                }}
                                placeholder=""
                              /> */}
                            </Col>
                          </Row>
                          <div
                            className="plusnew rtt newrtt"
                            onClick={this.addExperience}
                            title="Add entry"
                          >
                            <span className="addone wrarr">Save</span>
                            <span className="infoforsave">
                              Click to save entry and add another
                            </span>
                          </div>
                        </Col>
                        {experiences.map((data, index) => (
                          <Col
                            md={12}
                            className="experience animated fadeIn"
                            key={index}
                          >
                            <div className="deleee">
                              <i
                                title={"Edit"}
                                className="editiconn1 fa fa-pencil-square-o"
                                onClick={() => this.checkforid(data.id)}
                              ></i>
                              <i
                                className="fa fa-trash"
                                onClick={() => this.deleteExperience(index)}
                              ></i>
                            </div>
                            <Row>
                              <Col md={6}>
                                <div className="plusnew1 plusnew12">
                                  Organization
                                </div>
                                <input
                                  id="organizationname"
                                  onChange={this.handleChangeB}
                                  value={data.organisation}
                                  className="form-control jobr subhyt subhyt12"
                                  placeholder={""}
                                  disabled={true}
                                />
                              </Col>
                              <Col md={6}>
                                <div className="whatdoudo offpad"></div>
                                <div className="plusnew1 plusnew12">
                                  Position
                                </div>
                                <textarea
                                  id="organizationposition"
                                  value={data.position}
                                  onChange={this.handleChange}
                                  className="form-control jobr subhyt subhyt12"
                                  placeholder=""
                                  disabled={true}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <div className="plusnew1 plusnew12">
                                  Started From
                                </div>
                                <Form.Control
                                  value={data.started_from}
                                  id="startDate"
                                  className="fmc jobr subhyt subhyt12 dateinputt"
                                  disabled={true}
                                ></Form.Control>
                              </Col>
                              <Col md={6}>
                                <div className="qflex">
                                  <label className="checkcontainer">
                                    <input
                                      type="checkbox"
                                      disabled={true}
                                      checked={data.current}
                                      onChange={this.onchangeCurrentWork}
                                      name="mycurrentwork"
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                  <div className="plusnew2">
                                    I currently work here
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <div className="plusnew1 plusnew12">To</div>
                                <input
                                  id="organizationname"
                                  value={data.to}
                                  className="form-control jobr subhyt plusnew12"
                                  placeholder=""
                                  disabled={true}
                                />
                              </Col>
                            </Row>
                            <Row className="rowla">
                              <Col md={12}>
                                <div className="plusnew1 plusnew12">
                                  Job Description
                                </div>
                                <textarea
                                  name=""
                                  id="jobdescription"
                                  value={data.job_description}
                                  onChange={this.handleChange}
                                  className="form-control jobr plusnew12"
                                  placeholder=""
                                  disabled={true}
                                />
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </Row>
                      <hr />
                      <br/>
                      <Row className="rowla" id="education">
                        <Col md={12}>
                          <div className="whatdoudo offpad">
                            <div className="what12">
                              Education{" "}
                              <div
                                className="plusnew"
                                onClick={this.addNewEducation}
                                title="Add entry"
                              >
                                <span className="addone">+</span>
                              </div>
                            </div>
                          </div>
                          <Row>
                            <Col md={6}>
                              <div className="plusnew1">
                                Name Of Institution
                              </div>
                              <input
                                id="institutionname"
                                onChange={this.handleChange}
                                value={institutionname}
                                className="form-control jobr subhyt"
                                placeholder=""
                              />
                            </Col>
                            <Col md={6}>
                              <div className="whatdoudo offpad"></div>
                              <div className="plusnew1">Degree</div>
                              <textarea
                                id="degreeObtained"
                                value={degreeObtained}
                                onChange={this.handleChange}
                                className="form-control jobr subhyt"
                                placeholder=""
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="plusnew1">Started From</div>
                              <Form.Control
                                type="date"
                                value={education_valid_from}
                                id="education_valid_from"
                                className="fmc jobr subhyt dateinputt"
                                onChange={this.handleChange}
                              ></Form.Control>
                            </Col>
                            <Col md={6}>
                              <div className="qflex">
                                <label className="checkcontainer">
                                  <input
                                    type="checkbox"
                                    value={education_doesnot_expire}
                                    onChange={this.onchangeCurrentStudy}
                                    name="education_doesnot_expire"
                                    checked={education_doesnot_expire === true}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                                <div className="plusnew2">
                                  I currently study here
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="plusnew1">To</div>
                              <Form.Control
                                type="date"
                                value={education_valid_till}
                                id="education_valid_till"
                                className="fmc jobr subhyt dateinputt"
                                onChange={this.handleChange}
                                disabled={
                                  education_doesnot_expire ? true : false
                                }
                              ></Form.Control>
                            </Col>
                            <Col md={6}>
                              <div className="plusnew1">Location</div>
                              <Form.Control
                                type="text"
                                value={institutionLocation}
                                id="institutionLocation"
                                className="fmc jobr subhyt"
                                onChange={this.handleChange}
                                onKeyPress={(e) => {
                                  if (e.key == "Enter") {
                                    this.addNewEducation();
                                  }
                                }}
                              ></Form.Control>
                            </Col>
                          </Row>
                          <div
                            className="plusnew rtt newrtt"
                            onClick={this.addNewEducation}
                            title="Add entry"
                          >
                            <span className="addone wrarr">Save</span>
                            <span className="infoforsave">
                              Click to save entry and add another
                            </span>
                          </div>
                        </Col>
                        {education.map((data, index) => (
                          <Col md={12}>
                            <div className="deleee">
                              <i
                                title={"Edit"}
                                className="editiconn1 fa fa-pencil-square-o"
                                onClick={() => this.checkforidEdu(data.id)}
                              ></i>
                              <i
                                className="fa fa-trash"
                                onClick={() => this.deleteEducation(index)}
                              ></i>
                            </div>
                            <Row>
                              <Col md={6}>
                                <div className="plusnew1 plusnew12">
                                  Name Of Institution
                                </div>
                                <input
                                  id={data.institution}
                                  onChange={this.handleChange}
                                  value={data.institution}
                                  className="form-control jobr subhyt subhyt12"
                                  placeholder=""
                                  disabled={true}
                                />
                              </Col>
                              <Col md={6}>
                                <div className="whatdoudo offpad"></div>
                                <div className="plusnew1 plusnew12">Degree</div>
                                <textarea
                                  id={data.degree}
                                  value={data.degree}
                                  onChange={this.handleChange}
                                  className="form-control jobr subhyt subhyt12"
                                  placeholder=""
                                  disabled={true}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <div className="plusnew1">Started From</div>
                                <Form.Control
                                  type="date"
                                  value={data.start_date}
                                  id="valid_from"
                                  disabled={true}
                                  className="fmc jobr subhyt dateinputt"
                                ></Form.Control>
                              </Col>
                              <Col md={6}>
                                <div className="qflex">
                                  <label className="checkcontainer">
                                    <input
                                      type="checkbox"
                                      checked={
                                        data.i_currently_study_here
                                          ? true
                                          : false
                                      }
                                      onChange={this.onchangeCurrentStudy}
                                      name="education_doesnot_expire"
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                  <div className="plusnew2">
                                    I currently study here
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <div className="plusnew1">To</div>
                                <Form.Control
                                  type="date"
                                  value={data.end_date}
                                  id="end_date"
                                  className="fmc jobr subhyt dateinputt"
                                  onChange={this.handleChange}
                                  disabled={true}
                                ></Form.Control>
                              </Col>
                              <Col md={6}>
                                <div className="plusnew1 plusnew12">
                                  Location
                                </div>
                                <Form.Control
                                  type="text"
                                  value={data.location}
                                  id="institutionLocation"
                                  className="fmc jobr subhyt subhyt12"
                                  onChange={this.handleChange}
                                  disabled={true}
                                ></Form.Control>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </Row>
                      <hr />
                      <br/>
                      <Row>
                        <Col md={12}>
                          <div className="whatdoudo offpad">
                            <div className="what12 lass">
                              Skills{" "}
                              <div
                                className="plusnew"
                                onClick={this.addNewSkill}
                                title="Add entry"
                              >
                                <span className="addone"> +</span>
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
                                  &times;
                                </span>
                              </div>
                            ))}
                          </div>
                          <input
                            type="text"
                            value={skill}
                            id="skill"
                            onKeyPress={(e) => {
                              if (e.key == "Enter") {
                                this.addNewSkill();
                              }
                            }}
                            onChange={this.handleChange}
                            className="form-control jobr sskill"
                            placeholder="Type in a skill and click enter to add it"
                          />
                        </Col>
                      </Row>
                      <hr />
                      <br/>
                      <Row className="rowla">
                        <Col md={12} id="certification">
                          <div className="whatdoudo offpadd1">
                            <div className="what12">
                              Certification{" "}
                              <div
                                className="plusnew"
                                onClick={this.addNewCertification}
                                title="Add entry"
                              >
                                <span className="addone">+</span>
                              </div>
                            </div>
                          </div>
                          <Row>
                            <Col md={6}>
                              <div className="plusnew1">Certificate Name</div>
                              <textarea
                                name=""
                                className="form-control jobr subhyt"
                                value={certificateName}
                                id="certificateName"
                                onChange={this.handleChange}
                                placeholder=""
                              />
                            </Col>
                            <Col md={6}>
                              <div className="whatdoudo offpad"></div>
                              <div className="plusnew1">Institution</div>
                              <textarea
                                name=""
                                value={certificateInstitution}
                                id="certificateInstitution"
                                onChange={this.handleChange}
                                className="form-control jobr subhyt"
                                placeholder=""
                              ></textarea>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="plusnew1">Valid From</div>
                              <Form.Control
                                type="date"
                                value={valid_from}
                                id="valid_from"
                                className="fmc jobr subhyt dateinputt"
                                onChange={this.handleChange}
                              ></Form.Control>
                              <Col md={6}>
                                <div className="qflex app11">
                                  <label className="checkcontainer">
                                    <input
                                      type="checkbox"
                                      value={expirationStatus}
                                      onChange={this.onchange1}
                                      id="expirationStatus"
                                      checked={expirationStatus === true}
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                  <div className="plusnew2">
                                    Does not expire
                                  </div>
                                </div>
                              </Col>
                            </Col>
                            <Col md={6}>
                              <div className="plusnew1">To</div>
                              <Form.Control
                                type="date"
                                value={valid_till}
                                id="valid_till"
                                className="fmc jobr subhyt dateinputt"
                                disabled={expirationStatus ? true : false}
                                onChange={this.handleChange}
                                onKeyPress={(e) => {
                                  if (e.key == "Enter") {
                                    this.addNewCertification();
                                  }
                                }}
                              ></Form.Control>
                            </Col>
                          </Row>
                          <div
                            className="plusnew rtt newrtt"
                            onClick={this.addNewCertification}
                            title="Add entry"
                          >
                            <span className="addone wrarr">Save</span>
                            <span className="infoforsave">
                              Click to save entry and add another
                            </span>
                          </div>
                        </Col>
                        {certifications.map((data, index) => (
                          <Col md={12}>
                            <div className="whatdoudo offpadd1">
                              <div className="what12"></div>
                            </div>
                            <div className="deleee">
                              <i
                                title={"Edit"}
                                className="editiconn1 fa fa-pencil-square-o"
                                onClick={() => this.checkforCertId(data.id)}
                              ></i>
                              <i
                                className="fa fa-trash"
                                onClick={() => this.deleteCertification(index)}
                              ></i>
                            </div>
                            <Row>
                              <Col md={6}>
                                <div className="plusnew1 plusnew12">
                                  Certificate Name
                                </div>
                                <textarea
                                  name=""
                                  className="form-control jobr subhyt subhyt12"
                                  value={data.certificate_name}
                                  id="certificateName"
                                  onChange={this.handleChange}
                                  placeholder=""
                                />
                              </Col>
                              <Col md={6}>
                                <div className="whatdoudo offpad"></div>
                                <div className="plusnew1 plusnew12">
                                  Institution
                                </div>
                                <textarea
                                  name=""
                                  value={data.institution}
                                  id="certificateInstitution"
                                  onChange={this.handleChange}
                                  className="form-control jobr subhyt plusnew12"
                                  placeholder=""
                                ></textarea>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <div className="plusnew1">Valid From</div>
                                <Form.Control
                                  type="date"
                                  value={data.valid_from}
                                  id="valid_from"
                                  className="fmc jobr subhyt plusnew12 dateinputt"
                                  onChange={this.handleChange}
                                ></Form.Control>
                                <Col md={6}>
                                  <div className="qflex app11">
                                    <label className="checkcontainer">
                                      <input
                                        type="checkbox"
                                        value={expirationStatus}
                                        checked={data.status ? true : false}
                                        id="expirationStatus"
                                      />
                                      <span className="checkmark"></span>
                                    </label>
                                    <div className="plusnew2 plusnew12">
                                      Does not expire
                                    </div>
                                  </div>
                                </Col>
                              </Col>
                              <Col md={6}>
                                <div className="plusnew1">To</div>
                                <Form.Control
                                  type="date"
                                  value={data.valid_till}
                                  id="valid_till"
                                  className="fmc jobr subhyt plusnew12 dateinputt"
                                  onChange={this.handleChange}
                                ></Form.Control>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  <br/>
                  <Row>
                    <Col md={12} id="reference">
                      <div className="whatdoudo unbtm">
                        <div className="what12">
                          Reference{" "}
                          <div
                            className="plusnew"
                            onClick={this.addNewReferences}
                            title="Add entry"
                          >
                            <span className="addone">+</span>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col md={6}>
                          <div className="whatdoudo offpad"></div>
                          <div className="plusnew1">Title</div>
                          <textarea
                            name=""
                            id="referencetitle"
                            value={referencetitle}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          />
                        </Col>
                        <Col md={6}>
                          <div className="plusnew1"> Name</div>
                          <textarea
                            name=""
                            id="referencename"
                            onChange={this.handleChange}
                            value={referencename}
                            className="form-control jobr subhyt"
                            placeholder=""
                          />
                        </Col>
                        <Col md={6}>
                          <div className="plusnew1">Phone Number</div>
                          <textarea
                            name=""
                            id="referencephone"
                            value={referencephone}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          />
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo offpad"></div>
                          <div className="plusnew1">Email</div>
                          <textarea
                            name=""
                            id="referenceemail"
                            value={referenceemail}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo offpad"></div>
                          <div className="plusnew1">Relationship</div>
                          <input
                            name=""
                            id="referencerelationship"
                            value={referencerelationship}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                            onKeyPress={(e) => {
                              if (e.key == "Enter") {
                                this.addNewReferences();
                              }
                            }}
                          />
                        </Col>
                      </Row>
                      <div
                        className="plusnew rtt newrtt"
                        onClick={this.addNewReferences}
                        title="Add entry"
                      >
                        <span className="addone wrarr">Save</span>
                        <span className="infoforsave">
                          Click to save entry and add another
                        </span>
                      </div>
                    </Col>
                    {references.map((data, index) => (
                      <Col md={12}>
                        <div className="whatdoudo unbtm"></div>
                        <div className="deleee">
                          <i
                            title={"Edit"}
                            className="editiconn1 fa fa-pencil-square-o"
                            onClick={() => this.checkforReferenceId(data.id)}
                          ></i>
                          <i
                            className="fa fa-trash"
                            onClick={() => this.deleteReference(index)}
                          ></i>
                        </div>
                        <Row>
                          <Col md={6}>
                            <div className="plusnew1 plusnew12"> Name</div>
                            <textarea
                              name=""
                              id="referencename"
                              onChange={this.handleChange}
                              value={data.name}
                              className="form-control jobr subhyt plusnew12"
                              placeholder=""
                            />
                          </Col>
                          <Col md={6}>
                            <div className="whatdoudo offpad"></div>
                            <div className="plusnew1 plusnew12">Title</div>
                            <textarea
                              name=""
                              id="referencetitle"
                              value={data.title}
                              onChange={this.handleChange}
                              className="form-control jobr subhyt plusnew12"
                              placeholder=""
                            />
                          </Col>
                          <Col md={6}>
                            <div className="plusnew1 plusnew12">
                              Phone Number
                            </div>
                            <textarea
                              name=""
                              id="referencephone"
                              value={data.phone}
                              onChange={this.handleChange}
                              className="form-control jobr subhyt plusnew12"
                              placeholder=""
                            />
                          </Col>
                          <Col md={6}>
                            <div className="whatdoudo offpad"></div>
                            <div className="plusnew1 plusnew12">Email</div>
                            <textarea
                              name=""
                              id="referenceemail"
                              value={data.ref_email}
                              onChange={this.handleChange}
                              className="form-control jobr subhyt plusnew12"
                              placeholder=""
                            ></textarea>
                          </Col>
                          <Col md={6}>
                            <div className="whatdoudo offpad"></div>
                            <div className="plusnew1 plusnew12">
                              Relationship
                            </div>
                            <textarea
                              name=""
                              id="referencerelationship"
                              value={data.relationship}
                              onChange={this.handleChange}
                              className="form-control jobr subhyt plusnew12"
                              placeholder=""
                            />
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                  {/* <hr />
                  <Row className="rowla">
                    <Col md={12} id="socialmedia">
                      <div className="whatdoudo offpadd1">
                        <div className="what12">Social Media Link</div>
                      </div>
                      <Row>
                        <Col md={6}>
                          <div className="plusnew1">LinkedIn</div>
                          <textarea
                            name=""
                            id="linkedin"
                            value={linkedin}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt socialpad"
                            placeholder="linkedin.com/jaiyeola-jones"
                          />
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo offpad"></div>
                          <div className="plusnew1">Twitter</div>
                          <textarea
                            name=""
                            id="twitter"
                            value={twitter}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt socialpad"
                            placeholder="twitter.com/jaiyeola-jones"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="plusnew1">Facebook</div>
                          <textarea
                            name=""
                            id="facebook"
                            value={facebook}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt socialpad"
                            placeholder="facebook.com/jaiyeola-jones"
                          />
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo offpad"></div>
                          <div className="plusnew1">Instagram</div>
                          <textarea
                            name=""
                            id="instagram"
                            value={instagram}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt socialpad"
                            placeholder="instagram.com/jaiyeola-jones"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col md={12} className="printcv">
                      {/* <Link to="/profilebuilder">
                        {" "}
                        <div className="print">Preview</div>
                      </Link> */}
                      <div className="savebtn" onClick={this.submitForm}>
                        {isloading ? "Saving..." : "Save"}
                      </div>
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
            {/* Edit Profile Builder */}
            {/* Edit Experience modal starts */}
            <Modal
              show={this.state.editexperience}
              onHide={this.CloseEditExperience}
              className="widincr"
            >
              <Modal.Body>
                <Row>
                  <Col md={6}>
                    <div className="plusnew1 ">Organization</div>
                    <input
                      id="organizationname"
                      onChange={this.handleChange}
                      value={organizationname}
                      className="form-control jobr subhyt"
                      placeholder=""
                    />
                  </Col>
                  <Col md={6}>
                    {/* <div className="whatdoudo offpad"></div> */}
                    <div className="plusnew1">Position</div>
                    <textarea
                      id="organizationposition"
                      value={organizationposition}
                      onChange={this.handleChange}
                      className="form-control jobr subhyt"
                      placeholder=""
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="plusnew1">Started From</div>
                    <Form.Control
                      type="date"
                      value={startDate}
                      id="startDate"
                      className="fmc jobr subhyt dateinputt"
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Col>
                  <Col md={6}>
                    <div className="qflex">
                      <label className="checkcontainer">
                        <input
                          type="checkbox"
                          value={mycurrentwork}
                          onChange={this.onchangeCurrentWork}
                          name="mycurrentwork"
                          checked={mycurrentwork === true}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <div className="plusnew2">I currently work here</div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="plusnew1">To</div>
                    <Form.Control
                      type="date"
                      value={endDate}
                      id="endDate"
                      className="fmc jobr subhyt dateinputt"
                      onChange={this.handleChange}
                      disabled={mycurrentwork ? true : false}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className="rowla">
                  <Col md={12}>
                    <div className="plusnew1">Job Description</div>
                    <textarea
                      name=""
                      id="jobdescription"
                      onChange={this.handleChange}
                      className="form-control jobr jbdescr"
                      placeholder="Enter a job descrption"
                      value={jobdescription}
                    ></textarea>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btnws1 savebtn"
                  variant="danger"
                  onClick={this.CloseEditExperience}
                >
                  Back
                </Button>
                <Button
                  variant="success"
                  onClick={this.updateExperience}
                  className="btnws savebtn"
                >
                  {isloading ? "Updating" : "Update"}
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Edit Experience modal ends */}
            {/* Edit Education Modal starts */}
            <Modal
              show={this.state.editeducation}
              onHide={this.CloseEditEducation}
              className="widincr"
            >
              <Modal.Body>
                <Row>
                  <Col md={6}>
                    <div className="plusnew1">Name Of Institution</div>
                    <input
                      id="institutionname"
                      onChange={this.handleChange}
                      value={institutionname}
                      className="form-control jobr subhyt"
                      placeholder=""
                    />
                  </Col>
                  <Col md={6}>
                    <div className="whatdoudo offpad"></div>
                    <div className="plusnew1">Degree</div>
                    <textarea
                      id="degreeObtained"
                      value={degreeObtained}
                      onChange={this.handleChange}
                      className="form-control jobr subhyt"
                      placeholder=""
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="plusnew1">Started From</div>
                    <Form.Control
                      type="date"
                      value={education_valid_from}
                      id="education_valid_from"
                      className="fmc jobr subhyt dateinputt"
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Col>
                  <Col md={6}>
                    <div className="qflex">
                      <label className="checkcontainer">
                        <input
                          type="checkbox"
                          value={education_doesnot_expire}
                          onChange={this.onchangeCurrentStudy}
                          name="education_doesnot_expire"
                          checked={education_doesnot_expire === true}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <div className="plusnew2">I currently study here</div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="plusnew1">To</div>
                    <Form.Control
                      type="date"
                      value={education_valid_till}
                      id="education_valid_till"
                      className="fmc jobr subhyt dateinputt"
                      onChange={this.handleChange}
                      disabled={education_doesnot_expire ? true : false}
                    ></Form.Control>
                  </Col>
                  <Col md={6}>
                    <div className="plusnew1">Location</div>
                    <Form.Control
                      type="text"
                      value={institutionLocation}
                      id="institutionLocation"
                      className="fmc jobr subhyt"
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btnws1 savebtn"
                  variant="danger"
                  onClick={this.CloseEditEducation}
                >
                  Back
                </Button>
                <Button
                  variant="success"
                  onClick={this.updateEducation}
                  className="btnws savebtn"
                >
                  {isloading ? "Updating" : "Update"}
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Edit Education Modal ends */}

            {/* Certificate Update Modal starts */}
            <Modal
              show={this.state.editcertification}
              onHide={this.CloseEditCertification}
              className="widincr"
            >
              <Modal.Body>
                <Row>
                  <Col md={6}>
                    <div className="plusnew1">Certificate Name</div>
                    <textarea
                      name=""
                      className="form-control jobr subhyt"
                      value={certificateName}
                      id="certificateName"
                      onChange={this.handleChange}
                      placeholder=""
                    />
                  </Col>
                  <Col md={6}>
                    <div className="whatdoudo offpad"></div>
                    <div className="plusnew1">Institution</div>
                    <textarea
                      name=""
                      value={certificateInstitution}
                      id="certificateInstitution"
                      onChange={this.handleChange}
                      className="form-control jobr subhyt"
                      placeholder=""
                    ></textarea>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="plusnew1">Valid From</div>
                    <Form.Control
                      type="date"
                      value={valid_from}
                      id="valid_from"
                      className="fmc jobr subhyt dateinputt"
                      onChange={this.handleChange}
                    ></Form.Control>
                    <Col md={12}>
                      <div className="qflex app11">
                        <label className="checkcontainer">
                          <input
                            type="checkbox"
                            value={expirationStatus}
                            onChange={this.onchange1}
                            id="expirationStatus"
                            checked={expirationStatus === true}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <div className="plusnew2">Does not expire</div>
                      </div>
                    </Col>
                  </Col>
                  <Col md={6}>
                    <div className="plusnew1">To</div>
                    <Form.Control
                      type="date"
                      value={valid_till}
                      id="valid_till"
                      className="fmc jobr subhyt dateinputt"
                      disabled={expirationStatus ? true : false}
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btnws1 savebtn"
                  variant="danger"
                  onClick={this.CloseEditCertification}
                >
                  Back
                </Button>
                <Button
                  variant="success"
                  onClick={this.updateCertification}
                  className="btnws savebtn"
                >
                  {isloading ? "Updating" : "Update"}
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Certificate Update Modal ends */}
            {/* Reference Modal starts */}
            <Modal
              show={this.state.editreference}
              onHide={this.CloseEditReference}
              className="widincr"
            >
              <Modal.Body>
                <Row>
                  <Col md={6}>
                    <div className="whatdoudo offpad"></div>
                    <div className="plusnew1">Title</div>
                    <textarea
                      name=""
                      id="referencetitle"
                      value={referencetitle}
                      onChange={this.handleChange}
                      className="form-control jobr subhyt"
                      placeholder=""
                    />
                  </Col>
                  <Col md={6}>
                    <div className="plusnew1"> Name</div>
                    <textarea
                      name=""
                      id="referencename"
                      onChange={this.handleChange}
                      value={referencename}
                      className="form-control jobr subhyt"
                      placeholder=""
                    />
                  </Col>
                  <Col md={6}>
                    <div className="plusnew1">Phone Number</div>
                    <textarea
                      name=""
                      id="referencephone"
                      value={referencephone}
                      onChange={this.handleChange}
                      className="form-control jobr subhyt"
                      placeholder=""
                    />
                  </Col>
                  <Col md={6}>
                    <div className="whatdoudo offpad"></div>
                    <div className="plusnew1">Email</div>
                    <textarea
                      name=""
                      id="referenceemail"
                      value={referenceemail}
                      onChange={this.handleChange}
                      className="form-control jobr subhyt"
                      placeholder=""
                    ></textarea>
                  </Col>
                  <Col md={6}>
                    <div className="whatdoudo offpad"></div>
                    <div className="plusnew1">Relationship</div>
                    <input
                      name=""
                      id="referencerelationship"
                      value={referencerelationship}
                      onChange={this.handleChange}
                      className="form-control jobr subhyt"
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btnws1 savebtn"
                  variant="danger"
                  onClick={this.CloseEditCertification}
                >
                  Back
                </Button>
                <Button
                  variant="success"
                  onClick={this.updateReference}
                  className="btnws savebtn"
                >
                  {isloading ? "Updating" : "Update"}
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Reference Modal ends */}
          </Row>
        </Container>
      </>
    );
  }
}
export default ProfileBuilder;
