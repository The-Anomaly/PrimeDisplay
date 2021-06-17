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
import { Link, useHistory } from "react-router-dom";

const Services = () => {
  let history = useHistory();
  const contact = () => {
    return history.push("/contact");
  };
  return (
    <>
      <NavBar services={true} />
      <main>
        <div className="p-padd p-contactus p-services">
          <div>
            <h1 className="p-contactus-ttl">Services</h1>
            <p className="p-contactus-txt">
              Our services comprises installation maintenance and repairs. We
              provide both on-site and ad-hoc support services to our clients
              nationwide.
            </p>
          </div>
          <img className="p-sitting" src={sitting} alt="person sitting" />
        </div>
        <hr className="p-div p-marg" />
        <div className="p-marg p-services-sec2">
          <h3 className="p-about-sec2-ttl">
            Experience lightening fast and reliable service with Prime Display
          </h3>
          <div className="p-sec2">
            <div className="p-sec2-item">
              <div className="p-sec2-icon p-sec2-icon-1">
                <img src={projector} alt="projector icon" />
              </div>
              <p className="p-sec2-ttl">Projectors</p>
              <p className="p-sec2-txt">
                Due to the relationship we share with our partners, we are able
                to bring to you the latest high quality and user friendly
                projectors at a very competitive price.
                <br />
                <Link to="/buy" className="p-link-prod">
                  See our products
                </Link>
              </p>
            </div>
            <div className="p-sec2-item">
              <div className="p-sec2-icon p-sec2-icon-2">
                <img src={tab} alt="projector icon" />
              </div>
              <p className="p-sec2-ttl">Installation</p>
              <p className="p-sec2-txt">
                We provide both on-site and ad-hoc support services such as;
                assemblage of the disjointed components and mounting of the
                gadgets. Our engineers have the certification for the equipment
                they install and service.
              </p>
            </div>
            <div className="p-sec2-item no-marg">
              <div className="p-sec2-icon p-sec2-icon-3">
                <img src={tools} alt="projector icon" />
              </div>
              <p className="p-sec2-ttl">Repairs</p>
              <p className="p-sec2-txt">
                We have a well-equipped workshop and competent engineers
                experienced in systems troubleshooting and repairs. We diagnose
                the system to discover the damaged parts and replace them.
              </p>
            </div>
          </div>
        </div>
        <div className="p-about-sec3 p-marg p-services-btnsec">
          <button className="p-services-btn" onClick={contact}>
            Contact us Now
          </button>
          <h6>For top Notch All round Satisfactory Service!</h6>
          <img className="p-services-man" src={man} alt="man excited" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Services;
