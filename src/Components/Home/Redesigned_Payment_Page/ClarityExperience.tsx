import React from "react";
import { Container, Row, Col, Card, Modal, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import mark from "../../../assets/mark-icn.png";
import mark_blue from "../../../assets/blue-mark.png";
import mark_green from "../../../assets/green-mark.png";
import monnifyLogo from "../../../assets/monnify-logo.png";
import flutterLogo from "../../../assets/flutterwave-logo.png";
import paystackLogo from "../../../assets/paystack-logo.png";
import "./payment.css";
import { API } from "../../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Home/Home.css";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    PaystackPop: any;
  }
}

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
    unavailable: false,
    plandetails: "",
    plancost: "",
    choosePaymentGateway: false,
  });
  const { giftASub, giftASub2, unavailable, choosePaymentGateway } = modState;
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
  const openUnavailableModal = () => {
    setModalState({
      ...modState,
      unavailable: true,
    });
  };
  const openChoosePaymentGateway = (planinfo, cost) => {
    setModalState({
      ...modState,
      choosePaymentGateway: true,
      plandetails: planinfo,
      plancost: cost,
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
  const closeUnavailableModal = () => {
    setModalState({
      ...modState,
      unavailable: false,
    });
  };
  const closeChoosePaymentGateway = () => {
    setModalState({
      ...modState,
      choosePaymentGateway: false,
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
    if (window.location.pathname === "/pricing") {
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
      return giftSubscriptionPayref("One-off Insight Plan", 5000);
    }
    //  else if (selectedSubscription === "One-off Direction Plan") {
    //   return giftSubscriptionPayref("One-off Direction Plan", 10000);
    // }
    else if (selectedSubscription === "Progressive Insight Plan") {
      return giftSubscriptionPayref("Progressive Insight Plan", 12000);
    } else if (selectedSubscription === "Progressive Directive Plan") {
      return giftSubscriptionPayref("Progressive Direction Plan", 30000);
    } else if (selectedSubscription === "Progressive Accountability Plan") {
      return giftSubscriptionPayref("Progressive Accountability Plan", 50000);
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
        apiKey: "MK_PROD_NNSGXTY6LF", //live key
        contractCode: "722431733218", //live key
        // contractCode: "4978848198", //test key
        // apiKey: "MK_TEST_WQZNXHV9FY", //test key
        // secretKey: "MR4K3WHE7BDLZFTR3Z4VUJ4H4HD88S22",
        paymentDescription: selectedplan,
        isTestMode: false,
        redirect: false,
        onComplete: function (response) {
          if (response.paymentStatus === "OVERPAID") {
            if (selectedSubscription !== "") {
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
            if (selectedSubscription !== "") {
              // console.log("Gift subscription successful!");
              notify("Gift subscription successful!");
              // return setTimeout(
              //   (window.location.pathname = "/dashboardsubscriptionplan"),
              //   3000
              // );
            }
            // console.log("Payment Successfull");
          }
          if (response.paymentStatus === "PENDING") {
            if (selectedSubscription !== "") {
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
        if(selectedplan=="flutterwave"){
            handleFlutterPayment({
              callback: (response) => {
                 console.log(response);
                  closePaymentModal() // this will close the modal programmatically
              },
              onClose: () => {
                console.log("closed")
              },
            });
        }
        if (selectedplan == "paystack") {
          payWithPaystack(response?.data[0]?.payment_reference);
        }
        setFormState({
          ...state,
          isLoading: false,
        });
        console.log(selectedplan);
        if (selectedplan == "monnify") {
            payWithMonnify(
              response?.data[0]?.payment_reference,
              modState.plandetails,
              modState.plancost
            );
        }
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
    setModalState({
      ...modState,
      plandetails:selectedplan,
      plancost:cost
    })
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
  // (new Date()).getTime() reference
  const payWithPaystack = (reference) => {
    const availableUser = localStorage.getItem("user");
    var user = availableUser
      ? JSON.parse(availableUser)
      : window.location.assign("/signin");
    console.log(reference);
    try {
      const { plandetails, plancost, selectedplan }: any = modState;
      var handler = window.PaystackPop.setup({
        key: "pk_test_8e7b82cecf13543dd8bd9470a4ce0fccad9678e1",
        // test key = pk_test_8e7b82cecf13543dd8bd9470a4ce0fccad9678e1
        //live key = pk_live_ea8275cdd785a1758d70ab32591af4467c2085fd
        email: user[0]?.email,
        amount: modState.plancost,
        currency: "NGN",
        ref: reference, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
          custom_fields: [
            {
              display_name: user[0]?.first_name + "  " + user[0]?.last_name,
              variable_name: "mobile_number",
              value: plancost,
              description:plandetails
            },
          ],
        },
        callback: function (response) {
          console.log(response);
          if (response.paymentStatus === "PAID") {
            if (selectedSubscription !== "") {
              // console.log("Gift subscription successful!");
              notify("Subscription successful!");
              // return setTimeout(
              //   (window.location.pathname = "/dashboardsubscriptionplan"),
              //   3000
              // );
            }
            // console.log("Payment Successfull");
          }
          // props.history.push("/something");
        },
        onClose: function () {
          return setTimeout(
            (window.location.pathname = "/dashboardsubscriptionplan"),
            3000
          );
        },
      });
      handler.openIframe();
    } catch (error) {
      console.log("Failed to initailize payment" + error);
    }
  };
  //  flutter wave 
  const config:any = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment :any = useFlutterwave(config);

  console.log(modState.plandetails);
  console.log(modState.plancost);
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
            {withoutlogin && <div className="fourthline pymntline"> </div>}
          </div>
          <div className="webpaymentview">
            <Row className="payment-plans">
              <Col md={5} className="margined_col oneoffmini">
                <Card
                  className={
                    plan === true && !withoutlogin
                      ? "plan-cards one-off gborder switchcardwidth"
                      : "plan-cards one-off switchcardwidth"
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
                        ? "plan-card-arr gnotch switchcardwidth"
                        : "plan-card-arr switchcardwidth"
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
                      ? "plan-cards pce bborder switchcardwidth"
                      : "plan-cards pce switchcardwidth"
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
                        ? "plan-card-arr bnotch switchcardwidth"
                        : "plan-card-arr switchcardwidth"
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
                  <Col
                    md={4}
                    sm={8}
                    className="margined_col cardmini progressivewidth"
                  >
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
                            Get the first hand Clarity experience for no charge
                            at all. Take action to experience career bliss.
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
                          {/* <li>
                              <img src={mark} className="card-image" />
                              Strength & Weakness Report
                            </li> */}
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
                  <Col
                    md={4}
                    sm={8}
                    className="margined_col cardmini progressivewidth"
                  >
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
                            Get An Edge - The Insight Plan gives you practical
                            advice on how to use your characteristics and
                            competencies to your advantage.  Get an edge over
                            your peers. Be the YOU, you've always wanted to be.
                          </p>
                        </div>
                        <ul className="card-list">
                          <li>
                            <img src={mark_blue} className="card-image" />
                            All Services listed under <span>FREE</span>
                          </li>
                          <li>
                            <img src={mark_blue} className="card-image" />
                            Strengths & Weaknesses Report
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
                            Report on best roles Suited to You{" "}
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
                              Identification of Areas for Career Optimization
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
                            //onClick={() =>
                            //requestForPayref("One-off Insight Plan", 5000)
                            //}
                            onClick={() =>
                              openChoosePaymentGateway(
                                "One-off Insight Plan",
                                5000
                              )
                            }
                          >
                            Upgrade to Insight
                          </span>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* <Col md={3} sm={8} className="margined_col cardmini">
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
                            reports. Get assigned to your personal career coach.
                            It only gets better.
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
                                <img src={mark_green} className="card-image" />
                              </div>
                              40 minutes career-planning session with a Clarity
                              counsellor
                            </div>
                          </li>
                        </ul>
                        // {withoutlogin ? (
                        //   <Link to="/signin">
                        //     <span className="card_btn btn-green card_btn--animated">
                        //       Get Started
                        //     </span>
                        //   </Link>
                        // ) : (
                        //   <span
                        //     className="card_btn btn-green card_btn--animated"
                        //     onClick={() =>
                        //       requestForPayref("One-off Direction Plan", 12000)
                        //     }
                        //   >
                        //     Upgrade to Direction
                        //   </span>
                        // )}
                        <span
                            className="card_btn btn-green card_btn--animated"
                            onClick={openUnavailableModal}
                          >
                            Upgrade to Direction
                          </span>
                      </Card.Body>
                    </Card>
                  </Col>*/}
                </Row>
                <Row className="centered_payment submargin">
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
                <Row className="centered_payment mobilecards progressivepadding">
                  <Col
                    md={4}
                    sm={8}
                    className="margined_col cardmini progressivewidth"
                  >
                    <Card className="h-300 shadow-sm bg-white payment-card">
                      <Card.Header className="payment-header">
                        <h4>
                          N12,000 <span>/month</span>
                        </h4>
                      </Card.Header>
                      <Card.Body>
                        <div className="card-div">
                          <h6>Insight Plan</h6>
                          <p>
                            The Insight Plan gives you personalized insights on
                            how to use your characteristics and competencies to
                            your advantage.  It also recommends courses and
                            opportunities tailored to improve your career path.
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
                            Strengths & Weaknesses Report
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
                            Report on Roles Best Suited to You
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
                              Identification of Areas for Career Optimization
                            </div>
                          </li>
                          <li>
                            <div className="card-list-box">
                              <div>
                                <img src={mark} className="card-image" />
                              </div>
                              One Career-Planning Session with a Clarity
                              Counsellor.(up to 2-hours)
                            </div>
                          </li>
                          <li className="cdlisadjmarg">
                            <img src={mark} className="card-image" />
                            Convert Counsellors recommendations to actionable
                            to-dos with reminders
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
                            // onClick={() =>
                            // requestForPayref(
                            // "Progressive Insight Plan",
                            //12000
                            //)
                            //}
                            onClick={() =>
                              openChoosePaymentGateway(
                                "Progressive Insight Plan",
                                12000
                              )
                            }
                          >
                            Subscribe
                          </span>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col
                    md={4}
                    sm={8}
                    className="margined_col cardmini progressivewidth"
                  >
                    <Card className=" shadow-sm bg-white payment-card">
                      <Card.Header className="payment-header">
                        <h4>
                          N30,000 <span>/month</span>
                        </h4>
                      </Card.Header>
                      <Card.Body>
                        <div className="card-div ">
                          <h6 className="blue">Direction Plan</h6>
                          <p>
                            Get An Edge, define your path and start the journey
                            to realise the career and life fulfilment you've
                            always desired, with career experts on your side.
                          </p>
                        </div>
                        <ul className="card-list">
                          <li>
                            <img src={mark_blue} className="card-image" />
                            All Services listed under <span>INSIGHT</span>
                          </li>
                          <li>
                            <div className="card-list-box">
                              <div>
                                <img src={mark_blue} className="card-image" />
                              </div>
                              Unlimited Chat Access with Coaches & Counsellors
                            </div>
                          </li>
                          <li>
                            <div className="card-list-box">
                              <div>
                                <img src={mark_blue} className="card-image" />
                              </div>
                              Feedback on execution of recommended tasks
                              assigned by counsellor
                            </div>
                          </li>
                          <li>
                            <div className="card-list-box">
                              <div>
                                <img src={mark_blue} className="card-image" />
                              </div>
                              Goals and Issues discussed throughout the month
                            </div>
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
                            //onClick={() =>
                            //requestForPayref(
                            //"Progressive Direction Plan",
                            //30000
                            //)
                            //}
                            onClick={() =>
                              openChoosePaymentGateway(
                                "Progressive Direction Plan",
                                30000
                              )
                            }
                          >
                            Upgrade to Direction
                          </span>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col
                    md={4}
                    sm={8}
                    className="margined_col cardmini progressivewidth"
                  >
                    <Card className="h-300 shadow-sm bg-white payment-card">
                      <Card.Header className="payment-header">
                        <h4>
                          N50,500 <span>/month</span>
                        </h4>
                      </Card.Header>
                      <Card.Body>
                        <div className="card-div">
                          <h6 className="green">Accountability Plan</h6>
                          <p>
                            Hand in Hand Guidance - Get perspective on your
                            reports. Get assigned to your personal career coach,
                            It only gets better
                          </p>
                        </div>
                        <ul className="card-list">
                          <li>
                            <img src={mark_green} className="card-image" />
                            All Services listed under{" "}
                            <span className="blue">DIRECTION</span>
                          </li>
                          <li>
                            <div className="card-list-box">
                              <div>
                                <img src={mark_green} className="card-image" />
                              </div>
                              2 hours of a One-on-one, Personalised Career
                              Planning Session with a Clarity Counsellor at the
                              beginning of the month
                            </div>
                          </li>
                          <li>
                            <div className="card-list-box">
                              <div>
                                <img src={mark_green} className="card-image" />
                              </div>
                              Receive Post-session Recommendations from your
                              Counsellor on How to Track and Achieve your Career
                              Goals as well as Suitable Activities to Engage In,
                              all highlighted on your Personal Dashboard
                            </div>
                          </li>
                          <li>
                            <div className="card-list-box">
                              <div>
                                <img src={mark_green} className="card-image" />
                              </div>
                              Weekly Check-ins and Goal Tracking via the
                              Platform
                            </div>
                          </li>
                          <li>
                            <div className="card-list-box">
                              <div>
                                <img src={mark_green} className="card-image" />
                              </div>
                              2 hours of a One-on-one Follow-up Session with
                              your Clarity Counsellor to review progress at the
                              end of the month
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
                            //onClick={() =>
                            //requestForPayref(
                            //"Progressive Accountability Plan",
                            //50500
                            //)
                            //}
                            onClick={() =>
                              openChoosePaymentGateway(
                                "Progressive Accountability Plan",
                                50500
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
                <Row className="centered_payment submargin">
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
                              charge at all. Take action to experience career
                              bliss.
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
                              Get An Edge - The Insight Plan gives you practical
                              advice on how to use your characteristics and
                              competencies to your advantage.  Get an edge over
                              your peers. Be the YOU, you've always wanted to
                              be.
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_blue} className="card-image" />
                              All Services listed under <span>FREE</span>
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
                              Report on best roles Suited to You{" "}
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
                                Identification of Areas for Career Optimization
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
                    {/* <Col md={3} sm={8} className="margined_col cardmini">
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
                          // {withoutlogin ? (
                          //   <Link to="/signin">
                          //     <span className="card_btn btn-green card_btn--animated">
                          //       Get Started
                          //     </span>
                          //   </Link>
                          // ) : (
                          //   <span
                          //     className="card_btn btn-green card_btn--animated"
                          //     onClick={() =>
                          //       requestForPayref(
                          //         "One-off Direction Plan",
                          //         12000
                          //       )
                          //     }
                          //   >
                          //     Upgrade to Direction
                          //   </span>
                          // )}
                          <span
                              className="card_btn btn-green card_btn--animated"
                              onClick={openUnavailableModal}
                            >
                              Upgrade to Direction
                            </span>
                        </Card.Body>
                      </Card>
                    </Col> */}
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="h-300 shadow-sm bg-white subcription-card">
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
                            N12,000 <span>/month</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div">
                            <h6>Insight Plan</h6>
                            <p>
                              Get the first hand Clarity experience for no
                              charge at all. Take action to experience career
                              bliss
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
                              Strengths & Weaknesses Report
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
                              Report on Roles Best Suited to You
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
                                Identification of Areas for Career Optimization
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark} className="card-image" />
                                </div>
                                One Career-Planning Session with a Clarity
                                Counsellor.(up to 2-hours)
                              </div>
                            </li>
                            <li className="cdlisadjmarg">
                              <img src={mark} className="card-image" />
                              Convert Counsellors recommendations to actionable
                              to-dos with reminders
                            </li>
                            {/* <li className="cdlisadjmarg">
                              <img src={mark} className="card-image" />
                            </li> */}
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
                                  12000
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
                            30,000 <span>/month</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div ">
                            <h6 className="blue">Direction Plan</h6>
                            <p>
                              Get An Edge, define your path and start the
                              journey to realise the career and life fulfilment
                              you've always desired, with career experts on your
                              side.
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_blue} className="card-image" />
                              All Services listed under <span>INSIGHT</span>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Unlimited Chat Access with Coaches & Counsellors
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Feedback on execution of recommended tasks
                                assigned by counsellor
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img src={mark_blue} className="card-image" />
                                </div>
                                Goals and Issues discussed throughout the month
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
                                  30000
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
                            N50,500 <span>/month</span>
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <div className="card-div">
                            <h6 className="green">Accountability Plan</h6>
                            <p>
                              Hand in Hand Guidance -  acquire expert,
                              third-party, perspective, advice and proposed
                              actions on your Assessment Reports.  Be Assigned
                              to your Career Coach and see the magic happen!
                            </p>
                          </div>
                          <ul className="card-list">
                            <li>
                              <img src={mark_green} className="card-image" />
                              All Services listed under{" "}
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
                                2 hours of a One-on-one, Personalised Career
                                Planning Session with a Clarity Counsellor at
                                the beginning of the month
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img
                                    src={mark_green}
                                    className="card-image"
                                  />
                                </div>
                                Receive Post-session Recommendations from your
                                Counsellor on How to Track and Achieve your
                                Career Goals as well as Suitable Activities to
                                Engage In, all highlighted on your Personal
                                Dashboard
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img
                                    src={mark_green}
                                    className="card-image"
                                  />
                                </div>
                                Weekly Check-ins and Goal Tracking via the
                                Platform
                              </div>
                            </li>
                            <li>
                              <div className="card-list-box">
                                <div>
                                  <img
                                    src={mark_green}
                                    className="card-image"
                                  />
                                </div>
                                2 hours of a One-on-one Follow-up Session with
                                your Clarity Counsellor to review progress at
                                the end of the month
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
                    <Col md={3} sm={8} className="margined_col cardmini">
                      <Card className="h-300 shadow-sm bg-white subcription-card">
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
      <div className="mobilepaymentview"></div>
      {/* One-off Gift Modal */}
      <Modal
        centered={true}
        show={choosePaymentGateway}
        onHide={closeChoosePaymentGateway}
      >
        <Modal.Header>
          <Modal.Title>Choose a payment channel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="payment-modal-row">
          <Row>
            <Col md={4} className="monnify-logo monnify-logo1">
              <span
                className="paylogo1"
                onClick={() => requestForPayref("monnify", "monnify")}
              >
                <img src={monnifyLogo} className="payment-channel-logo" />
              </span>
            </Col>
            <Col md={4}>
              <span className="paylogo1">
                <img
                  src={flutterLogo}
                  className="payment-channel-logo"
                  onClick={() => requestForPayref("flutterwave", "flutterwave")}
                />
              </span>
            </Col>
            <Col md={4}>
              <span
                className="paylogo1"
                onClick={() => requestForPayref("paystack", "paystack")}
              >
                <img src={paystackLogo} className="payment-channel-logo" />
              </span>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="payment-channel-btn">Continue</button>
        </Modal.Footer>
      </Modal>
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
              {/* <option className="giftoptions" value="One-off Direction Plan">
                One-off Direction Plan
              </option> */}
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
      <Modal show={unavailable} onHide={closeUnavailableModal} centered>
        <Modal.Body>
          <div className="unavailableplan">
            <h5>This plan is only available for the promo.</h5>
            <h6>
              Follow{" "}
              <a href="http://instagram.com/getclarity_" target="_blank">
                @getclarity_
              </a>{" "}
              on instagram for more info.
            </h6>
            <p>It's the season of love! &#128525;</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Payment;
