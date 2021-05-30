import * as React from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Home/Home.css";

const ThinkThisIsYou = () => {
  return (
    <>
      <Row md={12} className="homethink">
        <div className="homethinktxt">
        Get a taste of what Clarity has to offer
          {/* think this is you?{" "}
          <span className="helpfix">let's help you fix that.</span>
          <span className="takefree">Take the free assesmenT</span> */}
        </div>
        <Link to="/signin">
          <div className="homethinkbtn">Free Career Audit</div>
        </Link>
      </Row>
    </>
  );
};

export default ThinkThisIsYou;
