import * as React from "react";
import "./contact.css";
import NavBar from "../General/navbar";
import map from "../../assets/map.png";
import point from "../../assets/point.png";
import Footer from "../General/footer";

const Contact = () => {
  const [state, setState] = React.useState({
    name: "",
    mail: "",
    message: "",
    noName: false,
    noMail: false,
    noMessage: false,
  })
  const { name, mail, message, noName, noMail, noMessage } = state;
  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  const validateDetails = (e) => {
    e.preventDefault();
    if(!name || !mail || !message) {
      return setState({
        ...state,
        noName: !name ? true : false,
        noMail: !mail ? true : false,
        noMessage: !message ? true : false,
      })
    }
    else return sendDetails();
  }
  const sendDetails = () => {
    const data = {
      name: name,
      mail: mail,
      message: message,
    }
    // console.log("send message", data);
  }
  return (
    <>
      <NavBar contact={true} />
      <main>
        <div className="p-padd p-contactus">
          <div>
            <h1 className="p-contactus-ttl">Contact Us</h1>
            <p className="p-contactus-txt">
              We are always available, 24/7 to take all your calls and concerns
            </p>
          </div>
          <img className="p-map" src={map} alt="map" />
          <img
            className="p-ct-img"
            src={point}
            alt="lady pointing towards map"
          />
        </div>
        <div className="p-marg p-contact-form">
          <div className="p-ct-info">
            <div className="p-ct-location p-ct-location-1">
              <i className="fas fa-map-marker-alt"></i>
              <p>Head Office - 37 Ogunlana drive, Surulere, Lagos</p>
            </div>
            <div className="p-ct-location p-ct-white">
              <i className="fas fa-envelope"></i>
              <p>
                <a href="mailto: info@primedisplay.ng" className="p-link-mail">info@primedisplay.ng</a>
              </p>
            </div>
            <div className="p-ct-location">
              <i className="fas fa-phone-alt"></i>
              <p>
                <a href="tel:+2348158393221" className="p-link-num">+234 (0) 815 839 3221</a>
              </p>
            </div>
          </div>
          <form className="p-ct-form">
            <div className="p-ct-inputs">
              <div className="p-ct-deets">
                <label htmlFor="name">
                  Your Name
                  <i className="fas fa-user p-ct-icon"></i>
                  <input className={noName ? "noInput" : ""} id="name" type="text" name="name" value={name} onChange={handleChange} />
                </label>
                <label htmlFor="mail">
                  Your Email
                    <i className="fas fa-envelope p-ct-icon"></i>
                  <input className={noMail ? "noInput" : ""} id="mail" type="email" name="mail" value={mail} onChange={handleChange} /> 
                </label>
              </div>
              <div className="p-ct-msg">
                <label htmlFor="message">
                  Your Message
                  <textarea className={noMessage ? "noInput" : ""} onChange={handleChange} value={message} name="message" id="message"></textarea>
                </label>
              </div>
            </div>
            <button onClick={validateDetails} className="p-ct-btn">Contact Us</button>
          </form>
        </div>
      </main>
    <Footer />
    </>
  );
};

export default Contact;
