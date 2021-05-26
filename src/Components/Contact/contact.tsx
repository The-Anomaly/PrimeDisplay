import * as React from "react";
import "./contact.css";
import NavBar from "../General/navbar";
import map from "../../assets/map.png";
import point from "../../assets/point.png";
import Footer from "../General/footer";

const Contact = () => {
  return (
    <>
      <NavBar contact={true} />
      <main>
        <div className="p-marg p-contactus">
          <div>
            <h1 className="p-contactus-ttl">Contact Us</h1>
            <p className="p-contactus-txt">
              We are always available, 24/7 to take all your calls and concerns
            </p>
          </div>
          <img className="p-map" src={map} alt="map" />
        </div>
        <div className="p-marg p-contact-form">
          <img
            className="p-ct-img"
            src={point}
            alt="lady pointing towards map"
          />
          <div className="p-ct-info">
            <div className="p-ct-location">
              <i className="fas fa-map-marker-alt"></i>
              <p>No 12, Muri Okunola Street, VI Lagos State Nigeria</p>
            </div>
            <div className="p-ct-location p-ct-white">
              <i className="fas fa-envelope"></i>
              <p>
                info@primedisplay.com <br />
                ask@primedisplay.com
              </p>
            </div>
            <div className="p-ct-location">
              <i className="fas fa-phone-alt"></i>
              <p>
                +234 (0) 803 456 7654
                <br />
                +234 (0) 803 456 7654
              </p>
            </div>
          </div>
          <form className="p-ct-form">
            <div className="p-ct-inputs">
              <div className="p-ct-deets">
                <label htmlFor="name">
                  Your Name
                  <i className="fas fa-user p-ct-icon"></i>
                  <input id="name" type="text" name="name" />
                </label>
                <label htmlFor="mail">
                  Your Email
                    <i className="fas fa-envelope p-ct-icon"></i>
                  <input id="mail" type="email" name="mail" /> 
                </label>
              </div>
              <div className="p-ct-msg">
                <label htmlFor="message">
                  Your Message
                  <textarea id="message"></textarea>
                </label>
              </div>
            </div>
            <button className="p-ct-btn">Contact Us</button>
          </form>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Contact;
