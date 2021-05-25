import * as React from "react";
import { Container } from "react-bootstrap";
import "./about.css";
import "../Landing/landing.css";
import NavBar from "../General/navbar";
import photo1 from "../../assets/photo1.png";
import photo2 from "../../assets/photo2.png";
import photo3 from "../../assets/photo3.png";
import photo4 from "../../assets/photo4.png";
import edu from "../../assets/edu.png";
import chart from "../../assets/chart.png";
import Contact from "../General/contact";
import Footer from "../General/footer";

const About = () => {
  return (
    <>
      <NavBar about={true} />
      <main>
        <div className="p-about-sec1 p-marg">
          <div className="p-about-sec1-content">
            <h1 className="p-about-sec1-ttl">
              About <br /> Prime Display
            </h1>
            <p className="p-about-sec1-txt">
              Prime Display Solutions provides interactive e-learning solutions
              to schools, colleges, and corporate organizations. Interactive
              Learning is a powerful educational technique that gets students
              actively engaged and interested in the learning process and this
              has been enhanced through technology. <br />
              In contrast to the more passive technique of traditional
              lecturing, one big benefit of interactive learning is the positive
              effect it has on student engagement.
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
        <div className="p-about-sec2 p-marg">
          <h3 className="p-about-sec2-ttl">
            We Deliver with Top Notch Quality for Every Sector
          </h3>
          <div className="p-about-sec2-item">
            <div className="p-about-sec2-item-1">
              <h6 className="p-about-hd">Education</h6>
              <p className="p-about-descrip">
                Vitae tristique tellus enim nunc in sit ut posuere. Feugiat
                porttitor velit malesuada urna enim nunc sem. Sollicitudin
                dictumst blandit nec ante a etiam quisque eleifend. Tempus
                cursus sit lacus proin lectus egestas at.
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
                Vitae tristique tellus enim nunc in sit ut posuere. Feugiat
                porttitor velit malesuada urna enim nunc sem. Sollicitudin
                dictumst blandit nec ante a etiam quisque eleifend. Tempus
                cursus sit lacus proin lectus egestas at.
              </p>
            </div>
            <div className="p-about-sec2-item-2">
              <img className="p-about-edu" src={edu} />
            </div>
          </div>
          <div className="p-about-sec2-item">
            <div className="p-about-sec2-item-1">
              <h6 className="p-about-hd">Religious Gathering</h6>
              <p className="p-about-descrip">
                Vitae tristique tellus enim nunc in sit ut posuere. Feugiat
                porttitor velit malesuada urna enim nunc sem. Sollicitudin
                dictumst blandit nec ante a etiam quisque eleifend. Tempus
                cursus sit lacus proin lectus egestas at.
              </p>
            </div>
            <div className="p-about-sec2-item-2">
              <img className="p-about-edu" src={edu} />
            </div>
          </div>
          <div className="p-about-sec2-item p-about-reverse">
            <div className="p-about-sec2-item-1">
              <h6 className="p-about-hd">Government</h6>
              <p className="p-about-descrip">
                Vitae tristique tellus enim nunc in sit ut posuere. Feugiat
                porttitor velit malesuada urna enim nunc sem. Sollicitudin
                dictumst blandit nec ante a etiam quisque eleifend. Tempus
                cursus sit lacus proin lectus egestas at.
              </p>
            </div>
            <div className="p-about-sec2-item-2">
              <img className="p-about-edu" src={edu} />
            </div>
          </div>
        </div>
        <div className="p-about-sec3 p-marg">
            <h5>For Every Opportunity to Pass Information Make it Epic</h5>
            <button className="p-about-sec3-btn">Ask How</button>
            <img className="p-about-sec3-img" src={chart} alt="chart" />
        </div>
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default About;
