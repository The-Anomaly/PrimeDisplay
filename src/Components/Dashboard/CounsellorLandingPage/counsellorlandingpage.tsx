import * as React from "react";
import { Col, Row } from "react-bootstrap";
import Navbar from "../CounsellorLandingPage/counsellornavbar";
import "./counsellorlanding.css";
import Footer from "../../Home/HomeComponents/newfooter";
import counsellorimg from "../../../assets/counsellor.svg";
import user from "../../../assets/usericon.png";
import counsellor from "../../../assets/counselloricon.png";
import platform from "../../../assets/platformicon.png";
import ouroffer from "../../../assets/ouroffer.svg";
import greentick from "../../../assets/greentick.png";
import step1 from "../../../assets/step1.png";
import step2 from "../../../assets/step2.png";
import step3 from "../../../assets/step3.png";
import stepline from "../../../assets/stepline.png";
import stepsconnect from "../../../assets/stepsconnect.png";
import { Link } from "react-router-dom";

const CounsellorLandingPage: React.FC = (props: any) => {
  window.scrollTo(-0,-0);
  return (
    <>
      <Navbar home={true} />
      <Row md={12} className="counsellorintro">
        <Col md={6} className="Cintro smintrosize">
          <div className="Cintrotxt1">
            Are you a <span className="Cintrotxt1a">Counsellor?</span>
          </div>
          <div className="Cintrotxt2">
            Do you enjoy guiding, training & coaching people to walk in the
            right direction?{" "}
          </div>
          <div className="Cintrotxt3">
            Then Clarity for Counsellors is just for you.
          </div>
          <Link to="/counsellor/signup"><div className="Cintrobtn">GET STARTED</div></Link>
        </Col>
        <Col md={6} className="smintrosize Cimgsec">
          <img className="Cimg" src={counsellorimg} alt="counsellor" />
        </Col>
        <div className="counsellorstat">
          <div className="stat1">
            <img className="statimg" src={user} alt="user" />
            <div className="stattxt">
              <div className="stattxt1">3100+</div>
              <div className="stattxt2">Clients</div>
            </div>
          </div>
          <div className="stat1 statrsz">
            <img className="statimg" src={counsellor} alt="counsellor" />
            <div className="stattxt">
              <div className="stattxt1">30+</div>
              <div className="stattxt2">Counsellors</div>
            </div>
          </div>
          <div className="stat1">
            <img className="statimg" src={platform} alt="platform" />
            <div className="stattxt">
              <div className="stattxt1">1</div>
              <div className="stattxt2">Platform</div>
            </div>
          </div>
        </div>
      </Row>
      <Row className="ouroffer">
        <Col md={5} className="ouroffer2 smintrosize">
          <img className="ourofferimg" src={ouroffer} alt="our offer" />
        </Col>
        <Col md={7} className="ouroffer1 smintrosize">
          <div className="ouroffertxt1">What we are offering</div>
          <div className="ouroffertxt2">
            With the human behaviour becoming complex, no two clients are the
            same, using the clarity tool you'd be able to create the best
            coaching strategies for your client.
          </div>
          <div className="offerlistsec">
            <div className="offerlist">
              <img className="offerlisttick" src={greentick} />{" "}
              <span>
                Clarity provides a tool for you to personalize the coaching
                experience for your clients
              </span>
            </div>
            <div className="offerlist">
              <img className="offerlisttick" src={greentick} />{" "}
              <span>Automate tasks like session scheduling</span>
            </div>
            <div className="offerlist">
              <img className="offerlisttick" src={greentick} />{" "}
              <span>Active chatting with clients</span>
            </div>
            <div className="offerlist">
              <img className="offerlisttick" src={greentick} />{" "}
              <span>
                Turning session recommendations into tasks (activities) your
                clients can work on.
              </span>
            </div>
            <div className="offerlist">
              <img className="offerlisttick" src={greentick} />{" "}
              <span>
                Tracking clients progress on your recommendations and tasks.
              </span>
            </div>
            <div className="offerlist">
              <img className="offerlisttick" src={greentick} />{" "}
              <span>
                Automating accountability reminders so your clients don't slip
                through the cracks.
              </span>
            </div>
            <div className="bonusoffer">BONUS</div>
            <div className="offerlist">
              <img className="offerlisttick" src={greentick} />{" "}
              <span>
                We assign ready clients looking for transformative change in
                your area of specialization to you.
              </span>
            </div>
            <div className="offerlist">
              <img className="offerlisttick" src={greentick} />{" "}
              <span>
                You can talk to Behavioural analysts and access a knowledge bank
                of strategies that help deliver effective results to clients.
              </span>
            </div>
          </div>
        </Col>
        <div className="offercard">
            <div className="joinclarity">
                <div className="joinclaritytxt1">
                Become a more productive Counsellor, <div className="joinclaritysubtxt">Coach or Trainer with Clarity</div>
                </div>
                <div className="joinclaritytxt2">
                Join the Clarity Counsellors & Coaching Network
                </div>
            </div>
            <Link to="/counsellor/signup"><div className="Cintrobtn">GET STARTED</div></Link>
        </div>
      </Row>
      <Row className="Csteps">
          <div className="Cstepsheading">3 easy steps to become a Clarity Counsellor</div>
          <div className="threesteps">
            <img className="stepsconnect" src={stepsconnect} />
              <div className="stepss">
                  <img className="stepsimg" src={step1} alt="step 1" />
                  <div className="stepstxt">
                      <div className="steptxt1">Sign Up</div>
                      <div className="steptxt2">Start by creating an account on Clarity.</div>
                  </div>
              </div>
              <img className="stepline" src={stepline} />
              <div className="stepss step2">
                  <img className="stepsimg" src={step2} alt="step 2" />
                  <div className="stepstxt">
                      <div className="steptxt1">Get Confirmed</div>
                      <div className="steptxt2">You will be contacted by yudimy and onboarded.</div>
                  </div>
              </div>
              <img className="stepline" src={stepline} />
              <div className="stepss step3">
                  <img className="stepsimg" src={step3} alt="step 3" />
                  <div className="stepstxt">
                      <div className="steptxt1">Get Assigned Clients</div>
                      <div className="steptxt2">Get assigned users and share your unique link with your personal clients.</div>
                  </div>
              </div>
          </div>
      </Row>
      <Footer />
    </>
  );
};

export default CounsellorLandingPage;
