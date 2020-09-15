import * as React from "react";
import "./Home.css";
import Navbar from "../HomeComponents/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightTopImage from "../../../assets/2.png";
import testimonial from "../../../assets/testimonial.png";
import likegoogle from "../../../assets/1.png";
import howitwk from "../../../assets/3.jpg";
import Footer from "../HomeComponents/footer";
import TakeAssessment from "../HomeComponents/TakeAssesment/takeAssessment";
import stepgood from "../../../assets/stepgood.png";
import stepone from "../../../assets/steptwo.png";
import steptwo from "../../../assets/stepthree.png";
import { Link } from "react-router-dom";

const RedesignedHome: React.FC = () => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
  }, []);
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="newfirstrow">
          <Col md={12} className="navcontrols">

          </Col>
          <Col md={12}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default RedesignedHome;
