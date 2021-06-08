import * as React from "react";
// import "./contact.css";
import { useHistory } from "react-router-dom";

const Contact = () => {
  let history = useHistory();
  const contact = () => {
    return history.push("/contact");
  }
  return (
    <>
      <div className="p-sec6">
        <div className="p-sec6-info">
          <h6 className="p-sec6-ttl">
            Create an Interesting Lasting Experience
          </h6>
          <p className="p-sec6-txt">
            Our focus is specifically on hardware provision towards building a
            competitive and productive e-learning pathway for schools, colleges
            and cooperate organisations. We deliver the best possible reliable
            ICT solutions through uncompromising culture of quality service and
            customer satisfaction.
          </p>
          <button className="p-sec6-btn" onClick={contact}>Contact Us</button>
        </div>
      </div>
    </>
  );
};

export default Contact;
