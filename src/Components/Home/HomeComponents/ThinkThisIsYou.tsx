import * as React from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Home/Home.css";

const ThinkThisIsYou = () => {
  return (
    <>
    <Row md={12} className="homethink">
      <div className="homethinktxt">think this is you? <span className="helpfix">lets help you fix that.</span><span className="takefree">Take the free assesmenT</span></div>
      <Link to="/signin"><div className="homethinkbtn">Get Started</div></Link>
    </Row> 
    </>
  );
};

export default ThinkThisIsYou;