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
import "react-toastify/dist/ReactToastify.css";

// team
type User = string | null;

const AssessmentSeventhPhaseComplete = (props:any) => {
  const [name, setName] = React.useState("");
  const [state, Update] = React.useState({is_counsellor:false});
  React.useEffect((): any => {
    const User1 = localStorage.getItem("user")
    const User2 = User1? JSON.parse(User1):""
    // console.log(User2)
    if(User2[0]?.is_counsellor ==true){
      Update({
        ...state,
        is_counsellor:true
      })
      return props.history.push("/counsellorresultpage");  
    }
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = urlParams.get("counsellor");
    if(urlkey=="true"){
     return props.history.push("/counsellorresultpage");          
    }

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
                    {
                      state.is_counsellor?
                      <Link to="/counsellorresultpage">
                      <button className="awesomebtn">View Result</button>
                    </Link>
                    :
                    <Link to="/free/dashboard">
                    <button className="awesomebtn">Get Results</button>
                  </Link>
                  
                    }
                    
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

export default AssessmentSeventhPhaseComplete;
