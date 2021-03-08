import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Navbar from "../Home/HomeComponents/newnavbar";
import Footer from "../Home/HomeComponents/newfooter";
import Pdf from "react-to-pdf";
import "./pdf.css";
import { useEffect, useState } from "react";
import Axios, { AxiosResponse } from "axios";
import axios from "axios";
import { API } from "../../config";
import userimg1 from "../../assets/userimg1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CV from "react-cv";
const moment = require("moment");

// team
type User = string | null;

const TestPdf = () => {
  const [state, setState] = useState<any>({
    skills: [],
    about: "",
    experiences: [],
    certifications: [],
    education: [],
    references: [],
    socials: [],
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    last_name: "",
    first_name: "",
    errorMessage: "",
    job_description: "",
    email: "",
    website: "",
    address: "",
    phone: "",
  });
  const {
    skills,
    about,
    experiences,
    certifications,
    education,
    references,
    website,
    socials,
    facebook,
    linkedin,
    instagram,
    twitter,
    last_name,
    first_name,
    job_description,
    email,
    address,
    phone,
  } = state;
  const ref: any = React.useRef();
  useEffect(() => {
    const tag = document.getElementsByTagName("meta").namedItem("viewport");
    // console.log(tag)
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    axios
      .all([
        Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profilebuilder`, {
          headers: { Authorization: `Token ${token}` },
        }),
        Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profile`, {
          headers: { Authorization: `Token ${token}` },
        }),
      ])
      .then(
        axios.spread((res, res1) => {
          // console.log(res);
          // console.log(res1);
          setState({
            ...state,
            skills: [...res.data.skills],
            about: res.data.about,
            experiences: [...res.data.user_experiences],
            certifications: [...res.data.certification],
            education: [...res.data.education],
            references: res.data.user_refernce,
            socials: res.data.user_social,
            facebook: res.data.user_social.facebook,
            linkedin: res.data.user_social.linkedin,
            instagram: res.data.user_social.instagram,
            twitter: res.data.user_social.twitter,
            ...res1.data,
          });
        })
      )
      .catch((err) => {
        if (err) {
          notify("Failed to fetch");
        }
      });
  }, []);
  const formatTime = (date) => {
    const dateTime = moment(date).format("MMM YYYY");
    return dateTime;
  };
  const notify = (message: string) => toast(message, { containerId: "B" });

  return (
    <div>
      {/* <Navbar /> */}
      <Container fluid={true}>
        <Row className="backgroundcv">
          <Col md={12} className="padpdf opdd">
            <Pdf targetRef={ref} filename="resume.pdf" x={-0.5} scale={1.2}>
              {({ toPdf }) => (
                <button onClick={toPdf} className="genpdf">
                  Download CV
                </button>
              )}
            </Pdf>
          </Col>
          <Col md={12}>
            <CV
              personalData={{
                name: first_name + " " + last_name,
                title: job_description,
                image: "https://bulma.io/images/placeholders/128x128.png",
                contacts: [
                  { type: "email", value: email },
                  { type: "phone", value: phone },
                  { type: "location", value: address },
                  { type: "website", value: website },
                  { type: "linkedin", value: linkedin },
                  { type: "twitter", value: twitter },
                ],
              }}
              sections={[
                {
                  type: "text",
                  title: "Career Profile",
                  content:
                    "When I was child, I always want to be a developer. I think I am now. Culpa proident ad officia minim Lorem sint excepteur irure culpa nisi aliquip nostrud.Laborum voluptate nostrud fugiat occaecat proident veniam excepteur pariatur amet ex sit.Anim aliquip do in commodo adipisicing.Nulla adipisicing nisi enim ullamco sunt veniam.Ullamco labore sunt Lorem veniam id et Lorem magna eiusmod aute. Aliquip minim est consectetur anim mollit aliqua ex elit do et nulla do. Cupidatat ad sunt cillum sint consectetur sunt cillum eiusmod ad esse aliqua. Aute anim elit amet in duis aute ipsum deserunt qui deserunt officia excepteur veniam. Et laboris nostrud est ipsum nulla fugiat deserunt magna velit irure. Ullamco duis ut magna ea tempor enim in ipsum.",
                  icon: "usertie",
                },
                {
                  type: "common-list",
                  title: "Education",
                  icon: "graduation",
                  items: [
                    {
                      title: "Computer Engineering (BS)",
                      authority: "University",
                      authorityWebSite: "https://sample.edu",
                      rightSide: "2013 - 2017",
                    },
                    {
                      title: "Some Department (PHD)",
                      authority: "Another University",
                      authorityWebSite: "https://sample.edu",
                      rightSide: "2017 - Present",
                    },
                  ],
                },
                {
                  type: "experiences-list",
                  title: "Experiences",
                  description: "Optional",
                  icon: "archive",
                  items: [
                    {
                      title: "Lead Software Developer",
                      company: "Some Company Example INC",
                      description: "I'm working as a lead developer yeeeey!",
                      companyWebSite: "http://somecompanyexample.com",
                      companyMeta: "",
                      datesBetween: "2017.10 - Present",
                      descriptionTags: ["Javascript", "React"],
                    },
                    {
                      title: "Software Developer",
                      company: "Some Company Example INC",
                      description:
                        "I'm using ReactJS and working as a front-end developer",
                      companyWebSite: "http://somecompanyexample.com",
                      companyMeta: "Little info about company",
                      datesBetween: "2016.8 - 2017.10",
                    },
                    {
                      title: "Intern",
                      company: "Some Software Example INC",
                      description: "I was warming up.",
                      companyWebSite: "http://someexamplecompany.com",
                      companyMeta: "SF USA",
                      datesBetween: "2012.06 - 2012.10",
                    },
                  ],
                },
                {
                  type: "projects-list",
                  title: "Projects",
                  description: "Optional",
                  icon: "tasks",
                  groups: [
                    {
                      sectionHeader: "Company Name",
                      description: "Optional",
                      items: [
                        {
                          title: "Project",
                          projectUrl: "optional",
                          description: "Optional",
                        },
                        {
                          title: "Project",
                          projectUrl: "optional",
                          description: "Optional",
                        },
                        {
                          title: "Project",
                          projectUrl: "optional",
                          description: "Optional",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "common-list",
                  title: "Conferences & Certificates",
                  description: "",
                  icon: "comments",
                  items: [
                    {
                      title: "Some Conferences / 2019",
                      authority: "SomeConf",
                      authorityWebSite: "https://www.someconf.somesome",
                    },
                    {
                      title: "Some Conferences / 2019",
                      authority: "SomeConf",
                      authorityMeta: "Speaker",
                      authorityWebSite: "https://www.someconf.somesome",
                      rightSide: "test",
                    },
                    {
                      title: "Some Conferences / 2012",
                      authorityMeta: "Speaker",
                    },
                  ],
                },
                {
                  type: "common-list",
                  title: "Languages",
                  icon: "language",
                  items: [
                    {
                      authority: "English",
                      authorityMeta: "Professional",
                    },
                    {
                      authority: "Spanish",
                      authorityMeta: "Beginner",
                    },
                  ],
                },
                {
                  type: "tag-list",
                  title: "Skills Proficiency",
                  icon: "rocket",
                  items: [
                    "React",
                    "Javascript",
                    "CSS",
                    "SQL",
                    "SomeTech",
                    "CoolTech",
                  ],
                },
                {
                  type: "tag-list",
                  title: "Hobbies & Interests",
                  icon: "cubes",
                  items: ["Photography", "Poetry"],
                },
              ]}
              branding={true} // or false to hide it.
            />
          </Col>
          <Col md={12} className="jcenter2">
            <div className="mainwrap" ref={ref}>
              <div className="wrapperdiv">
                <div className="dsnwrap">
                  <div className="bluebg1">{job_description}</div>
                  <div className="careernm">{first_name + " " + last_name}</div>
                </div>
                <div className="contactw">
                  <div className="contact22 contact22lss">Contacts</div>
                  <div className="contactw2">
                    <span className="mkbold">Phone:</span> {phone}
                  </div>
                  <div className="contactw2">
                    <span className="mkbold"> Email:</span> {email}
                  </div>
                  <div className="contactw2">
                    <span className="mkbold"> Address:</span> {address}
                  </div>
                </div>
              </div>
              <div className="wrap2">{/* Loop */}</div>
              <div className="shiftrght">
                <div className="smry1 contact22">Summary</div>
                <div className="sumrybody">
                  {about}
                  {/* Risus, vel at pulvinar tempus, vel sem risus, aliquet nisi
                  fringilla faucibus interdum commodo posuere ut nec sem congue
                  enim ultricies molestie malesuada nullam feugiat feugiat in
                  adipiscing nisl vel ut amet, eget lorem et a, faucibus mauris,
                  tortor quam sit convallis aenean amet in sit sit mi dolor. */}
                </div>
              </div>
              <div className="rapsecarea">
                <div className="skilssandcert">
                  <div className="shortline"></div>
                  <div className="slss contact22">Skills</div>
                  {skills &&
                    skills.map((x, i) => (
                      <div className="skillstext" key={i}>
                        {x.skill}
                      </div>
                    ))}
                  <div className="closed"></div>
                  <div className="shortline"></div>
                  <div className="certem">
                    <div className="slss contact22">Certification</div>
                    {certifications.map((x, i) => (
                      <div key={i}>
                        <div className="box1txt">{x.certificate_name}</div>
                        <div className="certinst">{x.institution}</div>
                        <div className="skillstext">
                          {formatTime(x.valid_from)} -{" "}
                          {formatTime(x.valid_till)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="skilssandcert1">
                  <div className="shortline"></div>
                  <div className="slss contact22">Work Experience</div>
                  {experiences.map((x, i) => (
                    <div key={i}>
                      <div className="box1">
                        {/* <div className="box1txt">{x.organisation}</div> */}
                        <div className="box1txt">{x.position}</div>
                        <div className="date1">
                          {formatTime(x.started_from)} - {formatTime(x.to)}
                        </div>
                      </div>
                      <div className="temptext">{x.job_description}</div>
                      {/* <div className="box3">
                      <div className="box1txt">UI/UX Designer</div>
                      <div className="date1">June 2020 - July 2020</div>
                    </div>
                    <div className="temptext">
                      Risus, vel at pulvinar tempus, vel sem risus, aliquet nisi
                      fringilla faucibus interdum commodo posuere ut nec sem
                      congue enim ultricies molestie malesuada nullam feugiat
                      feugiat in adipiscing nisl vel ut amet, eget lorem et a,
                      faucibus mauris, tortor quam sit convallis aenean amet in
                      sit sit mi dolor.
                    </div> */}
                      <div className="shortline1"></div>
                    </div>
                  ))}
                  <div className="">
                    <div className="slss contact22">Education</div>
                    {education.map((x, i) => (
                      <div key={i}>
                        <div className="box1">
                          <div className="box1txt">{x.degree}</div>
                          <div className="date1">
                            {formatTime(x.start_date)} -{" "}
                            {formatTime(x.end_date)}
                          </div>
                        </div>
                        <div className="temptext">
                          {x.institution + " " + x.location}
                          University Of Lagos, Lagos state, Nigeria
                        </div>
                        <div className="shortline1"></div>
                      </div>
                    ))}
                  </div>
                  <div className="">
                    <div className="slss contact22">Reference</div>
                    {references.map((x, i) => (
                      <div className="box1" key={i}>
                        <div className="firstcol">
                          <div className="namecv">{x.name}</div>
                          <div className="minofwrks">{x.title}</div>
                          <div className="minofwrks">{x.ref_email}</div>
                          {/* <div className="minofwrks">Abuja, Nigeria</div> */}
                        </div>
                        {/* <div className="secolcv">
                        <div className="namecv">Amaechi Rotimi</div>
                        <div className="minofwrks">Minister of Works</div>
                        <div className="minofwrks">Abuja, Nigeria</div>
                      </div> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <Footer /> */}
      </Container>
    </div>
  );
};

export default TestPdf;
