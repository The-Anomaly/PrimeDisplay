import * as React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../HomeComponents/newnavbar";
import Footer from "../HomeComponents/newfooter";
import RightTopImage from "../../../assets/2.png";
import "./faqs.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const Faq: React.FunctionComponent = (props) => {
  let [activeKey, setActiveKey] = useState("");
  return (
    <>
      <Navbar faq={true} />
      <Container fluid={true}>
        <Row className="firstrow possition newfaqrow">
          <Col
            md={5}
            sm={{ span: 12, order: 12 }}
            xs={{ span: 12, order: 12 }}
            className="firstrowtxt newfaq"
          >
            <div>Frequently</div>
            <div className="askIn">Asked Questions</div>
          </Col>
          <Col
            md={{ span: 5 }}
            sm={{ span: 12, order: 1 }}
            xs={{ span: 12, order: 12 }}
          >
            <img src={RightTopImage} className="homebanner0" alt="homebanner" />
          </Col>
        </Row>
        <Row className="faq-item-wrapper">
          <Col
            xs={12}
            md={{ span: 9, offset: 1 }}
            sm={11}
            className="faq-accordion"
          >
            <Accordion
              activeKey={activeKey}
              defaultActiveKey=""
              // onSelect={(e) => setActiveKey(e)}
            >
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <div className="faq-side-header">
                    <div className="space111">
                      <div>How does Clarity help me</div>
                      <div className="plus_style">+</div>
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p className="faq-answers">
                      Clarity helps you get concisely discover and define your
                      career path through self-discovery of your strengths,
                      weaknesses, abilities and competencies. It doesn't just
                      stop there we help you organize your priorities so you are
                      able to work at the optimum.{" "}
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {/* second question */}
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <div className="faq-side-header">
                    <div className="space111">
                      <div>
                        I don't have the funds to subscribe. What can I do?
                      </div>
                      <div className="plus_style">+</div>
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    {" "}
                    <p className="faq-answers">
                      We totally understand, but we also know $11-$20 dollars is
                      not a lot of money if you are ready to take your work-life
                      up the notch all through the year. You can however, start
                      getting the free clarity report on your strengths and
                      weaknesses.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {/* third question */}
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  <div className="faq-side-header">
                    <div className="space111">
                      <div>What are the benefits of Clarity to me?</div>
                      <div className="plus_style">+</div>
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <p className="faq-answers">
                      <div>
                        Objectivity, personalized and unbiased advice. It is our
                        duty to get to know you, understand you and help make
                        the best and most informed decisions at every point in
                        your life walk starting with helping you understand who
                        you are and what career paths are best for you to thrive
                        in.
                      </div>
                      <div>
                        Clarity is like a therapist in your pocket, helping you
                        navigate through the challenges of your career and
                        personal struggles, as much as we are focused on helping
                        you build a fulfilling career we also realize that other
                        aspects of your life matter too. Hence, clarity
                        counsellors and psychologists are equipped to help you
                        tackle various issues that come along your way as you
                        work on maximizing your potential.
                      </div>
                      <div>
                        We don’t stop here, we recommend you to opportunities
                        that will help improve your standard of living and make
                        you feel fulfilled.
                      </div>
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              {/* fourth question */}
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                  <div className="faq-side-header">
                    <div className="space111">
                      <div>Is Clarity available on the app store?</div>
                      <div className="plus_style">+</div>
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    <p className="faq-answers">
                      For now, Clarity is a web-application that you can
                      book-mark on your browser and save to your phone
                      home-screen so at every point you can access your
                      dashboard. We are working on building the mobile version
                      for better experience.{" "}
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="5">
                  <div className="faq-side-header">
                    <div className="space111">
                      <div>Is Clarity just for working professionals?</div>
                      <div className="plus_style">+</div>
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="5">
                  <Card.Body>
                    <p className="faq-answers">
                      Clarity assessment is available to entrepreneurs, working
                      professionals, undergraduate students, students who want
                      to want to make a difference with their career and be
                      relevant in the 4th industrial revolution.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="7">
                  <div className="faq-side-header">
                    <div className="space111">
                      <div>How Confidential are my conversations?</div>
                      <div className="plus_style">+</div>
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="7">
                  <Card.Body>
                    {" "}
                    <p className="faq-answers">
                      Like doctors we take privacy really seriously, except we
                      believe there’s a life threatening situation we refer to
                      appropriate quarters. We ensure conversations are private,
                      providing a safe space to rant, learn and take progressive
                      action. We are emphatic and yet intentional about your
                      personal development so every effort on clarity is
                      propelled to move you forward.
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {/* fifth question */}
            </Accordion>
          </Col>
        </Row>
        <Footer />
      </Container>
    </>
  );
};

export default Faq;
