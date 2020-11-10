import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import mark from "../../../assets/mark-icn.png";
import mark_blue from "../../../assets/blue-mark.png";
import mark_green from "../../../assets/green-mark.png";
import "./payment.css";
import Navbar from "../HomeComponents/newnavbar";
import Footer from "../HomeComponents/newfooter";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../../config";


const Monthly_plan = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    userInfos: [],
    successMsg: false,
    isLoading: false,
  });

  const payWithMonnify = (reference, selectedplan: string, cost) => {
    const availableUser = localStorage.getItem("user");
    var user = availableUser
      ? JSON.parse(availableUser)
      : props.history.push("/signin");
    try {
      window.MonnifySDK.initialize({
        amount: cost,
        currency: "NGN",
        reference,
        customerFullName: user[0]?.first_name + "  " + user[0]?.last_name,
        customerEmail: "monnify@monnify.com",
        customerMobileNumber: "",
        apiKey: "MK_PROD_NNSGXTY6LF",
        contractCode: "722431733218",
        paymentDescription: selectedplan,
        isTestMode: false,
        redirect: false,
        onComplete: function (response) {
          if (response.paymentStatus === "OVERPAID") {
            notify(
              "You current payment has exceeded the amount. The excess amount will be refunded within 24 hours"
            );
            return setTimeout(
              (window.location.pathname = "/thirdparty/overpaid"),
              3000
            );
          }
          if (response.paymentStatus === "PAID") {
            return //do something
          }
          if (response.paymentStatus === "PENDING") {
            notify("Payment Pending");
            //do something
          }
        },
        onClose: function (data) {
          return setTimeout(
            (window.location.pathname = "/thirdpary/dashboard"),
            9000
          );
        },
      });
    } catch (error) {}
  };
  const notify = (message: string) => {
    toast(message, { containerId: "B" });
    setTimeout(() => {
      props.history.push("");
    }, 3000);
  };
  const requestForPayref = (selectedplan, cost) => {
    setFormState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : props.history.push("/signin");
    axios
      .get(`${API}/monnifypaymentreference`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response);
        setFormState({
          ...state,
          user: response?.data[0]?.payment_reference,
          isLoading: false,
        });
        setTimeout(() => {
          payWithMonnify(
            response?.data[0]?.payment_reference,
            selectedplan,
            cost
          );
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setFormState({
          ...state,
          isLoading: false,
        });
      });
  };
  return (
    <div>
      <Navbar />
      <div className="payment-section">
        <Container>
          <div className="payment-decription">
            <h3>We have curated payments plans with you in mind</h3>
          </div>
          <Row className="payment-plans">
            <Col md={5} className="margined_col">
              <Card className="plan-cards one-off">
                <Card.Body>
                  <Link to="/payment">
                    <h6>One off Clarity Experience</h6>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="plan-cards pce">
                <Card.Body>
                  <Link to="/progressive_clarity_experience">
                    <h6>Progressive Clarity Experience</h6>
                  </Link>
                </Card.Body>
              </Card>
              <div className="plan-card-arr">
                <i className="fas fa-caret-down"></i>
              </div>
            </Col>
          </Row>
          <Row className="centered_payment">
            <Col md={3} sm={6} className="margined_col">
              <Card className="h-300 shadow-sm bg-white payment-card">
                <Card.Header className="payment-header">
                  <h4>
                    N3500 <span>/month</span>
                  </h4>
                </Card.Header>
                <Card.Body>
                  <div className="card-div">
                    <h6>Insight Plan</h6>
                    <p>
                      Etiam pulvinar tempus a tempor, impermjdiet mattis
                      accumsan nulla vel.
                    </p>
                  </div>
                  <ul className="card-list">
                    <li>
                      <img src={mark} className="card-image" />
                      Career fitness score
                    </li>
                    <li>
                      <img src={mark} className="card-image" />
                      Career personality type
                    </li>
                    <li>
                      <img src={mark} className="card-image" />
                      Strenght & Weakness Report
                    </li>
                    <li>
                      <img src={mark} className="card-image" />
                      Competence analysis Report
                    </li>
                    <li>
                      <div className="card-list-box">
                        <div>
                          <img src={mark} className="card-image" />
                        </div>
                        Most suitablecareer business expression
                      </div>
                    </li>
                    <li>
                      <img src={mark} className="card-image" />
                      Report on best roles to aply
                    </li>
                    <li>
                      <div className="card-list-box">
                        <div>
                          <img src={mark} className="card-image" />
                        </div>
                        Career drivers abd how to leverage them
                      </div>
                    </li>
                    <li>
                      <div className="card-list-box">
                        <div>
                          <img src={mark} className="card-image" />
                        </div>
                        Highlights on areas for career optimization
                      </div>
                    </li>
                    <li>
                      <div className="card-list-box">
                        <div>
                          <img src={mark} className="card-image" />
                        </div>
                        Weekly curated recommended courses to take to strengthen
                        your skill
                      </div>
                    </li>
                    <li className="cdlisadjmarg">
                      <img src={mark} className="card-image" />
                      Weekly Tailored job alerts
                    </li>
                  </ul>
                  <span className="card_btn card_btn--pce1 btn-yellow" onClick={() => requestForPayref("Growth Plan", 3500)}>
                    Subscribe
                  </span>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="margined_col">
              <Card className=" shadow-sm bg-white payment-card">
                <Card.Header className="payment-header">
                  <h4>
                    N6000 <span>/month</span>
                  </h4>
                </Card.Header>
                <Card.Body>
                  <div className="card-div ">
                    <h6 className="blue">Direction Plan</h6>
                    <p>
                      Quis cras adipiscing vestibulum ut praesent lorem aliquam
                      dictum habitant.
                    </p>
                  </div>
                  <ul className="card-list">
                    <li>
                      <img src={mark_blue} className="card-image" />
                      Everything under <span>INSIGHT</span>
                    </li>
                    <li>
                      <div className="card-list-box">
                        <div>
                          <img src={mark_blue} className="card-image" />
                        </div>
                        40 minutes career-planning session with a clarity
                        counsellor
                      </div>
                    </li>
                    <li>
                      <div className="card-list-box">
                        <div>
                          <img src={mark_blue} className="card-image" />
                        </div>
                        Weekly Personalized Counsellors Recommendation on
                        suitable personal & career activities
                      </div>
                    </li>
                    <li>
                      <div className="card-list-box">
                        <div>
                          <img src={mark_blue} className="card-image" />
                        </div>
                        Personal to-dos & reminder setting
                      </div>{" "}
                    </li>
                  </ul>
                  <span className="card_btn card_btn--pce2 btn-blue">
                    Upgrade to Direction Plan
                  </span>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={8} className="margined_col">
              <Card className="h-300 shadow-sm bg-white payment-card">
                <Card.Header className="payment-header">
                  <h4>
                    N10000 <span>/month</span>
                  </h4>
                </Card.Header>
                <Card.Body>
                  <div className="card-div">
                    <h6 className="green">Accountability Plan</h6>
                    <p>
                      Eleifend pharetra, et a, maecenas imperdiet nulla lorem
                      aliquam dictum habitant.
                    </p>
                  </div>
                  <ul className="card-list">
                    <li>
                      <img src={mark_green} className="card-image" />
                      Everything under <span className="blue">DIRECTION</span>
                    </li>
                    <li>
                      <div className="card-list-box">
                        <div>
                          <img src={mark_green} className="card-image" />
                        </div>
                        Unlimited Chat access withcoaches & counsellors and get
                        feedback on your to-dos goals and issues discussed
                      </div>
                    </li>
                  </ul>
                  <span className="card_btn btn-green card_btn--pce3 card_btn--animated">
                    Upgrade to Accountability
                  </span>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="centered_payment">
            <Col md={3} sm={6} className="margined_col">
              <Card className="subcription-card">
                <Card.Header className="subscription-header">
                  <h6 className="red">Gift a Subscription</h6>
                </Card.Header>
                <Card.Body>
                  <p className="sub-p">
                    Give a gift of success. Choose from among the three
                    different plans
                  </p>
                  <span className="card_btn btn-red card_btn--animated">
                    Give a Clarity Subscription
                  </span>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default Monthly_plan;
