import * as React from "react";
// import "./about.css";
// import "../Landing/landing.css";
import NavBar from "../General/navbar";
import photo1 from "../../assets/photo1.png";
import photo2 from "../../assets/photo2.png";
import photo3 from "../../assets/photo3.png";
import photo4 from "../../assets/photo4.png";
import edu from "../../assets/edu.png";
import bus from "../../assets/business.png";
import rel from "../../assets/religious.png";
import gov from "../../assets/gov.png";
import chart from "../../assets/chart.png";
import Contact from "../General/contact";
import Footer from "../General/footer";
import { useHistory } from "react-router-dom";

const About = () => {
  let history = useHistory();
  const contact = () => {
    return history.push("/contact");
  }
  return (
    <>
      <NavBar about={true} />
      <main>
        <div className="p-about-sec1 p-padd">
          <div className="p-about-sec1-content">
            <h1 className="p-about-sec1-ttl">
              About <br /> Prime Display
            </h1>
            <p className="p-about-sec1-txt">
              Prime Display Solutions provides interactive e-learning solutions
              to corporate organizations, schools, and colleges. We engage
              pupils and empower schools to improve learning and teaching
              simultaneously. Interactive Learning is a powerful educational
              technique that gets students actively engaged and interested in
              the learning process and this has been enhanced through
              technology. <br />
              In contrast to the more passive technique of traditional
              lecturing, one big benefit of interactive learning is the positive
              effect it has on student engagement. The
              formula is clear; Better Engagement simply results in Better
              Comprehension.
            </p>
          </div>
          <div className="p-about-sec1-imgs">
            <div className="p-about-img1">
              <img src={photo1} alt="" />
            </div>
            <div className="p-about-img2">
              <img src={photo2} alt="" />
            </div>
            <div className="p-about-img3">
              <img src={photo3} alt="" />
            </div>
            <div className="p-about-img4">
              <img src={photo4} alt="" />
            </div>
          </div>
        </div>
        <hr className="p-div p-marg" />
        <div className="p-about-sec2 p-marg">
          <h3 className="p-about-sec2-ttl">
            We Deliver with Top Notch Quality for Every Sector
          </h3>
          <div className="p-about-sec2-item">
            <div className="p-about-sec2-item-1">
              <h6 className="p-about-hd">Education</h6>
              <p className="p-about-descrip">
              We help eradicate the more passive technique of traditional lecturing by offering a more interactive way of learning through the provision of high tech interactive projectors, interactive white boards, Flat panel displays and many more advanced interactive displays for a more collaborative classroom.
              </p>
            </div>
            <div className="p-about-sec2-item-2">
              <img className="p-about-edu" src={edu} />
            </div>
          </div>
          <div className="p-about-sec2-item p-about-reverse">
            <div className="p-about-sec2-item-1">
              <h6 className="p-about-hd">Business</h6>
              <p className="p-about-descrip">
              We make business presentations and boardroom meetings better through the provision of high quality interactive gadgets such as ultra-high definition projectors and flat panel display units. These also aids virtual meetings and presentations.
              </p>
            </div>
            <div className="p-about-sec2-item-2">
              <img className="p-about-edu" src={bus} />
            </div>
          </div>
          <div className="p-about-sec2-item">
            <div className="p-about-sec2-item-1">
              <h6 className="p-about-hd">Religious Gathering</h6>
              <p className="p-about-descrip">
              As the World advance in technology and the virtual World emerge in the religious sect, there’s need for ultra-high technical gadgets in religious gatherings. We provide high quality projectors and interactive flat panels for more relativity in such gatherings and virtually.
              </p>
            </div>
            <div className="p-about-sec2-item-2">
              <img className="p-about-edu" src={rel} />
            </div>
          </div>
          <div className="p-about-sec2-item p-about-reverse">
            <div className="p-about-sec2-item-1">
              <h6 className="p-about-hd">Government</h6>
              <p className="p-about-descrip">
              We provide quality bespoke products such as projectors, interactive flat panel as well as interactive white boards to governments and public organisations for a more interactive and intriguing boardrooms. 
              </p>
            </div>
            <div className="p-about-sec2-item-2">
              <img className="p-about-edu" src={gov} />
            </div>
          </div>
        </div>
        <div className="p-about-sec3 p-marg">
          <h6>For Every Opportunity to Pass Information Make it Epic</h6>
          <button className="p-about-sec3-btn" onClick={contact}>Ask How</button>
          <img className="p-about-sec3-img" src={chart} alt="chart" />
        </div>
      </main>
      <Contact />
      <Footer />
    </>
  );
};

export default About;
