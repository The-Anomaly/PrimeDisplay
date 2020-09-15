import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import Navbar from "../Home/HomeComponents/navbar";
import Footer from "../Home/HomeComponents/footer";
import vector from "../../assets/Vector.png";
import vector1 from "../../assets/Vector1.png";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import vector5 from "../../assets/Vector5.png";
import vector6 from "../../assets/Vector6.png";
import vector7 from "../../assets/Vector7.png";
import KigenniPartResult from "./KigenniPartResult";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const KigenniDashboard: React.FunctionComponent = (props: any) => {
  return (
    <>
      <Navbar/>
      <Container fluid={true}>
        <Row className="kli6 bcbv">
          <KigenniPartResult />
          <Col md={10} className="jksk">
            <div className="text-center">
              <div className="fullresult">
                <Link to="/paymentsummary">
                  Access  Counselor's Review <span>&#8594;</span>
                </Link>
              </div>
            </div>
            <div className="kigennidisabled">
              <div className="kiconrow">
                <div className="kitemwrapper">
                  <img src={vector} alt="vector" />
                  <div className="v1strength">Strength</div>
                </div>
                <div className="kitemwrapper">
                  <img src={vector1} alt="vector" />
                  <div className="v1strength">Weaknesses</div>
                </div>
                <div className="kitemwrapper">
                  <img src={vector2} alt="vector" />
                  <div className="v1strength">Strong Career Competencies</div>
                </div>
                <div className="kitemwrapper">
                  <img src={vector2} alt="vector" />
                  <div className="v1strength">Average Career Competencies</div>
                </div>
                <div className="kitemwrapper">
                  <img src={vector7} alt="vector" />
                  <div className="v1strength">Weak Career Competencies</div>
                </div>
              </div>
              <div className="kiconrow mncb">
                <div className="kitemwrapper">
                  <img src={vector3} alt="vector" />
                  <div className="v1strength">Career Matches</div>
                </div>
                <div className="kitemwrapper">
                  <img src={vector4} alt="vector" />
                  <div className="v1strength">Career Motivators</div>
                </div>
                <div className="kitemwrapper">
                  <img src={vector5} alt="vector" />
                  <div className="v1strength">Work Style</div>
                </div>
                <div className="kitemwrapper">
                  <img src={vector6} alt="vector" />
                  <div className="v1strength">Job Function Fit</div>
                </div>
              </div>
            </div>
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
    </>
  );
};

export default KigenniDashboard;
