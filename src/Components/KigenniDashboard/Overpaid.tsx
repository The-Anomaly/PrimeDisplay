import * as React from "react";
import "../Home/Home/Home.css";
import "../Home/Assesment/assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import offcharts from "../../assets/offcharts.png";
import { Link } from "react-router-dom";
import Navbar from "../Home/HomeComponents/newnavbar";
import Footer from "../Home/HomeComponents/newfooter";

// team
type User = string | null;

const OverPaid = () => {
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
          <Col md={6} className="mrauto addpadding">
            <Row className="firstrowcf2 cftcontent">
              <Col md={12} className="awesomewrap">
                <div>
                  <img
                    className="cherry-done"
                    src={offcharts}
                    alt="cherry-done"
                  />
                  <div className="awesome">Your current payment has exceeded the amount. The excess amount will be refunded within 24 hours</div>
                  <div className="awesome2">
                    <Link to="/thirdpary/fullresult">
                      <button className="awesomebtn">Continue</button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        <Footer />
      </Container>
    </div>
  );
};

export default OverPaid;
