import * as React from "react";
import "../kegennidashboard.css";
import SideBarCounsellorDashboard from "./SideBarCounsellorDashboard";
import CounsellorDashboardNav from "./CounsellorDashboardNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardCounsellorIntroHeader from "./DashboardCounsellorIntroHeader";
import userimg from "../../../assets/userimg.png";

const CounsellorAllMessages = () => {
  return (
    <>
      <Container fluid={true} className="contann122">
        <Row>
          <SideBarCounsellorDashboard messages={true} />
          <Col md={10} sm={12} className="prm">
            <CounsellorDashboardNav title="Messages" />
            <Row>
              <Col md={12} className="firstqq">
                <div className="kdashheader npps"></div>
                <DashboardCounsellorIntroHeader
                  searcharea={true}
                  welcomeText="Summary of all messages to and from members assigned to you"
                />
                <Row>
                  <Col md={12} className="mssaag sasag">
                    <div className="useri1222 ui1222 ssgs">
                      <div className="msg1">
                        <img src={userimg} className="userimg imguserrr" alt="jayeolajones" />
                      </div>
                      <div className="msg2">
                        <div>
                          <span className="username11">Jayeola Jones</span>
                          <span className="useremail11">jaye@user.com</span>
                        </div>
                        <div className="messagedetails nufont">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Id mi, mattis at ipsum ullamcorper blandit
                          pharetra. Est elit, morbi elementum faucibus nec morbi
                          eget aliquet adipiscing. Sapien urna volutpat mattis
                          cursus non et mauris tellus laoreet. Metus potenti leo
                          nulla nulla pretium id.
                        </div>
                      </div>
                      <div className="tymeline msg3 nufont">6 days Ago</div>
                    </div>
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
export default CounsellorAllMessages;
