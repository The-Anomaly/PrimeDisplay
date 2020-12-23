import React from "react";
import { Container, Row, Col, Card, Modal, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import mark from "../../../assets/mark-icn.png";
import mark_blue from "../../../assets/blue-mark.png";
import mark_green from "../../../assets/green-mark.png";
import "./payment.css";
import { API } from "../../../config";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Home/Home.css"

const Payment = (props: any) => {
  const [state, setFormState] = React.useState<any>({
    errorMessage: "",
    user: "",
    userInfos: [],
    successMsg: false,
    isLoading: false,
    plan: true,
    withoutlogin: false,
    selectedSubscription: "",
    giftmail: "",
  });
  const [modState, setModalState] = React.useState<any>({
    giftASub: false,
    giftASub2: false,
  });
  const { giftASub, giftASub2 } = modState;
  const openGiftASubscriptionModal = () => {
    setModalState({
      ...modState,
      giftASub: true,
    });
  };
  const openGiftASubscriptionModal2 = () => {
    setModalState({
      ...modState,
      giftASub2: true,
    });
  };
  const closeGiftASubscriptionModal = () => {
    setModalState({
      ...modState,
      giftASub: false,
    });
  };
  const closeGiftASubscriptionModal2 = () => {
    setModalState({
      ...modState,
      giftASub2: false,
    });
  };
  const OneOff = () => {
    setFormState({
      ...state,
      plan: true,
    });
    // window.scrollTo(-0, -0);
  };

  const Progressive = () => {
    setFormState({
      ...state,
      plan: false,
    });
    // window.scrollTo(-0, -0);
  };

  const { plan, withoutlogin, selectedSubscription, giftmail } = state;

  React.useEffect(() => {
    if (window.location.pathname === "/payment") {
      setFormState({
        ...state,
        withoutlogin: true,
      });
    }
  }, []);

  const onChangeHandler = (e) => {
    setFormState({
      ...state,
      giftmail: e.target.value,
      errorMessage: "",
    });
  };
  // console.log(giftmail);

  const formActionHandler = (e) => {
    setFormState({
      ...state,
      selectedSubscription: e.target.value,
    });
  };

  const giftSubscriptionPayment = () => {
    if (selectedSubscription === "One-off Insight Plan") {
      return giftSubscriptionPayref("One-off Insight Plan", 3500);
    } else if (selectedSubscription === "One-off Direction Plan") {
      return giftSubscriptionPayref("One-off Direction Plan", 10000);
    } else if (selectedSubscription === "Progressive Insight Plan") {
      return giftSubscriptionPayref("Progressive Insight Plan", 3500);
    } else if (selectedSubscription === "Progressive Directive Plan") {
      return giftSubscriptionPayref("Progressive Direction Plan", 6000);
    } else if (selectedSubscription === "Progressive Accountability Plan") {
      return giftSubscriptionPayref("Progressive Accountability Plan", 10000);
    } else {
      notify("Select a plan");
    }
  };

  const payWithMonnify = (reference, selectedplan: string, cost) => {
    const availableUser = localStorage.getItem("user");
    var user = availableUser
      ? JSON.parse(availableUser)
      : window.location.assign("/signin");
    try {
      window.MonnifySDK.initialize({
        amount: cost,
        currency: "NGN",
        reference,
        customerFullName: user[0]?.first_name + "  " + user[0]?.last_name,
        customerEmail: user[0]?.email,
        customerMobileNumber: "",
        apiKey: "MK_PROD_NNSGXTY6LF",
        contractCode: "722431733218",
        // contractCode: "4978848198",
        // apiKey: "MK_TEST_WQZNXHV9FY",
        // secretKey: "MR4K3WHE7BDLZFTR3Z4VUJ4H4HD88S22",
        paymentDescription: selectedplan,
        isTestMode: false,
        redirect: false,
        onComplete: function (response) {
          if (response.paymentStatus === "OVERPAID") {
            if(selectedSubscription !== "") {
              // console.log("Gift subscription successful!");
              notify("Gift subscription overpaid!");
            }
            notify(
              "Your current payment has exceeded the amount. The excess amount will be refunded within 24 hours"
            );
            return setTimeout(
              (window.location.pathname = "/thirdparty/overpaid"),
              3000
            );
          }
          if (response.paymentStatus === "PAID") {
            if(selectedSubscription !== "") {
              // console.log("Gift subscription successful!");
              notify("Gift subscription successful!");
               // return setTimeout(
              //   (window.location.pathname = "/dashboardsubscriptionplan"),
              //   3000
              // );
            }
            // console.log("paid");
            const availableToken = localStorage.getItem("userToken");
            const token = availableToken ? JSON.parse(availableToken) : "";
            axios
              .get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
                headers: { Authorization: `Token ${token}` },
              })
              .then((response1) => {
                // console.log(response1);
                //console.log(response1?.data[0]);
                localStorage.setItem(
                  "accessFeature",
                  JSON.stringify(response1?.data[0])
                );
                // console.log(localStorage.getItem("accessFeature"));
                const stringFeature = localStorage.getItem("accessFeature");
                const featureToCheck = stringFeature
                  ? JSON.parse(stringFeature)
                  : "";
              })
              .catch((error) => {
                // console.error("Payment Status Error");
              });
            // console.log("Payment Successfull");
          }
          if (response.paymentStatus === "PENDING") {
            if(selectedSubscription !== "") {
              // console.log("Gift subscription unsuccessful!");
              notify("Gift subscription pending!");
            }
            notify("Payment Pending");
            return setTimeout(
              (window.location.pathname = "/thirdparty/pending"),
              3000
            );
          }
        },
        onClose: function (data) {
          // console.log("On close function");
          return setTimeout(
            (window.location.pathname = "/dashboardsubscriptionplan"),
            3000
          );
        },
      });
    } catch (error) {}
  };
  const notify = (message: string) => {
    toast(message, { containerId: "B" });
    setTimeout(() => {
      window.location.assign("");
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
      : window.location.assign("/signin");
    axios
      .get(`${API}/monnifypaymentreference`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        // console.log(response);
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
        // console.log(error);
        setFormState({
          ...state,
          isLoading: false,
        });
      });
  };

  const giftSubscriptionPayref = (selectedplan, cost) => {
    setFormState({
      ...state,
      isLoading: true,
    });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    axios
      .get(`${API}/gift-monnifypaymentreference/?email=${giftmail}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        // console.log(response);
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
        // console.log(error);
        setFormState({
          ...state,
          isLoading: false,
        });
      });
  };
  return (
    <>
      <div className={withoutlogin ? "mobilepadding" : ""}>
        <div
          className={
            props.mode === "dark"
              ? "payment-section pymntpadding"
              : "payment-section progressivelgt"
          }
        >
            <div
              className={
                !withoutlogin
                  ? "payment-decription paymentdescrip"
                  : "payment-decription"
              }
            >
              <h3>We have curated payments plans with you in mind</h3>
            {withoutlogin ? <div className="fourthline pymntline"> </div> : ""}
            </div>
            <div className="webpaymentview">
              <Row className="payment-plans">
                <Col md={5} className="margined_col oneoffmini">
                  <Card
                    className={
                      plan === true && !withoutlogin
                        ? "plan-cards one-off gborder"
                        : "plan-cards one-off"
                    }
                  >
                    <Card.Body onClick={OneOff}>
                      <div>
                        <h6>One off Clarity Experience</h6>
                      </div>
                    </Card.Body>
                  </Card>
                  {plan === true ? (
                    <div
                      className={
                        plan === true && !withoutlogin
                          ? "plan-card-arr gnotch"
                          : "plan-card-arr"
                      }
                    >
                      <i className="fas fa-caret-down"></i>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md={5}>
                  <Card
                    className={
                      plan === false && !withoutlogin
                        ? "plan-cards pce bborder"
                        : "plan-cards pce"
                    }
                  >
                    <Card.Body onClick={Progressive}>
                      <div>
                        <h6>Progressive Clarity Experience</h6>
                      </div>
                    </Card.Body>
                  </Card>
                  {plan === false ? (
                    <div
                      className={
                        plan === false && !withoutlogin
                          ? "plan-card-arr bnotch"
                          : "plan-card-arr"
                      }
                    >
                      <i className="fas fa-caret-down"></i>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              {plan === true && (
                <div>
                  {" "}
                  <Row className="centered_payment mobilecards">
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="h-300 shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N0.00 <span>/one-off</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div">
                            <h6>Free</h6>
                            <p>
                              Get the first hand Clarity experience for no
                              charge at all. Take action to experience career bliss.
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark} className="card-image" />
                              Career fitness score
                            </li>
                            <li>
                              <img src={mark} className="card-image" />
                              Career personality types
                            </li>
                            <li>
                              <img src={mark} className="card-image" />
                              Cv builder
                            </li>
                            <li>
                              <img src={mark} className="card-image" />
                              Strength & Weakness Report
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-yellow">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <Link to="/dashboardsubscriptionplan">
                              <span className="card_btn btn-yellow">
                                Subscribe
                              </span>
                            </Link>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className=" shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N5000 <span>/one-off</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div ">
                            <h6 className="blue">Insight Plan</h6>
                            <p>
                              Get an edge - The insight plan gives you an edge
                              over your peers. Be the YOU, you've always wanted.
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_blue} className="card-image" />
                              Everything under <span>FREE</span>
                            </li>
                            <li>
                              <img src={mark_blue} className="card-image" />
                              Strength & Weakness Report
                            </li>
                            <li>
                              <img src={mark_blue} className="card-image" />
                              Competence analysis Report{" "}
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Most suitable career business expression
                              </div>{" "}
                            </li>
                            <li>
                              <img src={mark_blue} className="card-image" />
                              Report on best roles to apply for{" "}
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Career drivers and how to leverage them
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Highlights on areas for career optimization.
                              </div>
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-blue">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn btn-blue"
                              onClick={() =>
                                requestForPayref("One-off Insight Plan", 5000)
                              }
                            >
                              Upgrade to Insight
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="h-300 shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N12000 <span>/one-off</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div">
                            <h6 className="green">Direction Plan</h6>
                            <p>
                              Hand in Hand Guidance: Get perspective on your
                              reports. Get assigned to your personal career
                              coach. It only gets better.
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_green} className="card-image" />
                              Everything under{" "}
                              <span className="blue">INSIGHT</span>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img
                                    src={mark_green}
                                    className="card-image"
                                  />
                                </div>
                                40 minutes career-planning session with a
                                Clarity counsellor
                              </div>
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-green card_btn--animated">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn btn-green card_btn--animated"
                              onClick={() =>
                                requestForPayref(
                                  "One-off Direction Plan",
                                  12000
                                )
                              }
                            >
                              Upgrade to Direction
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="centered_payment">
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="subcription-card">
                        <Card.Header className="subscription-header">
                          <h6 className="red">Gift a Subscription</h6>
                        </Card.Header>
                        <Card.Body>
                          <p className="sub-p">
                            Give a gift of success. Choose one of the three
                            different plans
                          </p>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-red card_btn--animated">
                                Give a Clarity Subscription
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn btn-red card_btn--animated"
                              onClick={openGiftASubscriptionModal}
                            >
                              Give a Clarity Subscription
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )}

              {plan === false && (
                <div>
                  <Row className="centered_payment mobilecards">
                    <Col md={3} sm={8} className="margined_col cardmini">
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
                              Get the first hand Clarity experience for no
                              charge at all. Take action to experience career bliss
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
                                Most suitable career business expression
                              </div>
                            </li>
                            <li>
                              <img src={mark} className="card-image" />
                              Report on best roles to apply for
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark} className="card-image" />
                                </div>
                                Career drivers and how to leverage them
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
                                Recommended courses curated weekly to strenthen
                                your skill
                              </div>
                            </li>
                            <li className="cdlisadjmarg">
                              <img src={mark} className="card-image" />
                              Weekly Tailored job alerts
                            </li>
                            <li className="cdlisadjmarg">
                              <img src={mark} className="card-image" />
                              Unlimited Chat access with coaches & counsellors
                              and get feedback on your to-dos goals and issues
                              discussed
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn card_btn--pce1 btn-yellow">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn card_btn--pce1 btn-yellow"
                              onClick={() =>
                                requestForPayref(
                                  "Progressive Insight Plan",
                                  3500
                                )
                              }
                            >
                              Subscribe
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className=" shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N7000 <span>/month</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div ">
                            <h6 className="blue">Direction Plan</h6>
                            <p>
                              Get an edge - The insight plan gives you an edge
                              over your peers. Be the YOU, you always wanted
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
                                40 minutes career-planning session with a
                                Clarity counselor
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Weekly Personalized Counsellors Recommendation
                                on suitable personal & career activities
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Weekly Personalized Counse- llors Recommendation
                                on suitable personal & career activities
                              </div>{" "}
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
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn card_btn--pce2 btn-blue">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn card_btn--pce2 btn-blue"
                              onClick={() =>
                                requestForPayref(
                                  "Progressive Direction Plan",
                                  7000
                                )
                              }
                            >
                              Upgrade to Direction
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="h-300 shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N10500 <span>/month</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div">
                            <h6 className="green">Accountability Plan</h6>
                            <p>
                              Hand in Hand Guidance - Get perspective on your
                              reports. Get assigned to your personal career
                              coach, It only gets better
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_green} className="card-image" />
                              Everything under{" "}
                              <span className="blue">DIRECTION</span>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img
                                    src={mark_green}
                                    className="card-image"
                                  />
                                </div>
                                40 minutes career-planning session with a
                                Clarity counselor X2
                              </div>
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-green card_btn--pce3 card_btn--animated">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn btn-green card_btn--pce3 card_btn--animated"
                              onClick={() =>
                                requestForPayref(
                                  "Progressive Accountability Plan",
                                  10500
                                )
                              }
                            >
                              Upgrade to Accountability
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="centered_payment">
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="subcription-card">
                        <Card.Header className="subscription-header">
                          <h6 className="red">Gift a Subscription</h6>
                        </Card.Header>
                        <Card.Body>
                          <p className="sub-p">
                            Give a gift of success. Choose one of the three
                            different plans
                          </p>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-red card_btn--animated">
                                Give a Clarity Subscription
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn btn-red card_btn--animated"
                              onClick={openGiftASubscriptionModal2}
                            >
                              Give a Clarity Subscription
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )}
              </div>
              <div className="mobilepaymentview">
                <Accordion defaultActiveKey="">
                    <Card className="mobilepaymentcard">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Col className="">
                  <Card
                    className={
                      plan === true && !withoutlogin
                        ? "plan-cards one-off gborder"
                        : "plan-cards one-off"
                    }
                  >
                    <Card.Body onClick={OneOff}>
                      <div>
                        <h6>One off Clarity Experience</h6>
                      </div>
                    </Card.Body>
                  </Card>
                  {plan === true ? (
                    <div
                      className={
                        plan === true && !withoutlogin
                          ? "plan-card-arr gnotch"
                          : "plan-card-arr"
                      }
                    >
                      <i className="fas fa-caret-down"></i>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                    <Col className="margined_col cardmini">
                      <Card className="h-300 shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N0.00 <span>/one-off</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div">
                            <h6>Free</h6>
                            <p>
                              Get the first hand Clarity experience for no
                              charge at all. Take action to experience career bliss.
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark} className="card-image" />
                              Career fitness score
                            </li>
                            <li>
                              <img src={mark} className="card-image" />
                              Career personality types
                            </li>
                            <li>
                              <img src={mark} className="card-image" />
                              Cv builder
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-yellow">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <Link to="/dashboardsubscriptionplan">
                              <span className="card_btn btn-yellow">
                                Subscribe
                              </span>
                            </Link>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className=" shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N5000 <span>/one-off</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div ">
                            <h6 className="blue">Insight Plan</h6>
                            <p>
                              Get an edge - The insight plan gives you an edge
                              over your peers. Be the YOU, you've always wanted.
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_blue} className="card-image" />
                              Everything under <span>FREE</span>
                            </li>
                            <li>
                              <img src={mark_blue} className="card-image" />
                              Strength & Weakness Report
                            </li>
                            <li>
                              <img src={mark_blue} className="card-image" />
                              Competence analysis Report{" "}
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Most suitable career business expression
                              </div>{" "}
                            </li>
                            <li>
                              <img src={mark_blue} className="card-image" />
                              Report on best roles to apply for{" "}
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Career drivers and how to leverage them
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Highlights on areas for career optimization.
                              </div>
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-blue">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn btn-blue"
                              onClick={() =>
                                requestForPayref("One-off Insight Plan", 5000)
                              }
                            >
                              Upgrade to Insight
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="h-300 shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N12000 <span>/one-off</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div">
                            <h6 className="green">Direction Plan</h6>
                            <p>
                              Hand in Hand Guidance: Get perspective on your
                              reports. Get assigned to your personal career
                              coach. It only gets better.
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_green} className="card-image" />
                              Everything under{" "}
                              <span className="blue">INSIGHT</span>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img
                                    src={mark_green}
                                    className="card-image"
                                  />
                                </div>
                                40 minutes career-planning session with a
                                Clarity counsellor
                              </div>
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-green card_btn--animated">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn btn-green card_btn--animated"
                              onClick={() =>
                                requestForPayref(
                                  "One-off Direction Plan",
                                  12000
                                )
                              }
                            >
                              Upgrade to Direction
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                      </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    <Card className="mobilepaymentcard">
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    <Col>
                  <Card
                    className={
                      plan === false && !withoutlogin
                        ? "plan-cards pce bborder"
                        : "plan-cards pce"
                    }
                  >
                    <Card.Body onClick={Progressive}>
                      <div>
                        <h6>Progressive Clarity Experience</h6>
                      </div>
                    </Card.Body>
                  </Card>
                  {plan === false ? (
                    <div
                      className={
                        plan === false && !withoutlogin
                          ? "plan-card-arr bnotch"
                          : "plan-card-arr"
                      }
                    >
                      <i className="fas fa-caret-down"></i>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                      <Col md={3} sm={8} className="margined_col cardmini">
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
                              Get the first hand Clarity experience for no
                              charge at all. Take action to experience career bliss
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
                                Most suitable career business expression
                              </div>
                            </li>
                            <li>
                              <img src={mark} className="card-image" />
                              Report on best roles to apply for
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark} className="card-image" />
                                </div>
                                Career drivers and how to leverage them
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
                                Recommended courses curated weekly to strenthen
                                your skill
                              </div>
                            </li>
                            <li className="cdlisadjmarg">
                              <img src={mark} className="card-image" />
                              Weekly Tailored job alerts
                            </li>
                            <li className="cdlisadjmarg">
                              <img src={mark} className="card-image" />
                              Unlimited Chat access with coaches & counsellors
                              and get feedback on your to-dos goals and issues
                              discussed
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn card_btn--pce1 btn-yellow">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn card_btn--pce1 btn-yellow"
                              onClick={() =>
                                requestForPayref(
                                  "Progressive Insight Plan",
                                  3500
                                )
                              }
                            >
                              Subscribe
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className=" shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N7000 <span>/month</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div ">
                            <h6 className="blue">Direction Plan</h6>
                            <p>
                              Get an edge - The insight plan gives you an edge
                              over your peers. Be the YOU, you always wanted
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
                                40 minutes career-planning session with a
                                Clarity counselor
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Weekly Personalized Counsellors Recommendation
                                on suitable personal & career activities
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Weekly Personalized Counse- llors Recommendation
                                on suitable personal & career activities
                              </div>{" "}
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
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn card_btn--pce2 btn-blue">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn card_btn--pce2 btn-blue"
                              onClick={() =>
                                requestForPayref(
                                  "Progressive Direction Plan",
                                  7000
                                )
                              }
                            >
                              Upgrade to Direction
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="h-300 shadow-sm bg-white payment-card">
                        <Card.Header className="payment-header">
                          <h4>
                            N10500 <span>/month</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div">
                            <h6 className="green">Accountability Plan</h6>
                            <p>
                              Hand in Hand Guidance - Get perspective on your
                              reports. Get assigned to your personal career
                              coach, It only gets better
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_green} className="card-image" />
                              Everything under{" "}
                              <span className="blue">DIRECTION</span>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img
                                    src={mark_green}
                                    className="card-image"
                                  />
                                </div>
                                40 minutes career-planning session with a
                                Clarity counselor X2
                              </div>
                            </li>
                          </ul>
                          {withoutlogin ? (
                            <Link to="/signin">
                              <span className="card_btn btn-green card_btn--pce3 card_btn--animated">
                                Get Started
                              </span>
                            </Link>
                          ) : (
                            <span
                              className="card_btn btn-green card_btn--pce3 card_btn--animated"
                              onClick={() =>
                                requestForPayref(
                                  "Progressive Accountability Plan",
                                  10500
                                )
                              }
                            >
                              Upgrade to Accountability
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  
                    </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
              </div>
          <ToastContainer
            enableMultiContainer
            containerId={"B"}
            toastClassName="bg-info text-white"
            hideProgressBar={true}
            position={toast.POSITION.TOP_CENTER}
          />
        </div>
      </div>
      <div className="mobilepaymentview">

      </div>
      {/* One-off Gift Modal */}
      <Modal
        centered={true}
        show={giftASub}
        onHide={closeGiftASubscriptionModal}
        className="giftsubscrip"
      >
        <Modal.Title className="gifttitle">Gift a Subscription</Modal.Title>
        <div>
          <div className="giftline"></div>
          <span className="giftsubtext">
            Give a gift of success. Choose one of our awesome plans
          </span>
        </div>
        <Modal.Body className="rmpadding">
          <label htmlFor="plans">
            <span className="giftselectttl">Select Subscription plan</span>
            <select
              onChange={formActionHandler}
              id="plans"
              name="selected plan"
              className="giftselect"
              required
            >
              <option className="giftdisabled" selected disabled hidden>
                Please select a plan you want to gift
              </option>
              <option className="giftoptions" value="One-off Insight Plan">
                One-off Insight Plan
              </option>
              <option className="giftoptions" value="One-off Direction Plan">
                One-off Direction Plan
              </option>
            </select>
          </label>
          <label>
            <span className="giftselectttl">Beneficiary Email Address</span>
            <input
              className="rdsignupinput form-control giftmail"
              name="email"
              type="email"
              placeholder="Please enter email of the beneficiary"
              onChange={onChangeHandler}
            />
          </label>
          <div className="subscripbtn" onClick={giftSubscriptionPayment}>
            Proceed to Payment
          </div>
        </Modal.Body>
      </Modal>
      {/* Progressive Gift Modal */}
      <Modal
        centered={true}
        show={giftASub2}
        onHide={closeGiftASubscriptionModal2}
        className="giftsubscrip"
      >
        <Modal.Title className="gifttitle">Gift a Subscription</Modal.Title>
        <div>
          <div className="giftline"></div>
          <span className="giftsubtext">
            Give a gift of success. Choose one of our awesome plans
          </span>
        </div>
        <Modal.Body className="rmpadding">
          <label htmlFor="plans">
            <span className="giftselectttl">Select Subscription plan</span>
            <select
              onChange={formActionHandler}
              id="plans"
              name="selected plan"
              className="giftselect"
              required
            >
              <option className="giftdisabled" selected disabled hidden>
                Please select a plan you want to gift
              </option>
              <option className="giftoptions" value="Progressive Insight Plan">
                Progressive Insight Plan
              </option>
              <option
                className="giftoptions"
                value="Progressive Direction Plan"
              >
                Progressive Direction Plan
              </option>
              <option
                className="giftoptions"
                value="Progressive Accountability Plan"
              >
                Progressive Accountability Plan
              </option>
            </select>
          </label>
          <label>
            <span className="giftselectttl">Beneficiary Email Address</span>
            <input
              className="rdsignupinput form-control giftmail"
              name="email"
              type="email"
              placeholder="Please enter email of the beneficiary"
              onChange={onChangeHandler}
            />
          </label>
          <div className="subscripbtn" onClick={giftSubscriptionPayment}>
            Proceed to Payment
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Payment;