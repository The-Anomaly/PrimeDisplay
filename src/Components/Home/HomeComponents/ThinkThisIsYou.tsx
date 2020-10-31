import * as React from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import "../Home/Home.css";

const ThinkThisIsYou = () => {
  return (
    <>
    <Row className="homethink">
      <div className="homethinktxt">think this is you? lets help you fix that.<br />Take the free assesmenT</div>
      <div className="homethinkbtn">Get Started</div>
    </Row> 
    </>
  );
};

export default ThinkThisIsYou;