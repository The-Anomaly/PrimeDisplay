import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Navbar from "../Home/HomeComponents/newnavbar";
import Footer from "../Home/HomeComponents/footer";
import Pdf from "react-to-pdf";
import "./pdf.css";
import { useEffect, useState } from "react";
import Axios, { AxiosResponse } from "axios";
import axios from "axios";
import { API } from "../../config";
import userimg1 from "../../assets/userimg1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          console.log(res);
          console.log(res1);
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
      <Navbar />
      <Container fluid={true}>
        <Row className="backgroundcv">
          <Col md={12} className="padpdf">
            <Pdf targetRef={ref} filename="resume.pdf" x={-0.5} scale={1.2}>
              {({ toPdf }) => (
                <button onClick={toPdf} className="genpdf">
                  Download CV
                </button>
              )}
            </Pdf>
          </Col>
          <Col md={12} className="jcenter2 opdd">
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
                  Risus, vel at pulvinar tempus, vel sem risus, aliquet nisi
                  fringilla faucibus interdum commodo posuere ut nec sem congue
                  enim ultricies molestie malesuada nullam feugiat feugiat in
                  adipiscing nisl vel ut amet, eget lorem et a, faucibus mauris,
                  tortor quam sit convallis aenean amet in sit sit mi dolor.
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
        <Footer />
      </Container>
    </div>
  );
};

export default TestPdf;
