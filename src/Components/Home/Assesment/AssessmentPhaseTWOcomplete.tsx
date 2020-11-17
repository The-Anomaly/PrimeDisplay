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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// team
type User = string | null;

const AssessmentSecondPhaseComplete = () => {
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
        <Row className="firstrowcf cftcontent">
          <AssessmentFirstSection
            progressBar={20}
            phase="Phase 2"
            nextPhase="Phase 3"
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
                    Your ratings are off the charts right now {name}!
                  </div>
                  <div className="awesome1">
                    You are getting closer to seeing what we are seeing back
                    here!.
                  </div>
                  <div className="awesome2">
                    <Link to="/assessmentphasethree">
                      <button className="awesomebtn">
                        Continue Assessment
                      </button>
                    </Link>{" "}
                    <button onClick={saveProgress} className="awesomebtnsubmit">
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

export default AssessmentSecondPhaseComplete;
