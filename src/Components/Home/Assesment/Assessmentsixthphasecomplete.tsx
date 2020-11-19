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
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
  

// team
type User = string | null;

const AssessmentSixthPhaseComplete = () => {
  const [name, setName] = React.useState("");
  React.useEffect((): any => {
    window.scrollTo(-0, -0);
    const user: User = localStorage.getItem("user");
    const currentUser = user ? JSON.parse(user) : [{ first_name: "" }];
    setName(currentUser[0].first_name);
  }, []);
  const saveProgress = () => {
    notify("Successfully saved progress");
  };
  const notify = (message: string) => toast(message, { containerId: "B" });

  return (
    <div>
      <Navbar />
      <Container fluid={true}>
        <Row className="firstrowcf cftcontent assesspadd">
          <AssessmentFirstSection
            progressBar={70}
            phase="Phase 6"
            nextPhase="Phase 7"
            time={13}
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
                    You are the new cool for sure! Just one more to go
                  </div>
                  <div className="awesome1"></div>
                  <div className="awesome2">
                    <Link to="/assessmentphaseseven">
                      <button className="awesomebtn">
                        Continue Assessment
                      </button>
                    </Link>{" "}
                    <button className="awesomebtnsubmit" onClick={saveProgress}>
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
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </div>
  );
};

export default AssessmentSixthPhaseComplete;
