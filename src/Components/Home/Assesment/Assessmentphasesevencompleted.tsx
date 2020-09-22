import * as React from "react";
import "../Home/Home.css";
import "./assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../HomeComponents/footer";
import Navbar from "../HomeComponents/navbar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import offcharts from "../../../assets/offcharts.png";
import { Link } from "react-router-dom";

// team
type User = string | null;

const AssessmentSeventhPhaseComplete = () => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = sessionStorage.getItem("user");
    const currentUser = JSON.parse(user ? user : "");
    setName(currentUser[0].first_name);
  }, []);
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent">
          <AssessmentFirstSection
            progressBar={100}
            phase="Phase 7"
            nextPhase="Results"
            time={10}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12} className="awesomewrap">
                <div>
                  <img
                    className="cherry-done"
                    src={offcharts}
                    alt="cherry-done"
                  />
                  <div className="awesome">My oh my!! You did it!</div>
                  <div className="awesome1">
                    We were rooting for you the whole time, it’s time to see
                    your report
                  </div>
                  <div className="awesome2">
                    <Link to="/free/dashboard">
                      <button className="awesomebtn">Get Results</button>
                    </Link>
                    <Link to="/">
                      {" "}
                      <button className="awesomebtnsubmit">
                        Save Progress
                      </button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default AssessmentSeventhPhaseComplete;
