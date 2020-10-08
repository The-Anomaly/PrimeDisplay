import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";
import norecommendations from "../../../assets/no recommendations.png";
import { useState } from "react";

const CounsellorRecommendations1 = () => {
  const [state, setState] = useState({ counsellor: [] });
  const { counsellor }: any = state;
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard councrec={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Counsellors Recommendation" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  welcomeText="All recommendations made to (Username )"
                />
                <Row>
                  <Col md={12} className="youwss">
                    {counsellor &&
                      counsellor?.map((data, i) => (
                        <>
                          <div className="usersentwrap1" key={i}>
                            <div className="youwrap">
                              <span className="you11b">
                                {data.counsellor_name}
                              </span>{" "}
                              <span className="youdate">{data.date}</span>
                            </div>
                            <div className="councellors_response">
                              {data.text}
                            </div>
                          </div>
                        </>
                      ))}
                    {counsellor.length === 0 && (
                      <div className="norec">
                        <img
                          src={norecommendations}
                          className="norecommendations"
                          alt="norecommendations"
                        />
                        <div className="udont1">Opps!!!</div>
                        <div className="udont">
                          You dont have any Recommendation yet
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CounsellorRecommendations1;
