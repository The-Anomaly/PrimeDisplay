import * as React from "react";
import "./services.css";
import NavBar from "../General/navbar";
import Footer from "../General/footer";
import "../Contact/contact.css";
import "../Landing/landing.css";
import "../About/about.css";
import projector from "../../assets/projector.png";
import tab from "../../assets/tab.png";
import tools from "../../assets/tools.png";
import sitting from "../../assets/sitting.png";
import man from "../../assets/man.png";

const Services = () => {
  return (
    <>
      <NavBar services={true} />
      <main>
        <div className="p-marg p-contactus p-services">
          <div>
            <h1 className="p-contactus-ttl">Services</h1>
            <p className="p-contactus-txt">
              Services we render, cuts accross everything digital whiteborading
              Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
              nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris, a,
              pharetra, neque integer eu.
            </p>
          </div>
          <img className="p-sitting" src={sitting} alt="person sitting" />
        </div>
        <div className="p-marg p-services-sec2">
          <h3 className="p-about-sec2-ttl">
            Experience lightening fast and reliable service with Prime Display
          </h3>
          <div className="p-padd p-sec2">
            <div className="p-sec2-item">
              <div className="p-sec2-icon p-sec2-icon-1">
                <img src={projector} alt="projector icon" />
              </div>
              <p className="p-sec2-ttl">Repairs</p>
              <p className="p-sec2-txt">
                Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
                nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris,
                a, pharetra, neque integer eu. Gllus nunc, facilisis. Odio etiam
                nunc, lacus et bibendum id. Mauris, a, pharetra, neque integer
                eu.
              </p>
            </div>
            <div className="p-sec2-item">
              <div className="p-sec2-icon p-sec2-icon-2">
                <img src={tab} alt="projector icon" />
              </div>
              <p className="p-sec2-ttl">Installation</p>
              <p className="p-sec2-txt">
                Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
                nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris,
                a, pharetra, neque integer eu. Gllus nunc, facilisis. Odio etiam
                nunc, lacus et bibendum id. Mauris, a, pharetra, neque integer
                eu.
              </p>
            </div>
            <div className="p-sec2-item no-marg">
              <div className="p-sec2-icon p-sec2-icon-3">
                <img src={tools} alt="projector icon" />
              </div>
              <p className="p-sec2-ttl">Maintenance</p>
              <p className="p-sec2-txt">
                Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
                nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris,
                a, pharetra, neque integer eu. Gllus nunc, facilisis. Odio etiam
                nunc, lacus et bibendum id. Mauris, a, pharetra, neque integer
                eu.
              </p>
            </div>
          </div>
        </div>
        <div className="p-about-sec3 p-marg p-services-btnsec">
          <button className="p-services-btn">Contact us Now</button>
          <h6>For top Notch All round Satisfactory Service!</h6>
          <img className="p-services-man" src={man} alt="man excited" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
