import * as React from "react";
import "../Home/Home.css";
import "./assessment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../HomeComponents/newfooter";
import Navbar from "../HomeComponents/newnavbar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AssessmentFirstSection } from "./AssessmentComponents/AssessmentFirstSection";
import offcharts from "../../../assets/offcharts.png";
import { Link } from "react-router-dom";

// team
type User = string | null;

const AssessmentFifthPhaseComplete = () => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = localStorage.getItem("user");
    const currentUser = user ?JSON.parse(user):[{first_name:""}];
    setName(currentUser[0].first_name);
  }, []);
  const logout = () => {
    localStorage.clear();
    window.location.assign("/");
  };
  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent assesspadd">
          <AssessmentFirstSection
            progressBar={60}
            phase="Phase 5"
            nextPhase="Phase 6"
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
                  <div className="awesome">
                    Keep going champ! You are doing great.
                  </div>
                  <div className="awesome1">
                  There’s something fascinating about you and we can’t wait for you to see it.
                  </div>
                  <div className="awesome2">
                    <Link to="/assessmentphasesix">
                      <button className="awesomebtn">
                        Continue Assessment
                      </button>
                    </Link>
                      {" "}
                      <button onClick={logout} className="awesomebtnsubmit">
                        Save Progress
                      </button>
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

export default AssessmentFifthPhaseComplete;
