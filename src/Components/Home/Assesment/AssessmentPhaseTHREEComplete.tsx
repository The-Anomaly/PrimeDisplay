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
import nextis5 from "../../../assets/nextis5.png";
import { Link } from "react-router-dom";
import "../Forms/recruitmentform.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = string | null;

const AssessmentThirdPhaseComplete = (props: any) => {
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
            progressBar={60}
            phase="Phase 3"
            nextPhase="Phase 4"
            time={10}
          />
          <Col md={11}>
            <Row className="firstrowcf2 cftcontent">
              <Col md={12} className="awesomewrap">
                <div>
                  <img
                    className="cherry-done"
                    src={nextis5}
                    alt="cherry-done"
                  />
                  <div className="awesome">
                    You’re almost there {name}, a few more to go
                  </div>
                  <div className="awesome1"></div>
                  <div className="awesome2">
                    <Link to="/assessmentphasefour">
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
        {/* <Footer /> */}
      </Container>
    </div>
  );
};

export default AssessmentThirdPhaseComplete;
