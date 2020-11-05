import * as React from "react";
import "../Home/Home.css";
import "./About.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../HomeComponents/newnavbar";
import Footer from "../HomeComponents/newfooter";
import ClientReview from "../HomeComponents/HearFromClients";
import { useEffect } from "react";

export const NewAbout = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  });
  return (
    <div>
      <Navbar />
      <Container className="homecontainer" fluid={true}>
        about
      </Container>
      <ClientReview />
      <Footer />
      </div>
  );
};
