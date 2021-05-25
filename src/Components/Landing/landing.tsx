import * as React from "react";
import { Container } from "react-bootstrap";
import "./landing.css";
import NavBar from "../General/navbar";
import logo from "../../assets/logo2.png";
import student from "../../assets/student.png";
import projector from "../../assets/projector.png";
import tab from "../../assets/tab.png";
import tools from "../../assets/tools.png";
import brand1 from "../../assets/brand1.png";
import play from "../../assets/play.png";
import vid from "../../assets/vid.png";
import pen from "../../assets/pen.png";
import camera from "../../assets/camera.png";
import arrow from "../../assets/arrow.png";
import mark from "../../assets/mark.png";
import client from "../../assets/client.png";
import Contact from "../General/contact";
import Footer from "../General/footer";

const Landing = () => {
  return (
    <>
      <NavBar home={true} />
      <div className="">
        <div className="p-hero p-padd">
          <div className="p-hero-txt1">Prime Display</div>
          <div className="p-hero-hd-sec">
            <h1 className="p-hero-ttl">Interactive e-Learning Solutions</h1>
            <img className="p-hero-ttl-img" src={logo} alt="" />
          </div>
          <p className="p-hero-txt2">
            From the smallest classrooms and lecture halls to the largest
            auditoriums and theaters Prime Display Solutions offers a wide range
            of interactive projectors, interactive whiteboards, Flat Panels and
            many more advanced interactive displays to transform boring static
            presentations and lectures into an engaging collaborative multimedia
            experience that give students the keys to better learning - even on
            their own.
          </p>
          <img className="p-student" src={student} alt="" />
          <button className="p-hero-btn">Contact Us</button>
        </div>
        <div className="p-padd p-sec2">
          <div className="p-sec2-item">
            <div className="p-sec2-icon p-sec2-icon-1">
              <img src={projector} alt="projector icon" />
            </div>
            <p className="p-sec2-ttl">Projectors</p>
            <p className="p-sec2-txt">
              Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
              nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris, a,
              pharetra, neque integer eu. Gllus nunc, facilisis. Odio etiam
              nunc, lacus et bibendum id. Mauris, a, pharetra, neque integer eu.
            </p>
          </div>
          <div className="p-sec2-item">
            <div className="p-sec2-icon p-sec2-icon-2">
              <img src={tab} alt="projector icon" />
            </div>
            <p className="p-sec2-ttl">Accessories</p>
            <p className="p-sec2-txt">
              Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
              nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris, a,
              pharetra, neque integer eu. Gllus nunc, facilisis. Odio etiam
              nunc, lacus et bibendum id. Mauris, a, pharetra, neque integer eu.
            </p>
          </div>
          <div className="p-sec2-item no-marg">
            <div className="p-sec2-icon p-sec2-icon-3">
              <img src={tools} alt="projector icon" />
            </div>
            <p className="p-sec2-ttl">Maintenance</p>
            <p className="p-sec2-txt">
              Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
              nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris, a,
              pharetra, neque integer eu. Gllus nunc, facilisis. Odio etiam
              nunc, lacus et bibendum id. Mauris, a, pharetra, neque integer eu.
            </p>
          </div>
        </div>
        <div className="p-marg p-sec3">
          <div className="p-sec3-1">
            <h3 className="p-sec3-ttl">
              Better Engagement simply results to Better Comprehension
            </h3>
            <p className="p-sec3-txt">
              Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
              nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris, a,
              pharetra, neque integer eu. <br /> Gllus nunc, facilisis. Odio
              etiam nunc, lacus et bibendum id. Mauris, a, pharetra, neque
              integer eu.
            </p>
          </div>
          <div className="p-sec3-2">
            <div className="p-sec3-2-1"></div>
            <img className="p-sec3-img" src={brand1} alt="" />
          </div>
        </div>
        <div className="p-marg p-sec4">
          <h3 className="p-sec4-ttl">Prime Display Solutions</h3>
          <p className="p-sec4-txt">
            Our interactive display solutions transform regular classrooms into
            a world of endless possibilities
          </p>
          <div className="p-sec4-img-sec">
            <img src={vid} alt="" />
            <img className="p-sec4-img-sec-2" src={play} alt="play" />
          </div>
          <img className="p-sec4-left" src={camera} />
          <img className="p-sec4-right" src={pen} />
        </div>
        <div className="p-padd p-sec5">
          <div className="p-sec5-1">
            <h5 className="p-sec5-1-ttl">What our Clients say About Us</h5>
          </div>
          <div className="p-sec5-client">
            <div className="p-sec5-client-avatar">
              <img src={client} alt="client avatar" />
            </div>
            <div className="p-sec5-txt-sec">
              <img src={mark} />
              <p className="p-sec5-client-txt">
                Gllus nunc, facilisis. Odio etiam nunc, lacus et bibendum id.
                Mauris, a, pharetra, neque integer eu.
              </p>
              <img className="p-sec5-txt-end" src={mark} />
            </div>
            <p className="p-sec5-client-name">Grace Ama</p>
            <p className="p-sec5-client-location">University of Lagos</p>
          </div>
          <div className="p-sec5-arrow-sec">
            <div className="p-sec5-arrow p-sec5-arrow-left">
              <img src={arrow} alt="left arrow" />
            </div>
            <div className="p-sec5-arrow">
              <img src={arrow} alt="right arrow" />
            </div>
          </div>
        </div>
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Landing;
